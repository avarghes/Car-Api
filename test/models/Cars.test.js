const chai = require('chai');
const should = chai.should();
const assert = require('assert');
require('../bootstrap.test');



describe("Car (Model)", () => {
    let cars;
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

    it("Create", (done) => {
        Cars.create({
            "name":"Maruti Baleno",
            "segment": 4,
            "description": "Maruti Baleno",
            "manufacturer" : manufacturer.id,
            "segment": [segment.id]
        }).exec(function (err, car) {
            assert.equal(car.name, "Maruti Baleno");
            cars = car; 
            return done();
        });
    });

    it("Fetch", (done) => {
        Cars.find({"id": cars.id}).exec(function (err, car) {
            fixtures['cars'].length.should.be.greaterThan(0);
            assert.equal(car.length, 1);
            return done();
        });
    });

    it("Fetch One", (done) => {
        Cars.findOne({"name": cars.name}).exec(function (err, car) {
            fixtures['cars'].length.should.be.greaterThan(0);
            assert.equal(car.name, "Maruti Baleno");
            return done();
        });
    });

    it("Update", (done) => {
        let params = {"name": "Maruti Baleno Updated" };
        Cars.update(cars.id, params, function (err, car) {
            assert.equal(car.length, 1);
            return done();
        });
    });

    it("Delete", (done) => {
        Cars.destroy({"id":cars.id}).exec(function (err) {
            if (err) throw err;
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
