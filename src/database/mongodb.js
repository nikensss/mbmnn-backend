import mongoose from 'mongoose';

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.0qo8b.mongodb.net/mbmnn?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then((data) => {
    console.log('Connection to DB successful!');
  })
  .catch((err) => {
    console.log('Error during connection setup!' + err);
  });

//to avoid warning: '(node:46347) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.'
mongoose.set('useCreateIndex', true);

export default mongoose;
