import express from 'express';
import { buySolana } from './controllers.mjs';

const router = express.Router();

router.post('/buy-solana', async (req, res, next) => {
  try {
    await buySolana(req, res);
  } catch (error) {
    next(error); // Forward errors to the global error handler
  }
});

export default router;