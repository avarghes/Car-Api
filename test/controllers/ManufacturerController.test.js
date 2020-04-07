var supertest = require('supertest');
var assert = require('assert');

require('../bootstrap.test');

describe('Manufacturer Controller', () => {
    let manufacturer;

    before((done) => {
        let agent = supertest(sails.hooks.http.app);

        agent.post('/manufacturer').send({
            "name": "Tata"
        }).expect(200).end(function (err, res) {
            if (err) throw err;
            return done();
        });
    });

    it('Create', (done) => {
        let agent = supertest(sails.hooks.http.app);

        agent.post('/manufacturer').send({
            "name": "Suzukhi"
        }).expect(200).end(function (err, res) {
            if (err) throw err;
            assert.equal(res.body.name, 'Suzukhi');
            manufacturer = res.body;
            return done();
        });
    });

    it('Fetch', (done) => {
        let agent = supertest(sails.hooks.http.app);

        agent.get('/manufacturer').send().expect(200).end(function (err, res) {
            if (err) throw err;
            assert.equal(res.body.length, 2);
            return done();
        });
    });

    it('Update', (done) => {
        let agent = supertest(sails.hooks.http.app);
        let params = { "name": "Suzukhi Updated" };

        agent.put('/manufacturer/' + manufacturer.id).send(params).expect(200).end(function (err, res) {
            if (err) throw err;
            assert.equal(res.body[0].name, "Suzukhi Updated");
            return done();
        });
    });

    it('FindOne', (done) => {
        let agent = supertest(sails.hooks.http.app);

        agent.get('/manufacturer/' + manufacturer.id).send().expect(200).end(function(err, res){
            if (err) throw err;
            assert.equal(res.body.id,manufacturer.id);
            return done();
        });
    });

    it('Delete', (done) => {
        let agent = supertest(sails.hooks.http.app);

        agent.del('/manufacturer/'+manufacturer.id).send().expect(200).end(function(err,res){
            if(err) throw err;
            assert.equal(res.body.id,manufacturer.id);
            return done();
        });
    });

    it('Delete with non-numeric id', (done) =>{
        let agent = supertest.agent(sails.hooks.http.app);
        let nonnumeric = 'id';
        agent.del('/manufacturer/'+ nonnumeric).send().expect(400).end((err,res) => {
            if (err) throw err;
            assert.equal(res.body.error,"ID should be an integer and is required");
            return done();
        });
    });

    it('Delete with non-existent id', (done) => {
        let agent = supertest.agent(sails.hooks.http.app);

        agent.del('/manufacturer/'+ manufacturer.id).send().expect(404).end((err,res) => {
            if (err) throw err;
            assert.equal(res.body.error,"Record not found.");
            return done();
        });
    });

    it('Delete All',(done) => {
        let agent = supertest(sails.hooks.http.app);

        agent.del('/manufacturer').send().expect(200).end(function(err,res){
            if(err) throw err;
            console.log(res);
            //assert.equal(res.body.status,200);
            return done();
        });
    });
});