require ('colors');
console.clear();
const { guardarBD, leerDB } = require('./helpers/guardarArchivo');
//importacion de nuestros paquetes
//const{mostrarMenu, pausa}=require('./helpers/mensajes');
const{inquirerMenu,
   pausa,
   leerInput,
   confirmar}=require('./helpers/inquirer');
//const Tarea= require('./models/tarea');
const Tareas= require('./models/tareas');
//async funcion asincronica
const main=async()=>{
    let opt="";
    console.log("Hola Mundo");
    const tareas = new Tareas();

    /*const tareaDB=leerDB();
    if(tareasDB){
      tareas.crearTareaFromArray(tareasDB);
    }
    //await pausa();
*/
    do{
        //await= esperamos que nos manden algo
        opt=await inquirerMenu();
        switch (opt){
          case '1':
            //crear opcion
            const desc=await leerInput('Descripcion: ');
            //console.log(desc); aqui se equivoco el doc
            tareas.crearTarea(desc);//esto nos permite adicionar tareas
          break;
          case '2':
            tareas.listadoCompleto();
          break;
          case '3'://listar completadas
            tareas.listarPendientesCompletadas(true);
          break;
          case '4'://listar pendientes
            tareas.listarPendientesCompletadas(false);
          break;
          case '5'://completado I pendiente
            const ids =await mostrarListadoCheklist(tareas.listadoArr);
            tareas.toggleCompletadas(ids);
          break;
          case '6'://Borrar
            const id =await listadoTareasBorrar(tareas.listadoArr);
            if(id!=='0'){
              const ok=await confirmar('¿Está seguro?');
              if(ok){
                tareas.borrarTarea(id);
                console.log('Tarea borrada');
              }
            }

          break;
        }
        
        guardarBD(tareas.listadoArr);//nosotros guardamos en todo momento
        await pausa();

    } while(opt!=='0');

  //  mostrarMenu();eliminar
    //pausa();
}

main();
