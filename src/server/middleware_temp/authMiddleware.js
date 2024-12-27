const jwt = require("jsonwebtoken");

module.exports = async (req,res,next)=>
{
    try {
        
        const token = res.cookies.token;
        
        if(!token)
        {
            return res.status(400).json({
                message: "Authentication Token Not Valid"
            })
        }

        const verified = jwt.verify(token,"youtube@123");

        req.user = { _id: verified.userId };

        next();

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}