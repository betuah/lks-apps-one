const studentModel    = require('../models/students')
const majorModel      = require('../models/majors')
const env             = require('../env')
const AWS             = require('aws-sdk')
const { v4: uuidv4 }  = require('uuid')

const s3 = new AWS.S3({
    accessKeyId: env.aws.accessKeyId,
    secretAccessKey: env.aws.secretAccessKey
})

const delS3Object = (key) => new Promise(async (resolve, reject) => {
    const options = {
        Bucket: env.aws.Bucket,
        Key : key
    }

    s3.deleteObject(options, (err, data) => {
        if (err) reject(err)
        else resolve(data)
    })
})

exports.index = async (req, res) => {
    try {
        const students = await studentModel.findAll({
            include: [{
                model: majorModel,
                attributes: ['major_name'],
                require: false
            }]
        })
        if (students.length > 0) {
            const resData = JSON.stringify(students)
            const data = JSON.parse(resData)
            res.status(200).json({ 
                code: 200,
                status: 'OK', 
                message: 'Retrieve all data success.',
                data: data
            })
        } else {
            res.status(200).json({ 
                code: 404,
                status: 'ERR_DATA_NOT_FOUND', 
                message: 'Data not found!' 
            })
        }
    } catch (err) {
        console.log(new Error(err))
        res.status(500).send({
            code: 500,
            status: 'ERR_SERVER_ERROR', 
            message: 'Internal server error!' 
        })
    }
}

exports.create = async (req, res) => {
    try {
        const picsData      = req.files.profilePics && req.files.profilePics[0]
        const docData       = req.files.document && req.files.document[0] 

        if (picsData && docData) {
            const srudentId     = uuidv4()
            const fullName      = req.query.fullName ? req.query.fullName : (req.body.fullName ? req.body.fullName : req.params.fullName)
            const tglLahir      = req.query.tglLahir ? req.query.tglLahir : (req.body.tglLahir ? req.body.tglLahir : req.params.tglLahir)
            const gender        = req.query.gender ? req.query.gender : (req.body.gender ? req.body.gender : req.params.gender)
            const profilePics   = picsData.location
            const majorsId      = req.query.majors ? req.query.majors : (req.body.majors ? req.body.majors : req.params.majors)
            const document      = docData.location

            const data = {
                studentId       : srudentId,
                fullName        : fullName,
                tglLahir        : tglLahir,
                gender          : gender,
                profilePics     : profilePics,
                majorsId        : majorsId,
                document        : document,
                status          : Math.floor(Math.random() * 3)
            }

            studentModel.create(data).then(data => {
                if (data) res.json({ 
                    code: 200,
                    status: 'OK',
                    message: 'Success saving data.',
                    data: {
                        ...data.dataValues,
                        gender: data.gender === '1' ? 'Male' : 'Female',
                    }
                })
            })
            .catch(err => {
                const tmpArr = []

                if (picsData) tmpArr.push(picsData.key)
                if (docData) tmpArr.push(docData.key)

                if (tmpArr.length > 0) {
                    tmpArr.map((item, index, arr) => {
                        delS3Object(item)
                    })
                }

                res.status(500).json({
                    code: '500',
                    status: 'SERVER_ERROR', 
                    message: err.message
                })
            })
        } else {
            delS3Object(picsData ? picsData.key : docData.key)
            .then(data => {
                res.status(400).json({code: 400, status: 'BAD_REQUEST', message: 'Profile picture or document file is empty!'})
            }).catch(err => {
                throw new Error(err)
            })
        }
    } catch (err) {
        console.log(new Error(err))
        res.status(500).json({ 
            code: '500',
            status: 'SERVER_ERROR', 
            message: 'Internal server error!' 
        })
    }
}

exports.details = async (req, res) => {
    try {
        const studentId = req.params.studentId

        studentModel.findOne({ 
            where: { studentId: studentId },
            include: [{
                model: majorModel,
                attributes: ['major_name'],
                require: false
            }]
        }).then(studentDetails => {
            if (studentDetails) {
                res.status(200).json({
                    code: 200,
                    status: 'OK',
                    message: `get student detail for ${studentId} success.`,
                    data: studentDetails
                })
            } else {
                res.status(200).json({
                    code: 404,
                    status: 'ERR_DATA_NOT_FOUND',
                    message: `Data not found!`,
                })
            }
        }).catch(error => {
            console.log(new Error(err))
        })
        
        
    } catch (error) {
        console.log(new Error(err))
        res.status(500).send({ 
            code: '500',
            status: 'SERVER_ERROR', 
            message: 'Internal server error!' 
        })
    }
}