import './loadEnv';
import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/api/index';

const app = express();

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  })
);
//use this middleware to allow all applications to query this api
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) =>
  res.send(
    `MBMNN API😎 ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
  )
);

app.use('/api', apiRoutes);

app.listen(process.env.PORT || 3000, () =>
  console.log(`MBMNN API up and running on port ${process.env.PORT}`)
);
