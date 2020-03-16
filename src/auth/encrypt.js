import bcrypt from 'bcrypt';

const canHash = salt => ({
  hash: s => bcrypt.hash(s, salt)
});

const canCompare = () => ({
  compare: (a, b) => bcrypt.compare(a, b)
});

export default Object.assign({}, canHash(10), canCompare());
