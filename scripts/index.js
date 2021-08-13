if(localStorage.getItem("token") !== null){
    logON();
}else{
    logOFF();
};

document.querySelector('#pesquisa-api-b').addEventListener('click', function() {

    var query = document.querySelector('#pesquisa-api').value;
    var mensagemErro = document.getElementById('error');
    var mensagemError_text = document.createElement('p');
    var resultados = document.getElementById('api-resultados');
    
    resultados.innerHTML='';
    mensagemErro.innerHTML = '';
    
    if(query.length<1){
        mensagemErro.innerHTML = '';
        mensagemError_text.innerHTML='A pesquisa deve conter pelo menos 1 caracter';
        mensagemErro.appendChild(mensagemError_text);
    }else{
        axios.get('https://yamym-web-service.herokuapp.com/api/article/search', {
            params:{
                title: query,
                token: localStorage.getItem('token')
            }
        })
        .then(function (response) {
            console.log(response);
            if(response.status === 201){
                mensagemErro.innerHTML = '';
                mensagemError_text.innerHTML= response.data.error;
                mensagemErro.appendChild(mensagemError_text);
            }else{
                var dados = response.data.data;
                for(var i = 0; i<dados.length; i++){
                    var artigo = document.createElement('p');
                    var link = document.createElement('a');
                    artigo.innerHTML=dados[i].title;
                    link.href = dados[i].link;
                    link.appendChild(artigo);
                    resultados.appendChild(link);
                }
            }
        })
        .catch(function (error) {
            console.log(error.response);
            mensagemErro.innerHTML = '';
            mensagemError_text.innerHTML = error.response.data.error;
            mensagemErro.appendChild(mensagemError_text);
        })
    }
});

//////////////////////////////////

document.querySelector('#register-api-b').addEventListener('click', function() {

    var title = document.querySelector('#register-title-api').value;
    var link = document.querySelector('#register-link-api').value;
    var mensagemErro = document.getElementById('error-register');
    var mensagemError_text = document.createElement('p');
    
    if(title.length<1){
        mensagemErro.innerHTML = '';
        mensagemError_text.innerHTML='O titulo deve conter pelo menos 1 caracter';
        mensagemErro.appendChild(mensagemError_text);
    }else if(link.length<1){
        mensagemErro.innerHTML = '';
        mensagemError_text.innerHTML='O link deve conter pelo menos 1 caracter';
        mensagemErro.appendChild(mensagemError_text);
    }
    else{
        axios.post('https://yamym-web-service.herokuapp.com/api/article/register',{
            title: title,
            link: link,
            token: localStorage.getItem('token')

        })
        .then(function(response){
            console.log(response);
            if(response.status === 200){   
                mensagemErro.innerHTML = '';
                mensagemError_text.innerHTML = 'Registro efetuado com sucesso!';
                mensagemErro.appendChild(mensagemError_text);
            }else if(response.status === 201){
                mensagemErro.innerHTML = '';
                mensagemError_text.innerHTML = response.data.error;
                mensagemErro.appendChild(mensagemError_text);
            }
        })
        .catch(function(error){
            console.log(error.response);
            mensagemErro.innerHTML = '';
            mensagemError_text.innerHTML = error.response.data.error;
            mensagemErro.appendChild(mensagemError_text);
        });
    }
});