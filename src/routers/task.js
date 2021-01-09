const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');

//array of data.
//By setting query string, we can customize which task data we get back.
//GET /tasks?completed=true
//GET /tasks?limit=10&skip=0
//GET /tasks?sortBy=createdAt_asc
//asc = 1, dsc = -1
router.get('/tasks', auth, async (req, res) => {

  const match = {};
  const sort = {};

  //we get a string, not boolean
  if(req.query.completed) {
    //setting match.completed to a boolean.
    match.completed = req.query.completed  === 'true';
  }

  if(req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1: 1;
  }
  
  try {
    // const tasks = await Task.find({});
    //finding for current user only.
    // await req.user.populate('tasks').execPopulate();
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate();
    res.send(req.user.tasks);
  } catch(err) {
    res.status(500).send(err);
  }
  
  // Task.find({})
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(404).send(err);
  //   }) 
})

router.get('/tasks/:id', auth, async (req, res) => {
    
  const _id = req.params.id;

  try {
    // const task = await Task.findById(req.params.id);
    //filter and check if owner id is same and not tempered.
    const task = await Task.findOne({ _id, owner: req.user._id});

    if(!task) {
      return res.status(404).send();
    } 
    res.send(task); 
  }catch(err) {
    res.status(500).send(err);
  }

  // Task
  //   .findById(req.params.id)
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(404).send(err);
  //   })

})



router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try {
    await task.save();
    res.status(201).send(task);
  } catch(err) {
    res.status(400).send(err);
  }

  // task.save()
  //   .then(() => {
  //     console.log(task);
  //     res.status(201).send(task);
  //   })
  //   .catch((err) => {
  //     res.status(400).send(err);
  //   })
})

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
  if(!isValidUpdate) {
    return res.status(400).send({
      error: 'xoxo'
    })
  }

  console.log(req.params.id);

  try {
    //findByIdAndUpdate bypasses the middleware, so in order to apply
    //middleware we have to apply in different way.
    // const task = await Task.findByIdAndUpdate(
    //   req.params.id,
    //   req.body,
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // )

    // const task = await Task.findById(req.params.id);
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

    if(!task) {
      return res.status(404).send();
    }

    updates.forEach(update => {
      task[update] = req.body[update];
    })

    await task.save();

    res.send(task);
  } catch(err) {
      res.status(404).send(err);
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  console.log(req.params.id);
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if(!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch(err) {
    res.status(500).send(err);
  }
})

module.exports = router;