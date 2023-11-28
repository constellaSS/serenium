#![no_std]
extern crate alloc;

use hashbrown::HashMap;
use io::*;
use gstd::{async_main, exec ,msg, prelude::*, ActorId, };

#[cfg(feature = "binary-vendor")]
include!(concat!(env!("OUT_DIR"), "/wasm_binary.rs"));

#[derive(Clone, Default)]
struct Thread {
    id: String,
    owner: ActorId,
    thread_type: ThreadType,
    title: String,
    content: String,
    photo_url: String,
    replies: HashMap<ActorId, ThreadReply>,
    participants: HashMap<ActorId, u128>,
    state: ThreadState,
    distributed_tokens: u128,
    graph_rep: HashMap<String, Vec<String>>
}

impl Thread {

    async fn tokens_transfer_reward(&mut self, amount_tokens: u128, dest: ActorId) {
        let address_ft = addresft_state_mut();           
        let payload = FTAction::Transfer {from: exec::program_id(), to: dest ,amount: amount_tokens};
        let _ = msg::send(address_ft.ft_program_id, payload, 0);
    }

    async fn tokens_transfer_pay(&mut self, amount_tokens: u128) {
        let current_state = thread_state_mut();
        let address_ft = addresft_state_mut();
        let payload = FTAction::Transfer{from: msg::source() , to: exec::program_id(), amount: amount_tokens};
        let _ = msg::send(address_ft.ft_program_id, payload, 0);
        current_state.participants.entry(msg::source()).or_insert(amount_tokens);
        current_state.distributed_tokens += amount_tokens;
    }

    fn find_winner(&mut self) -> Option<&ActorId> {
        let current_state = thread_state_mut();
        let mut max_likes = 0;
        let mut actor_id_with_most_likes: Option<&ActorId> = None;

        for (actor_id, reply) in &current_state.replies {
            if reply.number_of_likes > max_likes {
                max_likes = reply.number_of_likes;
                actor_id_with_most_likes = Some(actor_id);
            }
        }

        actor_id_with_most_likes
    }
}

static mut THREAD: Option<Thread> = None;

static mut ADDRESSFT:Option<InitFT> = None;

fn thread_state_mut() -> &'static mut Thread  {
    unsafe { THREAD.get_or_insert(Default::default()) }
}

fn addresft_state_mut() -> &'static mut InitFT {
    let addressft = unsafe { ADDRESSFT.as_mut()};
    unsafe { addressft.unwrap_unchecked() }
}

#[no_mangle]
extern "C" fn init () {
    let config: InitFT = msg::load().expect("Unable to decode InitFT");
    let thread = Thread {
        ..Default::default()
    };

    if config.ft_program_id.is_zero() {
        panic!("FT program address can't be 0");
    }

    let initft = InitFT {
        ft_program_id: config.ft_program_id
    };

    unsafe {
        ADDRESSFT = Some(initft);
    }

   unsafe { THREAD = Some(thread) };

}

#[async_main]
async fn main() {

    let action = msg::load().expect("Could not load Action");

    let _thread = unsafe { THREAD.get_or_insert(Thread::default()) };

    match action {
        ThreadAction::NewThread(init_thread) =>  {
            let new_thread = thread_state_mut();

            new_thread.id = init_thread.id;
            new_thread.owner = msg::source();
            new_thread.thread_type = init_thread.thread_type;
            new_thread.title = init_thread.title;
            new_thread.content = init_thread.content;
            new_thread.photo_url = init_thread.photo_url;
            new_thread.state = ThreadState::Active;
            new_thread.graph_rep = HashMap::new();
            // Immediately push thread id to graph
            new_thread.graph_rep.insert(new_thread.id.clone(), Vec::new());

            new_thread.tokens_transfer_pay(1).await;
        }

        ThreadAction::AddReply(content, reply_id, post_id) => {
            let thread = thread_state_mut();
            
            let _reply_user = thread.replies.entry(msg::source()).or_insert(ThreadReply {
                post_id: reply_id.clone(),
                post_owner: msg::source(),
                content,
                number_of_likes: 0,
                number_of_reports: 0,
            });

            // push reply to the graph representation
            if let Some(adj_list) = thread.graph_rep.get_mut(&post_id) {
                adj_list.push(reply_id.clone());
            }
        }

        ThreadAction::LikeReply(amount) => {
            let thread = thread_state_mut();
            thread.participants.entry(msg::source()).or_insert(amount);
        }

        ThreadAction::EndThread => {
            let thread = thread_state_mut();
            thread.state = ThreadState::Expired;
            let &winner = thread.find_winner().expect("Winner not found");
            thread.tokens_transfer_reward(1, winner).await;
        }
    };
}

#[no_mangle]
extern fn state() {
        let thread = unsafe { THREAD.take().expect("Unexpected error in taking state") };
        msg::reply::<IoThread>(thread.into(), 0)
        .expect("Failed to encode or reply with `<ContractMetadata as Metadata>::State` from `state()`");
    }

#[derive(Decode, Encode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct InitFT {
    pub ft_program_id: ActorId,
}


impl From<Thread> for IoThread {
    fn from(value: Thread) -> Self {

    let Thread {
        id,
        owner,
        thread_type,
        title,
        content,
        photo_url,
        replies,
        participants,
        state,
        distributed_tokens,
        graph_rep
    } = value;

    let participants = participants.iter().map(|(k, v)| (*k, v.clone())).collect();
    let replies = replies.iter().map(|(k, v)| (*k, v.clone())).collect();
    let graph_rep = graph_rep.iter().map(|(k, v)| (k.clone(), v.clone())).collect();

    Self {
        id,
        owner,
        title,
        thread_type,
        content,
        photo_url,
        replies,
        participants,
        state,
        distributed_tokens,
        graph_rep
    }

}
}


