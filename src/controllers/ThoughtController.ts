import { Request, Response } from 'express';
import { Thought, IReaction } from '../models/models';

class ThoughtController {
    static async createThought(req: Request, res: Response) {
        try {
            const { content, author } = req.body;
            const thought = new Thought({ content, author });
            await thought.save();
            res.status(201).json(thought);
        } catch (error) {
            res.status(400).json({ error: (error as any).message });
        }
    }

    static async getThought(req: Request, res: Response) {
        try {
            const thought = await Thought.findById(req.params.id).populate('author');
            if (!thought) {
                return res.status(404).json({ error: 'Thought not found' });
            }
            res.json(thought);
        } catch (error) {
            res.status(400).json({ error: (error as any).message });
        }
    }

    static async updateThought(req: Request, res: Response) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!thought) {
                return res.status(404).json({ error: 'Thought not found' });
            }
            res.json(thought);
        } catch (error) {
            res.status(400).json({ error: (error as any).message });
        }
    }

    static async deleteThought(req: Request, res: Response) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.id);
            if (!thought) {
                return res.status(404).json({ error: 'Thought not found' });
            }
            res.status(204).json();
        } catch (error) {
            res.status(400).json({ error: (error as any).message });
        }
    }

    static async addReaction(req: Request, res: Response) {
        try {
            const thought = await Thought.findById(req.params.id);
            if (!thought) {
                return res.status(404).json({ error: 'Thought not found' });
            }

            const { reaction, authorId } = req.body;
            const newReaction: IReaction = {
                content: reaction,
                author: authorId,
                createdAt: new Date()
            } as IReaction;

            thought.reactions.push(newReaction);
            await thought.save();

            const updatedThought = await Thought.findById(req.params.id).populate('author reactions.author');
            res.status(201).json(updatedThought);
        } catch (error) {
            res.status(400).json({ error: (error as any).message });
        }
    }
}

export default ThoughtController;
