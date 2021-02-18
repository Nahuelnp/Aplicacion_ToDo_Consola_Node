require('colors');

const mostrarMenu = ()=>{

    return new Promise((resolve)=>{

        console.clear()
        console.log("==========================");
        console.log("  Seleccione una opcion");
        console.log("==========================");
        
        console.log(`${'1.'.green} Crear Tarea`);
        console.log(`${'2.'.green} Listar Tareas`);
        console.log(`${'3.'.green} Listar Tareas Completadas`);
        console.log(`${'4.'.green} Listar Tareas Pendientes`);
        console.log(`${'5.'.green} Completar Tarea(s)`);
        console.log(`${'6.'.green} Borrar Tarea`);
        console.log(`${'0.'.green} Salir \n`);
        
            const readLine = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });
           
            readLine.question('Seleccione un opcion: ',(opt)=>{
                readLine.close();
                resolve(opt)
                
            })
    });

}

const pausa = ()=>{
    return new Promise(resolve=>{

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readLine.question(`\nPrecione ${'Enter'.green} para continuar`,(opt)=>{
            readLine.close();
            resolve();
        })
    })
}

//instalar paquete inquirer
module.exports ={ mostrarMenu, pausa}