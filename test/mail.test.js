const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

const server = require('../server');

describe('managing the mail system', () => {
  const authPayload = {
    username: 'testUser',
    password: 'testPassword'
  };
  const domainPayload = {
    domain: 'localhost'
  };
  const mailPayload = {
    credentials: {
      username: 'testUser',
      password: 'testPassword'
    },
    mailOpts: {
      from: 'Paul Reesman <paul.r.reesman@gmail.com>',
      to: 'Paul Reesman <paul.r.reesman@gmail.com>'
    }
  };
  let jwt;

  it('should add a domain', async () => {
    const res1 = await chai.request(server.listener).post('/authenticate').send(authPayload);
    const res2 = await chai.request(server.listener).post('/mailapi/domain').send(domainPayload)
      .set('authorization', res1.headers.authorization);
    jwt = res2.headers.authorization;
  });

  it('should retrieve the domains', async () => {
    const res = await chai.request(server.listener).get('/mailapi/domain').set('authorization', jwt);
    jwt = res.headers.authorization;
  });

  it('should send mail', async () => {
    const res = await chai.request(server.listener).post('/mailapi').send(mailPayload).set('authorization', jwt);
    jwt = res.headers.authorization;
  });
});
