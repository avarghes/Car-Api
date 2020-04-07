const chai = require('chai');
const should = chai.should();
var supertest = require('supertest');
var assert = require('assert');
require('../bootstrap.test');

describe('Accessories Controller', () => {
    let accessory;

    before((done) => {
        let agent = supertest.agent(sails.hooks.http.app);

        agent.post('/accessories')
            .send({
                "name": "Remote Engine Starter",
                "price": 675
              }).expect(200).end((err,res) => {
                if(err) throw err;
                return done();
              });
    });

    it('Create', (done) => {
        let agent = supertest.agent(sails.hooks.http.app);
        
        agent.post('/accessories')
            .send({
                "name": "Dashboard",
                "price": 442
            }).expect(200).end((err, res) => {
                if (err) throw err;
                accessory = res.body;
                return done();
            });
    });

    it('Fetch', (done) => {
        var agent = supertest.agent(sails.hooks.http.app);

        agent.get('/accessories').send().expect(200).end((err, res) => {
            if (err) throw err;
            res.body.length.should.equal(2);
            return done();
        });
    });

    it('Update', (done) => {
        let agent = supertest.agent(sails.hooks.http.app);

        agent.put('/accessories/'+ accessory.id).send({
            "name": "Dashboard Updated"
        }).expect(200).end((err, res) => {
            if (err) throw err;
            assert.equal(res.body[0].name,'Dashboard Updated');
            return done();
        });
    });

    it('Search',(done) => {
        let agent = supertest.agent(sails.hooks.http.app);
        let params ={
            where:{name:'Dashboard Updated'},
            limit:1,
            sort:'name'
        };

        let querystr = "where="+ JSON.stringify(params["where"])+"&limit="+params["limit"]+"&sort="+params["sort"];

        console.log(querystr);

        agent.get('/accessories/search?'+querystr).send().expect(200).end((err,res) => {
            if(err) throw err;
            assert.equal(res.body[0].name,'Dashboard Updated');
            return done();
        });
    });

    it('Delete existing id', (done) =>{
        let agent = supertest.agent(sails.hooks.http.app);

        agent.del('/accessories/'+ accessory.id).send().expect(200).end((err,res) => {
            if (err) throw err;
            assert.equal(res.body.name,'Dashboard Updated');
            return done();
        });
    });

    it('Delete with non-numeric id', (done) =>{
        let agent = supertest.agent(sails.hooks.http.app);
        let nonnumeric = 'id';
        agent.del('/accessories/'+ nonnumeric).send().expect(400).end((err,res) => {
            if (err) throw err;
            assert.equal(res.body.error,"ID should be an integer and is required");
            return done();
        });
    });

    it('Delete with non-existent id', (done) => {
        let agent = supertest.agent(sails.hooks.http.app);

        agent.del('/accessories/'+ accessory.id).send().expect(404).end((err,res) => {
            if (err) throw err;
            assert.equal(res.body.error,"Record not found.");
            return done();
        });
    });

    it('Delete All', (done) => {
        var agent = supertest.agent(sails.hooks.http.app);

        agent.del('/accessories').send().expect(200).end((err, res) => {
            if (err) throw err;
            assert(res.body);
            return done();
        });
    });
});


