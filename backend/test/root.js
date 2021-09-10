let server = require('../index');

let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Root', () => {
    beforeEach((done) => {
        done();
    });

    describe('/GET root', () => {
        it('it should GET a nice message', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.equal('hrtech-be is live! But shoo shoo!');
                    done();
                });
        });
    });

});
