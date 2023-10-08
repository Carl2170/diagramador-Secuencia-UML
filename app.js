const express = require('express');
const dotenv = require('dotenv');
const cookieParser= require('cookie-parser');
const morgan = require('morgan');

const app=express();

//setea el motor de plantillas
app.set('view engine', 'ejs');

//setea la carpeta public para archivos estaticos
app.use(express.static('public'));

//para procesar datos enviados desde forms
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true})); 
app.use(express.json());

//setea las variables de entorno
dotenv.config({path: './env/.env'});

//para poder trabajar con las cookies
app.use(cookieParser());

// app.get('/', (req, res)=>{
//     res.render('index');
// });

//llamar al router
app.use('/', require('./routes/router'));

//para eliminar la cache  y que no pueda retroceder con el boton back luego del LOGOUT
app.use(function(req,res,next){
    if(!req.user){
        res.header('Cache-Control','private','no-cache','no-store','must-revalidate')
    }
    next();
});


app.listen(4000,()=> {
    console.log('Server UP running in Port 4000')
})