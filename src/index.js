import './loadEnv';
import express from 'express';
import parser from 'body-parser';
import apiRoutes from './routes/api/index';

const app = express();

app.use(
  parser.urlencoded({
    extended: true
  })
);

//use this middleware to allow all applications to query this api
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) =>
  res.send(`MBMNN API😎 ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
);

app.use('/api', apiRoutes);

app.listen(process.env.PORT || 3000, () =>
  console.log('MBMNN API up and running on port ' + process.env.PORT)
);