let app = require("../app");
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);
let expect = chai.expect;

describe("Saving User", () => {
    let formData = {};
    formData.name = 'testinguser';
    formData.email = 'testinguser@example.com';
    formData.mobile = '1234567890';

    let userID = { id: '64604e4e8b9adf756f2e6927' };

    it('it should Save a user to DB', (done) => {
        chai.request(app)
            .post('/adminpages/adduserdata')
            .send(formData)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(200);
                    done();
                }
            });
    });

    it('it should Update a user in the DB', (done) => {
        chai.request(app)
            .post('/adminpages/edituserdata')
            .send(userID)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(200);
                    done();
                }
            });
    });
});
