// User entity interface
export interface User {
    id: string;
    username: string;
    email: string;
    friends: string[];
}

// Thought entity interface
export interface Thought {
    id: string;
    content: string;
    author: string;
    reactions: Reaction[];
}

// Reaction entity interface
export interface Reaction {
    id: string;
    content: string;
    author: string;
}

// Reaction input structure interface
export interface IReaction {
    content: string;
    author: string;
}