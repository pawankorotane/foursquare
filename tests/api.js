var request = require('supertest');
var should = require('should');
describe('it should gets the locations', function () {
    var server;
    beforeEach(function () {
        server = require('../app');
    });

    it('responds to /api', function testSlash(done) {
        request(server)
                .get('/api/?latitude=51.50&longitude=-0.02')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // console.log(res.body);
                    res.body.venues[0].should.have.property('id');
                    res.body.venues[0].should.have.property('name');
                    res.body.venues[0].should.have.property('location');
                    done();
                });
    });

});


