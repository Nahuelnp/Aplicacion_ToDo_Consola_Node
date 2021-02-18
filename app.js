const colors = require("colors");
//const {mostrarMenu,pausa} = require('./helpers/mensajes')
const { inquirerMenu, inquirerContinue ,leerInput,listadoEliminar,confirmar,listadoCompletar} = require("./helpers/inquirer");
const Tareas = require('./models/tareas');
const { guardarDB, leerDB }=require('./helpers/dbController');


console.clear()


const main = async () => {
    let opt;
    const tareas = new Tareas();


    const tareasDB = leerDB();

    if(tareasDB){ //cargar tareas
        tareas.cargarTareasFromArray(tareasDB)
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ')
                tareas.crearTarea(desc)
                break;
            case '2':
                tareas.listaCompleto();
                break;
            case '3':
                tareas.listaCompletadosOPendientes(true);
                break;
            case '4':
                tareas.listaCompletadosOPendientes(false);
                break;
            case '5':
                const ids = await listadoCompletar(tareas.listadoArr)
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoEliminar(tareas.listadoArr)
                if (id !=='0') {
                    const ok = await confirmar("Desea Borrar ?")
                    
                    if (ok) {
                        tareas.borrarTarea(id);
                    }
                }

                break;

            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        await inquirerContinue();

    } while (opt !== '0');


}

main();