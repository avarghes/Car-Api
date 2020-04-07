const chai = require('chai');
const should = chai.should();
const assert = require('assert');

require('../bootstrap.test');

describe("Varient (Model)",() => {
  let varient;
  
  before((done) => {
    Variant.create({
        "name": "REVETRQE XM",
        "type": "Diesel",
        "capacity": "1497 cc",
        "price": "7.62 Lakh"
      }).exec(function(err,vrt){
        return done();
    });
  });

  it('Create',(done) => {
    Variant.create({
        "name": "REVETRQE  XE",
        "type": "Diesel",
        "capacity": "1497 cc",
        "price": "6.99 Lakh"
      }).exec(function(err,vrt){
          varient = vrt;
          assert.equal(vrt.name,"REVETRQE  XE");
          return done();
      });
  });

  it('Fetch',(done) =>{
    Variant.find({"id":varient.id}).exec(function(err,vrt){
        assert.equal(vrt.length,1);
        return done();
    });
  });

  it('Fetch One',(done) =>{
    Variant.findOne({"name":varient.name}).exec(function(err,vrt){
        assert.equal(vrt.name,"REVETRQE  XE");
        return done();
    });
  });

 it('Update',(done) => {
    let params = {"name":"REVETRQE XE Updated"};
    Variant.update(varient.id,params,function(err,vrt){
       assert.equal(vrt.length,1);
       return done();
    });
 });

 it('Count',(done) => {
    let params = {"name":"REVETRQE XE Updated - 1"};
    Variant.count().exec(function(err,cnt){
        assert.equal(cnt,2);
        return done();
    });
 });

 it('Query ',(done) =>{
    Variant.find().limit(1).exec(function(err,vrt){
        if(err) throw err;
        assert(vrt);
        return done();
    });
 });

 it('Delete',(done) => {
    Variant.destroy(varient.id,function(err){
        if(err) throw err;
        return done();
    });
 });

});