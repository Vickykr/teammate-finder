const projects = require('../../models/createProject')
const users = require('../../models/register')
function homeController() {
    return {
         async index(req,res) {
             try{
                const data = await projects.find()
                for(let i=0;i<data.length;i++)
                {
                    const userInfo = await users.find({_id:data[i].userId}).select(['-password','-role','-updatedAt'])
                    var date = new Date(userInfo[0].createdAt.toString());
                    date = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear()
                    userInfo[0].date = date
                    data[i].userInfo = userInfo //userInfo is an array
                }
                //console.log(data[0].userInfo[0].email)
                data.reverse()
                res.render('home',{data})
             }
             catch(err){
                 console.log(err)
             }
        }
    }
}

module.exports = homeController
