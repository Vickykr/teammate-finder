const auth = require('../app/http/middlewares/auth')
const authController = require('../app/http/controllers/authController')
const homeController = require('../app/http/controllers/homeController')
const userController = require('../app/http/controllers/userController')

function initRoutes(app){

    app.get('/', homeController().index)
    app.get('/login', authController().login)
    app.post('/login',authController().postLogin)
    app.get('/register',authController().register )
    app.post('/register',authController().postRegister)
    app.post('/logout',auth,authController().logout)

    app.get('/user/dashboard',auth,userController().dashboard)
    app.get('/user/create',auth,userController().create)
    app.post('/user/create', auth, userController().postCreate)
    app.post('/user/edit',auth,userController().edit)
}
module.exports = initRoutes