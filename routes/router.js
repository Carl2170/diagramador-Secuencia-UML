const express = require('express');
const router= express.Router();

const authControllers = require('../controllers/authControllers');
const salaControllers = require('../controllers/salaControllers');
const colabControllers = require('../controllers/colabControllers');
const diagramControllers = require('../controllers/diagramControllers')

const conexion = require('../database/db');
const { Result } = require('express-validator');

//rutas para las vistas

// router.get('/',authControllers.isAuthenticated, (req,res)=>{
//      res.render('index', {alert:false, user:req.user, title:"Dashboard"});
// })

router.get('/dashboard',authControllers.isAuthenticated, (req,res)=>{
  
  conexion.query('SELECT * FROM notification WHERE user_id = ?', [req.session.id],(error, results)=>{
    if(error){
      console.log(error)
    }
    res.render('index', {alert:false, user:req.session.user, title:"Dashboard",notifications:results});
  })
})


router.get('/login',(req,res)=>{
    res.render('login',{alert:false});
})

router.get('/register',(req,res)=>{
    res.render('register');
})

//rutas para los metodos de authControllers.js
router.post('/register',authControllers.register);
router.post('/login',authControllers.login);
router.get('/logout',authControllers.logout);

//salas 
// router.get('/salas',authControllers.isAuthenticated,(req,res)=>{
//   conexion.query('SELECT * FROM session WHERE user_id = ?', [req.user.id],(error, results)=>{
//     if(error){
//       console.log(error)
//     }
//     res.render('salas',{alert:false,user:req.user, title:"Salas", results:results});
//   })
// });

router.get('/salas',authControllers.isAuthenticated,(req,res)=>{
  conexion.query('SELECT * FROM session WHERE user_id = ?', [req.session.id],(error, results)=>{
        if(error){
          console.log(error)
        }
        res.render('salas',{alert:false,user:req.session.user, title:"Salas", results:results});
      })

});

router.post('/salas',salaControllers.create);

router.get('/invitar',authControllers.isAuthenticated,(req,res)=>{
  conexion.query('SELECT * FROM session WHERE user_id = ?', [req.user.id],(error, results)=>{
    if(error){
      console.log(error)
    }
    res.render('salas',{alert:false,user:req.user, title:"Salas", results:results});
  })
});
router.post('/invitar', colabControllers.invitar);

//diagrama
router.post('/diagrama',diagramControllers.openProyect);


//notificaciones
module.exports=router;