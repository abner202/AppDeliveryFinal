const User=require("../models/user");

module.exports={

    register(req,res){

        const user=req.body //CAPTURO LOS DATOS QUE ME ENVIA EL CLIENTE
        User.create(user,(err,data) =>{

            if(err){
                    return res.status(501).json({
                        success: false,
                        message: "Hubo un error al crear el usuario",
                        error: err
                    });
                }

                return res.status(201).json({

                    success:true,
                    message:"El registro se realizo correctamente",
                    data:data //seria el id del nuevo usuario que se registro
                })
        });

    }
}