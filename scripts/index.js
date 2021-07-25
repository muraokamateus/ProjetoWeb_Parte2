if(localStorage.getItem("logado") !== null){
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
    
    if(query.length<1){
        mensagemErro.innerHtml = '';
        mensagemError_text.innerHTML='A pesquisa deve conter pelo menos 1 caracter';
        mensagemErro.appendChild(mensagemError_text);

    }else{

        axios.get('https://api.spaceflightnewsapi.net/v3/articles?title_contains='+query)
        .then(function (response) {
            console.log(response);
            var dados = response.data;
            for(var i = 0; i<dados.length; i++){
                var artigo = document.createElement('p');
                var link = document.createElement('a');
                artigo.innerHTML="Titulo: "+dados[i].title;
                link.href = dados[i].url;
                link.appendChild(artigo);
                resultados.appendChild(link);
            }
        })
        .catch(function (error) {
        console.log(error);
        })
        .then(function () {
        });
    }
});
