// for testing we don't need to listen, so we removed it from app.js
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, populateDatabase } = require('./fixtures/db');

// Jest lifecycle methods
beforeEach(populateDatabase);

// afterEach(() => {
//   console.log('After Each');
// })

// tests

test('Should sign up new user', async () => {
  const response = await request(app).post('/users').send({
    name: 'Sam',
    email: 'sam1@gmail.com',
    password: 'Hello@!!'
  }).expect(201)

  // Assert that the DB was changed correctly
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull();

  // Assertions about the response
  // can have extra ones, but should have atleast these
  expect(response.body).toMatchObject({
    user: {
      name: 'Sam',
      email: 'sam1@gmail.com'
    },
    token: user.tokens[0].token
  })

  expect(user.password).not.toBe('Hello@!!');

})


test('Should log in existing user', async () => {
  const response = await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)

  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
})

test('Should not log in non existing user', async () => {
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: "HanyekrloPehle1"
  }).expect(400);
})

test('Should get profile for user', async () => {
  await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
  await request(app)
      .get('/users/me')
      .send()
      .expect(401)
})

test('Should delete account for user', async () => {
  await request(app)
      .delete('/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200)
  
  // Validating if user deleted
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
})

test('Should not delete account for unauthenticated user', async () => {
  await request(app)
      .delete('/users/me')
      .send()
      .expect(401)
})

// Sending File Using supertest

test('Should upload avatar image', async () => {
  await request(app)
      .post('/users/me/avatar')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .attach('avatar', 'test/fixtures/cris.jpg')
      .expect(200)
  
  const user = await User.findById(userOneId);
  //toEqual uses algo to look at properties of object.
  //toBe is ===
  expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
  await request(app)
      .patch('/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        name: 'Son Gohan'
      })
      .expect(200)
  const user = await User.findById(userOneId);
  expect(user.name).toBe('Son Gohan');
})

test('Should not update invalid user fields', async () => {
  await request(app)
      .patch('/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        hello: 'xdxd'
      })
      .expect(400)
})