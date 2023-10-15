const conexion = require('../database/db');
const authControllers = require('../controllers/authControllers');
const salaControllers = require('../controllers/salaControllers');

exports.openProyect= async(req,res )=>{
    try {
        const idSala = req.body.idSala;
        const project = await this.getProyecto(idSala);
        console.log(project[0]);
        res.render('diagrams/index',{project:project})
    } catch (error) {
        console.log(error);
    }
}

exports.getProyecto = (idSala) => {
    return new Promise((resolve, reject) => {
      conexion.query('SELECT * FROM project WHERE sala_id = ?', [idSala], (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };