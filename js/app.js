//Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');
//Eventos

eventListener ();

function eventListener (){

document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

}

//Clases

//funciones

function preguntarPresupuesto (){

    const presupuestoUsuario = prompt('cual es tu presupuesto?');
    console.log(Number(presupuestoUsuario));

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        
        window.location.reload();

    }

}