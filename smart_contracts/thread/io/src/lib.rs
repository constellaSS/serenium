#![no_std]
use gstd::{ prelude::*, ActorId };
use gmeta::{In, InOut, Metadata};
#[derive(Encode, Decode, TypeInfo)]
pub struct InitThread {
    pub id: String,
    pub owner: String,
    pub thread_type: String, // temporary change to string, usually ThreadType
    pub content: String
}

#[derive(Encode, Decode, TypeInfo, PartialEq, Eq, Clone, Debug)]
pub struct ThreadReply {
    pub post_id: u128,
    pub post_owner: ActorId,
    pub content: String,
    pub number_of_likes: u128,
    pub number_of_reports: u128,
}

#[derive(Default, Encode, Decode, Clone, TypeInfo)]
pub struct Thread {
    id: String,
    owner: String,
    thread_type: String,
    content: String,
    replies: Vec<ThreadReply>,
    participants:Vec<(ActorId, u128)>,
    state: ThreadState,
    distributed_tokens: u128
}

#[derive( Encode, Decode, Clone, TypeInfo)]
#[derive(Default)]
pub enum ThreadType {
    #[default]
    Challenge,
    Question
}

#[derive( Encode, Decode, Clone, TypeInfo)]
#[derive(Default)]
pub enum ThreadState {
    #[default]
    Active,
    Expired
}

#[derive(Encode, Decode, TypeInfo)]
pub enum ThreadAction {
    NewThread(InitThread),
    EndThread,
    AddReply(ThreadReply),
    LikeReply(u128)
}

#[derive(Encode, Decode, TypeInfo, PartialEq, Eq, Clone, Debug)]
pub enum ThreadEvent {
    ThreadEnded,
    ReplyAdded,
    ReplyLiked
}

#[derive(Debug, Decode, Encode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum FTAction {
    Mint(u128),
    Burn(u128),
    Transfer {
        from: ActorId,
        to: ActorId,
        amount: u128,
    },
    Approve {
        to: ActorId,
        amount: u128,
    },
    TotalSupply,
    BalanceOf(ActorId),
}


#[derive(Encode, Decode, TypeInfo)]
pub enum FTEvent {
    Ok,
    Err,
    Balance(u128),
    PermitId(u128),
}

#[derive(Decode, Encode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct InitFT {
    pub ft_program_id: ActorId,
}

#[derive(Encode, Decode, TypeInfo)]
pub struct IoThread {
    pub id: String,
    pub owner: String,
    pub thread_type: String,
    pub content: String,
    pub replies: Vec<(ActorId,ThreadReply)>,
    pub participants:Vec<(ActorId, u128)>,
    pub state: ThreadState,
    pub distributed_tokens: u128
}

pub struct ContractMetadata;

impl Metadata for ContractMetadata {
    type Init = In<InitFT>;
    type Handle = InOut<ThreadAction,ThreadEvent>;
    type Reply = ();
    type Others = ();
    type Signal = ();
    type State = IoThread;
}