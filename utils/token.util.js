import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({uid: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'});
}