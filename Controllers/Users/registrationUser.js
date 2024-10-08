const authModule = require('../../Modules/Authontication')
const bcrypt = require('bcrypt')
const soltRound = 10


const userRegFormController = (req , res)=>{
    res.render('signup')
}

const userRegFormPostController = async (req , res) => {
    const password = req.body.password
    const confirmPassword = req.body.conpassword
    if(password === confirmPassword){
        bcrypt.hash(password , soltRound , async(err , hashPassword)=>{
            try{
                const UserInfo = {
                    name : req.body.name,
                    email : req.body.email,
                    phone : req.body.phone,
                    password : hashPassword,
                   }
                   const UserData = new authModule(UserInfo)
                   await UserData.save()
                   res.redirect('/login')
            }catch(err){
                res.send("your Email id is alredy existed....")
            }
          
        })
    }else{
        res.redirect('/signup')
    }
    
}

module.exports = {userRegFormController , userRegFormPostController}