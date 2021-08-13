function verificationEmail(emailfield){

    user = emailfield.value.substring(0, emailfield.value.indexOf("@"));
    domain = emailfield.value.substring(emailfield.value.indexOf("@")+1, emailfield.value.length);

    if ((user.length >=1) && (domain.length >=3) && (user.search("@")==-1) &&
    (domain.search("@")==-1) &&(user.search(" ")==-1) &&(domain.search(" ")==-1) &&
    (domain.search(".")!=-1) && (domain.indexOf(".") >=1)&&(domain.lastIndexOf(".") < domain.length - 1)){
        return true;
        }
        else{
            return false;
        }
}

function verificationPassword(passfield){
    
    pword = passfield.value;

    if(pword.length >= 3){
        return true;
    }
    else{
        return false;
    }
}

function matchPassword(matchfield1, matchfield2){

    pword =  matchfield1.value;
    match = matchfield2.value;

    if(pword === match){
        return true;
    }
    else{
        return false;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
    
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    
    var mensagemErro = document.createElement('p');
    var mensagemSucesso = document.createElement('p');
    var fieldEmail;
    var fieldPassword;
    var field_passwordMatch;


    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form-hidden");
        createAccountForm.classList.remove("form-hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form-hidden");
        createAccountForm.classList.add("form-hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        fieldEmail = document.getElementById("login-login");
        fieldPassword = document.getElementById("senha-login");
        
        if(verificationEmail(fieldEmail) && verificationPassword(fieldPassword)){
            axios.get('http://localhost:3000/api/user/login', {
                params:{
                    email: document.getElementById("login-login").value,
                    password: document.getElementById("senha-login").value
                }
            })
            .then(function (response){ 
                console.log(response);
                if(response.status ===200){
                    localStorage.setItem('token', response.data.data)
                    logON();
                }
            })
            .catch(function(error){
                mensagemErro.innerHTML = '';
                console.log(error.response.data.error);
                mensagemErro.innerHTML = error.response.data.error;
                document.getElementById('mensagemErro-login').appendChild(mensagemErro);
            });
        }
        else if(!verificationEmail(fieldEmail)){
            mensagemErro.innerHTML ='Email Incorreto'
            document.getElementById('mensagemErro-login').appendChild(mensagemErro);
        }
        else if(!verificationPassword(fieldPassword)){
            mensagemErro.innerHTML ='A senha  deve conter no minimo de 3 caracteres'
            document.getElementById('mensagemErro-login').appendChild(mensagemErro);
        }

    });

    createAccountForm.addEventListener("submit", e =>{
        e.preventDefault();
        fieldEmail = document.getElementById("login-cadastro");
        fieldPassword = document.getElementById("senha-cadastro");
        field_passwordMatch =  document.getElementById("senha2-cadastro");
        mensagemErro.innerHTML = ''
        mensagemSucesso.innerHTML = ''

        if(verificationEmail(fieldEmail) && verificationPassword(fieldPassword) && matchPassword(fieldPassword, field_passwordMatch)){

            axios.post('http://localhost:3000/api/user/register',{
                email: document.getElementById("login-cadastro").value,
                password: document.getElementById("senha-cadastro").value
            })

            .then(function(response){
                console.log(response);
                if(response.status ===200){   
                    mensagemSucesso.innerHTML = 'Cadastro efetuado com sucesso!'
                    document.getElementById('mensagemSucesso-cadastro').appendChild(mensagemSucesso);
                }
            })
            .catch(function(error){
                console.log(error.response);
            });
        }
        else if(!verificationEmail(fieldEmail)){
            mensagemErro.innerHTML = 'E-mail Incorreto'
            document.getElementById('mensagemErro-cadastro').appendChild(mensagemErro);
        }else if(!verificationPassword(fieldPassword)){
            mensagemErro.innerHTML = "A senha  deve conter no minimo de 3 caracteres"
            document.getElementById('mensagemErro-cadastro').appendChild(mensagemErro);
        }else if(!matchPassword(fieldPassword, field_passwordMatch)){
            mensagemErro.innerHTML = 'As senhas não são iguais'
            document.getElementById('mensagemErro-cadastro').appendChild(mensagemErro);
        }

    })
  
});