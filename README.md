# node-boilerplate

Boilerplate Code For Node.js Applications :rocket:

It is a basic task manager application which is mostly a general required structure for node.js applications.

The code contains jwt authentication, User and Task mongodb schema and related instance and model methods coded effectively along
with SendGrid Mail setup.

Avatar upload facility is present using `multer` and a buffer has been stored currently which can easily
be integrated with AWS, GCP, etc. Avatar image can be optimised based on needs.

## Structure

```
├───bits
│       async-await.md
│       coremodules.md
│       encryptvshash.md
│       heroku.md
│       mocking.md
│       restapi.md
│       sorting-pagination.md
│       why-test.md
│
├───config
│       dev.env
│       test.env
│
├───src
│   │   app.js
│   │   index.js
│   │
│   ├───db
│   │       mongoose.js
│   │
│   ├───emails
│   │       account.js
│   │
│   ├───middleware
│   │       auth.js
│   │
│   ├───models
│   │       task.js
│   │       user.js
│   │
│   └───routers
│           task.js
│           user.js
│
└───test
    │   task.test.js
    │   user.test.js
    │
    ├───fixtures
    │       cris.jpg
    │       db.js
    │
    └───__mocks__
        └───@sendgrid
                mail.js
```

## bits
Contains useful short notes for commands or a concept which one would like to revisit.

## config
It contains two config files `dev.env` and `test.env` for production code and test environment respectively.

## src
`app.js` and `index.js` are created separately to stay in sync with test environment which does not requires setting up a listner for working.

## test
Contains all the test files, one important point to note is the directory structure inside `__mocks__`, here the structure should resemble
the npm module's name.

for ex: `const sgMail = require('@sendgrid/mail.js')` our strucute should be: `__mocks__/@sendgrid/mail.js`

## config
You're required to create you'r own config folder with two files: `test.env` and `dev.env`. Both have 4 environment variables:
- PORT
- SENDGRID_API_KEY
- JWT_SECRET
- MONGODB_URL

## cloning and starting application

- Clone: 

  ```bash
  git clone https://github.com/geekysam7/node-boilerplate.git
  cd node-boilerplate
  ```
- install packages and dev-dependencies: 

  ```
  npm install
  ```
- create `config` folder with two files `test.env` and `dev.env` and add the key-value pairs.
- start development server
  
  ```
  npm run start
  ```
  
