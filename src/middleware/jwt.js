const jwt = require('jsonwebtoken');

const authentication = (req, res, next)=>{

    try {
        
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if(!token) {
            return res.status(401).json({ error:`Invalid authorization`})
        }
        const secretKey = process.env.jwtPrivateKey;

        const tokenDecode = jwt.verify(token, secretKey);
        req.email = tokenDecode.email;
        next();
        
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}


module.exports = authentication;