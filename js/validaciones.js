export function valida(input){
    const tipoDeInput = input.dataset.tipo; 
    if(validaciones[tipoDeInput]){
        validaciones[tipoDeInput](input)
    } 
    
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = ''; 
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input); 
    }
}

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patterMismatch',
    'customError'
]

const mensajeDeError = {
    nombre: {
        valueMissing: 'Este campo nombre no puede estar vacio'
    },
    email: {
        valueMissing: 'Este campo correo no puede estar vacio',
        typeMismatch: 'El correo no es valido',
    },
    password: {
        valueMissing: 'Este campo contraseña no puede estar vacio',
        patterMismatch: 'Al menos 6 caracteres, máximo 12, debe contener una letra , una letra minuscula, un número y no puede contener caracteres especiales.',
    },
    nacimiento:{
        valueMissing: 'Este campo no puede estar vacio',
        customError: 'Debes tener más de 18 años'
    }
}

const validaciones ={
    nacimiento: input => validarNacimiento(input),
}
/* CAMBIAR MENSAJE DE ERROR */
function mostrarMensajeDeError(tipoDeInput, input){ 
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]){
            console.log(mensajeDeError[tipoDeInput][error]);
            mensaje = mensajeDeError[tipoDeInput][error]
        } 
    })
    return mensaje
}

const inputNacimiento = document.querySelector('#birth');
inputNacimiento.addEventListener('blur',(event)=>{
    validarNacimiento(event.target);
})

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if(!mayorDeEdad(fechaCliente)){
        mensaje = 'Debes tener más de 18 años';
    } 
    //escribir mensaje
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(        
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    )
    return diferenciaFechas <= fechaActual
}