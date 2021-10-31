const { compareSync } = require('bcrypt')
const projects = require('../../models/createProject')
const users = require('../../models/register')
function userController() {
    return {
        async dashboard(req,res) {
            const myProjects = await projects.find({userId:req.session.user._id})
            for(let i=0;i<myProjects.length;i++)
            {
                const userInfo = await users.find({_id:myProjects[i].userId}).select(['-password','-role','-updatedAt'])
                var date = new Date(userInfo[0].createdAt.toString());
                date = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear()
                userInfo[0].date = date
                myProjects[i].userInfo = userInfo //userInfo is an array
            }
            myProjects.reverse()
            res.render('dashboard',{myProjects})
        },
        create(req,res) {
            res.render('create')
        },
        async postCreate(req, res) {
            const {name,description,progress} = req.body
            const item = new projects({
                name,
                description,
                progress,
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
                const {name,description,progress,id} = req.body
                const data = await projects.updateOne({_id:id},{$set: {name,description,progress}})
                const myProjects = await projects.find({userId:req.session.user._id})
                res.redirect('/user/dashboard')
            }catch(err){
                console.log(err)
            }
        },
        async deletePost(req,res) {
            try{
                const {id} = req.body
                const data = await projects.deleteOne({_id:id})
                const myProjects = await projects.find({userId:req.session.user._id})
                res.redirect('/user/dashboard')
            }catch(err){
                console.log(err)
            }
        }
    }
}

module.exports = userController