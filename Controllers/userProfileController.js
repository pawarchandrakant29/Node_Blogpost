const username = require('../Modules/Authontication')
const bcrypt = require('bcrypt')



const changePassowrdController = ( req , res) => {
    res.render('changPassword')
}

const updatePassController =(req , res) =>{
    const {password} = req.user;
    const {old_pass , new_pass , conf_pass} = req.body;

    bcrypt.compare(old_pass , password , (err , result)=>{
        if(result){
            if(new_pass == conf_pass){
                bcrypt.hash(new_pass , 10 , async (err , hash)=>{

                    if(err) {
                        res.redirect('/changPassword')
                    }else{
                        const updatepass = await username.updateOne({_id : req.user._id} , {password: hash })
                    }
                   
                })
                res.redirect('/')
            }
        }else{
            res.redirect('/changPassword')
        }
    } )
}


const getChangeProfile =async (req , res) =>{
    const id = req.params.id
   const userInfo = await username.findById(id)
    res.render('changeName_or_Phone',{userInfo : userInfo})
}

const updateInfoController = async (req , res) => {
    const id = req.params.id
    const userRec = await username.findById(id)
    
    userRec.name = req.body.new_name || userRec.name
    userRec.phone = req.body.new_phone || userRec.phone
    const UpdateRec = await username.findByIdAndUpdate(id , userRec , {new : true})
    res.redirect('/')
}

module.exports = {  changePassowrdController , updatePassController , getChangeProfile , updateInfoController};