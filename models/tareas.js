const Tarea = require("./tarea");




class Tareas {

    _listado = {};

    constructor(){
        this._listado = {};
    }

    crearTarea(desc=''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
    

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado;
    }

    cargarTareasFromArray(tareas= []){
        tareas.forEach(tarea=>{
            this._listado[tarea.id] = tarea;

        })
    }

    listaCompleto(){
        let estado = ''
        this.listadoArr.forEach((arr,i)=>{
            const index = `${i+1}`.green;
            if (arr.completadoEn !== null) {
                estado = `${'Completado'.green}`
            }else{
                estado = `${'Pendiente'.red}`
            }

            console.log(`${index} ${arr.desc} :: ${estado}`);
        })


    }

    listaCompletadosOPendientes(completado = true){
        let index = 0;

        this.listadoArr.forEach((arr)=>{

            const {desc,completadoEn} = arr;
            const estado = (completadoEn)
                            ? 'Completada'.green
                            : 'Pendiente'.red;

            if (completado) {
                
                if (completadoEn) {
                    index += 1;
                    console.log(`${(index+'.').green} ${desc} :: ${estado} ${completadoEn}`)
                }
            } else {
                if(!completadoEn){
                index += 1;
                console.log(`${(index+'.').green} ${desc} :: ${estado}`)
                }
            }

        })
    }

    borrarTarea(id=''){
        if (this._listado[id]) {
            delete this._listado[id] ;
        }
    }

    toggleCompletadas (ids=[]){

        ids.forEach(id=>{

            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }

        });
        this.listadoArr.forEach(tarea=>{

            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }

        })

    }



}

module.exports = Tareas