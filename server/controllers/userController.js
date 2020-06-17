const { User } = require('../models');
const checkPass = require('../helpers/checkPass');
const jwtSign = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class Controller {
  static register(req, res, next) {
    const newUser = req.body;
    User.create({
      email: newUser.email,
      password: newUser.password,
    })
      .then((data) => {
        res.status(201).json({ message: 'Berhasil menambahkan user baru', data });
      })
      .catch((err) => {
        next(err);
      });
  }

  static login(req, res, next) {
    const theUser = req.body;
    User.findOne({
      where: {
        email: theUser.email,
      },
    })
      .then((response) => {
        if (response) {
          const check = checkPass(theUser.password, response.password);
          if (check) {
            const token = jwtSign(response.id, response.email, process.env.JWT_SECRET);
            res.status(200).json({ message: 'Berhasil login', token: token, data: response });
          } else {
          }
        } else {
          throw new Error('Data not found');
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static google(req, res, next) {
    const token = req.body.token;
    const newData = {};
    client
      .verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .then((data) => {
        const payload = data.getPayload();
        newData.email = payload.email;
        newData.password = 'pass123';
        return User.findOne({
          where: {
            email: payload.email,
          },
        });
      })
      .then((userData) => {
        if (!userData) {
          User.create(newData).then((responseResgistered) => {
            res.status(201).json({ message: 'Berhasil terdaftar', data: responseResgistered });
          });
        } else {
          const check = checkPass(newData.password, userData.password);
          if (check) {
            const token = jwtSign(userData.id, userData.email, process.env.JWT_SECRET);
            res.status(200).json({ message: 'Anda berhasil login', token });
          } else {
            throw new Error('wrong password');
          }
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = Controller;
