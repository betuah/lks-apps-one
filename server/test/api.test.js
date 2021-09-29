let chai        = require('chai')
let expect      = require('chai').expect
let chaiHttp    = require('chai-http')
let app         = require('../app')

const axios         = require('axios')
const students      = require('../models/students')
const { v4: uuid }  = require('uuid')

chai.use(chaiHttp);
chai.should()

describe('Test API Endpoint', () => {
    describe('GET /students', () => {
        describe('It should to retrive all students data', async () => {
            before( async () => {
                await students.destroy({where: {}, truncate: true})
            })

            before(async () => {
                await axios.get('https://randomuser.me/api/?results=3&exc=login,registered,id,nat')
                .then(async user => {
                    const resData = user.data.results
                    const data = resData.map(item => {
                        return {
                            studentId   : uuid(),
                            fullName    : `${item.name.first} ${item.name.last}`,
                            tglLahir    : item.dob.date,
                            gender      : item.gender,
                            profilePics : item.picture.thumbnail,
                            majorsId    : Math.floor(Math.random() * 3) + 1,
                            document    : item.picture.medium
                        }
                    })

                    try {
                        await students.bulkCreate(data)
                    } catch (error) {
                        throw new Error(err)
                    }
                }).catch(error => { throw new Error(error) })
            })

            it('- Response status should be success', async () => {
                const res = await chai.request(app).get('/students')

                expect(res).to.have.status(200)
            })
            
            it('- Response should be an object', async () => {
                const res = await chai.request(app).get('/students')

                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
            })

            it('- Response should be have code, status, massage and data properties', async () => {
                const res = await chai.request(app).get('/students')

                expect(res).to.have.status(200)
                expect(res.body).to.have.property('code')
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('data')
            })

            it('- Data property should be an array and cannot be empty', async () => {
                const res = await chai.request(app).get('/students')

                expect(res).to.have.status(200)
                expect(res.body.data).to.be.an('array')
                expect(res.body.data).to.have.lengthOf(3)
            })
            
            after( async () => {
                await students.destroy({where: {}, truncate: true})
            })
        })

        describe('It should be Error when student data doest not exist', async () => {
            before( async () => {
                await students.destroy({where: {}, truncate: true})
            })

            it('- Response should be an object', async () => {
                const res = await chai.request(app).get('/students')
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
            })

            it('- Response should be have code,status and message properties', async () => {
                const res = await chai.request(app).get('/students')
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('code')
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('message')
            })

            it('- Response should be success with code value equal to 404', async () => {
                const res = await chai.request(app).get('/students')
                expect(res).to.have.status(200)
                expect(res.body.code).to.equal(404)
            })

            it('- Status property value should be equal to ERR_DATA_NOT_FOUND', async () => {
                const res = await chai.request(app).get('/students')
                expect(res).to.have.status(200)
                expect(res.body.status).to.equal('ERR_DATA_NOT_FOUND')
            })

            it(`- Response should doesn't have data property`, async () => {
                const res = await chai.request(app).get('/students')
                expect(res).to.have.status(200)
                expect(res.body).to.not.have.property('data')
            })
        })
    })

    describe('GET /students/:id', () => {
        describe('It should success to retrive detail students data by id', async () => {
            let dataUsers = []

            before(async () => {
                await axios.get('https://randomuser.me/api/?results=3&exc=login,registered,id,nat')
                .then(async user => {
                    const resData = user.data.results
                    dataUsers = resData.map(item => {
                        return {
                            studentId   : uuid(),
                            fullName    : `${item.name.first} ${item.name.last}`,
                            tglLahir    : item.dob.date,
                            gender      : item.gender,
                            profilePics : item.picture.thumbnail,
                            majorsId    : Math.floor(Math.random() * 3) + 1,
                            document    : item.picture.medium
                        }
                    })

                    try {
                        await students.bulkCreate(dataUsers)
                    } catch (error) {
                        console.log(new Error(error))
                    }
                }).catch(error => { 
                    console.log(new Error(error))
                })
            })

            after( async () => {
                await students.destroy({where: {}, truncate: true})
            })

            it('- Response status should be success', async () => {
                const res = await chai.request(app).get(`/students/${dataUsers[0].studentId}`)
                expect(res).to.have.status(200)
            })

            it('- Response should be an object', async () => {
                const res = await chai.request(app).get(`/students/${dataUsers[0].studentId}`)
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
            })

            it('- Response should be have code, status, message, and data properties', async () => {
                const res = await chai.request(app).get(`/students/${dataUsers[0].studentId}`)
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('code')
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('data')
            })

            it('- Data value property should be an object', async () => {
                const res = await chai.request(app).get(`/students/${dataUsers[0].studentId}`)
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.an('object')
            })

            it('- Data value property cannot more than one data', async () => {
                const res = await chai.request(app).get(`/students/${dataUsers[0].studentId}`)
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.not.an('array')
            })
        })

        describe('It should error when id not valid', async () => {
            before(async () => {
                await axios.get('https://randomuser.me/api/?results=3&exc=login,registered,id,nat')
                .then(async user => {
                    const resData = user.data.results
                    let dataUsers = resData.map(item => {
                        return {
                            studentId   : uuid(),
                            fullName    : `${item.name.first} ${item.name.last}`,
                            tglLahir    : item.dob.date,
                            gender      : item.gender,
                            profilePics : item.picture.thumbnail,
                            majorsId    : Math.floor(Math.random() * 3) + 1,
                            document    : item.picture.medium
                        }
                    })

                    try {
                        await students.bulkCreate(dataUsers)
                    } catch (error) {
                        console.log(new Error(error))
                    }
                }).catch(error => { 
                    console.log(new Error(error))
                })
            })

            after( async () => {
                await students.destroy({where: {}, truncate: true})
            })

            it('- Response should be an object', async () => {
                const res = await chai.request(app).get(`/students/1`)
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
            })

            it('- Response should be have code,status and message properties', async () => {
                const res = await chai.request(app).get(`/students/1`)
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('code')
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('message')
            })

            it('- Response should be success with code value equal to 404', async () => {
                const res = await chai.request(app).get(`/students/1`)
                expect(res).to.have.status(200)
                expect(res.body.code).to.equal(404)
            })

            it('- Status property value should be equal to ERR_DATA_NOT_FOUND', async () => {
                const res = await chai.request(app).get(`/students/1`)
                expect(res).to.have.status(200)
                expect(res.body.status).to.equal('ERR_DATA_NOT_FOUND')
            })

            it(`- Response should doesn't have data property`, async () => {
                const res = await chai.request(app).get(`/students/1`)
                expect(res).to.have.status(200)
                expect(res.body).to.not.have.property('data')
            })
        })
    })
})