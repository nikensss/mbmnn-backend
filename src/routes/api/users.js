import { Router } from 'express';
import { auth } from '../../auth/passport';
import User from '../../models/User';
import token from '../../auth/token';

const router = new Router();

router.post('/register', auth, (req, res, next) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user
    .validate()
    .then(() => user.save())
    .then(user => {
      const payload = { id: user._id };
      return res.send(token.sign(payload));
    })
    .catch(err => res.status(409).send({ err: err.toString() }));
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).send({ err: 'Missing data' });
  User.findOne({ username: username }, (err, user) => {
    if (err) return res.status(400).send(err);
    if (!user) return res.status(400).send({ err: 'User not found' });
    user
      .checkPassword(password)
      .then(same => {
        if (!same) return res.status(401).send({ err: 'invalid credentials' });
        console.log(`User ${username} logged in successfully!`);
        const payload = { id: user._id };
        return res.send({ username: username, token: token.sign(payload) });
      })
      .catch(err => res.status(400).send({ err }));
  });
});

export default router;
