const User = require('../models/user');
const Rol= require ('../models/rol');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage= require('../utils/cloud_storage');

module.exports = {


    login(req, res) {

        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser) => {
            
            console.log('Error ', err);
            console.log('USUARIO ', myUser);

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'El email no fue encontrado'
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password); // COMPARACIÓN DE LA CONTRASEÑA DEL USER CON LA BD
            if (isPasswordValid) {
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});

                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    roles: myUser.roles
                }

                return res.status(201).json({
                    success: true,
                    message: 'El usuario fue autenticado',
                    data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
                });

            }
            else {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'El password es incorrecto'
                });
            }

        });

    },

    /*
    //metodo register con rol integrado 
    register(req, res) {
        // Captura los datos que llegan en la solicitud del cliente
        const user = req.body;
      
        // Crea un nuevo usuario utilizando los datos proporcionados
        User.create(user, (err, data) => {
          if (err) {
            // Si ocurre un error al crear el usuario, responde con un estado 501 y un mensaje de error
            return res.status(501).json({
              success: false,
              message: 'Hubo un error con el registro del usuario',
              error: err,
            });
          }
      
          // Asigna el ID del usuario
          user.id = `${data}`;
      
          // Crea un token de sesión
          const token = jwt.sign({ id: user.id, email: user.email }, keys.secretOrKey, {});
      
          // Asigna el token de sesión al usuario
          user.session_token = `JWT ${token}`;
      
          // Crea un rol de usuario
          Rol.create(user.id, 3, (err, data) => {
            if (err) {
              // Si ocurre un error al crear el rol, responde con un estado 501 y un mensaje de error
              return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del rol de usuario',
                error: err
              });
            }
      
            // Si todo se realiza correctamente, responde con un estado 201 y los datos del nuevo usuario
            return res.status(201).json({
              success: true,
              message: 'El registro se realizó correctamente',
              data: user, // Todos LOS DATOS DEL NUEVO USUARIO QUE SE REGISTRÓ
            });
          });
        });
      },*/
      

      
    register(req, res) {

        const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        User.create(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            });

        });

   }, 



   async registerWithImage(req, res) {//metodo para pasar la img de user de fire base

    const user = JSON.parse({req,body,user}); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
    
    const files= req.files;

    if(files.length>0){//si se agrega la img
        const path=`image_${Date.now}`;
        const url = await storage(files[0],path);

        if (url != undefined && url != null){
            user.imagen= url;
        }
    }
    
    User.create(user, (err, data) => {

        if (err) {
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del usuario',
                error: err
            });
        }
      //debo integrar esto arriba 
        user.id=`${data}`; // para que cuando el user se registre se cree el tokend de sesion
        const token = jwt.sign({id: user.id, email: user.email}, keys.secretOrKey, {});
        user.session_token=`JWT ${token}`;

        Rol.create(user.id, 3, (err,data)=>{
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del rol de usuario',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: user // Todos LOS DATOS DEL NUEVO USUARIO QUE SE REGISTRO
            });
        });
    });

},


}