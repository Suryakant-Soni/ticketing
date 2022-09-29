import express from 'express';

//local files
import { currentUser } from '@sktickets1/common';
// import { requireAuth } from '../middlewares/require-auth';
const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
