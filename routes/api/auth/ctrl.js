'use strict';
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const {id, pw} = req.body;
  const secret = req.app.get('jwt-secret');

  if(id !== 'admin' || pw !== 'WItDa874e7y53IC1YwN6/L+wicI=') {
    return res.status(403).json({
      message: (id !== 'admin') ? '아이디 확인 바람!' : '비번 확인 바람!'
    });
  }
  res.json({
    token: jwt.sign({id}, secret, {
      expiresIn: '7d',
      issuer: 'yanggs',
      subject: 'userInfo'
    })
  });
};

exports.check = (req, res) => {
  // read the token from header or url
  const token = req.headers['x-access-token'];

  // token does not exist
  if(!token) {
    return res.status(401).json({
      success: false
    })
  }

  jwt.verify(token, req.app.get('jwt-secret'), (err) => {
    if(err) {
      return res.status(401).json({
        success: false
      })
    }
    res.json({
      success: true
    })
  });
};