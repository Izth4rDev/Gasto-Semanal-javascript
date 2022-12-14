//Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');
//Eventos

eventListener ();

function eventListener (){

document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

formulario.addEventListener('submit', agregarGasto);

}

//Clases

class Presupuesto {

    constructor(presupuesto){

        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];

    }

    nuevoGasto(gasto){

        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
        //console.log(this.gastos);
    }

    calcularRestante(){

        const gastado = this.gastos.reduce((total, gasto)=> total + gasto.cantidad, 0)
        this.restante = this.presupuesto - gastado;
        console.log(this.restante);

    }

    deleteGasto(id){

        this.gastos = this.gastos.filter (gasto => gasto.id !== id);
        this.calcularRestante();

    }
}

class UI {

    insertarPresupuesto(cantidad){

        //extrayendo el valor
        const {presupuesto, restante} = cantidad;
        //Insertando en HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;

    }

    imprimirAlerta(mensaje, tipoMensaje){

        //crear el div alerta

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipoMensaje === 'error'){

            divMensaje.classList.add('alert-danger');
            
        }else{

            divMensaje.classList.add('alert-success');
    
        }

        divMensaje.textContent = mensaje;

        //insertar en HTML

        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //quitar del html 

        setTimeout(() =>{

            divMensaje.remove();

        }, 3000);
    }

    mostrarGastos(gastos){

        this.limpiarHtml();

        //iterar sobre el arreglo gasto 
        gastos.forEach(gasto => {

            const{cantidad, nombre, id} = gasto;
  

            //crear el LI
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.dataset.id = id; //permite agregar estas clases personalizadas 
        
            //agregar en HTML
            li.innerHTML = `
                ${nombre} <span class="badge badge-primary badge-pill">${cantidad}</span>
            `;

            //boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger','borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times;';
            li.appendChild(btnBorrar);

            btnBorrar.onclick = ()=>{

                eliminarGasto(id);

            }

            //agregar al HTML
            gastoListado.appendChild(li);
        });
    }

    limpiarHtml(){

        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild);

        }
    }

    actualizarRestante(restante){

        document.querySelector('#restante').textContent = restante;

    }

    comprobarPresupuesto(presupuestObj){

        const {presupuesto, restante} = presupuestObj;
        const restanteDiv = document.querySelector('.restante');

        //comprobar 25% 

        if((presupuesto / 4)> restante){

            console.log("ya gastaste el 75%$");
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');

        }else if((presupuesto / 2 ) > restante){

            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');

        }else{

            restanteDiv.classList.remove('alert-warning', 'alert-danger');
            restanteDiv.classList.add('alert-success');

        }

        if(restante <= 0){
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true; //desabilitamos el boton 
        }
    }
}

//instanciar
const ui = new UI();
let presupuesto;

//funciones

function preguntarPresupuesto (){

    const presupuestoUsuario = prompt('cual es tu presupuesto?');
    //console.log(Number(presupuestoUsuario));

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        
        window.location.reload();

    }

    //presupuesto valido

    presupuesto = new Presupuesto(presupuestoUsuario);
    ui.insertarPresupuesto(presupuesto);
    console.log(presupuesto);
}

function agregarGasto(e){

    e.preventDefault();
    //leer los datos del formulario

    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    if(nombre === '' || cantidad === ''){

        ui.imprimirAlerta('ambos campos son obligatorios', 'error');
        return;

    }else if(cantidad <= 0 || isNaN(cantidad)){

        ui.imprimirAlerta('Cantidad no ivalida','error');
        return;

    }

    console.log('retornando gasto');

    const gasto = {nombre, cantidad, id:Date.now()};

    //a??ade un nuevo gasto
    presupuesto.nuevoGasto(gasto);
    ui.imprimirAlerta('gasto agregado correctamente');

    //imprimir los gastos
    const {gastos, restante} = presupuesto;
    ui.mostrarGastos(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);

    formulario.reset();

}

function eliminarGasto(id){
    //Elimina los gastos del array en el objeto
    presupuesto.deleteGasto(id);
    //Elimina los gastos del HTML
    const {gastos, restante} = presupuesto;
    ui.mostrarGastos(gastos);

    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);

}