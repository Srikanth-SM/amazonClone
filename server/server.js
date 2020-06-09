// import mongooseConnection from './db';
import sequelize from './db'
import server from './routes';
import logger from './logger';
import User from './models/user';
import Category from './models/category'
import Product from './models/products';

sequelize.sync()
  .then(res => {
    console.log("DB connected successfully");
    const User = sequelize.models.user;
    return User.findOne({ where: { email: 'srikanth@gmail.com' } })
  })
  .then((user) => {
    if (!user) {
      return User.create({ email: 'srikanth@gmail.com', name: 'srikanth', address: 'Hyderabad', password: 'srikanth123' })
    }
    return user
  })
  .then(() => {
    logger.info('listening on 8080');
    server.listen(8080);
  })
  .catch(err => {
    logger.info(err);
    sequelize.close();
  })
export default logger;

