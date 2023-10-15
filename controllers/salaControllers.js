const conexion = require('../database/db');
const authControllers = require('../controllers/authControllers');

exports.create =async (req,res)=>{
    try {
       const name = req.body.name
       const idUser = req.body.idUser
       const nameProyect = req.body.nameProyect
       const salasCreadas =await this.getSalas(idUser);
       
       console.log(nameProyect);       
       conexion.query('INSERT INTO session SET ?',{name:name,user_id:idUser}, (error,results) =>{
          if(error){
               console.log(error)
               }
         })
       const salaCreada = await this.getSala(name);
       conexion.query('INSERT INTO project SET ?',{name:nameProyect, sala_id:salaCreada[0].id}, (error, results)=>{
        if(error){
          console.log(error);
        }   
        res.render('salas', {
         alert:true,
         alertTitle:"Creación exitosa",
         alertMessage: "Proyecto creado",
         alertIcon:'success',
         showConfirmButton: false,
         timer:2000,
         ruta:'',
         user:authControllers.isAuthenticated,
         title:"Salas",
         results:salasCreadas
     })
    })  
    } catch (error) {
       console.log(error);    
    }  
}

exports.getSalas = (idUsuario) => {
  return new Promise((resolve, reject) => {
    conexion.query('SELECT * FROM session WHERE user_id = ?', [idUsuario], (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getSala = (nameSala) => {
  return new Promise((resolve, reject) => {
    conexion.query('SELECT * FROM session WHERE name = ?', [nameSala], (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
