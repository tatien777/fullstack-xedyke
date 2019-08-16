const express = require("express");
const moongose = require("mongoose");
const router = express.Router();
// host: localhost:5000/xedike/  || xedike.heroku.com/
// route: GET {host}/api/users/
const jwt = require("jsonwebtoken");

const { User } = require("../../../Models/User");
const bcrypt = require("bcryptjs");

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.json({ err: "error connect api" }));
};

// desc : create new  user
// method: post
// access: PUBLIC
module.exports.createUser = (req, res, next) => {
  // validation
  // data = req.body
  const { email, password, DOB, userType, phone,avarta } = req.body;
  const newUser = new User({
    email,
    password,
    DOB,
    userType,
    phone,
    avarta
  });
  // hash password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.json(err);
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return res.json(err);
      newUser.password = hash;
      newUser
        .save()
        .then(user => {
          res.status(200).json(user);
        })
        .catch(err => res.json(err));
    });
  });
};
module.exports.getUsersById = (req, res, next) => {
  const { id } = req.params;
  if (!moongose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "id invalid" });
  User.findById(id)
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "USer not found" });
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(err.status.json({ message: err.message }));
    });
};
// module  update
module.exports.updateUserById = (req, res, next) => {
  const { id } = req.params;
  // console.log(id,'update id')
  User.findById(id)
    .then(user => {
      if (!user) return Promise.reject({ status: 404, message: "User not found" })

      // const { email, password, DOB, userType, phone } = req.body;
      // user.email = email;
      // user.password = password;
      // user.DOB = DOB;
      // user.userType = userType;
      // user.phone = phone;
      Object.keys(req.body) // {email, password, DOB, userType, phone }
      .forEach(field => {
        user[field] = req.body[field]
      })
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.json(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) return res.json(err);
          user.password = hash;
          user
            .save()
            .then(user => {
              res.status(200).json(user);
            })
            .catch(err => res.json(err));
        });
      });

      // console.log('email',user.email)

    })
    .catch(err => {
      if (!err.status) return res.json(err)
      res.status(err.status).json(err.message)
    })
}
// module deleteUserByid
module.exports.deleteUserById = (req, res, next) => {
  const { id } = req.params;
  User.deleteOne({ _id: id })
    .then(result => result.status(200).json(result))
    .catch(err => res.json(err));
};

// login module
module.exports.login = (req, res, next) => {
    const { email, password } = req.body;
    // console.log(email,'email')
    User.findOne({ email })
      .then(user => {
          // console.log(user,'user')
        if (!user)
          return Promise.reject({ status: 404, message: "User Not found" });
          bcrypt.compare(password, user.password, (err, isMath) => {
            // console.log(err)
            // console.log(isMath,'is Math')
          if (!isMath) return  res.status(400).json({ message: "Wrong password" });
          const payload = {
            email: user.email,
            userType: user.userType
          };
          jwt.sign(payload, "XEDIKE", { expiresIn: 3600 }, (err, token) => {
            if (err) res.json(err);
            res.status(200).json({
              success: true,
              token
            });
          });
        });
      })
      .catch(err => {
        if (err.status) return res.json(err);
        res.status(err.status);
      });
  };

  // upload avarta
module.exports.uploadAvarta = (req,res,next) => {
  const {id} = req.params;
  User.findById(id)
    .then(user => {
      console.log(user.avarta,'check')
      if(!user) return Promise.reject({status: 404, message: 'Not found'})
      user.avarta = req.file.path
      return user.save()
    })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      if(!err.status) return res.json(err)
      res.status(200).json({message: err.message})
    })
} 

// export default router
