async function editPost(id) {
    try{
        const url = 'http://localhost:5000/user/edit'
        const res = await fetch(`${url}`,
            {
                method:'POST',
                redirect: `${url}`,
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    id
                })
            })
    }
    catch(err) {
        console.log(err)
    }
}