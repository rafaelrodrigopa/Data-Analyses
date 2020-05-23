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

//Divs que contém as tabelas criadas a partir dos arquivos
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

                //Impede o leito de pegar uma em branco do arquivo
                if (fileLine[j] != '') {
                    strDiv += '<td>'+fileLine[j].trim()+'</td>';

                    if (inputElement == 'CSVSaida') {
                        vArq1.push(fileLine[j].trim());

                        //Pega os digitos referente a quantidade do produto
                        totalPecas.push(fileLine[j].trim().substr(14,fileLine[j].length))

                    }else{
                        vArq2.push(fileLine[j].trim());
                    }   
                }
			}
		strDiv += '</tr>';
	}
    strDiv += '</table>';

    //Incorpora a tabela na página com os dados carregados
	var saida = document.getElementById(inputElement);
        saida.innerHTML = strDiv;
        
    //Quantidades finais de cada arquivo
    qtdContratado = vArq1.length
    qtdContratante = vArq2.length

}
function analysis(){

    const btnRun = document.querySelector('.run');
    const btnClear = document.querySelector('.clear');

    //Impede o sistema de rodar se os arquivos não forem selecionados
    if(vArq1.length === 0 || vArq2.length ===0){
        alert('Faça o upload dos arquivos para dar continuidade.')
    }else{

        var divergenciaDeItens = 0;
        var totalPecasSoma = 0;
        const unidTotalPecas = document.querySelector('.qtd-unities-contratada');
        const resultH2 = document.querySelector('#result h2');
        const justify = document.querySelector('.cart-divergencia');

        for(let m = 0; m < totalPecas.length; m++){
            totalPecas[m] = totalPecas[m]*1;
            totalPecasSoma += totalPecas[m];
        }

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
}
/*function restartVars(){
    vArq1 = []; //Contém todos os itens da empresa de inventários
    vArq2 = []; //Contém todos os itens da empresa contratante
    qtdContratante = 0;
    qtdContratado = 0;
    vArq1New = [];
    vArq2New = [];
    totalPecas = [];
    totalItensNaTela = false;
}*/
function reset(){
    /*Faz regarregamento da página zerando todos os dados*/
    window.location.reload();
}
function previewImagem(){
    var imagem = document.querySelector('input[name=imagem]').files[0];
    var preview = document.querySelector('#bate');

    var reader = new FileReader();
    reader.onloadend = function(){
        preview.src = reader.result;
    }

    if (imagem) {
        reader.readAsDataURL(imagem);
    }else{
        preview.src = "";
    }
}