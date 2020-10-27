const errStatusJoin = require('../helpers/errStatus')

module.exports = (err, req, res, next) => {
    const errName = err.name
    const errErrors = err.errors

    // * Default Sequelize Error Message
    const uniqueErr = `SequelizeUniqueConstraintError`
    const validationErr = `SequelizeValidationError`

    // * Custom Error Message
    const loginErr = `User Not Found`
    const unauthorizedErr = `Unauthorized`
    const unknownTodo = `Todo doesn't exist`

    let message = 'Internal Server Error'
    let status = 500

    switch(errName) {
        case uniqueErr:
            message = errStatusJoin(errErrors)
            status = 400
            break

        case validationErr:
            message = errStatusJoin(errErrors)
            status = 400
            break

        case loginErr:
            message = loginErr
            status = 400
            break

        case unauthorizedErr:
            message = unauthorizedErr
            status = 401
            break
            
        case unknownTodo:
            message = unknownTodo
            status = 404
            break
    }

    res.status(status).json({ msg: message})
}