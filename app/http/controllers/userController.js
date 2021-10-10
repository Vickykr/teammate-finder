const { compareSync } = require('bcrypt')
const projects = require('../../models/createProject')
const users = require('../../models/register')
function userController() {
    return {
        async dashboard(req,res) {
            const myProjects = await projects.find({userId:req.session.user._id})
            for(let i=0;i<myProjects.length;i++)
            {
                const userInfo = await users.find({_id:myProjects[i].userId}).select(['-password','-role','-createdAt','-updatedAt'])
                console.log(userInfo)
                myProjects[i].userInfo = userInfo //userInfo is an array
            }
            res.render('dashboard',{myProjects})
        },
        create(req,res) {
            res.render('create')
        },
        async postCreate(req, res) {
            const {name,description} = req.body
            const item = new projects({
                name,
                description,
                userId:req.session.user._id
            })
            await item.save()
            res.redirect('/user/dashboard')
        },
        async edit(req,res) {
            const data = await projects.find({_id:req.body.id})
            res.render('edit',{data})
        },
        async editSave(req,res) {
            try{
                const {name,description,id} = req.body
                const data = await projects.updateOne({_id:id},{$set: {name,description}})
                const myProjects = await projects.find({userId:req.session.user._id})
                res.render('dashboard',{myProjects})
            }catch(err){
                console.log(err)
            }
        },
        async deletePost(req,res) {
            try{
                const {id} = req.body
                const data = await projects.deleteOne({_id:id})
                const myProjects = await projects.find({userId:req.session.user._id})
                res.render('dashboard',{myProjects})
            }catch(err){
                console.log(err)
            }
        }
    }
}

module.exports = userController