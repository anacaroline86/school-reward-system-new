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
let materias = [
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
    primeiro: { notas: {}, totalPositivo: 0, totalDescontos: 0, valorTotal: 0, fechado: false, dataFechamento: null, pago: false, dataPagamento: null},
    segundo: { notas: {}, totalPositivo: 0, totalDescontos: 0, valorTotal: 0, fechado: false, dataFechamento: null, pago: false, dataPagamento: null},
    terceiro: {notas: {}, totalPositivo: 0, totalDescontos: 0, valorTotal: 0, fechado: false, dataFechamento: null, pago: false, dataPagamento: null},
    quarto: {notas:{}, totalPositivo: 0, totalDescontos: 0, valorTotal: 0, fechado: false, dataFechamento: null, pago: false, dataPagamento: null}
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
const botaoPagar = document.getElementById("botao-pagar");
const statusPagamento = document.getElementById("status-pagamento");
const dataPagamento = document.getElementById("data-pagamento");
const dashboardNotasCadastradas = document.getElementById("dashboard-notas-cadastradas");
const dashboardNotasAcima = document.getElementById("dashboard-notas-acima");
const dashboardNotasAbaixo = document.getElementById("dashboard-notas-abaixo");
const dashboardPrimeiro = document.getElementById("dashboard-primeiro");
const dashboardSegundo = document.getElementById("dashboard-segundo");
const dashboardTerceiro = document.getElementById("dashboard-terceiro");
const dashboardQuarto = document.getElementById("dashboard-quarto");
const dashboardTotalPago = document.getElementById("dashboard-total-pago");
const mensagemValidacao = document.getElementById("mensagem-validacao");
const botaoResetar = document.getElementById("botao-resetar")
const configValor10 = document.getElementById("config-valor-10");
const configValor9 = document.getElementById("config-valor-9");
const configValor8 = document.getElementById("config-valor-8");
const configValor7 = document.getElementById("config-valor-7");
const configValor6 = document.getElementById("config-valor-6");
const configValor5 = document.getElementById("config-valor-5");
const botaoSalvarValores = document.getElementById("botao-salvar-valores");
const mensagemConfig = document.getElementById("mensagem-config");
const listaNotasMaterias = document.getElementById("lista-notas-materias");
const inputNovaMateria = document.getElementById("nova-materia");
const botaoAdicionarMateria = document.getElementById("botao-adicionar-materia");
const mensagemMateria = document.getElementById("mensagem-materia");

function lerNotasDaTela() {
    const notas = {};
    let tamanhoDasMaterias = materias.length
    
    for (let i = 0; i < tamanhoDasMaterias; i++) {
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

    if(bimestre.pago) {
        statusBimestre.textContent = "Status: Fechado";
        dataFechamento.textContent = "Fechado em: " + bimestre.dataFechamento;
        statusPagamento.textContent = "Pagamento: Pago";
        dataPagamento.textContent = "Pago em: " + bimestre.dataPagamento;
        bloquearCampos(true);
        botaoPagar.disabled = true;
    } else if (bimestre.fechado) {
        statusBimestre.textContent = "Status: Fechado";
        dataFechamento.textContent = "Fechado em: " + bimestre.dataFechamento;
        statusPagamento.textContent = "Pagamento: Pendente";
        dataPagamento.textContent = "";
        bloquearCampos(true);
        botaoPagar.disabled = false;
    } else {
        statusBimestre.textContent = "Status: Aberto";
        dataFechamento.textContent = "";
        statusPagamento.textContent = "Pagamento: -";
        dataPagamento.textContent = "";
        bloquearCampos(false);
        botaoPagar.disabled = true;
    }
}

function salvarDados() {
    const dados = {
        bimestres: bimestres,
        bimestreAtual: bimestreAtual,
        valoresPorNota: valoresPorNota,
        materias: materias
    };

    localStorage.setItem ("sistemaRecompensa", JSON.stringify(dados));

}

botaoResetar.addEventListener("click", function (){
    const confirmou = confirm("Isso apaga as notas, fechamentos e pagamentos de TODOS os bimestres. Deseja continuar?");

    if (!confirmou) {
        return;
    }

    bimestres.primeiro = criarBimestreVazio();
    bimestres.segundo = criarBimestreVazio();
    bimestres.terceiro = criarBimestreVazio();
    bimestres.quarto = criarBimestreVazio();

    bimestreAtual = "primeiro"
    selectBimestre.value = "primeiro"
    tituloBimestre.textContent = nomesBimestres.primeiro;

    localStorage.removeItem("sistemaRecompensa");

    escreverNotasNaTela({});
    limparResultados();
    mensagemValidacao.textContent = "";
    atualizarStatusNaTela(bimestres[bimestreAtual]);
    atualizarDashboard();

});

botaoSalvarValores.addEventListener("click", function(){
    mensagemConfig.textContent = "";

    if (!aplicarValoresDaTela()){
        return;
    }

    salvarDados();
    mensagemConfig.textContent = "Valores salvos."
})

function carregarDados() {
    const dadosSalvos = localStorage.getItem("sistemaRecompensa");

    if (!dadosSalvos) {
        return;
    }

    const dados = JSON.parse(dadosSalvos);

    bimestres.primeiro = dados.bimestres.primeiro;
    bimestres.segundo = dados.bimestres.segundo;
    bimestres.terceiro = dados.bimestres.terceiro;
    bimestres.quarto = dados.bimestres.quarto;
    bimestreAtual = dados.bimestreAtual;

    if(dados.valoresPorNota) {
        valoresPorNota[10] = Number(dados.valoresPorNota[10]);
        valoresPorNota[9] = Number(dados.valoresPorNota[9]);
        valoresPorNota[8] = Number(dados.valoresPorNota[8]);
        valoresPorNota[7] = Number(dados.valoresPorNota[7]);
        valoresPorNota[6] = Number(dados.valoresPorNota[6]);
        valoresPorNota[5] = Number(dados.valoresPorNota[5]);
    }

    if (dados.materias) {
        materias = dados.materias;
    }

    selectBimestre.value = bimestreAtual;
    tituloBimestre.textContent = nomesBimestres[bimestreAtual];
}

function atualizarDashboard() {
    const bimestre = bimestres[bimestreAtual];
    let notasCadastradas = 0;
    let notasAcima = 0;
    let notasAbaixo = 0;

    for (let i = 0; i < materias.length; i++) {
        const materia = materias[i];
        const notaDigitada = bimestre.notas[materia.id];

        if (notaDigitada === undefined || notaDigitada === ""){
            continue;
        }

        notasCadastradas = notasCadastradas + 1;

        const nota = Number(notaDigitada);
        if (nota >= 8){
            notasAcima = notasAcima + 1;
        } else {
            notasAbaixo = notasAbaixo + 1;
        }
    }

    dashboardNotasCadastradas.textContent = "Notas cadastradas: " + notasCadastradas + "/" + materias.length;
    dashboardNotasAcima.textContent = "Notas >= 8: " + notasAcima;
    dashboardNotasAbaixo.textContent = "Notas < 8: " + notasAbaixo;

    dashboardPrimeiro.textContent = "1º Bimestre: R$" + bimestres.primeiro.valorTotal + " — " + textoStatusAno(bimestres.primeiro);
    dashboardSegundo.textContent = "2º Bimestre: R$" + bimestres.segundo.valorTotal + " — " + textoStatusAno(bimestres.segundo);
    dashboardTerceiro.textContent = "3º Bimestre: R$" + bimestres.terceiro.valorTotal + " — " + textoStatusAno(bimestres.terceiro);
    dashboardQuarto.textContent = "4º Bimestre: R$" + bimestres.quarto.valorTotal + " — " + textoStatusAno(bimestres.quarto);

    let totalPago = 0;
    if (bimestres.primeiro.pago) {
        totalPago = totalPago + bimestres.primeiro.valorTotal;
    }
    if (bimestres.segundo.pago) {
        totalPago = totalPago + bimestres.segundo.valorTotal;
    }
    if (bimestres.terceiro.pago) {
        totalPago = totalPago + bimestres.terceiro.valorTotal;
    }
    if (bimestres.quarto.pago) {
        totalPago = totalPago + bimestres.quarto.valorTotal;
    }

    dashboardTotalPago.textContent = "Total pago no ano: R$" + totalPago;

}

function textoStatusAno(bimestre) {
    if (bimestre.pago){
        return "Pago";
    }
    if (bimestre.fechado) {
        return "Pendente";
    }
    return "Aberto";
}

function validarNotas(){
    mensagemValidacao.textContent = "";

    for (let i = 0; i < materias.length; i++) {
        const materia = materias[i]
        const input = document.getElementById(materia.id);
        const textoNota = input.value;

        if (textoNota === "") {
            mensagemValidacao.textContent = "Preencha a nota de  " + materia.nome + ".";
            return false;
        }

        const nota = Number(textoNota);

        if(nota < 0 || nota > 10){
            mensagemValidacao.textContent = "A nota deve estar entre 0 e 10.";
            return false
        }
    }
    return true;
}

function criarBimestreVazio(){
    return {
        notas: {},
        totalPositivo: 0,
        totalDescontos: 0,
        valorTotal: 0,
        fechado: false,
        dataFechamento: null,
        pago: false,
        dataPagamento: null
    };
}

function criarIdDaMateria(nome) {
    const nomeLimpo = nome.trim().toLowerCase().replace(/\s+/g, "");
    return "nota" + nomeLimpo;
}

function montarCamposNotas() {
    listaNotasMaterias.innerHTML = "";

    for (let i = 0; i < materias.length; i++) {
        const materia = materias[i];

        const label = document.createElement("label");
        label.setAttribute("for", materia.id);
        label.textContent = materia.nome + ":";

        const input = document.createElement("input");
        input.type = "number";
        input.id = materia.id;
        input.min = "0";
        input.max = "10";
        input.step = "0.1";

        const botaoRemover = document.createElement("button");
        botaoRemover.type = "button";
        botaoRemover.textContent = "Remover";
        botaoRemover.addEventListener("click", function (){
            removerMateria(materia.id);
        });

        listaNotasMaterias.appendChild(label);
        listaNotasMaterias.appendChild(input);
        listaNotasMaterias.appendChild(botaoRemover);
    }
}

function removerMateria(id) {
    if(materias.length <= 1) {
        mensagemMateria.textContent = "Precisa ter pelo menos uma matéria.";
        return;
    }

    const materiasNovas = [];
    for (let i = 0; i < materias.length; i++){
        if (materias[i].id !== id) {
            materiasNovas.push(materias[i]);
        }
    }
    materias = materiasNovas;

    const chaves = ["primeiro", "segundo", "terceiro", "quarto"];
    for (let i = 0; i < chaves.length; i++) {
        delete bimestres[chaves[i]].notas[id];
    }

    montarCamposNotas();
    escreverNotasNaTela(bimestres[bimestreAtual].notas);
    atualizarStatusNaTela(bimestres[bimestreAtual]);
    atualizarDashboard();
    salvarDados();

    mensagemMateria.textContent = "Matéria removida."
}

function mostrarValoresNaTela() {
    configValor10.value = valoresPorNota[10];
    configValor9.value = valoresPorNota[9];
    configValor8.value = valoresPorNota[8];
    configValor7.value = valoresPorNota[7];
    configValor6.value = valoresPorNota[6];
    configValor5.value = valoresPorNota[5];
}

function aplicarValoresDaTela(){
    if (configValor10.value === "" ||
    configValor9.value === "" ||
    configValor8.value === "" ||
    configValor7.value === "" ||
    configValor6.value === "" ||
    configValor5.value === ""
    ) {
        mensagemConfig.textContent = "Preencher todos os valores das notas."
        return false;
    }

    valoresPorNota[10] = Number(configValor10.value);
    valoresPorNota[9] = Number(configValor9.value);
    valoresPorNota[8] = Number(configValor8.value);
    valoresPorNota[7] = Number(configValor7.value);
    valoresPorNota[6] = Number(configValor6.value);
    valoresPorNota[5] = Number(configValor5.value);

    return true;
}

botaoCalcular.addEventListener("click", function(){

    if (!validarNotas()) {
        return;
    }

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
    salvarDados();
    atualizarDashboard();
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
    salvarDados();
    atualizarDashboard();
});

botaoPagar.addEventListener("click", function () {
    if (!bimestres[bimestreAtual].fechado) {
        alert("O bimestre precisa estar fechado para marcar o pagamento.");
        return;
    }
    
    bimestres[bimestreAtual].pago = true;
    bimestres[bimestreAtual].dataPagamento = new Date().toLocaleDateString("pt-BR");
    atualizarStatusNaTela(bimestres[bimestreAtual]);
    salvarDados();
    atualizarDashboard();
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
    salvarDados();
    atualizarDashboard();
});

botaoAdicionarMateria.addEventListener("click", function (){
    mensagemMateria.textContent = "";

    const nome = inputNovaMateria.value.trim();

    if (nome === "") {
        mensagemMateria.textContent = "Digite o nome da matéria.";
        return;
    }

    const id = criarIdDaMateria(nome);

    for (let i = 0; i < materias.length; i++) {
        if (materias[i].id === id){
            mensagemMateria.textContent = "Essa matéria já existe.";
            return;
        }
    }

    materias.push({nome: nome, id: id});

    montarCamposNotas();
    escreverNotasNaTela(bimestres[bimestreAtual].notas);
    atualizarStatusNaTela(bimestres[bimestreAtual]);
    atualizarDashboard();
    salvarDados();

    inputNovaMateria.value = "";
    mensagemMateria.textContent = "Matéria adicionada.";
})
carregarDados();
montarCamposNotas();
escreverNotasNaTela(bimestres[bimestreAtual].notas);

if (Object.keys(bimestres[bimestreAtual].notas).length > 0) {
    mostrarResultado(bimestres[bimestreAtual]);
} else {
    limparResultados();
}

atualizarStatusNaTela(bimestres[bimestreAtual]);
atualizarDashboard();