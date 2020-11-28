import './loadEnv';
import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/api/index';
import cors from 'cors';

const app = express();

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  })
);
//use this middleware to allow all applications to query this api
app.use(cors());

app.get('/', (req, res) =>
  res.send(
    `MBMNN API😎 ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
  )
);

app.use('/api', apiRoutes);

app.listen(process.env.PORT || 3333, () =>
  console.log(
    `MBMNN API up and running on port ${process.env.PORT} (env: ${process.env.ENV})`
  )
);
