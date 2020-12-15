// npm install jsonwebtoken --save
const jwt = require('jsonwebtoken');
const str = "djflasdksjflaflkfjalfjalsfjalsdfjla"

//创建token的方法
function createToken(obj) {
    obj.time = Date.now()
    console.log(obj);  //{ login: true, user_name: 'admin', time: 1607330146834 }
    return jwt.sign(obj, str, { expiresIn: 60 * 60 });
}

//验证token
function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, str, (err, data) => {
            if (err) {
                reject("token失效")
            }
            resolve(data)
        });
    })
}

module.exports = {
    createToken,
    verifyToken
}