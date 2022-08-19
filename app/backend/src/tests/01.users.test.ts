import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

// import { Response } from 'superagent';
import User from '../database/models/user';
import { IUser } from './IUser';

chai.use(chaiHttp);

const { expect } = chai;

const userMocha: IUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    // senha: secret_admin
}

const userRequest = {
  "email": "admin@admin.com",
  "password": "secret_admin"
}

const userRequestFail = {
  "password": "secret_admin"
}

const tokenResponse = {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlkIjoxLCJpYXQiOjE2NjA4NTg0ODN9.W0yUSH80wEphZ3dRKRJVIILlr4ivvhs2_4VK3WVD8pw"
}

describe('User', () => {

  describe('Login', () => {
    /* beforeEach(() => {
      sinon.stub(User, 'findOne').resolves(userMocha as User)
      // sinon.stub(JwtService, 'sign').resolves("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlkIjoxLCJpYXQiOjE2NjA4NTg0ODN9.W0yUSH80wEphZ3dRKRJVIILlr4ivvhs2_4VK3WVD8pw")
    })
    afterEach(() => {
      sinon.restore();
    }) */
    it("teste de login - correto", async () => {
      sinon.stub(User, 'findOne').resolves(userMocha as User)
      const response = await chai.request(app).post('/login').send(userRequest)

      expect(response.status).to.equal(200);
      expect(response.body.token.length).to.equal(tokenResponse.token.length);
      sinon.restore();

    })
    it("teste de login - falho", async () => {
      sinon.stub(User, 'findOne').resolves({} as any)
      const response = await chai.request(app).post('/login').send(userRequestFail)

      expect(response.status).to.equal(500);
      sinon.restore();

    })
  });

});
