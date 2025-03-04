import aj from '../config/arcject.js';

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 5 });

        if (!decision || typeof decision.isDenied !== "function") {
            return next(new Error("Invalid Arcjet response"));
        }

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) { return res.status(429).json({ message: 'Rate limit exceeded' });}
            if (decision.reason.isBot()) {return res.status(403).json({ message: 'Bot detected' });}
            return res.status(403).json({ message: 'Access denied' });
        }

        // If access is granted, proceed to the next middleware
        next();

    } catch (error) {
        console.error("Arcjet middleware error:", error);
        next(error)
    }
};

export default arcjetMiddleware;
