const express = require('express');
const app = express();
const path = require('path');
const fetch = require('isomorphic-fetch');
const PORT = 3000;


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const hardcodedUsername = 'user@1';
// const hardcodedPassword = 'test@123';

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  fetch('http://localhost:3500/credentials')
    .then(response => response.json())
    .then(credentials => {
      const validCredentials = credentials.find(
        creds => creds.username == username && creds.password == password
      );

      if (validCredentials) {
        res.json({ authorized: true });
      } else {
        res.json({ authorized: false });
      }
    })
    .catch(error => {
      console.error('Error fetching credentials:', error);
      res.json({ authorized: false });
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});