const valoresPorNota = {
    10: 20,
    9: 15,
    8: 10,
    7: -10,
    6: -15,
    5: -20
};
function calcularValorDaNota(nota) {
    const faixa = Math.floor(nota);
    return valoresPorNota[faixa];
}
const materias = [
    {nome: "Português", id: "notaportugues"},
    {nome: "Matemática", id: "notamatematica"},
    {nome: "História", id: "notahistoria"},
    {nome: "Geografia", id: "notageografia"},
    {nome: "Ciências", id: "notaciencias"},
    {nome: "Inglês", id: "notaingles"},
    {nome: "Educação Física", id: "notaedfisica"},
    {nome: "Artes", id: "notaartes"}
];

const nomesBimestres = {
    primeiro: "1º Bimestre",
    segundo: "2º Bimestre",
    terceiro: "3º Bimestre",
    quarto: "4º Bimestre"
};

const bimestres = {
    primeiro: { notas: {}, totalPositivo: 0, totalDescontos: 0, valorTotal: 0, fechado: false, dataFechamento: null},
    segundo: { notas: {}, totalPositivo: 0, totalDescontos: 0, valorTotal: 0, fechado: false, dataFechamento: null},
    terceiro: {notas: {}, totalPositivo: 0, totalDescontos: 0, valorTotal: 0, fechado: false, dataFechamento: null},
    quarto: {notas:{}, totalPositivo: 0, totalDescontos: 0, valorTotal: 0, fechado: false, dataFechamento: null}
};

let bimestreAtual = "primeiro";

const botaoCalcular = document.getElementById("botao-calcular");
const selectBimestre = document.getElementById("select-bimestre");
const tituloBimestre = document.getElementById("titulo-bimestre");
const listaValores = document.getElementById("lista-valores");
const totalPositivoE1 = document.getElementById("total-positivo");
const totalDescontosE1 = document.getElementById("total-desconto");
const valorBimestreE1 = document.getElementById("valor-bimestre");
const botaoFechar = document.getElementById("botao-fechar");
const statusBimestre = document.getElementById("status-bimestre");
const dataFechamento = document.getElementById("data-fechamento");

function lerNotasDaTela() {
    const notas = {};
    for (let i = 0; i < materias.length; i++) {
        const materia = materias[i];
        const input = document.getElementById(materia.id);
        notas[materia.id] = input.value;
    }

    return notas;

}

function escreverNotasNaTela(notas) {
    for (let i = 0; i < materias.length; i++){
        const materia = materias[i];
        const input = document.getElementById(materia.id);

        if (notas[materia.id] !== undefined) {
            input.value = notas[materia.id];
        } else {
            input.value = "";
        }
    }
}

function mostrarResultado(bimestre) {
    let textoLista = "";

    for (let i = 0; i < materias.length; i++) {
        const materia = materias[i];
        const notaDigitada = bimestre.notas[materia.id];

        if (notaDigitada === undefined || notaDigitada === "") {
            continue;
        }
        const nota = Number(notaDigitada);
        const valor = calcularValorDaNota(nota);

        if (valor > 0) {
            textoLista = textoLista + materia.nome + ": +" + valor + " | ";
        } else {
            textoLista = textoLista + materia.nome + ":" + valor + " | ";
        }
    }

    listaValores.textContent = textoLista;
    totalPositivoE1.textContent = "Total positivo R$" + bimestre.totalPositivo;
    totalDescontosE1.textContent = "Total descontos R$" + bimestre.totalDescontos;
    valorBimestreE1.textContent = "Valor do bimestre R$" + bimestre.valorTotal;
}

function limparResultados() {
    listaValores.textContent = "";
    totalPositivoE1.textContent = "";
    totalDescontosE1.textContent = "";
    valorBimestreE1.textContent = "";
}

function bloquearCampos(bloquear) {
    for (let i = 0; i < materias.length; i++) {
        const input = document.getElementById(materias[i].id);
        input.disabled = bloquear;
    }

botaoCalcular.disabled = bloquear;
botaoFechar.disabled = bloquear;

}

function atualizarStatusNaTela(bimestre) {
    if (bimestre.fechado) {
        statusBimestre.textContent = "Status: Fechado";
        dataFechamento.textContent = "Fechado em: " + bimestre.dataFechamento;
        bloquearCampos(true);
    } else {
        statusBimestre.textContent = "Status: Aberto";
        dataFechamento.textContent = "";
        bloquearCampos(false);
    }
}

botaoCalcular.addEventListener("click", function(){
    let totalPositivo = 0;
    let totalDescontos = 0;
    let textoLista = "";
    for (let i = 0; i < materias.length; i++) {
        const materia = materias[i];
        const nota = Number(document.getElementById(materia.id).value);
        const valor = calcularValorDaNota(nota);
        if (valor > 0) {
            totalPositivo = totalPositivo + valor;
            textoLista = textoLista + materia.nome + ": +" + valor + " | ";
        } else {
            totalDescontos = totalDescontos + Math.abs(valor);
            textoLista = textoLista + materia.nome + ": " + valor + " | ";
        }
    }
    let valorBimestre = totalPositivo - totalDescontos;
    if (valorBimestre < 0){
        valorBimestre = 0;
    }
    listaValores.textContent = textoLista;
    totalPositivoE1.textContent = "Total positivo R$" + totalPositivo;
    totalDescontosE1.textContent = "Descontos R$" + totalDescontos;
    valorBimestreE1.textContent = "Valor do bimestre R$" + valorBimestre;

    bimestres[bimestreAtual].notas = lerNotasDaTela();
    bimestres[bimestreAtual].totalPositivo = totalPositivo;
    bimestres[bimestreAtual].totalDescontos = totalDescontos;
    bimestres[bimestreAtual].valorTotal = valorBimestre;
});

botaoFechar.addEventListener("click", function (){
    const confirmou = confirm("Depois de fechar o bimestre as notas não poderão mais ser alteradas. Deseja continuar?");

    if(!confirmou){
        return;
    }

    bimestres[bimestreAtual].notas = lerNotasDaTela();
    bimestres[bimestreAtual].fechado = true;
    bimestres[bimestreAtual].dataFechamento = new Date().toLocaleDateString("pt-BR");

    atualizarStatusNaTela(bimestres[bimestreAtual]);
});

selectBimestre.addEventListener("change", function(){
    bimestres[bimestreAtual].notas = lerNotasDaTela();
    
    bimestreAtual = selectBimestre.value;
    tituloBimestre.textContent = nomesBimestres[bimestreAtual];

    escreverNotasNaTela(bimestres[bimestreAtual].notas);
    atualizarStatusNaTela(bimestres[bimestreAtual]);

    if (Object.keys(bimestres[bimestreAtual].notas).length > 0) {
        mostrarResultado(bimestres[bimestreAtual]);
    } else {
        limparResultados();
    }
});