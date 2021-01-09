## Testing

### WHY TEST?

- Saves Time, rerun the same test over years
- Creates Reliable Software
- Gives flexibility to devs
  - Refactoring
  - Collaborating
  - Profiling
- Peace of mind

## Testing Express App

Install Jest and Supertest.

```
npm i jest --save-dev
npm i supertest --save-dev
```

Important Functions

```js
// Jest makes functions globally available
const request = require('supertest');

//Jest Lifecycle Methods
//They run on every again everytime test is run

//pass a function to set the test data base config stuff
//like clear the database before again storing data so to avoid repetition of id's
beforeEach(populateDatabase); //populateDatabase is a callback function

afterEach(() => {
  console.log('Done!');
})
```

## More test ideas

```

User Test Ideas

Should not signup user with invalid name/email/password
Should not update user if unauthenticated
Should not update user with invalid name/email/password
Should not delete user if unauthenticated


Task Test Ideas

Should not create task with invalid description/completed
Should not update task with invalid description/completed
Should delete user task
Should not delete task if unauthenticated
Should not update other users task
Should fetch user task by id
Should not fetch user task by id if unauthenticated
Should not fetch other users task by id
Should fetch only completed tasks
Should fetch only incomplete tasks
Should sort tasks by description/completed/createdAt/updatedAt
Should fetch page of tasks
```
