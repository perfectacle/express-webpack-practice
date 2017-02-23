const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/users', (req, res) => {
  fs.readFile(__dirname + '/../../../data/users.json', 'utf8', (err, data) => {
    res.end(data);
  });
});

router.get('/login/:id/:pw', (req, res) => {
  fs.readFile(__dirname + '/../../../data/users.json', 'utf8', (err, data) => {
    const users = JSON.parse(data);
    const id = req.params.id;
    const pw = req.params.pw;
    const result = {};
    if(!users[id]) {
      result.success = 0;
      result.error = 'not found';
      res.json(result);
      return;
    }
    if(users[id].pw !== pw) {
      result.success = 0;
      result.error = 'incorrect';
      res.json(result);
      return;
    }
    result.success = 1;
    result.error = 'correct';
    res.json(result);
  });
});

module.exports = router;


