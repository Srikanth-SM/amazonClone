import mongooseConnection from './db';
import server from './routes';
import logger from './logger';
import User from './models/user';

const newUser = new User({
  email: 'srisiro26.pec@gmail.com',
  password: 'srikanth123',
  address: 'Hyderabad',
  name: 'srikanth',
});
mongooseConnection(process.env.dev_db)
  .then(() => {
    logger.info('connected to database ');
    return User.findOne({ email: 'srisiro26.pec@gmail.com' });
  })
  .then((user) => {
    if (!user) {
      return newUser.save();
    }
    return user;
  })
  .then((user) => {
    server.listen(8080);
  })
  .catch((err) => {
    logger.info('db not connected', err);
  });

export default logger;
// console.log(server);
