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
        console.log(this.gastos);
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
            formulario.reset();
        }, 3000);
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

    //añade un nuevo gasto
    presupuesto.nuevoGasto(gasto);
    ui.imprimirAlerta('gasto agregado correctamente');


}