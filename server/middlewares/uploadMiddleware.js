const multer         = require('multer')
const { v4: uuidv4 } = require('uuid')
const fs             = require('fs')
const AWS            = require('aws-sdk')

const filesUploadLocalStorage = (req, res, next) => {
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            const path = 'tmp'

            if (!fs.existsSync(path)){
                fs.mkdirSync(path)
            }

            if (file.fieldname === "profilePics") { // if uploading resume
                callback(null, (path))
            } else { // else uploading image
                callback(null, (path))
            }
        },
        filename: (req, file, callback) => {
            if (file.fieldname === "profilePics") {
                let filetypePics = file.mimetype === 'image/png' ? 'png' : (file.mimetype === 'image/jpg' ? 'jpg' : (file.mimetype === 'image/jpeg' && 'jpeg'))
                callback(null, `${uuidv4()}.${filetypePics}`)
            } else {
                let filetypePdf = file.mimetype === 'application/pdf' ? 'pdf' : (file.mimetype === 'image/jpg' ? 'jpg' : (file.mimetype === 'image/jpeg' && 'jpeg'))
                callback(null, `${uuidv4()}.${filetypePdf}`)
            }
            
        }
    })

    const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if ( file.fieldname === 'profilePics' && file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ) {
                cb(null, true)
            } else if (file.fieldname === 'document' && file.mimetype == "application/pdf") {
                cb(null, true)
            } else {
                cb(null, false)
                return cb(new Error({code: 'ERR_UPLOAD_FILE_TYPE', msg: 'Only .png, .jpg and .jpeg format allowed!'}))
            }
        }
    }).fields([{ name: 'profilePics', maxCount: 1 }, { name: 'document', maxCount: 1 }])

    upload(req, res, (err) => {
        if (err) {
            console.log(new Error(err))
            return res.status(500).json({
                code: err.code ? err.code : 'ERR_UPLOAD_FILE',
                status: 'Error Upload File!',
                message: err.msg ? err.msg : err
            })
        } else {
            next()
        }
    })
}

const filesUploadS3 = (req, res, next) => {
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })

    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            const path = 'tmp'

            if (!fs.existsSync(path)){
                fs.mkdirSync(path)
            }

            if (file.fieldname === "profilePics") { // if uploading resume
                callback(null, (path))
            } else { // else uploading image
                callback(null, (path))
            }
        },
        filename: (req, file, callback) => {
            if (file.fieldname === "profilePics") {
                let filetypePics = file.mimetype === 'image/png' ? 'png' : (file.mimetype === 'image/jpg' ? 'jpg' : (file.mimetype === 'image/jpeg' && 'jpeg'))
                callback(null, `${uuidv4()}.${filetypePics}`)
            } else {
                let filetypePdf = file.mimetype === 'application/pdf' ? 'pdf' : (file.mimetype === 'image/jpg' ? 'jpg' : (file.mimetype === 'image/jpeg' && 'jpeg'))
                callback(null, `${uuidv4()}.${filetypePdf}`)
            }
            
        }
    })

    const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if ( file.fieldname === 'profilePics' && file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ) {
                cb(null, true)
            } else if (file.fieldname === 'document' && file.mimetype == "application/pdf") {
                cb(null, true)
            } else {
                cb(null, false)
                return cb(new Error({code: 'ERR_UPLOAD_FILE_TYPE', msg: 'Only .png, .jpg and .jpeg format allowed!'}))
            }
        }
    }).fields([{ name: 'profilePics', maxCount: 1 }, { name: 'document', maxCount: 1 }])

    upload(req, res, (err) => {
        if (err) {
            console.log(new Error(err))
            return res.status(500).json({
                code: err.code ? err.code : 'ERR_UPLOAD_FILE',
                status: 'Error Upload File!',
                message: err.msg ? err.msg : err
            })
        } else {
            if (req.files.profilePics) {
                console.log(req.files.profilePics[0].filename)
            }

            if (req.files.document) {
                console.log(req.files.document[0].filename)
            }

            res.status(200).json({ test: 'test'})
            // if ( req.files.profilePics || req.files.docuement ) {
            //     const fileContent = fs.readFileSync(req.fi)
            //     console.log('ada file nya')
            // } else {
            //     next()
            // }
        }
    })
}

module.exports = { filesUploadLocalStorage, filesUploadS3 }