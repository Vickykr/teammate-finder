// async function editPost(id) {
//     try{
//         const url = 'http://localhost:5000/user/edit'
//         const res = await fetch(`${url}`,
//             {
//                 method:'POST',
//                 redirect: `${url}`,
//                 headers: {
//                     'Accept' : 'application/json',
//                     'Content-Type' : 'application/json'
//                 },
//                 body : JSON.stringify({
//                     id
//                 })
//             })
//     }
//     catch(err) {
//         console.log(err)
//     }
// }


const like = document.querySelectorAll('.like')

function updateDOM(){
    like.forEach((item) => {
            let post = JSON.parse(item.dataset.post)
            item.innerHTML = post.likes.length + " Like"
    })
}
updateDOM()
async function addLike (post,user) {
    const url = '/like'
    const options = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            post,
            user
        })
    }
    const res = await fetch(url,options)
    return await res.json()
}
async function removeLike (post,user) {
    const url = '/unlike'
    const options = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            post,
            user
        })
    }
    const res = await fetch(url,options)
    return await res.json()
}
like.forEach((item) => {
    item.addEventListener('click', async (e) => {
        let post = JSON.parse(item.dataset.post)
        let user = JSON.parse(item.dataset.user)
        console.log(post.likes.includes(user.email))
        if(!post.likes.includes(user.email))
        {
            console.log('liked')
            item.dataset.post = JSON.stringify(await addLike(post,user))
        }
        else
        {
            console.log('unliked')
            item.dataset.post = JSON.stringify(await removeLike(post,user))
        }
         post = JSON.parse(item.dataset.post)
        console.log(user)
        console.log('Update')
        updateDOM()
    })
})