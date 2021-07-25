function logON(){
    document.getElementById('logON-button').classList.remove('display-show');
    document.getElementById('logON-button').classList.add('display-hidden');
    document.getElementById('logOFF-button').classList.remove('display-hidden');
    document.getElementById('logOFF-button').classList.add('display-show');
    document.getElementById('api').classList.remove('display-hidden');
    document.getElementById('api').classList.add('display-show');
    document.getElementById('verify').classList.remove('display-show');
    document.getElementById('verify').classList.add('display-hidden');
    document.getElementById('home-hero').classList.remove('display-show');
    document.getElementById('home-hero').classList.add('display-hidden');
    document.getElementById('api-resultados').classList.remove('display-hidden');
    document.getElementById('api-resultados').classList.add('display-show');
    document.getElementById('logOFF-button').addEventListener('click', function(){
        logOFF();
    });
}
///////////////////////////////////////////////////////////
function logOFF(){

    localStorage.removeItem('logado');
    document.getElementById('logON-button').classList.add('display-show');
    document.getElementById('logON-button').classList.remove('display-hidden');
    document.getElementById('logOFF-button').classList.add('display-hidden');
    document.getElementById('logOFF-button').classList.remove('display-show');
    document.getElementById('api').classList.add('display-hidden');
    document.getElementById('api').classList.remove('display-show');
    document.getElementById('verify').classList.add('display-show');
    document.getElementById('home-hero').classList.add('display-show');
    document.getElementById('home-hero').classList.remove('display-hidden');
    document.getElementById('api-resultados').classList.add('display-hidden');
    document.getElementById('api-resultados').classList.remove('display-show');
    document.getElementById('verify').classList.remove('display-hidden');
    document.getElementById('api-resultados').innerHTML='';
}