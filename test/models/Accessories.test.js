const chai = require('chai');
const should = chai.should();
const assert = require('assert');

require('../bootstrap.test');

describe("Accessories (Model)", () => {
    let accessory;

    it("Create", (done) => {
        Accessories.create({
            "name": "Dashboard",
            "price": 442
        }).exec(function (err, accessories) {
            assert.equal(accessories.name, "Dashboard");
            accessory = accessories;
            return done();
        });
    });

    it("Fetch", (done) => {
        Accessories.find({"id":accessory.id}).exec(function (err, accessories) {
            //fixtures['accessories'].length.should.be.greaterThan(0);
            assert.equal(accessories.length,1);
            return done();
        });
    });

    it("Fetch One", (done) => {
        Accessories.findOne({"name":accessory.name}).exec(function (err, accessories) {
            //fixtures['accessories'].length.should.be.greaterThan(0);
            assert.equal(accessories.name,"Dashboard");
            return done();
        });
    });


    it("Update", (done) => {
        let params = {"name": "Dashboard-1" }
        Accessories.update(accessory.id, params, function (err, accessories) {
            assert.equal(accessories.length, 1);
            return done();
        });
    });

    it("Delete", (done) => {
        Accessories.destroy(accessory.id, function (err) {
            if (err) throw err;
            return done();
        });
    });
});