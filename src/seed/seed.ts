import mongoose from 'mongoose';
import { User, Thought, IReaction } from '../models/models';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialNetwork', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const seedDatabase = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Thought.deleteMany({});

        // Create sample users
        const users = await User.insertMany([
            { username: 'john_doe', email: 'john@example.com', friends: [] },
            { username: 'jane_doe', email: 'jane@example.com', friends: [] },
            { username: 'alice', email: 'alice@example.com', friends: [] },
            { username: 'bob', email: 'bob@example.com', friends: [] },
        ]);

        // Create sample thoughts
        const thoughts = await Thought.insertMany([
            { content: 'This is a thought by John', author: users[0]._id, reactions: [] },
            { content: 'This is a thought by Jane', author: users[1]._id, reactions: [] },
            { content: 'This is a thought by Alice', author: users[2]._id, reactions: [] },
            { content: 'This is a thought by Bob', author: users[3]._id, reactions: [] },
        ]);

        // Add friends
        const userUpdates = [
            { user: users[0], friends: [users[1]._id, users[2]._id] },
            { user: users[1], friends: [users[0]._id, users[3]._id] },
            { user: users[2], friends: [users[0]._id, users[3]._id] },
            { user: users[3], friends: [users[1]._id, users[2]._id] },
        ];

        await Promise.all(userUpdates.map(({ user, friends }) => {
            user.friends.push(...friends);
            return user.save();
        }));

        // Add reactions to thoughts
        const thoughtReactions = [
            { thought: thoughts[0], reaction: { content: 'Great thought!', author: users[1]._id } },
            { thought: thoughts[1], reaction: { content: 'Interesting idea!', author: users[0]._id } },
            { thought: thoughts[2], reaction: { content: 'Nice thought!', author: users[3]._id } },
            { thought: thoughts[3], reaction: { content: 'Well said!', author: users[2]._id } },
        ];

        await Promise.all(thoughtReactions.map(({ thought, reaction }) => {
            thought.reactions.push(reaction as IReaction);
            return thought.save();
        }));

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase().catch((error) => {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
});