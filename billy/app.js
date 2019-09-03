/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
const express = require('express');
// const bodeParser = require('body-parser');

const app = express();

app.use(express.json());
const users = [
  {
    id: 1,
    firstName: 'Alican',
    lastName: 'Odong',
    password: 12345,
  },
  {

    id: 2,
    firstName: 'Jackson',
    lastName: 'Ssenyonjjo',
    password: 12345,
  },
  {

    id: 3,
    firstName: 'Markus',
    lastName: 'Peter',
    password: 54321,
  },
  {

    id: 4,
    firstName: 'Markusy',
    lastName: 'Raskol',
    password: 54321,
  },
];
const mentorshipSessions = [
  {

    id: 1,
    title: 'JavaScript',
    day: 'Monday',
    sessionStatus: 'Pending',
  },
];
const mentors = [
  {
    id: 1,
    name: 'Alican',
    expertize: 'JavaScript',
    userType: 'mentor',
  },
  {
    id: 2,
    name: 'Walter',
    expertize: 'Java',
    userType: 'mentor',
  },
  {
    id: 3,
    name: 'Julius',
    expertize: 'C#',
    userType: 'user',
  },
];


// user sign up
app.post('/api/users', (req, res) => {
  if (req.body.password.length < 5
  || req.body.lastName.length < 3
  || req.body.firstName < 3
  || !req.body.password
  || !req.body.firstName
  || !req.body.lastName) {
    return res.status(404).send('Bad Request');
  }

  const user = {
    id: users.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,

  };

  users.push(user);
  res.send(users);
});

// user can login
app.post('/api/auth/login', (req, res) => {
  const { firstName, password } = req.body;
  if (firstName && password) {
    const result = users.find((user) => user.firstName == firstName && user.password == password);
    if (!result) return res.status(404).send('Password or username is incorrect');
    res.send(result);
  } else {
    res.status(400).send('Please Enter user name or Password');
  }
});

// view mentors
app.get('/api/mentors', (req, res) => {
  res.send(mentors);
});

// view Specific mentor
app.get('/api/mentors/:id', (req, res) => {
  // eslint-disable-next-line radix
  const mentor = mentors.find((ment) => ment.id === parseInt(req.params.id));

  if (!mentor) return res.status(404).send('The mentor with that specified ID is not available');
  res.send(mentor);
});

// Admin creating Mentor
app.post('/api/mentors', (req, res) => {
  if (!req.body.name || !req.body.expertize
    || req.body.name.length < 3
    || req.body.expertize.length < 3) {
    return res.status(400).send('Bad Request');
  }
  const mentor = {
    id: mentors.length + 1,
    name: req.body.name,
    expertize: req.body.expertize,
  };

  mentors.push(mentor);

  res.send(mentors);
});

// creating mentorship session
app.post('/api/mentorshipsessions', (req, res) => {
  if (!req.body.title || req.body.title.length < 3
    || !req.body.day || req.body.day.length < 3) {
    return res.status(400).send('Bad Request');
  }
  const mentorshipSession = {
    id: mentorshipSessions.length + 1,
    title: req.body.title,
    day: req.body.day,
    sessionStatus: req.body.sessionStatus,
  };

  mentorshipSessions.push(mentorshipSession);

  res.send(mentorshipSessions);
});

// changing user to mentor
app.put('/api/mentors/:id', (req, res) => {
  // eslint-disable-next-line radix
  const mentor = users.find((ment) => ment.id === parseInt(req.params.id));

  if (!mentor) return res.status(404).send('The mentor with that specified ID is not available');

  if (!req.body.name || !req.body.expertize
    || req.body.name.length < 3 || req.body.expertize.length < 3) {
    return res.status(400).send('Bad Request');
  }

  mentor.name = req.body.name;
  mentor.expertize = req.body.expertize;
  mentor.userType = req.body.userType;

  res.send(mentors);
});

app.put('/api/mentorshipsessions/:id', (req, res) => {
  // eslint-disable-next-line radix
  const mentorshipSession = mentorshipSessions.find((sess) => sess.id === parseInt(req.params.id));

  if (!mentorshipSessions) return res.status(404).send('The session with that ID is not available');

  mentorshipSession.sessionStatus = req.body.sessionStatus;

  res.send(mentorshipSessions);
});

app.delete('/api/mentors/:id', (req, res) => {
  // eslint-disable-next-line radix
  const mentor = mentors.find((ment) => ment.id === parseInt(req.params.id));

  if (!mentor) return res.status(404).send('The mentor with that specified ID is not available');

  const index = mentors.indexOf(mentor);
  mentors.splice(index, 1);

  res.send(mentors);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
