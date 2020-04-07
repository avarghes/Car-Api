var supertest = require('supertest');
var assert = require('assert');

require('../bootstrap.test');

describe('Segment Controller', function () {
  let segment;

  before((done) => {
    let agent = supertest.agent(sails.hooks.http.app);

    agent.post('/segment').send({
      "name": "HatchBack-1"
    }).expect(200).end(function (err, result) {
      if (err) throw err;
      console.log(result);
      segment = result.body;
      //console.log(segment);
      return done();
    })
  });

  it('get /segment', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .get('/segment')
      .send()
      .expect(200)
      .end(function (err, result) {
        if (err) {
          done(err);
        } else {
          result.body.length.should.be.equal(1);
          done();
        }
      });
  });

  it('post /segment', (done) => {
    let agent = supertest.agent(sails.hooks.http.app);

    agent.post('/segment').send({
      "name": "HatchBack"
    }).expect(200).end(function (err, result) {
      if (err) throw err;
      segment = result.body;
      assert.equal(result.body.name, 'HatchBack');
      return done();
    })
  });

  it('put /segment/:id', (done) => {
    let agent = supertest.agent(sails.hooks.http.app);
    let params = { "name": "HatchBack Updated" };

    agent.put('/segment/' + segment.id).send(params).expect(200).end(function (err, result) {
      if (err) throw err;
      assert.equal(result.body[0].name, "HatchBack Updated");
      return done();
    });
  });

  it('get /segment/:id', (done) => {
    let agent = supertest.agent(sails.hooks.http.app);

    agent.get('/segment/' + segment.id).send().expect(200).end(function (err, result) {
      if (err) throw err;
      assert.equal(result.body.id, segment.id);
      return done();
    });
  });

  it('delete /segment/:id', (done) => {
    let agent = supertest.agent(sails.hooks.http.app);

    agent.del('/segment/' + segment.id).send().expect(200).end(function (err, result) {
      if (err) throw err;
      assert.equal(result.body.id, segment.id);
      return done();
    });
  });

  it('Delete with non-numeric id', (done) =>{
    let agent = supertest.agent(sails.hooks.http.app);
    let nonnumeric = 'id';
    agent.del('/segment/'+ nonnumeric).send().expect(400).end((err,res) => {
        if (err) throw err;
        assert.equal(res.body.error,"ID should be an integer and is required");
        return done();
    });
});

it('Delete with non-existent id', (done) => {
    let agent = supertest.agent(sails.hooks.http.app);

    agent.del('/segment/'+ segment.id).send().expect(404).end((err,res) => {
        if (err) throw err;
        assert.equal(res.body.error,"Record not found.");
        return done();
    });
});


  it('delete /segment', (done) => {
    let agent = supertest.agent(sails.hooks.http.app);

    agent.del('/segment').send().expect(200).end(function (err, result) {
      if (err) throw err;
      assert(result.body);
      return done();
    });

  });

});