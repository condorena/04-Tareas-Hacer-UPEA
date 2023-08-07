const { resolve } = require('path');

require('colors');
const mostrarMenu=()=>{
    return new Promise(resolve=>{
        console.clear();
        console.log("======================================".green);
        console.log("Seleccione una Opcion".green);
        console.log("======================================".green);
    
        console.log(`${'1.'.green} Crear Tarea`);
        console.log(`${'2.'.green} Listar Tareas`);
        console.log(`${'3.'.green} Listar Tareas completas`);
        console.log(`${'4.'.green} Listar Tarea pendientes`);
        console.log(`${'5.'.green} Completar Tarea(s)`);
        console.log(`${'6.'.green} Borrar Tareas`);
        console.log(`${'0.'.green} Salir`);

        /**
 * paquete propio de node
 */

        const readline=require('readline').createInterface({
        input:process.stdin,
        output:process.stdout
        });
        readline.question('Seleccione una opcion: ',(opt)=>{
    //console.log(opt);
        readline.close();
        //esto nos permitira recibir la informacion
        resolve(opt);
        })
    });
    
}

const pausa=()=>{
    return new Promise(resolve=>{
        const readline=require('readline').createInterface({
            input:process.stdin,
            output:process.stdout
        });
        readline.question(`\nPresione ${'Enter'.green} para continuar\n`,(opt)=>{
            readline.close();
            //esto resuelve la promesa
            resolve();
        })
    });
    
}
//para que nuestra funcion pueda ser invocada
module.exports={
    mostrarMenu,
    pausa

}