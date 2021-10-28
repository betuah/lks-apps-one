const quizModel = require('../models/quiz')

exports.index = async (req, res) => {
    res.status(200).send('Hello Exam public API Entry point here :D! \n\nList of API Endpoint :\n- /exam/quiz = List of all exam data \n- /exam/init = Initial exam data \n- /exam/flush = Remove all data.')
}

exports.getAllData = async (req, res) => {
    try {
        quizModel.find({}).then((data) => {
            if (data.length > 0) {
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
        }).catch((err) => {
            res.status(500).json({ status: "Error", code: "500", msg: "Internal Server Error"})
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
}

exports.create = async (req, res) => {
    try {
        const quizData = {
            examCode: "AMSN_EXAM",
            examTitle: "Addmission Exam",
            quiz: [
                {
                    quizId: 1,
                    quizTitle: "Quiz number 1",
                    options: [
                        { optionId: "A", option: "options A" },
                        { optionId: "B", option: "options B" },
                        { optionId: "C", option: "options C" },
                        { optionId: "D", option: "options D" }
                    ],
                    answer: "A"
                },
                {
                    quizId: 2,
                    quizTitle: "Quiz number 2",
                    options: [
                        { optionId: "A", option: "options A" },
                        { optionId: "B", option: "options B" },
                        { optionId: "C", option: "options C" },
                        { optionId: "D", option: "options D" }
                    ],
                    answer: "C"
                },
                {
                    quizId: 3,
                    quizTitle: "Quiz number 3",
                    options: [
                        { optionId: "A", option: "options A" },
                        { optionId: "B", option: "options B" },
                        { optionId: "C", option: "options C" },
                        { optionId: "D", option: "options D" }
                    ],
                    answer: "D"
                },
                {
                    quizId: 4,
                    quizTitle: "Quiz number 4",
                    options: [
                        { optionId: "A", option: "options A" },
                        { optionId: "B", option: "options B" },
                        { optionId: "C", option: "options C" },
                        { optionId: "D", option: "options D" }
                    ],
                    answer: "D"
                },
                {
                    quizId: 5,
                    quizTitle: "Quiz number 5",
                    options: [
                        { optionId: "A", option: "options A" },
                        { optionId: "B", option: "options B" },
                        { optionId: "C", option: "options C" },
                        { optionId: "D", option: "options D" }
                    ],
                    answer: "D"
                },
                {
                    quizId: 6,
                    quizTitle: "Quiz number 6",
                    options: [
                        { optionId: "A", option: "options A" },
                        { optionId: "B", option: "options B" },
                        { optionId: "C", option: "options C" },
                        { optionId: "D", option: "options D" }
                    ],
                    answer: "D"
                },
                {
                    quizId: 7,
                    quizTitle: "Quiz number 7",
                    options: [
                        { optionId: "A", option: "options A" },
                        { optionId: "B", option: "options B" },
                        { optionId: "C", option: "options C" },
                        { optionId: "D", option: "options D" }
                    ],
                    answer: "D"
                },
                {
                    quizId: 8,
                    quizTitle: "Quiz number 8",
                    options: [
                        { optionId: "A", option: "options A" },
                        { optionId: "B", option: "options B" },
                        { optionId: "C", option: "options C" },
                        { optionId: "D", option: "options D" }
                    ],
                    answer: "D"
                },
                {
                    quizId: 9,
                    quizTitle: "Quiz number 9",
                    options: [
                        { optionId: "A", option: "options A" },
                        { optionId: "B", option: "options B" },
                        { optionId: "C", option: "options C" },
                        { optionId: "D", option: "options D" }
                    ],
                    answer: "D"
                },
                {
                    quizId: 10,
                    quizTitle: "Quiz number 10",
                    options: [
                        { optionId: "A", option: "options A" },
                        { optionId: "B", option: "options B" },
                        { optionId: "C", option: "options C" },
                        { optionId: "D", option: "options D" }
                    ],
                    answer: "D"
                }
            ]
        }

        quizModel.create(quizData).then((data) => {
            res.status(201).json({ status: "Success", code: 201, msg: "Success insert data.", data: data});
        }).catch((err) => {
            console.log(err)
            res.status(400).json({ status: 'Error', code: err.code ? err.code : 400, msg: err.code === 11000 ? 'Initial Exam data is already exist!' : 'Failed Saving Data. Please fill all required fields!' })
        })
    } catch (error) {
        
    }
}

exports.flush = async (req, res) => {
    try {
        quizModel.deleteMany({ examCode: 'AMSN_EXAM' })
        .then(data => {
            let resData = {}

            console.log(data.deletedCount)

            if (data.deletedCount === 0) {
                resData = {
                    status: "EMPTY_DATA",
                    code: 200,
                    massage: "No data deleted."
                }
            } else {
                resData = {
                    status: "Success",
                    code: 200,
                    massage: "Flushing data success."
                }
            }
            res.status(200).json(resData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ status: 'Failed', code: 500, 'msg' : 'Failed flushing data!'})
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 'Error', code: 400, msg:'Internal Server Error'})
    }
}