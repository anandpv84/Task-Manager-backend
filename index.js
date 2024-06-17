const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Task = require('./models/task');

require ('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });


  app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
  });

  app.post('/api/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
  });

  app.get('/api/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
  });

  app.put('/api/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  });

  app.delete('/api/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  });

  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });