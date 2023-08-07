const inquirer = require('inquirer');
require('colors');
//envio de informacion automatica
const preguntas=[
    {
        type:'list',
        name:'opcion',
        message:'¿Qué desea hacer?',
        choices:[
            {
                value:'1',
                name: `${'1.'.green} Crear Tarea`
            },
            {
                value:'2',
                name:`${'2.'.green} Listar Tarea`
            },
            {
                value:'3',
                name:`${'3.'.green} Listar tareas completas`
            },
            {
                value:'4',
                name:`${'4.'.green} Listar Tareas Pendientes`
            },
        
            {
                value:'5',
                name:`${'5.'.green} Completar tareas(s)`
            },
            {
                value:'6',
                name:`${'6.'.green} Borrar Tareas`
            },
            {
                value:'0',
                name:`${'0.'.green} Salir`
            }
        ]
    }
];

const inquirerMenu=async()=>{
   
        console.clear();
        console.log("======================================".green);
        console.log("Seleccione una Opcion".white);
        console.log("======================================\n".green);
        const {opcion}=await inquirer.prompt(preguntas);
        return opcion;
    }
 const pausa=async()=>{
    const question=[{
        type:'input',
        name:'enter',
        message:`Presione ${'enter'.green} para continuar`
    }
    ];
    console.log("\n");
    await inquirer.prompt(question);
 }
    const leerInput =async(message)=>{
        const question=[
            {
                type:'input', //valor de entrada
                name:'desc',
                message,//mensaje
                validate(value){
                    if(value.length===0)
                        return "por favor ingrese un valor"
                    return true;
                }
            }
        ]
        //aplicamos la desestructuracion
       const {desc}=await inquirer.prompt(question);
       return desc;
    }
        const listadoTareasBorrar=async(tareas=[])=>{
            //con este pedazo de codigo manipularemos la informacion
            //que nos esta proporcionando el sistema
            const choices=tareas.map((tarea,i)=>{
                const idx=`${i+1}.`.green;
                return{
                    value:tarea.id,
                    name:`${idx} ${tarea.desc}`
                }
            });
                //ahora recibiremos las preguntas
            choices.unshift({
                value:'0',
                name: '0.'.green+'Cancelar'
            });
            const preguntas=[
                {
                    type:'list',
                    name: 'id',
                    message:'Borrar',
                    choices
                }
            ]
            const{id}=await inquirer.prompt(preguntas);
            return id;
        }
        const mostrarListadoCheklist=async(tarea=[])=>{
            //copiamos el codigo de: listado tareaBorrar y lo modificamos
            const choices=tareas.map((tarea,i)=>{
                const idx=`${i+1}.`.green;
                return{
                    value:tarea.id,
                    name:`${idx} ${tarea.desc}`,
                    checked:(tarea.completadoEn)?true:false
                }
            });
            
            const pregunta=[
                {
                    type:'checkbox',
                    name: 'ids',
                    message:'Selecciones',
                    choices
                }
            ]
            const{ids}=await inquirer.prompt(pregunta);
            return ids;
          
        }

        
        const confirmar =async(message)=>{
            //generamos el menu de preguntas y opciones
            const question=[
                {
                    type:'confirm',
                    name:'ok',
                    message
                }
            ];
            const {ok}=await inquirer.prompt(question);
            return ok
        }
    
    module.exports={
        inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheklist
    };