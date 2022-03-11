const formulario = document.getElementById('form')
const inputs = document.querySelectorAll('#form input')
const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    user: false,
    name: false,
    password: false,
    email: false,
    phone: false
}

const validarFormulario = (e)=>{
    switch(e.target.name){
        case "user" :                 
                    validarCampo(expresiones.usuario,e.target,e.target.name);
                    break;
        case "name" :
                    validarCampo(expresiones.nombre,e.target,e.target.name);
                    break;
        case "password" :
                    validarCampo(expresiones.password,e.target,e.target.name);
                    validarContra2();
                    break;
        case "password2" :
                    validarContra2();
                    break;
        case "email" :
                    validarCampo(expresiones.correo,e.target,e.target.name);
                    break;
        case "phone" :
                    validarCampo(expresiones.telefono,e.target,e.target.name);
                    break;
    }
    console.log(e.target.name)
}

const validarCampo = (expresion,input,campo)=>{
    if (expresion.test(input.value)) {
        document.getElementById(`${campo}__group`).classList.remove('form__group--wrong')
        document.getElementById(`${campo}__group`).classList.add('form__group--right')                     
        document.querySelector(`#${campo}__group i`).classList.add('fa-check-circle')
        document.querySelector(`#${campo}__group i`).classList.remove('fa-times-circle')
        document.querySelector(`#${campo}__group .form__input-error`).classList.remove('form__input-error--active')
        campos[campo] = true;
    }else{
        document.getElementById(`${campo}__group`).classList.add('form__group--wrong')
        document.getElementById(`${campo}__group`).classList.remove('form__group--right')
        document.querySelector(`#${campo}__group i`).classList.add('fa-times-circle')
        document.querySelector(`#${campo}__group i`).classList.remove('fa-check-circle')
        document.querySelector(`#${campo}__group .form__input-error`).classList.add('form__input-error--active')
        campos[campo] = false;
    } 
}

const validarContra2 = ()=>{
    const inputPassword1 = document.getElementById('password')
    const inputPassword2 = document.getElementById('password2')
    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`password2__group`).classList.add('form__group--wrong')
        document.getElementById(`password2__group`).classList.remove('form__group--right')
        document.querySelector(`#password2__group i`).classList.add('fa-times-circle')
        document.querySelector(`#password2__group i`).classList.remove('fa-check-circle')
        document.querySelector(`#password2__group .form__input-error`).classList.add('form__input-error--active')
        campos['password'] = false;
    }else{
        document.getElementById(`password2__group`).classList.remove('form__group--wrong')
        document.getElementById(`password2__group`).classList.add('form__group--right')                     
        document.querySelector(`#password2__group i`).classList.add('fa-check-circle')
        document.querySelector(`#password2__group i`).classList.remove('fa-times-circle')
        document.querySelector(`#password2__group .form__input-error`).classList.remove('form__input-error--active')
        campos['password'] = true;

    }
}

inputs.forEach((input)=>{
    input.addEventListener('keyup',validarFormulario)
    input.addEventListener('blur',validarFormulario)
})

formulario.addEventListener('submit', (e) =>{
    e.preventDefault();
    const terms = document.getElementById('terms')
    if (campos.user && campos.name && campos.email && campos.password && campos.phone && terms.checked) {
        form.reset();

        document.getElementById('form__message').classList.remove('form__message--active');

        document.getElementById('form__message-success').classList.add('form__message-success--active')

        setTimeout(()=>{
            document.getElementById('form__message-success').classList.remove('form__message-success--active')
        },5000)

        document.querySelectorAll('.form__group--right').forEach((icon) =>{
            icon.classList.remove('form__group--right')
        })
    }else{
        document.getElementById('form__message').classList.add('form__message--active');
    }
    
})
