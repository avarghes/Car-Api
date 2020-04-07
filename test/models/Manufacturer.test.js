const chai = require('chai');
const should = chai.should();
const assert = require('assert');

require('../bootstrap.test');

describe("Manufacturer (Model)", () => {
    let manufacturer;

    it('Create', (done) => {
        Manufacturer.create({
            "name": "Suzukhi"
        }).exec(function (err, man) {
            manufacturer = man;
            assert.equal(man.name, "Suzukhi");
            return done();
        });
    });

    it('Fetch', (done) => {
        Manufacturer.find({ "id": manufacturer.id }).exec(function (err, man) {
            assert.equal(man.length, 1);
            return done();
        });
    });

    it('Fetch One', (done) => {
        Manufacturer.findOne({ "name": manufacturer.name }).exec(function (err, man) {
            assert.equal(man.name, "Suzukhi");
            return done();
        });
    });

    it('Update', (done) => {
        let params = { "name": "Suzuki Updated" };
        Manufacturer.update(manufacturer.id, params, function (err, man) {
            assert.equal(man.length, 1);
            return done();
        });
    });

    it("Delete", (done) => {
        Manufacturer.destroy(manufacturer.id, function (err) {
            if (err) throw err;
            return done();
        });
    });
});
