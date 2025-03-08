import { Router } from 'express';
import UserController from '../controllers/UserController';
import ThoughtController from '../controllers/ThoughtController';
import { addFriend, removeFriend } from '../services/services';

const router = Router();

export const setRoutes = () => {
    // User routes
    router.route('/users')
        .post(UserController.createUser)
        .get(UserController.getAllUsers);

    router.route('/users/:id')
        .get(UserController.getUser)
        .put(UserController.updateUser)
        .delete(UserController.deleteUser);

    // Thought routes
    router.route('/thoughts')
        .post(ThoughtController.createThought);

    router.route('/thoughts/:id')
        .get(ThoughtController.getThought)
        .put(ThoughtController.updateThought)
        .delete(ThoughtController.deleteThought);

    // Friend routes
    router.route('/users/:id/friends/:friendId')
        .post(async (req, res) => {
            try {
                await addFriend(req.params.id, req.params.friendId);
                res.status(200).json({ message: 'Friend added' });
            } catch (error) {
                res.status(400).json({ error: (error as any).message });
            }
        })
        .delete(async (req, res) => {
            try {
                await removeFriend(req.params.id, req.params.friendId);
                res.status(200).json({ message: 'Friend removed' });
            } catch (error) {
                res.status(400).json({ error: (error as any).message });
            }
        });

    // Reaction routes
    router.put('/thoughts/:id/reactions', ThoughtController.addReaction);

    return router;
};