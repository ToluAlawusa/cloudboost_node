var app = require('./server'),
    requested = require('request'),
    chai = require('chai'),
    http = require('chai-http'),
    request = require('supertest'),
    expect = chai.expect,
    assert = chai.assert,
    should = chai.should();


    chai.use(http);

    describe('LOGIN', function() {

        var userlogin = {
            "username" : "Segun",
            "password" : "segelulu1234"
        };

        var jointed = process.cwd()+'/src/public/images/';
        console.log(jointed);

        


        it("should login a user", function(done) {
            chai.request(app)
                .post('/api/v1/login')
                .send(userlogin)
                .end(function(err, res) {
                    res.should.have.status(200);
                    should.not.exist(err);
                    res.body.should.be.an("Object");
                    done();
            });
        });

        
        //it.skip (will skip a test)
        it("do a username patch", function(done) {
            request(app)
                .post('/api/v1/login')
                .send(userlogin)
                .end(function(err, res) {
                    var usertoken  = {"token" : "Bearer " + res.body.token};
                    request(app)
                        .patch("/api/v1/patch-protected")
                        .send(usertoken)
                        .expect(200)
                        .expect("token", usertoken)
                        .expect("Content-type", "application/json")
                        .end(function(err, res){
                            expect(res.body).to.be.an('object');
                            res.body.success.should.equal(true);
                            done();
                        });
                });
        });

        it("create a thumbnail and resize", function(done) {
            request(app)
                .post("/api/v1/login")
                .send(userlogin)
                .end(function(err, res){
                    var thumbInput  = {
                        "url": requested("https://static.pexels.com/photos/34950/pexels-photo.jpg"),
                        "dest": jointed + "trixed.jpg",
                        "token" : "Bearer " + res.body.token
                    };
                    request(app)
                        .post("/api/v1/thumbnail-protected")
                        .send(thumbInput)
                        .end(function(err, res) {
                            res.status.should.equal(200);
                            should.not.exist(err);
                            done();

                        });
                });
        });



        
    });