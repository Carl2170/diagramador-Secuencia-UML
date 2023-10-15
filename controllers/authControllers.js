const jwt = require('jsonwebtoken');
const bycrytjs = require('bcryptjs');
const conexion = require('../database/db');
const {promisify, log} = require('util');
const { error } = require('console');

exports.register =async (req,res)=>{
 try {
    const name = req.body.name
    const last_name = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    let passHash=await bycrytjs.hash(password,8);
    //console.log(passHash);
      conexion.query('INSERT INTO users SET ?',{name:name,last_name:last_name, email:email, password: passHash }, (error,results) =>{
        if(error){
            console.log('error1')
            console.log(error)
            }
            console.log('estoy aca')
        res.redirect('login');
      })
 } catch (error) {
    console.log(error);    
 } 
 

}

exports.login = async(req, res)=>{
    try {
        const email =req.body.email
        const password = req.body.password

        if(!email|| !password){
            res.render('login', {
                alert:true,
                alertTitle:"Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon:'info',
                showConfirmButton: true,
                timer:false,
                ruta:'login'
            })
        }else{
            conexion.query('SELECT * FROM users WHERE email = ?',[email], async(error,results)=>{
                if(results.length ==0 || !(await bycrytjs.compare(password, results[0].password))){
                    res.render('login', {
                        alert:true,
                        alertTitle:"Error",
                        alertMessage: "Usuario y/o contraseña incorrectos",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer:false,
                        ruta:'login'
                    }) 
                }else{
                    //inicio de sesion 
                     const id = results[0].id
                     const token = jwt.sign({id:id}, process.env.JWT_SECRETO)
                      const cookieOptions = {
                        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24*60*60 *1000),
                        httpOnly:true   
                    }
                    req.session.user=email
                    req.session.id=token
                    req.session.loggedIn =true
                    req.session.save();
                    res.cookie('jwt', token, cookieOptions)

                    res.render('login', {
                        alert:true,
                        alertTitle:"Conexion exitosa",
                        alertMessage: "LOGIN CORRECTO",
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer:800,
                        ruta:'dashboard'
                    })
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

exports.isAuthenticated = async(req, res, next)=> {
    var idUser=0
    console.log(req.cookies.jwt);
    if(req.cookies.jwt){
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            idUser= decodificada.id //variable con el id del usuario
            console.log(decodificada);
            conexion.query('SELECT * FROM users WHERE id = ?',[idUser], (error,results)=>{
            
                if (error) {
                    console.log(error);
                    return next('el error es: '+error);
                }
                if(!results){
                   // console.log('estoy if resutls');
                    return next()}
//                    req.name = results[0].name
                    req.user = results[0]
                  //  console.log("antes de rq.user");
                    //console.log(req.user);
              //  console.log('estoy despues de req. email');
               return next()
            })
        } catch (error) {
            console.log(error);
            return next()
        }
    }else{
        res.redirect('/login')
     
    }

}

exports.logout = (req, res)=>{
    res.clearCookie('jwt')
    return res.redirect('/login')
}

  