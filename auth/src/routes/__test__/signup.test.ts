import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test112@test.com',
      password: 'password',
    })
    .expect(201);
});

it('returns a 400 with an invalid email/password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1atest.com',
      password: 'password',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1atest.com',
      password: 'a',
    })
    .expect(400);
});

it('cookie should be set in header after successful signup call', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1@atest.com',
      password: 'asddks',
    })
    .expect(201);
  expect(response.get('Set-Cookie')).toBeDefined();
});
