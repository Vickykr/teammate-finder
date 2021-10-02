const { count } = require('../../models/createProject')
const projects = require('../../models/createProject')
function userController() {
    return {
        async dashboard(req,res) {
            const myProjects = await projects.find({userId:req.session.user._id})
            res.render('dashboard',{myProjects})
        },
        create(req,res) {
            res.render('create')
        },
        async postCreate(req, res) {
            console.log(req.body)
            const {name,description} = req.body
            const item = new projects({
                name,
                description,
                userId:req.session.user._id
            })
            console.log(item)
            await item.save()
            res.redirect('/user/dashboard')
        },
        edit(req,res) {
            
        }
    }
}

module.exports = userController