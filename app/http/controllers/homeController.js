const projects = require('../../models/createProject')
function homeController() {
    return {
         async index(req,res) {
             try{
                const data = await projects.find()
                console.log(data)
                res.render('home',{data})
             }
             catch(err){
                 console.log(err)
             }
        }
    }
}

module.exports = homeController
