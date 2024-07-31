const jwt = require('jsonwebtoken')

async function authToken(req,res,next){
    try{
        const token = req.headers.authorization;
       console.log("token",token)
        if(!token){
            return res.status(200).json({
                message : "Please Login...!",
                error : true,
                success : false
            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            console.log(err)
            console.log("decoded",decoded)
            
            if(err){
                console.log("error auth", err)
            }

            req.userId = decoded?._id

            next()
        });

//         const crypto = require('crypto');
// const secret = crypto.randomBytes(64).toString('hex');
// console.log(secret);


    }catch(err){
        res.status(400).json({
            message : err.message || err,
            data : [],
            error : true,
            success : false
        })
    }
}


module.exports = authToken


// const jwt = require('jsonwebtoken');

// async function authToken(req, res, next) {
//     try {
//         const authHeader = req.headers.authorization;

//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(401).json({
//                 message: "Please Login...!",
//                 error: true,
//                 success: false
//             });
//         }

//         const token = authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
//         console.log("Token:", token);

//         if (!token) {
//             return res.status(401).json({
//                 message: "Token is missing",
//                 error: true,
//                 success: false
//             });
//         }

//         jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
//             if (err) {
//                 console.log("Token verification error:", err);
//                 return res.status(401).json({
//                     message: "Invalid token",
//                     error: true,
//                     success: false
//                 });
//             }

//             req.userId = decoded._id;
//             next();
//         });
//     } catch (err) {
//         res.status(400).json({
//             message: err.message || err,
//             data: [],
//             error: true,
//             success: false
//         });
//     }
// }

// module.exports = authToken;
