const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs');

//Resolvers
const resolvers = {
    Query: {
        obtenerCurso:() => "Algo"
        },
        Mutation:{
            nuevoUsuario: async (_, {input} ) => {
                
                const{ email, password } = input;
                
                // revisar si el usuario ya esta registrado
                const existeUsuario = await Usuario.findOne({email});
                if(existeUsuario){
                    throw new Error('El usuario ya esta registrado');
                }

                // Hashear su password
                const salt = await bcryptjs.getSalt(10);
                input.password = await bcryptjs.hash(password, salt);

                try {
                    //Guardalo en la base de datos
                    const usuario = new Usuario(input);
                    usuario.save(); //guardarlo
                    return usuario;
                } catch (error) {
                    console.log(error);
                }
        }
    }
}
module.exports = resolvers;