const majorModel      = require('../models/majors')

exports.index = async (req, res) => {
    try {
        const majorsData = await majorModel.findAll()

        if (majorsData.length > 0) {
            const resData = JSON.stringify(majorsData)
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