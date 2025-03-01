import { Router } from 'express';
import { UserModel } from './user.model';

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password, first_name, last_name } = req.body;

    if (!username || !email || !password || !first_name || !last_name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await UserModel.create({
      username,
      email,
      password,
      first_name,
      last_name,
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

export const userRoutes: Router = router;
