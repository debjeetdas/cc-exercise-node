//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const cards = require('../api/routes/cards');
let should = chai.should();

chai.use(chaiHttp);

// adding inmemory database
const db = require('diskdb');

/*
* Test the /GET route
*/
describe('/GET credit cards', () => {
  it('it should GET all the credit cards', (done) => {
    chai.request(cards)
      .get('/')
      .end((err, res) => {
        // res.should.have.status(200);
        // res.body.should.be.a('array');
        // res.body.length.should.be.eql(0);
        done();
      });
  });
});
