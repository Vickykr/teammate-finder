const bcrypt = require('bcrypt')
const User = require('../../models/register')
function authController () {
    return {
        async postLogin(req,res) {
            const {email,password} = req.body;
            if(!email || !password)
            {
                req.flash('error','All fields required')
                req.flash('email',email)
                res.redirect('/login')
            }
            else {
                const user = await User.findOne({email})
                if(!user)
                {
                    req.flash('error','Not registered')
                    res.redirect('/register')
                }
                else{
                    try{
                        const correctPass = await bcrypt.compare(password, user.password)
                        
                        if(correctPass)
                        {
                            req.session.isAuth = true
                            req.session.user = user
                            res.redirect('/user/dashboard')
                        }
                        else
                        {
                            req.flash('error','Wrong credentials')
                            res.redirect('/login')
                        }
                    }catch(err){
                        console.log(err)
                    }
                }
            }
        },
        async postRegister(req,res) {
            const {name,email,password,cpassword} = req.body;
            if(!name || !email || !password || !cpassword)
            {
                req.flash('error','All fields required')
                req.flash('name',name)
                req.flash('email',email)
                res.redirect('/register')
            }
            else if(password != cpassword)
            {
                req.flash('error','Password donot match')
                req.flash('name',name)
                req.flash('email',email)
                res.redirect('/register')
            }
            else 
            {
                const exists = await User.exists({email})
                if(exists)
                {
                    req.flash('error','email taken')
                    req.flash('name',name)
                    req.flash('email',email)
                    res.redirect('/register')
                }
                else
                {
                    const saltRounds = 10
                    try{
                        const hashedPass = await bcrypt.hash(password, saltRounds)
                        const user = new User({
                            name,
                            email,
                            password:hashedPass
                        })
                        await user.save()
                        console.log('saved');
                        res.redirect('/login')
                    }catch(err){
                        console.log(err)
                    }
                }
            }
        },
        login(req,res) {
            res.render('login')
        },
        register(req,res) {
            res.render('registration')
        },
        logout (req,res) {
            req.session.destroy(err =>{
                if(err)
                {
                    console.log(err)
                }
                else{
                    res.redirect('/login')
                }
            })
        }
    }
}
module.exports = authController