const usersController=require("../controllers/usersController");

module.exports=(app)=>{

    //GET ARA OBTENER DATOS 
    //POST ALMACENAS DATOS 
    //PUT PARA ACTUALIZAR 
    //DELETE BORRAR DATO

    app.post("/api/users/create", usersController.register);
}