#![no_std]

extern crate alloc;

use alloc::string::String;
use alloc::vec::Vec;
use gstd::{prelude::*, HashMap as GHashMap};

#[derive(Encode, Decode, TypeInfo, Hash, PartialEq, PartialOrd, Eq, Ord, Clone, Debug)]
pub struct Post {
    pub user_name: String,
    pub number_of_likes: u64,
    pub number_of_reports: u64,
    pub number_of_saves: u64,
    pub post_id: String,
    pub post_number: u64,
}

#[derive(Encode, Decode, TypeInfo, Hash, PartialEq, PartialOrd, Eq, Ord, Clone, Debug)]
pub struct Graph {
    adjacency_list: GHashMap<String, Vec<String>>,
    posts_storage: GHashMap<String, Post>
}

impl Graph {
    pub fn new() -> Self {
        Graph {
            adjacency_list: GHashMap::new(),
            posts_storage: GHashMap::new()
        }
    }

    pub fn add_node(&mut self, post: Post) {
        self.adjacency_list.insert(post.post_id.clone(), Vec::new());
        self.posts_storage.insert(post.post_id.clone(), post);
    }

    pub fn add_vertex(&mut self, from_post: &Post, to_post: &Post) {
        if let Some(adj_list) = self.adjacency_list.get_mut(&from_post.post_id) {
            adj_list.push(to_post.post_id.clone());
        }
    }

    pub fn get_adjacent_posts(&self, post: &Post) -> Option<&Vec<String>> {
        self.adjacency_list.get(&post.post_id)
    }

    pub fn get_post_by_id(&self, post_id: &str) -> Option<&Post> {
        self.posts_storage.get(post_id)
    }
}

pub struct Stack {
    pub stack: Vec<Post>,
}
