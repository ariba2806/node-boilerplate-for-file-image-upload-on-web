const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const multer = require('multer');

const auth = require('../middleware/auth');
const User = require('../models/user');

// SendGrid
// const { sendWelcomeEmail, sendGoodByeEmail } = require('../emails/account');

const upload = multer({
  // dest: avatar,
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please Uplad an Image of type: jpg, jpeg, png'));
    }
    cb(undefined, true);
  }
})

//login
router.post('/users/login', async (req, res) => {
  try {

    //method for instance of User.
    const user = await User.findByCredentials(req.body.email, req.body.password);

    //create jwt token
    const token = await user.generateAuthToken();
    res.send({user, token});
  } catch(err) {
      res.status(400).send();
  }
})

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    //save to DB.
    await user.save();
    
    //welcome Email
    // sendWelcomeEmail(user.email, user.name);

    //creating jwt token
    const token = await user.generateAuthToken();

    res.status(201).send({user, token});
  } catch(err) {
    res.status(400).send(err);
  }

  // user.save()
  //   .then(() => {
  //     console.log(user);
  //     res.status(201).send(user);
  //   })
  //   .catch((err) => {
  //     res.status(400).send(err);
  //   })
})

router.post('/users/me/avatar', auth,  upload.single('avatar'), async (req, res) => {
  //req.file.buffer can only be accessed when no dest option provided
  //in upload.

  //all images converted to png, resized to our specs.
  const buffer = await sharp(req.file.buffer).png().resize({ width: 450, height: 450 }).toBuffer()
  req.user.avatar = buffer;
  await req.user.save();
  res.send({result: "Upload Successfull"});
}, (error, req, res, next) => {
    res.status(400).send({
    error: error.message
  })
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save();
    res.send();
  } catch(err) {
      res.status(500).send();
  }
})

//logout of all sessions, like on netflix.

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch(err) {
    res.status(500).send();
  }
})


router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
})

router.patch('/users/me', auth, async (req, res) => {

  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  })

  if(!isValidOperation) {
    return res.status(400).send({
      error: 'Invalid Updates'
    })
  }

  try {

    updates.forEach(update => {
      //dynamic update
      req.user[update] = req.body[update];
    })

    await req.user.save();

    //Bypasses middleware
    // const user = await User.findByIdAndUpdate(
    //   req.params.id,
    //   req.body,
    //   {
    //     new: true,
    //     runValidators: true
    //   }
    // );

    res.send(req.user);

  } catch(err) {
    res.status(404).send(err);
  }
})


router.delete('/users/me', auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);
    // if(!user) {
    //   return res.status(404).send();
    // }

    await req.user.remove();

    // Goodbye mail
    // sendGoodByeEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch(err) {
    res.status(500).send(err);
  }
})

router.delete('/users/me/avatar', auth, async (req, res) => {
  try{
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch(err) {
    res.status(500).send(err);
  }
})

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if(!user || !user.avatar) {
      throw new Error();
    }

    //setting res header
    res.set('Content-Type', 'image/png');
    res.send(user.avatar);

  } catch(err) {
    res.status(404).send();
  }
})

module.exports = router;