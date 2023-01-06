const dotenv = require("dotenv");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dbConnection = require('../config/dbConnection').database;
const User = require("../model/user")

//Save sensitive information
dotenv.config({ path: './.env'});


exports.register = async (req,res) => {

    var name =req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;

    try {
        const user = await User.findOne({where: {email : email}})
        if (!user) {
            if( password !== passwordConfirm){
                return res.render('register', {
                    message: 'Passwords do not match'
                })
            }else{
            const hashedPassword = await bcrypt.hash(password, 8);
    
            // Create a new user with the provided name, email, and hashed password
            const newUser = User.create({
                name,
                email,
                password: hashedPassword,
            });
            return res.render('register', {
                message: 'User Registered'
            });
        }
            
        }else if(user){
            return res.render('register', {
                message: 'User already Exits, please Login'
            })
        } 
        } catch (error) {
            console.log(error)
        }
    }



exports.login = async (req,res) => {
    var { email, password } = req.body
    // Check if username and password is provided
    if (!email || !password) {
        return res.render('login', {
            message: "Username or Password not present",
        });
    }

    try {
        const user = await User.findOne({ email, password })
        
        if (!user) {
            return res.render('login', {
                message: 'User not Found, Please Register'
            });
        } else {
            //Compare both hashed password
            const dbpassword = user.password
            bcrypt.compare(password,dbpassword).then((match) =>{
                //return incorrect password if it doesnt match
                if(!match){
                    return res.render('login', {
                        message: 'Incorrect Password'
                    });
                //return loggin if it matches 
                }else{


                    //Write code for authenticated users, JWT and cookie parser
                    return res.render('login', {
                        message: 'Logged in'
                    });
                }
            })
        }
        } catch (error) {
            console.log(error)
        }
    
}