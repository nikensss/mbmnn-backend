import jwt from 'jsonwebtoken';
import { secret } from './passport';

const canSign = secret => ({
  sign: data => jwt.sign(data, secret)
});

export default Object.assign({}, canSign(secret));
