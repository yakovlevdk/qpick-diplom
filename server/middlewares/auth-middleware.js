const jwt = require("jsonwebtoken");
const User = require('../models/User')
const sign = "test";
module.exports = async function (req, res, next) {
    try {
        const tokenData =  jwt.verify(req.cookies.token, sign);
        console.log(tokenData)
        const user = await User.findOne({ _id: tokenData.id });
        console.log(user)
        if (!user) {
            res.send({ error: 'Authenticated user not found' })
            return;
        }
        req.user = user;

        next();
    } catch (e) {
        res.send({ error: e.message || 'Token error' })
    }
        //   const tokenData =  jwt.verify(req.cookies.token, sign);
        // console.log(tokenData)
}