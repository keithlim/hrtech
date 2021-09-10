let server = require('../index');
const db = require('../src/db/pg-util');

const fs = require("fs");
const path = require('path');
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

// Test | Uploading Csv File
describe('Uploading CSV File', () => {
    beforeEach((done) => {
        // clearing the table `employee` in test_hrtech db
        db.query("delete from employee", undefined, (err, result) => {
            if (err) {
                console.error(`error when clearing table: ${err}`);
            }
            done();
        });
    });

    // Test | Uploading Csv File | A correct Csv File
    describe('Uploading a correct csv dataset', () => {
        it('Correct csv file', (done) => {
            const fileName = "Correct Data.csv";
            const filePath = path.join(__basedir, "/backend/test/resources/" + fileName);

            chai.request(server)
                .post('/users/upload')
                .attach('file', fs.readFileSync(filePath), fileName)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('Correct csv file with comments', (done) => {
            const fileName = "Correct Data with Comments.csv";
            const filePath = path.join(__basedir, "/backend/test/resources/" + fileName);

            chai.request(server)
                .post('/users/upload')
                .attach('file', fs.readFileSync(filePath), fileName)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('Correct csv file with non english characters', (done) => {
            const fileName = "Test Encoding Data.csv";
            const filePath = path.join(__basedir, "/backend/test/resources/" + fileName);

            chai.request(server)
                .post('/users/upload')
                .attach('file', fs.readFileSync(filePath), fileName)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('Updating Row', (done) => {
            const fileName = "Correct Data.csv";
            const filePath = path.join(__basedir, "/backend/test/resources/" + fileName);

            chai.request(server)
                .post('/users/upload')
                .attach('file', fs.readFileSync(filePath), fileName)
                .end((err, res) => {
                    const fileName = "Update Row.csv";
                    const filePath = path.join(__basedir, "/backend/test/resources/" + fileName);

                    chai.request(server)
                        .post('/users/upload')
                        .attach('file', fs.readFileSync(filePath), fileName)
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        });
                });
        });

        it('Swapping logins between 2 ids', (done) => {
            const fileName = "Swap Id 1.csv";
            const filePath = path.join(__basedir, "/backend/test/resources/" + fileName);

            chai.request(server)
                .post('/users/upload')
                .attach('file', fs.readFileSync(filePath), fileName)
                .end((err, res) => {
                    const fileName = "Swap Id 2.csv";
                    const filePath = path.join(__basedir, "/backend/test/resources/" + fileName);

                    chai.request(server)
                        .post('/users/upload')
                        .attach('file', fs.readFileSync(filePath), fileName)
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        });
                });
        });
    });

    // Test | Uploading Csv File | An incorrect Csv File
    describe('Uploading an incorrect csv dataset', () => {
        it("Csv file with an empty column.'", (done) => {
            const fileName = "Data with less Columns.csv";
            const filePath = path.join(__basedir, "/backend/test/resources/" + fileName);

            chai.request(server)
                .post('/users/upload')
                .attach('file', fs.readFileSync(filePath), fileName)
                .end((err, res) => {
                    res.body.should.have.property('message', 'A record was detected to have an empty column.');
                    res.should.have.status(400);
                    done();
                });
        });

        it("Csv file with more than required columns", (done) => {
            const fileName = "Data with more Columns.csv";
            const filePath = path.join(__basedir, "/backend/test/resources/" + fileName);

            chai.request(server)
                .post('/users/upload')
                .attach('file', fs.readFileSync(filePath), fileName)
                .end((err, res) => {
                    res.body.should.have.property('message', 'A record was detected to have more columns than required.');
                    res.should.have.status(400);
                    done();
                });
        });

        it("Empty csv file with headers", (done) => {
            const fileName = "Empty File with Headers.csv";
            const filePath = path.join(__basedir, "/backend/test/resources/" + fileName);

            chai.request(server)
                .post('/users/upload')
                .attach('file', fs.readFileSync(filePath), fileName)
                .end((err, res) => {
                    res.body.should.have.property('message', 'Empty file detected.');
                    res.should.have.status(400);
                    done();
                });
        });

        it("Empty csv file with no headers", (done) => {
            const fileName = "Empty.csv";
            const filePath = path.join(__basedir, "/backend/test/resources/" + fileName);

            chai.request(server)
                .post('/users/upload')
                .attach('file', fs.readFileSync(filePath), fileName)
                .end((err, res) => {
                    res.body.should.have.property('message', 'Empty file detected.');
                    res.should.have.status(400);
                    done();
                });
        });

        it("Csv file with invalid name value", (done) => {
            const fileName = "Invalid Fields.csv";
            const filePath = path.join(__basedir, "/backend/test/resources/" + fileName);

            chai.request(server)
                .post('/users/upload')
                .attach('file', fs.readFileSync(filePath), fileName)
                .end((err, res) => {
                    res.body.should.have.property('message', 'Error due to failure to conform to business rules.');
                    res.should.have.status(400);
                    done();
                });
        });

        it("Csv file with invalid salary value", (done) => {
            const fileName = "Incorrect Salary.csv";
            const filePath = path.join(__basedir, "/backend/test/resources/" + fileName);

            chai.request(server)
                .post('/users/upload')
                .attach('file', fs.readFileSync(filePath), fileName)
                .end((err, res) => {
                    res.body.should.have.property('message', 'Error due to failure to conform to business rules.');
                    res.should.have.status(400);
                    done();
                });
        });

        it("Csv file with duplicated key values'", (done) => {
            const fileName = "Wrong Data with Duplicates.csv";
            const filePath = path.join(__basedir, "/backend/test/resources/" + fileName);

            chai.request(server)
                .post('/users/upload')
                .attach('file', fs.readFileSync(filePath), fileName)
                .end((err, res) => {
                    res.body.should.have.property('message', 'Duplicated id / login in CSV file.');
                    res.should.have.status(400);
                    done();
                });
        });
    });

    afterEach((done) => {
        // clearing the table `employee` in test_hrtech db
        db.query("delete from employee", undefined, (err, result) => {
            if (err) {
                console.error(`error when clearing table: ${err}`);
            }
            done();
        });
    });
});

// Test | Retrieving Employee Data
describe('Retrieving Employee Data', () => {
    before((done) => {
        const fileName = "Correct Data.csv";
        const filePath = path.join(__basedir, "/backend/test/resources/" + fileName);

        chai.request(server)
            .post('/users/upload')
            .attach('file', fs.readFileSync(filePath), fileName)
            .end((err, res) => {
                done();
            });
    });

    // Test | Retrieving Employee Data | Params Validity
    describe('Query Params Validity', () => {
        it('Checking Salary Validity', (done) => {
            chai.request(server)
                .get('/users')
                .query({ minSalary: 0, maxSalary: 99999, offset: 0, limit: 30, sort: "+id" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('results');
                    res.body.results.length.should.be.eql(30);
                    res.body.results[0].salary.should.be.eql("1234.00");
                    res.body.results[29].salary.should.be.eql("659.05");
                    done();
                });
        });

        it('Checking Offset Validity', (done) => {
            chai.request(server)
                .get('/users')
                .query({ minSalary: 0, maxSalary: 99999, offset: 30, limit: 30, sort: "+id" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('results');
                    res.body.results.length.should.be.eql(30);
                    res.body.results[0].id.should.be.eql("e0031");
                    done();
                });
        });

        it('Checking Limit Invalidity', (done) => {
            chai.request(server)
                .get('/users')
                .query({ minSalary: 0, maxSalary: 99999, offset: 0, limit: 30, sort: "+id" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('results');
                    res.body.results.length.should.be.eql(30);
                    done();
                });
        });
    });

    // Test | Retrieving Employee Data | Params Invalidity
    describe('Query Params Invalidity', () => {
        it('Checking Salary Invalidity', (done) => {
            chai.request(server)
                .get('/users')
                .query({ minSalary: -1, maxSalary: 99999, offset: 0, limit: 30, sort: "+id" })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Checking Offset Invalidity', (done) => {
            chai.request(server)
                .get('/users')
                .query({ minSalary: 0, maxSalary: 99999, offset: -1, limit: 30, sort: "+id" })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Checking Limit Invalidity', (done) => {
            chai.request(server)
                .get('/users')
                .query({ minSalary: 0, maxSalary: 99999, offset: 0, limit: 31, sort: "+id" })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    // Test | Retrieving Employee Data | Checking Sorting Validity
    describe('Checking Sorting Validity', () => {

        // Test | Retrieving Employee Data | Checking Sorting Validity | ID
        describe('ID', () => {
            it('Checking Id Sort Asc', (done) => {
                chai.request(server)
                    .get('/users')
                    .query({ minSalary: 0, maxSalary: 99999, offset: 0, limit: 30, sort: "+id" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('results');
                        res.body.results.length.should.be.eql(30);

                        const rspArr = res.body.results;
                        const sortedArr = JSON.parse(JSON.stringify(rspArr))
                            .sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))

                        const isSorted = rspArr.every(({ id }, i) => id === sortedArr[i].id);
                        isSorted.should.be.eql(true)
                        done();
                    });
            });

            it('Checking Id Sort Desc', (done) => {
                chai.request(server)
                    .get('/users')
                    .query({ minSalary: 0, maxSalary: 99999, offset: 0, limit: 30, sort: "-id" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('results');
                        res.body.results.length.should.be.eql(30);

                        const rspArr = res.body.results;
                        const sortedArr = JSON.parse(JSON.stringify(rspArr))
                            .sort((a, b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0))

                        const isSorted = rspArr.every(({ id }, i) => id === sortedArr[i].id);
                        isSorted.should.be.eql(true)
                        done();
                    });
            });
        });

        // Test | Retrieving Employee Data | Checking Sorting Validity | Login
        describe('Login', () => {
            it('Checking Login Sort Asc', (done) => {
                chai.request(server)
                    .get('/users')
                    .query({ minSalary: 0, maxSalary: 99999, offset: 0, limit: 30, sort: "+login" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('results');
                        res.body.results.length.should.be.eql(30);

                        const rspArr = res.body.results;
                        const sortedArr = JSON.parse(JSON.stringify(rspArr))
                            .sort((a, b) => (a.login > b.login) ? 1 : ((b.login > a.login) ? -1 : 0))

                        const isSorted = rspArr.every(({ login }, i) => login === sortedArr[i].login);
                        isSorted.should.be.eql(true)
                        done();
                    });
            });

            it('Checking Login Sort Desc', (done) => {
                chai.request(server)
                    .get('/users')
                    .query({ minSalary: 0, maxSalary: 99999, offset: 0, limit: 30, sort: "-login" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('results');
                        res.body.results.length.should.be.eql(30);

                        const rspArr = res.body.results;
                        const sortedArr = JSON.parse(JSON.stringify(rspArr))
                            .sort((a, b) => (a.login < b.login) ? 1 : ((b.login < a.login) ? -1 : 0))

                        const isSorted = rspArr.every(({ login }, i) => login === sortedArr[i].login);
                        isSorted.should.be.eql(true)
                        done();
                    });
            });
        });

        // Test | Retrieving Employee Data | Checking Sorting Validity | Name
        describe('Name', () => {
            it('Checking Name Sort Asc', (done) => {
                chai.request(server)
                    .get('/users')
                    .query({ minSalary: 0, maxSalary: 99999, offset: 0, limit: 30, sort: "+name" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('results');
                        res.body.results.length.should.be.eql(30);

                        const rspArr = res.body.results;
                        const sortedArr = JSON.parse(JSON.stringify(rspArr))
                            .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))


                        const isSorted = rspArr.every(({ name }, i) => name === sortedArr[i].name);
                        isSorted.should.be.eql(true)
                        done();
                    });
            });

            it('Checking Name Sort Desc', (done) => {
                chai.request(server)
                    .get('/users')
                    .query({ minSalary: 0, maxSalary: 99999, offset: 0, limit: 30, sort: "-name" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('results');
                        res.body.results.length.should.be.eql(30);

                        const rspArr = res.body.results;
                        const sortedArr = JSON.parse(JSON.stringify(rspArr))
                            .sort((a, b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))

                        const isSorted = rspArr.every(({ name }, i) => name === sortedArr[i].name);
                        isSorted.should.be.eql(true)
                        done();
                    });
            });
        });

        // Test | Retrieving Employee Data | Checking Sorting Validity | Salary
        describe('Salary', () => {
            it('Checking Salary Sort Asc', (done) => {
                chai.request(server)
                    .get('/users')
                    .query({ minSalary: 0, maxSalary: 99999, offset: 0, limit: 30, sort: "+salary" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('results');
                        res.body.results.length.should.be.eql(30);

                        const rspArr = res.body.results;
                        const sortedArr = JSON.parse(JSON.stringify(rspArr))
                            .sort((a, b) => parseFloat(a.salary) - parseFloat(b.salary));

                        const isSorted = rspArr.every(({ salary }, i) => salary === sortedArr[i].salary);
                        isSorted.should.be.eql(true)
                        done();
                    });
            });

            it('Checking Salary Sort Desc', (done) => {
                chai.request(server)
                    .get('/users')
                    .query({ minSalary: 0, maxSalary: 99999, offset: 0, limit: 30, sort: "-salary" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('results');
                        res.body.results.length.should.be.eql(30);

                        const rspArr = res.body.results;
                        const sortedArr = JSON.parse(JSON.stringify(rspArr))
                            .sort((a, b) => parseFloat(b.salary) - parseFloat(a.salary));

                        const isSorted = rspArr.every(({ salary }, i) => salary === sortedArr[i].salary);
                        isSorted.should.be.eql(true)
                        done();
                    });
            });
        });

    });

    after((done) => {
        // clearing the test_hrtech db
        db.query("delete from employee", undefined, (err, result) => {
            if (err) {
                console.error(`error when clearing table: ${err}`);
            }
            const fileName = "Correct Data.csv";
            const filePath = path.join(__basedir, "/resources/static/assets/uploads/" + fileName);
            console.log(filePath);
            // fs.unlinkSync(filePath);
            done();
        })
    });
});
