window.addEventListener('load',function(){

    console.log("entro!!");

    //------Validation Form -------//    
    let form = document.querySelector('.login-form-container');

    form.email.focus();
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');

    form.addEventListener('submit', (e) => {
        
        let errorsFront = [];

        // email
        if (email.value == '') {
            errorsFront.push('this field email must not be empty');
            email.classList.add('is-invalid');
        } else {
            email.classList.add('is-valid');
            email.classList.remove('is-invalid');
            form.password.focus();
        };
        
        // password
        if (password.value == '') {
            errorsFront.push('this field password must not be empty');
            password.classList.add('is-invalid');
        } else {
            password.classList.add('is-valid');
            password.classList.remove('is-invalid');
        };

        //Aquí controlo que es lo que debo hacer si hay o no errores en el formulario
        if (errorsFront.length > 0) {
            e.preventDefault();
            let ulErrors = document.querySelector('.errorsFront');
            ulErrors.classList.add('alert-warning');
            ulErrors.innerHTML = '';
            for (let i = 0; i < errorsFront.length; i++) {
                ulErrors.innerHTML += "<li>" + errorsFront[i] + "</li>";
            };
        }else{
            alert('Validation was successful')
            form.submit();
        }

    });
})