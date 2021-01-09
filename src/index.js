const app = require('./app');

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})


// app.use((req, res, next) => {

//   if(req.method === "GET") {
//     res.send('Get request disabled');
//   } else {
//     next();
//   }
// })

// app.use((req, res, next) => {
//   res.status(503).send('Site under maintainence');
// })


/*
****************************************************************************************

                  without middleware: new req => run route handler
                  with middleware: new req => do something => run route handler

****************************************************************************************
*/


// Bcrypt Working...
// const bcrypt = require('bcrypt');

// const myFunction = async () => {
//   const password = 'Sameer@123';
//   const hashedPassword = await bcrypt.hash(password, 8);

//   console.log(password);
//   console.log(hashedPassword);

//   const isMatch = await bcrypt.compare('sameer@123', hashedPassword);
//   console.log(isMatch);
// }

// JWT Working...
// const jwt = require('jsonwebtoken');
// const myFunction = async () => {
//   const token = jwt.sign({ _id: 'abc123' }, 'secret', { expiresIn: '7 days'});
//   console.log(token);

//   const data = jwt.verify(token, 'secret');
//   console.log(data);
// }

// myFunction();

// Populate Working...
// const Task = require('./models/task');
// const User = require('./models/user');

// // const myFunction = async () => {
// //   // const task = await Task.findById("5f6c2d45d151a37538ee8685");
// //   // await task.populate('owner').execPopulate();
// //   // console.log("Owner", task.owner);

// //   const user = await User.findById('5f6c2c797d5ed67784922cbb');
// //   await user.populate('tasks').execPopulate();
// //   console.log(user.tasks);

// // }

// // myFunction();

// Multer Working...
// file: file being uploaded, cb: callback

// const multer = require('multer');
// const upload = multer({
//   dest: 'images',
//   limits: {
//     fileSize: 1000000 //1Mb
//   },
//   fileFilter(req, file, cb) {
//     if(!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error('Please Upload a word document!'));
//     }

//     cb(undefined, true);
//     // cb(new Error('File must be a pdf'))
//     // cb(undefined, false);
//     // cb(undefined, true);
//   }
// })

// const errorMiddleware = (req, res, next) => {
//   throw new Error('From my middleware');
// }

// app.post('/upload', upload.single('upload'), (req, res) => {
//   res.send();
// }, (error, req, res, next) => {
//   res.status(400).send({
//     error: error.message
//   });
// })
