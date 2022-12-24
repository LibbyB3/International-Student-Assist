const mysql = require("mysql");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//Save sensitive information
dotenv.config({ path: './.env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
})

exports.register = (req,res) => {
    console.log(req.body);

    const name =req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    db.query("SELECT email FROM users WHERE email = ?", [email], async (error,results) =>{
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            return res.render('register', {
                message: 'Email is already in use'
            });
        }else if( password !== passwordConfirm){
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        let hashedPassword =await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query("Insert into users set ?",{ name: name,email: email,password: hashedPassword }, (error,results) =>{
            if(error){
                console.log(error);
            }else{
                console.log(results)
                return res.render('register', {
                    message: 'User registered'
                });
            }
        })



    })


}