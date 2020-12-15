//引入dbmokuai
const { requestQuery, connection } = require("../database/db")
//加密模块
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
//格式化时间模块
const monent = require("moment")
const JWT = require("./token")//lingpaitoken
const { iHuyi } = require("./HUQIAN") //手机验证码模块
//验证码
const svgCaptcha = require('svg-captcha');  //下载安装  cnpm install svg-captcha --save
//定义一个变量来临时存储手机号
var tempPhone = null
//定义一个变量来存储临时手机验证码
var tempCode = null
//定义一个变量来存储随机验证码
var tempCaptcha = null
//定义密码
var temppassword = null;
// var phoneca =null
//用户列表
exports.UserList = async (req, res) => {
    const userSql = "SELECT * FROM users WHERE is_show=1"
    const userList = await requestQuery(userSql)
    res.json({
        data: userList
    })
    // console.log(req);
}
exports.UserRegister = async (req, res) => { //用户注册
    // console.log(11111);
    let user_name = req.body.username;
    //   console.log(user_name);
    let password = req.body.password;
    let phone = req.body.phone;
    let address = req.body.address;
    let age = req.body.age;
    let sex = req.body.sex;
    let email = req.body.email;
    let nowDate = monent().format('YYYY-MM-DD HH:mm:ss');
    console.log(nowDate);
    const sql = `SELECT phone from users WHERE user_name=? AND is_show=1`
    console.log(req.body);
    connection.query(sql, [user_name], (err, result) => {
        //   console.log(222);
        console.log(result);

        if (err) {
            return res.json({
                msg: "用户注册失败",
                status: 1001,
                data: err
            })
        }
        if (result == "") {
            let sql_phone = `SELECT phone from users WHERE phone=? AND is_show=1`
            connection.query(sql_phone, [phone], (err, result_phone) => {
                // console.log(333);
                if (err) {

                    return res.json({
                        msg: "用户注册失败",
                        status: 1002,
                        data: err
                    })
                }
                //获取当前时间  2020-12-07 11:19:30


                console.log(888);
                //result_phone 为空，说明手机号可用
                if (result_phone == "") { //条件1成立说明手机号可用
                    //给密码加密
                    const hashpassword = bcrypt.hashSync(password, salt)
                    let add_sql = `insert into users set user_name=?,login_password=?,phone=?,email=?,age=?,sex=?,address=?,is_show=1,create_time=?`
                    connection.query(add_sql, [user_name, hashpassword, phone, email, age, sex, address, nowDate], (err, addres) => {
                        // console.log(add);

                        if (err) {
                            return res.json({
                                msg: "用户注册失败",
                                status: 1002,
                                data: err
                            })
                        }

                        console.log(addres);
                        if (addres.affectedRows == 1) {

                            return res.json({
                                msg: "恭喜您注册成功，可以去登录了",
                                status: 200,
                                data: result
                            })
                        } else {
                            return res.json({
                                msg: "用户注册失败",
                                status: 1003,
                                data: err
                            })
                        }
                    })
                } else {
                    return res.json({
                        msg: "该手机号已经存在，请更换手机号注册",
                        status: 500
                    })
                }

            })
        } else {
            return res.json({
                msg: "该用户名已经存在，请更换用户名注册",
                status: 500
            })
        }




    })
}
exports.UserLogin = async (req, res) => {  //用户登录
    //需要post发送数据

    const yzm = req.body.yzm
    const username = req.body.username;
    const password = req.body.password;
    if (yzm != tempCaptcha) {
        return res.json(
            {
                msg: "验证码错误",
                status: 500
            }
        )
    } else {
        const sql = `SELECT user_name,login_password from users WHERE user_name=? AND is_show=1`
        connection.query(sql, [username], (err, result) => {
            // console.log(222);
            console.log(result);
            if (err) {
                return res.json(
                    {
                        msg: "数据库查询失败",
                        status: 500
                    }
                )
            }
            if (result == "") {
                return res.json({
                    msg: "该用户不存在,快去注册一个吧",
                    status: 1004
                })
            } else {
                const login_password = bcrypt.compareSync(password, result[0].login_password)
                // console.log(444);

                if (login_password) {
                    //    console.log(5555);
                    let token = JWT.createToken({
                        login: true,
                        user_name: username
                    })
                    return res.json({
                        status: 200,
                        msg: "登录成功",
                        data: result[0],
                        token: token
                    })
                } else {
                    //    console.log(555);

                    return res.json({
                        msg: "密码错误，请重新输入",
                        status: 500
                    })
                }

            }
        })
    }

    // console.log(req.body);
}
//生成验证码
exports.SvgCaptcha = async (req, res) => {
    var captcha = svgCaptcha.create({
        size: 4, // 字符串的长度
        ignoreChars: '0o1i', // 排除的字符
        noise: 3, // 线条
        color: true, // 文字颜色
        background: '#fff', // 背景颜色
    });
    // console.log(captcha);
    tempCaptcha = captcha.text
    res.type('svg');
    res.status(200).send(captcha.data);
    // console.log(captcha.text);
}
exports.phonecaptcha = async (req, res) => {
    let phone = req.body.phone;
    // console.log(666);
    let sql = "select *from users where phone=? and is_show=1"
    connection.query(sql, [phone], (err, result) => {
        //  console.log(result);
        if (err) {
            return res.json({
                msg: "获取验证码失败",
                status: 500
            })
        }
        if (result == "") {

            let password = '123456';

            temppassword = password
            let nowDate = monent().format('YYYY-MM-DD HH:mm:ss');
            let us = +new Date()

            let username = "yk" + us

            const hashpassword = bcrypt.hashSync(password, salt)
            // console.log(111);
            // console.log(username,hashpassword,nowDate);
            let add_sql = `insert into users set user_name=?,login_password=?,is_show=1,create_time=?`
            connection.query(add_sql, [username, hashpassword, nowDate], (err, addresult) => {
                // console.log(err);
                console.log(111);
                console.log(addresult);
                console.log(111);
            
                if (err) {
                    console.log(222);
                    res.json({
                        msg: "自动创建账号错误",
                        status: 500
                    })
                }
                if (addresult.affectedRows == 1) {
                    console.log(666);
                    console.log(333);
                    tempPhone = phone
                    var captcha = Math.floor(Math.random() * 999999)
                    tempCode = captcha;
                    console.log(captcha);
                    let MessageContent = "您的验证码是：" + tempCode + "。请不要把验证码泄露给其他人。"
                    iHuyi.send(phone, MessageContent, (err, smsId) => {
                        if (err) {
                            console.log(err.message);
                        } else {
                            res.json({
                                msg: "发送成功",
                                status: 200,
                                data: tempCode
                            })
                            console.log("SMS sent, and smsId is " + smsId);
                        }
                    })

                    return res.json({
                        msg: `为您自动创建账号成功,您的账号是${username},密码是${temppassword}`,
                        status: 200,
                        data: result
                    })
                } else {
                    console.log(444);
                    return res.json({
                        msg: `为您自动创建账号失败`,
                        status: 500,
                        data: result
                    })
                }
            })

        } else {
            tempPhone = phone

            // console.log(222);
            console.log(result);
            var captcha = Math.floor(Math.random() * 999999)
            tempCode = captcha;
            let MessageContent = "您的验证码是：" + tempCode + "。请不要把验证码泄露给其他人。"
            
            iHuyi.send(phone, MessageContent, (err, smsId) => {
                if (err) {
                    console.log(err.message);
                } else {
                    res.json({
                        msg: "发送成功",
                        status: 200,
                        data: tempCode
                    })
                    console.log("SMS sent, and smsId is " + smsId);
                }
            })
            console.log(captcha);
        }
    })

}
exports.phonelogin = async (req, res) => {
    let yzm = req.body.yzm;
    let phone = req.body.phone;
    let phoneyzm = req.body.phoneyzm;

    console.log(req.body);
    yzm;
    phoneyzm;
    let sql = "select * from  users where phone =? and is_show=1"
    connection.query(sql, [phone], (err, result) => {

        if (err) {
            return res.json({
                msg: "登录失败",
                status: 401,
            })
        }
        if (result == "") {

            //  console.log(222);
            return res.json({
                msg: "手机还未注册",
                status: 403,
            })
        } else {
            if (phone != tempPhone) {
                return res.json({
                    msg: "前后输入的手机号不一致",
                    status: 400
                })
            } else {
                if (tempCaptcha != yzm) {
                    return res.json({
                        msg: "请输入正确的验证码",
                        status: 400
                    })
                } else {
                    if (tempCode != phoneyzm) {
                        return res.json({
                            msg: "请输入正确的验证码",
                            status: 400
                        })
                    } else {
                        let user_name = result[0].user_name
                        let token = JWT.createToken({
                            login: true,
                            user_name: user_name
                        })
                        return res.json({
                            status: 200,
                            msg: "登录成功",
                            data: result[0],
                            token: token
                        })

                    }
                }
            }
            console.log(result);
            tempPhone = result[0].phone

            //  if(yzm==)
            // let yzmyz=math.floor(Math.random()*999999)
            // console.log(yzmyz); 
        }
    })
}