const $form = document.querySelector('.form-register')
console.log($form);
$form.addEventListener('submit', e =>{
    e.preventDefault()
    let nombre,apellidos,correo,usuario,calve,telefono,expresion;
    nombre = document.getElementById('name').value
    apellidos = document.getElementById('surname').value
    correo = document.getElementById('email').value
    clave = document.getElementById('password').value
    telefono = document.getElementById('telefono').value

    if(nombre === "" || apellidos === "" || correo === "" || usuario === "" || clave === "" || telefono ===""){
        alert("Complete el Formulario Por favor!");
        return false;
    }else if(nombre.length > 30){
        alert("Nombre demasiado largo");
        return false;
    }else if(apellidos.length > 80){
        alert("Apellidos demasiado largo");
        return false;
    }else if(correo.length > 50){
        alert("Correo demasiado largo");
        return false;
    }else if(usuario.length > 20){
        alert("Usuario demasiado largo");
        return false;
    }else if(clave.length > 20){
        alert("Clave demasiado largo");
        return false;
    }else if(telefono.length > 8){
        alert("Telefono demasiado largo");
        return false;
    }else if(isNaN(telefono)){
        alert("Telefono Ingreado Incorrecto - No es un Número");
        return false;
    }
})