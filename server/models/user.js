import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import sequelize from '../db';

sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
    validate: {
      isEmail: {
        msg: 'email not valid'
      },
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { len: { args: [8, 16], msg: 'password must be between 8 to 16 charaters' } }
  },
  address: Sequelize.STRING,
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [4, 10],
        msg: 'must be minimum of 4 chars'
      }
    }
  }
})



// eslint-disable-next-line func-names
// UserSchema.pre('save', function save(next) {
//   const user = this;
//   if (!user.isModified('password')) next();
//   bcrypt.hash(user.password, 10, (err, res) => {
//     user.password = res;
//     next();
//   });
// });

// UserSchema.methods.comparePassword = async function comparePassword(password) {
//   try {
//     const bool = await bcrypt.compare(password, this.password);
//     console.log(bool);
//     return bool;
//   } catch (err) {
//     throw new Error(err);
//   }
// };

export default sequelize.models.user
