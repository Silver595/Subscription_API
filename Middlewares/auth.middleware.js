import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from database
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        req.user = user;
        next(); // Call next middleware
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: 'Unauthorized', error: err.message });
    }
}

export default authorize;
