const studentModel   = require('../models/students')
const { v4: uuidv4 } = require('uuid')

exports.index = async (req, res) => {
    try {
        const students = await studentModel.findAll()
        if (students.length > 0) {
            const resData = JSON.stringify(students)
            const data = JSON.parse(resData)
            console.log(data)
            res.status(200).json({ 
                code: '200',
                status: 'SUCCESS', 
                message: 'Get data success.' 
            })
        }
        res.status(404).json({ 
            code: '404',
            status: 'NOT_FOUND', 
            message: 'Data not found!' 
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ 
            code: '500',
            status: 'SERVER_ERROR', 
            message: 'Internal server error!' 
        })
    }
}

exports.create = async (req, res) => {
    try {
        const picsData      = req.files.profilePics
        const docData       = req.files.document

        // console.log(picsData)

        const fullName      = req.query.fullName ? req.query.fullName : (req.body.fullName ? req.body.fullName : req.params.fullName)
        const tglLahir      = req.query.tglLahir ? req.query.tglLahir : (req.body.tglLahir ? req.body.tglLahir : req.params.tglLahir)
        const gender        = req.query.gender ? req.query.gender : (req.body.gender ? req.body.gender : req.params.gender)
        const profilePics   = 'profile_pics'
        const majors        = req.query.majors ? req.query.majors : (req.body.majors ? req.body.majors : req.params.majors)
        const document      = 'document'

        const data = {
            studentId       : uuidv4(),
            fullName        : fullName,
            tglLahir        : tglLahir,
            gender          : gender,
            profilePics     : profilePics,
            majors          : majors,
            document        : document
        }

        // console.log(JSON.stringify(data))
        
        // const student = await studentModel.create({
        //     ...data,
        // })

        // console.log(student)
        res.json({ status: 'Success' })
    } catch (err) {
        console.log(new Error(err))
        res.status(500).send('Internal Server Error')
    }
}