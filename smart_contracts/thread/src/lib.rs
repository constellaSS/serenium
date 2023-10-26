#![no_std]
use gmeta::Metadata;
use hashbrown::HashMap;
use io::*;
use gstd::{async_main, errors::Result as GstdResult, exec ,msg, prelude::*, ActorId, MessageId};

#[cfg(feature = "binary-vendor")]
include!(concat!(env!("OUT_DIR"), "/wasm_binary.rs"));

#[derive(Clone, Default)]
struct Thread {
    id: String,
    owner: ActorId,
    thread_type: String,
    title: String,
    content: String,
    replies: HashMap<ActorId, ThreadReply>,
    participants: HashMap<ActorId, u128>,
    state: ThreadState,
    distributed_tokens: u128
}

impl Thread {
    async fn add_liquidity( &mut self, amount_tokens: u128) {
        let current_state = thread_state_mut();
        let address_ft = addresft_state_mut();
        let payload = FTAction::Burn(amount_tokens);
        let result =  msg::send_for_reply_as::<_, FTEvent>(address_ft.ft_program_id,payload,0,0).expect("Error in sending a message").await;
        current_state.participants.entry(msg::source()).or_insert(amount_tokens); 

        let _ = match result {
            Ok(event) => match event {
                FTEvent::Ok => Ok(()),
                _ => Err(()),
            },
            Err(_) => Err(()),
        };
    }

    async fn remove_liquidity(&mut self, amount_tokens: u128){
        let current_state = thread_state_mut();
        let address_ft = addresft_state_mut();           
        let payload = FTAction::Mint(amount_tokens);     
        let result =  msg::send_for_reply_as::<_, FTEvent>(address_ft.ft_program_id,payload,0,0).expect("Error in sending a message").await;
        current_state.participants.entry(msg::source()).or_insert(amount_tokens);

        let _ = match result {
            Ok(event) => match event {
                FTEvent::Ok => Ok(()),
                _ => Err(()),
            },
            Err(_) => Err(()),
        };
    }

    async fn tokens_transfer_reward(&mut self, amount_tokens: u128, dest: ActorId) {
        let current_state = thread_state_mut();
        let address_ft = addresft_state_mut();           
        let payload = FTAction::Transfer{from: exec::program_id(), to: dest ,amount: amount_tokens};
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

    fn find_reply_with_most_likes(&mut self) -> Option<&ActorId> {
        let current_state = thread_state_mut();
        // Initialize variables to keep track of the reply with the most likes
        let mut max_likes = 0;
        let mut actor_id_with_most_likes: Option<&ActorId> = None;

        // Iterate through the replies in the HashMap
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

    let action: ThreadAction = msg::load().expect("Could not load Action");

    let thread = unsafe { THREAD.get_or_insert(Thread::default()) };

    match action {
        ThreadAction::NewThread(init_thread) =>  {
            let new_thread = thread_state_mut();

            new_thread.id = init_thread.id;
            new_thread.owner = msg::source();
            new_thread.thread_type = init_thread.thread_type;
            new_thread.title = init_thread.title;
            new_thread.content = init_thread.content;
            new_thread.state = ThreadState::Active;

            new_thread.tokens_transfer_pay(1).await;
        }

        ThreadAction::AddReply(reply) => {
            let thread = thread_state_mut();
            
            let reply_user = thread.replies.entry(msg::source()).or_insert(ThreadReply {
                post_id: 0,
                post_owner: 0.into(),
                content: 0.to_string(),
                number_of_likes: 0,
                number_of_reports: 0,
            });

            reply_user.post_id = reply.post_id;
            reply_user.post_owner = reply.post_owner;
            reply_user.content = reply.content;
            reply_user.number_of_likes = reply.number_of_likes;
            reply_user.number_of_reports = reply.number_of_reports;
        }

        ThreadAction::LikeReply(amount) => {
            let thread = thread_state_mut();
            thread.participants.entry(msg::source()).or_insert(amount);
        }

        ThreadAction::EndThread => {
            let thread = thread_state_mut();
            thread.state = ThreadState::Expired;
            let &winner = thread.find_reply_with_most_likes().expect("Winner not found");
            thread.tokens_transfer_reward(1, winner).await;
        }
    };
}

    #[no_mangle]
    extern "C" fn state() {
        reply(common_state())
        .expect("Failed to encode or reply with `<ContractMetadata as Metadata>::State` from `state()`");
    }

#[derive(Decode, Encode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct InitFT {
    pub ft_program_id: ActorId,
}

fn common_state() -> <ContractMetadata as Metadata>::State {
    let state = thread_state_mut();

    let Thread {
        id,
        owner,
        thread_type,
        title,
        content,
        replies,
        participants,
        state,
        distributed_tokens,
    } = state.clone();

    let participants = participants.iter().map(|(k, v)| (*k, v.clone())).collect();
    let replies = replies.iter().map(|(k, v)| (*k, v.clone())).collect();

    IoThread {
        id,
        owner,
        title,
        thread_type,
        content,
        replies,
        participants,
        state,
        distributed_tokens,
    }
}

fn reply(payload: impl Encode) -> GstdResult<MessageId> {
    msg::reply(payload, 0)
}


