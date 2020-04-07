const chai = require('chai');
const should = chai.should();
var supertest = require('supertest');
var assert = require('assert');
require('../bootstrap.test');

describe('Cars Controller', () => {
    let car;
    let manufacturer,segment;

    before(function(done){
        Manufacturer.create({
        "name": "Suzukhi"
        }).exec(function(err,man){
            manufacturer = man;

            Segment.create({
                "name": "HatchBack"
            }).exec(function(err,seg){
                segment = seg;
                console.log(segment);
                return done();
            });
        });
    
    });

    it('Create', (done) => {
        let agent = supertest.agent(sails.hooks.http.app);
        
        agent.post('/car')
            .send({
                "name":"Maruti Baleno",
                "segment": 4,
                "description": "Maruti Baleno",
                "manufacturer" : manufacturer.id,
                "segment": [segment.id]
            }).expect(200).end((err, res) => {
                if (err) throw err;
                car = res.body;
                assert.equal(res.body.name,"Maruti Baleno");
                return done();
            });
    });

    it('Fetch', (done) => {
        var agent = supertest.agent(sails.hooks.http.app);

        agent.get('/car').send().expect(200).end((err, res) => {
            if (err) throw err;
            assert.equal(res.body.length,1);
            return done();
        });
    });

    it('Update', (done) => {
        let agent = supertest.agent(sails.hooks.http.app);

        agent.put('/car/'+ car.id).send({
            "name": "Maruti Baleno ZX"
        }).expect(200).end((err, res) => {
            if (err) throw err;
            assert.equal(res.body[0].name,'Maruti Baleno ZX');
            return done();
        });
    });

    it('Search',(done) => {
        let agent = supertest.agent(sails.hooks.http.app);
        let params ={
            where:{name:'Maruti Baleno ZX'},
            limit:1,
            sort:'name'
        };

        let querystr = "where="+ JSON.stringify(params["where"])+"&limit="+params["limit"]+"&sort="+params["sort"];

        console.log(querystr);

        agent.get('/car/search?'+querystr).send().expect(200).end((err,res) => {
            if(err) throw err;
            assert.equal(res.body[0].name,'Maruti Baleno ZX');
            return done();
        });
    });

    it('Delete existing id', (done) =>{
        let agent = supertest.agent(sails.hooks.http.app);

        agent.del('/car/'+ car.id).send().expect(200).end((err,res) => {
            if (err) throw err;
            assert.equal(res.body.name,'Maruti Baleno ZX');
            return done();
        });
    });

    it('Delete with non-numeric id', (done) =>{
        let agent = supertest.agent(sails.hooks.http.app);
        let nonnumeric = 'id';
        agent.del('/car/'+ nonnumeric).send().expect(400).end((err,res) => {
            if (err) throw err;
            assert.equal(res.body.error,"ID should be an integer and is required");
            return done();
        });
    });

    it('Delete with non-existent id', (done) => {
        let agent = supertest.agent(sails.hooks.http.app);

        agent.del('/car/'+ car.id).send().expect(404).end((err,res) => {
            if (err) throw err;
            assert.equal(res.body.error,"Record not found.");
            return done();
        });
    });

    it('Delete All', (done) => {
        var agent = supertest.agent(sails.hooks.http.app);

        agent.del('/car').send().expect(200).end((err, res) => {
            if (err) throw err;
            assert(res.body);
            return done();
        });
    });

    after(function(done){
        Manufacturer.destroy({"id": manufacturer.id}).exec(function(err){
            if(err) throw err;

            Segment.destroy({"id":segment.id}).exec(function(err){
                if(err) throw err;
                return done();
            })
            
        });
    });
});
