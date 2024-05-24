import jwt from 'jsonwebtoken';

export async function Auth(req, res, next){
    let token;
    if(req.headers.authorization)
        token = req.headers.authorization.split(" ")[1];
    // const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
}
