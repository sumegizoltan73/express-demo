const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: 'cource1'},
  { id: 2, name: 'cource2'},
  { id: 3, name: 'cource3'}
];

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('favicon.*', (req, res) => {
  res.sendFile('./favicon....');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

// /api/courses/1
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found.');
  res.send(course);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);  // 400 Bad Request 

  const course= {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found.');
  
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);  // 400 Bad Request 

  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found.');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(body){
  const schema = {
    name: Joi.string().min(3).required()
  };
  
  return Joi.validate(body, schema);
}

app.get('/api/post/:year/:month', (req, res) => {
  res.send(req.param);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
