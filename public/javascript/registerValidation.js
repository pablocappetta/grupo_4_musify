window.addEventListener('load',function(){

    console.log("entro!!");

    //------Validation Form -------//    
    let form = document.querySelector('.register-form-container');
 
    let firstName = document.querySelector('#firstName');
    let lastName = document.querySelector('#lastName');
    let category = document.querySelector('#category');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');

    form.addEventListener('submit', (e) => {
        
        let errorsFront = [];

        // First name
        if (firstName.value == '') {
            errorsFront.push('first name field must not be empty');
            firstName.classList.add('is-invalid');
        } else {
            firstName.classList.add('is-valid');
            firstName.classList.remove('is-invalid');
            form.password.focus();
        };

        // Last name
        if (lastName.value == '') {
            errorsFront.push('Last name field must not be empty');
            lastName.classList.add('is-invalid');
        } else {
            lastName.classList.add('is-valid');
            lastName.classList.remove('is-invalid');
            form.password.focus();
        };

        // category
        if (category.value == '') {
            errorsFront.push('Category field must not be empty');
            category.classList.add('is-invalid');
        } else {
            category.classList.add('is-valid');
            category.classList.remove('is-invalid');
            form.password.focus();
        };

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