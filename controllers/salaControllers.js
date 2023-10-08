const conexion = require('../database/db');
const authControllers = require('../controllers/authControllers');

exports.create =async (req,res)=>{
    try {
       const name = req.body.name
       const idUser = req.body.idUser
         conexion.query('INSERT INTO session SET ?',{name:name,user_id:idUser}, (error,results) =>{
           if(error){
               console.log(error)
               }
               res.render('salas', {
                alert:true,
                alertTitle:"Creación exitosa",
                alertMessage: "Nueva sala añadida",
                alertIcon:'success',
                showConfirmButton: false,
                timer:800,
                ruta:'',
                user:authControllers.isAuthenticated,
                title:"Salas"
            },)
         })
    } catch (error) {
       console.log(error);    
    }  
}


