const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

const server = require('../server');

describe('authentication and authorization', () => {
  const payload = {
    username: 'testUser',
    password: 'testPassword'
  };
  let jwt;

  it('should create a user', async () => {
    const res = await chai.request(server.listener).post('/authenticate/register').send(payload);
    //expect(res.body.nModified).to.equal(1); TODO: uncomment when delete user is implemented
  });

  it('should sign in', async () => {
    const res = await chai.request(server.listener).post('/authenticate').send(payload);
    expect(res.headers.authorization);
    jwt = res.headers.authorization;
  });

  it('should confirm signed in', async () => {
    const res = await chai.request(server.listener).get('/authenticate').set('authorization', jwt);
    jwt = res.headers.authorization;
  });

  it('should reject reused tokens', async () => {
    const res = await chai.request(server.listener).get('/authenticate').set('authorization', jwt);
    try {
      await chai.request(server.listener).get('/authenticate').set('authorization', jwt);
      throw new Error("should have rejected reused token");
    } catch (err) {
      expect(err.status).to.equal(401);
      jwt = res.headers.authorization;
    }
  });

  it('should reject requests with no tokens', async () => {
    try {
      await chai.request(server.listener).get('/authenticate');
    } catch (err) {
      expect(err.status).to.equal(401);
    }
  });
});
