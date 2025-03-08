import { ObjectId } from 'mongoose';
import { User, Thought } from '../models/models';

export const addFriend = async (userId: string, friendId: string) => {
    const user = await User.findById(userId);
    if (user && !user.friends.includes(friendId as unknown as ObjectId)) {
        user.friends.push(friendId as unknown as ObjectId);
        await user.save();
    }
};

export const removeFriend = async (userId: string, friendId: string) => {
    const user = await User.findById(userId);
    if (user) {
        user.friends = user.friends.filter((friend: ObjectId) => friend.toString() !== friendId);
        await user.save();
    }
};

export const reactToThought = async (thoughtId: string, reactionContent: string, authorId: string) => {
    const thought = await Thought.findById(thoughtId);
    if (thought) {
        const Reaction = Thought.schema.path('reactions').cast as any;
        const reaction = new Reaction({
            content: reactionContent,
            author: authorId as unknown as ObjectId
        });
        thought.reactions.push(reaction);
        await thought.save();
    }
};
