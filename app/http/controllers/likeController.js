const project = require('../../models/createProject')
function likeController () {
    return {
        async like(req,res) {
            const {post,user} =req.body
            post.likes.push(user.email)
            const item =await project.updateOne({_id:post._id},{$set:{"likes":post.likes}})
            res.send(post)
        },
        async unlike(req,res){
            const {post,user} =req.body
            const indexOfUser = post.likes.indexOf(user.email)
            post.likes.splice(indexOfUser,1)
            const item =await project.updateOne({_id:post._id},{$set:{"likes":post.likes}})
            res.send(post)

        }
    }
}

module.exports = likeController