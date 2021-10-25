const multer         = require('multer')
const multerS3       = require('multer-s3')
const { v4: uuid }   = require('uuid')
const fs             = require('fs')
const AWS            = require('aws-sdk')
const env            = require('../env')

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
                callback(null, `${uuid()}.${filetypePics}`)
            } else {
                let filetypePdf = file.mimetype === 'application/pdf' ? 'pdf' : (file.mimetype === 'image/jpg' ? 'jpg' : (file.mimetype === 'image/jpeg' && 'jpeg'))
                callback(null, `${uuid()}.${filetypePdf}`)
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
        accessKeyId: env.aws.accessKeyId,
        secretAccessKey: env.aws.secretAccessKey
    })

    const storageS3 = multerS3({
        s3: s3,
        bucket: env.aws.Bucket,
        key: (req, file, callback) => {
            if (file.fieldname == "profilePics") {
                let fileExtPics = file.mimetype === 'image/png' ? 'png' : (file.mimetype === 'image/jpg' ? 'jpg' : (file.mimetype === 'image/jpeg' && 'jpeg'))
                callback(null, `pictures/${uuid()}.${fileExtPics}`)
            } else if (file.fieldname == "document") {
                let fileExtPdf = 'pdf'
                callback(null, `documents/${uuid()}.${fileExtPdf}`)
            } else {
                callback('ERR_FIELDNAME', null)
            }
        }
    })

    const upload = multer({
        storage: storageS3,
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

module.exports = { filesUploadLocalStorage, filesUploadS3 }