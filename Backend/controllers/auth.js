const dotenv = require("dotenv");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dbConnection = require('../config/dbConnection').database;
const { User, Task } = require("../model/user")
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require('../JWT')


//Save sensitive information
dotenv.config({ path: './.env' });





exports.register = async (req, res) => {

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;

    try {
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            if (password !== passwordConfirm) {
                return res.render('register', {
                    message: 'Passwords do not match'
                })
            } else {
                const hashedPassword = await bcrypt.hash(password, 8);

                // Create a new user with the provided name, email, and hashed password
                const newUser = User.create({
                    name,
                    email,
                    password: hashedPassword,
                    role: "user"
                }).then((newUser) => {
                    //Write code for authenticated users, JWT 
                    const accessToken = createTokens(newUser)

                    res.cookie("access-token", accessToken, {
                        httpOnly: true,
                        maxAge: 12 * 60 * 60 * 1000
                    });

                    const newTask = Task.create({
                        userId: newUser.id
                    })
                        .then(() => console.log("Task created for User"))
                        .catch((error) => console.log(error));

                    return res.redirect('/task/get-started');
                });
            }

        } else if (user) {
            return res.render('register', {
                message: 'User already Exits, please Login'
            })
        }
    } catch (error) {
        console.log(error)
    }
}



exports.login = async (req, res) => {
    var { email, password } = req.body
    // Check if username and password is provided
    if (!email || !password) {
        return res.render('login', {
            message: "Username or Password not present",
        });
    }

    try {

        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            return res.render('login', {
                message: 'User not Found, Please Register'
            });
        } else {
            //Compare both hashed password
            const dbpassword = user.password
            bcrypt.compare(password, dbpassword).then((match) => {
                //return incorrect password if it doesnt match
                if (!match) {
                    return res.render('login', {
                        message: 'Incorrect Password'
                    });
                    //return loggin if it matches 
                } else {

                    //Write code for authenticated users, JWT 
                    const accessToken = createTokens(user)

                    res.cookie("access-token", accessToken, {
                        httpOnly: true,
                        maxAge: 12 * 60 * 60 * 1000
                    });

                    return res.redirect("/task");
                }
            })
        }
    } catch (error) {
        console.log(error)
    }

}