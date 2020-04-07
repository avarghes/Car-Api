const chai = require('chai');
const should = chai.should();
const assert = require('assert');

require('../bootstrap.test');

describe("Segment (Model)", () => {
    let segment;

    it('Create', (done) => {
        Segment.create({
            "name": "HatchBack"
        }).exec(function (err, seg) {
            segment = seg;
            assert.equal(seg.name, "HatchBack");
            return done();
        });

    });

    it('Fetch', (done) => {
        Segment.find({ "id": segment.id }).exec(function (err, seg) {
            assert.equal(seg.length, 1);
            return done();
        });
    });

    it('Fetch One', (done) => {
        Segment.findOne({ "name": segment.name}).exec(function (err, seg) {
            assert.equal(seg.name, "HatchBack");
            return done();
        });
    });

    it('Update',(done) => {
        let params = {"name":"HatchBack Updated"};

        Segment.update(segment.id,params,function(err,seg){
           assert.equal(seg.length,1) ;
           return done();
        });
    });

    it('Delete',(done) => {
        Segment.destroy(segment.id,function(err){
           if(err) throw err;
           return done() ;
        });
    })

});