const User = require("../Model/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//Register
exports.register = async (req,res)=>
{
    try {
        
        const {userName , email , password} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser)
        {
            res.status(400).json({
                message: " User Exists"
            })
        }

       const encryptedPassword =  await bcrypt.hash(password,10);

      const token = await jwt.sign({userId: existingUser._id},"youtube@123",{
        expiresIn : "7d"
    });

    res.cookie('token', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 7 * 24 * 60 * 60 * 1000, 
        sameSite: 'Strict', 
      });


    const newUser = await User({
        userName,
        email,
        encryptedPassword
    })

    await newUser.save();

    res.status(200).json({
        message: " Signup Successfull",
        user: {
            id: newUser._id,
            userName: newUser.userName,
            email: newUser.email,
        }
    })


    } catch (error) {
        
        res.status(500).json({message:"Error while logging In"})
    }
}


//Login
exports.login = async (req,res)=>
{
    try 
    {
        const {email,password} = req.body;

        const existingUser =  await User.findOne({email});

        if(!existingUser)
        {
            res.status(400).json({message:"User is not present"});
        }

        const match = await bcrypt.compare(password,existingUser.password);

        if(!match){
            res.status(400).json({message:"Invalid Credentials"});
        }

       const token = await jwt.sign({userId: existingUser._id},"youtube@123",{
            expiresIn : "7d"
        });

        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            sameSite: 'Strict', 
          });

          res.json({
            message:"Login Successfully!!",
            user : {id: existingUser._id, userName : existingUser.userName, email: existingUser.email}
        
        })
        
    } catch (error) {
        res.status(500).json({message:"Error while logging In"})
        
    }
}

//logout

exports.logout =  async (req,res)=>
{
    try {

        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        })

        res.json({ msg: 'Logout successful' });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}