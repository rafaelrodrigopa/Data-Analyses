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

    //Validação para não pegar outro tipo de arquivo, apenas txt
    if (file.name.substr(file.name.length-3,file.name.length) == 'txt') {
        leitorDeCSV.readAsText(file);
        this.inputElement = element;
    }else{
        alert('Atenção!\nInsira apenas arquivos de texto.');
        reset();
    }
    
    
}

function leCSV(evt) {

	var fileArr = evt.target.result.split('\n');
    var strDiv = '<table class=' + inputElement + '>';
    
    if (inputElement == 'CSVSaida') {
        strDiv += '<th>Formato Código/Quant.</th>'   
    }else{
        strDiv += '<th>Formato Arquivo cadastro</th>'
    }

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

    const btnRun = document.querySelector('.run');
    const btnClear = document.querySelector('.clear');

    if(vArq1.length === 0 || vArq2.length ===0){
        alert('Faça o upload dos arquivos para dar continuidade.')
    }else{

        var divergenciaDeItens = 0;
        var totalPecasSoma = 0;
        const unidTotalPecas = document.querySelector('.qtd-unities-contratada');
        const resultH2 = document.querySelector('.comp');
        const justify = document.querySelector('.cart-divergencia');

        for(let m = 0; m < totalPecas.length; m++){
            totalPecas[m] = totalPecas[m]*1;
            totalPecasSoma += totalPecas[m];
        }

        //console.log(totalPecasSoma);

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

                resultH2.innerHTML += `<strong style='padding: 10px; background: rgb(207, 230, 197); border-radius: 5px;'>Arquivos Compativeis.</strong>`;
                resultH2.querySelector('strong').style.color = 'green';

            }else{
                itemTotalEnv.querySelector('strong').style.color = 'red';
                itemTotalRec.querySelector('strong').style.color = 'red';

                justify.style.display = 'block';

                resultH2.innerHTML += `<strong style='padding: 10px; background-color: rgba(255, 0, 0, 0.247); border-radius: 5px;'>Arquivos Incompativeis.</strong>`;
                resultH2.querySelector('strong').style.color = 'brown';

                if (qtdContratante < qtdContratado) {
                    divergenciaDeItens = (qtdContratado-qtdContratante);
                    justify.querySelector('.diver-justify p').innerHTML = `O arquivo <b>recebido</b> da tercerizada possui <strong style='color:green;'>+${divergenciaDeItens}</strong> produto em relação ao enviado.`             
                }else{
                    divergenciaDeItens = (qtdContratante-qtdContratado);
                    justify.querySelector('.diver-justify p').innerHTML = `O arquivo <b>enviado</b> para a tercerizada possui <strong style='color:green;'>+${divergenciaDeItens}</strong> produto em relação ao recebido.` 
                }
            }
            totalItensNaTela = true;

            unidTotalPecas.innerHTML += `<strong style='background: gray;padding: 10px; border-radius: 5px;color: white;'>R$ ${totalPecasSoma.toLocaleString({style: 'currency',currency: 'BRL'})}</strong>`;
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