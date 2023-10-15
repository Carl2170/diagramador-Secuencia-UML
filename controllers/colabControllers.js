const conexion = require('../database/db');
const authControllers = require('../controllers/authControllers');
const salaControllers = require('../controllers/salaControllers');
const diagramControllers = require('../controllers/diagramControllers');

exports.invitar= async (req, res)=>{
    try {
        const emailInvitado = req.body.emailUser;
        const nameSala = req.body.nameSala;
        const idSala = req.body.idSala;
        const idUser = authControllers.isAuthenticated.id
        const nameAnfitrion = req.body.nameUser
        const salasCreadas = await salaControllers.getSalas(idUser);

        if(!emailInvitado){
            res.render('salas', {
                alert:true,
                alertTitle:"Advertencia",
                alertMessage: "Ingrese un email",
                alertIcon:'info',
                showConfirmButton: true,
                timer:2000,
                ruta:'salas',
                user:authControllers.isAuthenticated,
                title:"Salas",
                results:salasCreadas
            })
        }else{
            conexion.query('SELECT id FROM users WHERE email = ?',[emailInvitado], async(error,results)=>{
                console.log(results);
                if(results.length ==0 ){
                    res.render('salas', {
                        alert:true,
                        alertTitle:"Error",
                        alertMessage: "Usuario no encontrado",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer:2000,
                        ruta:'salas',
                        user:authControllers.isAuthenticated,
                        title:"Salas",
                        results:salasCreadas

                    }) 
                }else{ 
                    //datos correctos 
                         
                    const idUsuarioEncontrado = results[0].id;
                    const message= "Te invito a colobarme en la sala:" +nameSala
                   
                    const salasCreadas = await salaControllers.getSalas(idUsuarioEncontrado);
                   
                    const salaAnfitriona = await salaControllers.getSala(nameSala);
                    const Proyect = await diagramControllers.getProyecto(salaAnfitriona[0].id)
                    const nameProyect = Proyect[0].name
                    const message1 = {anfitrion:nameAnfitrion, proyect:nameProyect, sala: salaAnfitriona

                    }
                    conexion.query('INSERT INTO notification (message,tatus, answer, user_id, sala_id) VALUES (?,?,?,?,?)', [message,0,0,idUsuarioEncontrado,idSala], async (error, results) => {  
                        res.render('salas', {
                            alert:true,
                            alertTitle:"Invitación enviada",
                            alertMessage: "a: "+ emailInvitado,
                            alertIcon:'success',
                            showConfirmButton: false,
                            timer:2000,
                            ruta:'',
                            user:authControllers.isAuthenticated,
                            title:"Salas",
                            results:salasCreadas
                        })

                    })

                    this.notificationGenerate(message1)    
                }
            })
        }
     } catch (error) {
        console.log(error);    
     } 
}

exports.notificationGenerate =  (message1)=>{
console.log(message1);


}