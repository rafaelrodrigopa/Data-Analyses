var leitorDeCSV = new FileReader();
var inputElement = '';
var vArq1 = []; //Contém todos os itens da empresa de inventários
var vArq2 = []; //Contém todos os itens da empresa contratante
var qtdContratante = 0;
var qtdContratado = 0;
var vArq1New = [];
var vArq2New = [];
var totalPecas = [];
var totalItensNaTela = false;


const divCSVSaida = document.getElementById('CSVSaida');
const divCSVSaidaRecebido = document.getElementById('CSVSaidaRecebido');

window.onload = function init() {
	leitorDeCSV.onload = leCSV;
}

function pegaCSV(inputFile, element) {
	var file = inputFile.files[0];
 	leitorDeCSV.readAsText(file);
	 this.inputElement = element;
}

function leCSV(evt) {

	var fileArr = evt.target.result.split('\n');
	var strDiv = '<table class=' + inputElement + '>';
    
	for (var i=0; i<fileArr.length; i++) {
        strDiv += '<tr>';
        var fileLine = fileArr[i].split('\n');
        
			for (var j=0; j<fileLine.length; j++) {
                strDiv += '<td>'+fileLine[j].trim()+'</td>';

                if (inputElement == 'CSVSaida') {
                    vArq1.push(fileLine[j].trim());

                    //Pega os digitos referente a quantidade do produto
                    totalPecas.push(fileLine[j].trim().substr(14,fileLine[j].length))

                }else{
                    vArq2.push(fileLine[j].trim());
                }
			}
		strDiv += '</tr>';
	}
    strDiv += '</table>';

	var saida = document.getElementById(inputElement);
        saida.innerHTML = strDiv;
        
    qtdContratado = vArq1.length
    qtdContratante = vArq2.length
}
function analysis(){

    var divergenciaDeItens = 0;
    var totalPecasSoma = 0;
    const unidTotalPecas = document.querySelector('.qtd-unities-contratada');
    const resultH2 = document.querySelector('#result h2');
    const justify = document.querySelector('.cart-divergencia');

    for(let m = 0; m < totalPecas.length; m++){
        totalPecas[m] = totalPecas[m]*1;
        totalPecasSoma += totalPecas[m];
    }

    console.log(totalPecasSoma);

    if (totalItensNaTela == false) {
        const itemTotalEnv = document.querySelector('.env-items');
        const itemTotalRec = document.querySelector('.rec-items');
        

        itemTotalEnv.innerHTML += "<strong>" + qtdContratante + "</strong>";
        itemTotalRec.innerHTML += "<strong>" + qtdContratado + "</strong>";

        /*
            Se a quantidade de itens for compativel, então receberá a cor verde,
            caso contrario receberá a cor vermelho
        */
        if (qtdContratante == qtdContratado) {
            itemTotalEnv.querySelector('strong').style.color = 'green';
            itemTotalRec.querySelector('strong').style.color = 'green';

            resultH2.innerHTML += `<strong>Arquivos Compativeis.</strong>`;
            resultH2.querySelector('strong').style.color = 'green';

        }else{
            itemTotalEnv.querySelector('strong').style.color = 'red';
            itemTotalRec.querySelector('strong').style.color = 'red';

            justify.style.display = 'block';

            resultH2.innerHTML += `<strong>Arquivos Incompativeis.</strong>`;
            resultH2.querySelector('strong').style.color = 'red';

            if (qtdContratante < qtdContratado) {
                divergenciaDeItens = (qtdContratado-qtdContratante);
                justify.querySelector('.diver-justify p').innerHTML = `O arquivo recebido da tercerizada possui <strong style='color:green;'>+${divergenciaDeItens}</strong> produto em relação ao enviado.`             
            }else{
                divergenciaDeItens = (qtdContratante-qtdContratado);
                justify.querySelector('.diver-justify p').innerHTML = `O arquivo enviado para a tercerizada possui <strong style='color:green;'>+${divergenciaDeItens}</strong> produto em relação ao recebido.` 
            }
        }
        totalItensNaTela = true;

        unidTotalPecas.innerHTML += `<strong>R$ ${totalPecasSoma.toLocaleString({style: 'currency',currency: 'BRL'})}</strong>`;
    }
    

    /*const importContratato = document.querySelector('.contratado');
    const importContratante = document.querySelector('.contratante');

    importContratante.style.display = 'none';
    importContratato.style.display = 'none';*/

    /*for(let i = 0; i < 3; i++){
        
        console.log(`Em cima: ` + Number(String(vArq1[i]).substr(0,14)))
        for(let j = 0; j < 10; j++){
            
            if(Number(String(vArq1[i]).substr(14,vArq1.length)) == Number(String(vArq2[j]).substr(0,13))){
                console.log(Number(String(vArq1[i]).substr(0,14)))
                break;
            }else{
                if (j === 9) {
                    vArq1New.push(vArq1[i])
                    break;   
                }
            }
        }
    }
    console.log(`nao: ${vArq1New}`);*/
}
