const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    suite("Routing Tests", function(){
        suite("GET /api/convert => conversionObject", function(){
            // Test #1
        test("Convert valid input such as 10L", function(done){
            chai
            .request(server)
            .get("/api/convert")
            .query({"input": "10L"})
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 10);
                assert.equal(res.body.initUnit, "L");
                assert.approximately(res.body.returnNum, 2.64172, 0.1 );
                assert.equal(res.body.returnUnit, "gal");
                done();
            })
            .after(function() {
                chai.request(server)
                  .get('/')
              });
    });

    // Test #2
    test("Convert an invalid input such as 32g", function(done){
        chai
        .request(server)
        .get("/api/convert")
        .query({"input":"32g"})
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, undefined);
            assert.equal(res.body.initUnit, undefined);
            done();
        })
        .after(function() {
            chai.request(server)
              .get('/')
          });
    });

    // Test #3
    test("Convert an invalid number such as 3/7.2/3kg", function(done){
            chai
            .request(server)
            .get("/api/convert")
            .query({"input": "3/7.2/3kg"})
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, undefined);
                done();
            })
            .after(function() {
                chai.request(server)
                  .get('/')
            });
    });

    // Test #4
    test("#Convert an invalid number AND invalid unit 3/7.2/4kilomegagram", function(done){
            chai
            .request(server)
            .get("/api/convert")
            .query({"input": "3/7.2/4kilomegagram"})
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, undefined);
                assert.equal(res.body.initUnit, undefined);
                done();
            })
            .after(function() {
                chai.request(server)
                  .get('/')
            });
    });

    // Test #5
    test("Convert with no number (kg)", function(done){
            chai
            .request(server)
            .get("/api/convert")
            .query({"input": "kg"})
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 1);
                assert.equal(res.body.initUnit, "kg");
                assert.approximately(res.body.returnNum, 2.20462, 0.1);
                done();
            })
            .after(function() {
                chai.request(server)
                  .get('/');
              });
    });
        });
        

    });

});
