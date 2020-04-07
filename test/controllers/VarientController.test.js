var supertest = require('supertest');
var assert = require('assert');

require('../bootstrap.test');

describe("VarientController", () => {

    let variant;

    before((done) => {
        let agent = supertest(sails.hooks.http.app);

        agent.post("/variant").send({
            "name": "REVETRQE XM",
            "type": "Diesel",
            "capacity": "1497 cc",
            "price": "7.62 Lakh"
        }).expect(200).end(function (err, res) {
            if (err) throw err;
            return done();
        });
    });


    it('Create', (done) => {
        let agent = supertest(sails.hooks.http.app);

        agent.post("/variant").send({
            "name": "REVETRQE  XE",
            "type": "Diesel",
            "capacity": "1497 cc",
            "price": "6.99 Lakh"
        }).expect(200).end(function (err, res) {
            if (err) throw err;
            assert.equal(res.body.name, "REVETRQE  XE");
            variant = res.body;
            return done();
        });
    });

    it('Fetch', (done) => {
        let agent = supertest(sails.hooks.http.app);

        agent.get('/variant').send().expect(200).end(function (err, res) {
            if (err) throw err;
            assert.equal(res.body.length, 2);
            return done();
        });

    });

    it('Update', (done) => {
        let agent = supertest(sails.hooks.http.app);
        let params = { "name": "REVETRQE  XE Updated" };
        agent.put('/variant/' + variant.id).send(params).expect(200).end(function (err, res) {
            if (err) throw err;
            assert.equal(res.body[0].id, variant.id);
            return done();
        });
    });

    it('Search',(done) => {
        let agent = supertest.agent(sails.hooks.http.app);
        let params ={
            where:{name:'REVETRQE  XE Updated'},
            limit:1,
            sort:'name'
        };

        let querystr = "where="+ JSON.stringify(params["where"])+"&limit="+params["limit"]+"&sort="+params["sort"];

        console.log(querystr);

        agent.get('/variant/search?'+querystr).send().expect(200).end((err,res) => {
            if(err) throw err;
            assert.equal(res.body[0].name,'REVETRQE  XE Updated');
            return done();
        });
    });

    it('Delete One', (done) => {
        let agent = supertest(sails.hooks.http.app);

        agent.del('/variant/' + variant.id).send().expect(200).end(function (err, res) {
            if (err) throw err;
            assert.equal(res.body.id, variant.id);
            return done();
        });
    });


    it('Delete with non-numeric id', (done) => {
        let agent = supertest.agent(sails.hooks.http.app);
        let nonnumeric = 'id';
        agent.del('/variant/' + nonnumeric).send().expect(400).end((err, res) => {
            if (err) throw err;
            assert.equal(res.body.error, "ID should be an integer and is required");
            return done();
        });
    });

    it('Delete with non-existent id', (done) => {
        let agent = supertest.agent(sails.hooks.http.app);

        agent.del('/variant/' + variant.id).send().expect(404).end((err, res) => {
            if (err) throw err;
            assert.equal(res.body.error, "Record not found.");
            return done();
        });
    });


    it('Delete All', (done) => {
        let agent = supertest(sails.hooks.http.app);

        agent.del('/variant').send().expect(200).end(function (err, res) {
            if (err) throw err;
            assert(res.body);
            return done();
        });
    });

});