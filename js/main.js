var csvDados = new XMLHttpRequest();
csvDados.open('GET', './js/dados.csv', false);
csvDados.onreadystatechange = function() {
    csv = csvDados.responseText;
}

csvDados.send();

var dados = csvDados.responseText;
var dadosLinhas = dados.split('\n');
var dadosHeader = dadosLinhas[0].split(';');
dadosLinhas.shift();
//console.log(dadosHeader.length);
//console.log(dadosLinhas.length);
var dados = [];
for(var i = 0; i<5; i++) {
    var obj = {};
    var valores = [];
    for(var j = 0; j<24; j++){
        var colunas = dadosLinhas[j].split(';');
        valores.push(colunas[i]);    
    }
    obj[dadosHeader[i]] = valores;
    dados.push(obj)
}

var dadosjson = JSON.stringify(dados);
console.log(dados);

var eixo = dados[0];
var ns = dados[1]['NS'].map(function(item,index){
    return item.replace('%', '');
});
var tme = dados[2];
var tma = dados[3];
var hc = dados[4];



//console.log(i);
var ctx = document.getElementById("chart").getContext("2d");
var chart = new Chart(ctx, {
    type: 'bar',
    data: {
       labels: dados[0]['hora'],
        datasets: [{
            label: "NS",
            data: ns
        }]
    }
});
