const chai  = require('chai');
const chaiHttp =('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();



// //get data covid
// router.get("/data/covids", getDataCovid);
// router.get("/data/backlog", getBacklogData);
// router.post("/data/covid/update", updateDataCovids);
describe("get data", () => {
  describe("GET /", () => {
    it("should get all todos", (done) => {
      chai.request(app)
        .get('/data/covids')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it("should get a single todo", (done) => {
      const id = 1;
      chai.request(app)
        .get(`/data/backlog`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it("should not get a single todo", (done) => {
      const id = 10;
      chai.request(app)
        .get(`/data/covid/update`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});