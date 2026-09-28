const valoresPorNota = {
    10: null,
    9: null,
    8: null,
    7: null,
    6: null,
    5: null,
    menorQue5: null
};

function calcularValorDaNota(nota) {
    const faixa = Math.floor(nota);

    if (faixa < 5) {
        return valoresPorNota.menorQue5;
    }

    return valoresPorNota[faixa];
}

function valoresEstaoConfigurados() {
    const faixas = [10, 9, 8, 7, 6, 5];

    for (let i = 0; i < faixas.length; i++) {
        if (typeof valoresPorNota[faixas[i]] !== "number") {
            return false;
        }
    }

    if (typeof valoresPorNota.menorQue5 !== "number") {
        return false;
    }

    return true;
}

function limparValoresPorNota() {
    valoresPorNota[10] = null;
    valoresPorNota[9] = null;
    valoresPorNota[8] = null;
    valoresPorNota[7] = null;
    valoresPorNota[6] = null;
    valoresPorNota[5] = null;
    valoresPorNota.menorQue5 = null;
}
let materias = [];
let perfis = [];
let perfilAtualId = null;
let responsavel = null;
let modoModalPerfil = "criar";

const CHAVE_SESSAO = "sessaoResponsavel";
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
const botaoReabrir = document.getElementById("botao-reabrir");
const statusBimestre = document.getElementById("status-bimestre");
const dataFechamento = document.getElementById("data-fechamento");
const botaoPagar = document.getElementById("botao-pagar");
const statusPagamento = document.getElementById("status-pagamento");
const dataPagamento = document.getElementById("data-pagamento");
const dashboardNotasCadastradas = document.getElementById("dashboard-notas-cadastradas");
const dashboardPrimeiroStatus = document.getElementById("dashboard-primeiro-status");
const dashboardSegundoStatus = document.getElementById("dashboard-segundo-status");
const dashboardTerceiroStatus = document.getElementById("dashboard-terceiro-status");
const dashboardQuartoStatus = document.getElementById("dashboard-quarto-status");
const dashboardNotasAcima = document.getElementById("dashboard-notas-acima");
const dashboardNotasAbaixo = document.getElementById("dashboard-notas-abaixo");
const dashboardPrimeiro = document.getElementById("dashboard-primeiro");
const dashboardSegundo = document.getElementById("dashboard-segundo");
const dashboardTerceiro = document.getElementById("dashboard-terceiro");
const dashboardQuarto = document.getElementById("dashboard-quarto");
const dashboardTotalPago = document.getElementById("dashboard-total-pago");
const mensagemValidacao = document.getElementById("mensagem-validacao");
const configValor10 = document.getElementById("config-valor-10");
const configValor9 = document.getElementById("config-valor-9");
const configValor8 = document.getElementById("config-valor-8");
const configValor7 = document.getElementById("config-valor-7");
const configValor6 = document.getElementById("config-valor-6");
const configValor5 = document.getElementById("config-valor-5");
const configValorMenor5 = document.getElementById("config-valor-menor-5");
const botaoSalvarValores = document.getElementById("botao-salvar-valores");
const botaoEditarValores = document.getElementById("botao-editar-valores");
const mensagemConfig = document.getElementById("mensagem-config");
const listaNotasMaterias = document.getElementById("lista-notas-materias");
const modalMateria = document.getElementById("modal-materia");
const inputModalMateria = document.getElementById("input-modal-materia");
const mensagemModalMateria = document.getElementById("mensagem-modal-materia");
const botaoCancelarModalMateria = document.getElementById("botao-cancelar-modal-materia");
const botaoConfirmarModalMateria = document.getElementById("botao-confirmar-modal-materia");
const botaoAdicionarMateriaNotas = document.getElementById("botao-adicionar-materia-notas");
const listaAvataresPerfis = document.getElementById("lista-avatares-perfis");
const modalPerfil = document.getElementById("modal-perfil");
const tituloModalPerfil = document.getElementById("titulo-modal-perfil");
const dicaModalPerfil = document.getElementById("dica-modal-perfil");
const inputModalPerfil = document.getElementById("input-modal-perfil");
const mensagemModalPerfil = document.getElementById("mensagem-modal-perfil");
const botaoCancelarModalPerfil = document.getElementById("botao-cancelar-modal-perfil");
const botaoConfirmarModalPerfil = document.getElementById("botao-confirmar-modal-perfil");
const telaAcesso = document.getElementById("tela-acesso");
const appPrincipal = document.getElementById("app-principal");
const tituloAcesso = document.getElementById("titulo-acesso");
const tituloPainelAcesso = document.getElementById("titulo-painel-acesso");
const subtituloAcesso = document.getElementById("subtitulo-acesso");
const formCadastro = document.getElementById("form-cadastro");
const formLogin = document.getElementById("form-login");
const acessoNome = document.getElementById("acesso-nome");
const acessoSenhaCadastro = document.getElementById("acesso-senha-cadastro");
const acessoSenhaConfirmar = document.getElementById("acesso-senha-confirmar");
const acessoSenhaLogin = document.getElementById("acesso-senha-login");
const botaoCriarConta = document.getElementById("botao-criar-conta");
const botaoEntrar = document.getElementById("botao-entrar");
const mensagemAcesso = document.getElementById("mensagem-acesso");
const botaoSair = document.getElementById("botao-sair");
const menuConfig = document.getElementById("menu-config");
const botaoConfig = document.getElementById("botao-config");
const painelConfig = document.getElementById("painel-config");
const botaoExportar = document.getElementById("botao-exportar");
const botaoImportar = document.getElementById("botao-importar");
const inputImportar = document.getElementById("input-importar");
const mensagemBackup = document.getElementById("mensagem-backup");
const botaoResetarBimestre = document.getElementById("botao-resetar-bimestre");
const botaoResetarBimestres = document.getElementById("botao-resetar-bimestres");
const botaoResetarPerfil = document.getElementById("botao-resetar-perfil");
const mensagemReset = document.getElementById("mensagem-reset");
const botaoAbrirTrocarSenha = document.getElementById("botao-abrir-trocar-senha");
const botaoAbrirEditarNome = document.getElementById("botao-abrir-editar-nome");
const botaoAbrirExcluirConta = document.getElementById("botao-abrir-excluir-conta");
const modalSenha = document.getElementById("modal-senha");
const senhaAtual = document.getElementById("senha-atual");
const senhaNova = document.getElementById("senha-nova");
const senhaNovaConfirmar = document.getElementById("senha-nova-confirmar");
const mensagemModalSenha = document.getElementById("mensagem-modal-senha");
const botaoCancelarModalSenha = document.getElementById("botao-cancelar-modal-senha");
const botaoConfirmarModalSenha = document.getElementById("botao-confirmar-modal-senha");
const modalNomeResponsavel = document.getElementById("modal-nome-responsavel");
const inputNomeResponsavel = document.getElementById("input-nome-responsavel");
const mensagemModalNomeResponsavel = document.getElementById("mensagem-modal-nome-responsavel");
const botaoCancelarModalNome = document.getElementById("botao-cancelar-modal-nome");
const botaoConfirmarModalNome = document.getElementById("botao-confirmar-modal-nome");
const modalExcluirConta = document.getElementById("modal-excluir-conta");
const senhaExcluirConta = document.getElementById("senha-excluir-conta");
const mensagemModalExcluirConta = document.getElementById("mensagem-modal-excluir-conta");
const botaoCancelarModalExcluirConta = document.getElementById("botao-cancelar-modal-excluir-conta");
const botaoConfirmarExcluirConta = document.getElementById("botao-confirmar-excluir-conta");
const botaoOrdenarMaterias = document.getElementById("botao-ordenar-materias");
const botaoDuplicarNotas = document.getElementById("botao-duplicar-notas");
const botaoImprimirBimestre = document.getElementById("botao-imprimir-bimestre");
const botaoImprimirAno = document.getElementById("botao-imprimir-ano");
const areaRelatorio = document.getElementById("area-relatorio");

const ORDEM_BIMESTRES = ["primeiro", "segundo", "terceiro", "quarto"];

const materiasPadrao = [
    "Português",
    "Matemática",
    "História",
    "Geografia",
    "Ciências",
    "Inglês",
    "Educação Física",
    "Artes"
];

const inputsValores = [
    configValor10,
    configValor9,
    configValor8,
    configValor7,
    configValor6,
    configValor5,
    configValorMenor5
];

function mostrarMensagem(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.classList.remove("mensagem-erro", "mensagem-sucesso");

    if (tipo === "erro") {
        elemento.classList.add("mensagem-erro");
    } else if (tipo === "sucesso") {
        elemento.classList.add("mensagem-sucesso");
    }
}

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

        if (!input) {
            continue;
        }

        if (notas[materia.id] !== undefined) {
            input.value = notas[materia.id];
        } else {
            input.value = "";
        }
    }

    atualizarTodosPreviewsNotas();
}

function formatarValorNotaPreview(textoNota) {
    if (!valoresEstaoConfigurados()) {
        return { texto: "—", tipo: "" };
    }

    if (textoNota === "" || textoNota === undefined || textoNota === null) {
        return { texto: "—", tipo: "" };
    }

    const nota = Number(textoNota);

    if (Number.isNaN(nota) || nota < 0 || nota > 10) {
        return { texto: "—", tipo: "" };
    }

    const valor = calcularValorDaNota(nota);

    if (typeof valor !== "number") {
        return { texto: "—", tipo: "" };
    }

    if (valor > 0) {
        return { texto: "+R$ " + valor, tipo: "positivo" };
    }

    if (valor < 0) {
        return { texto: "-R$ " + Math.abs(valor), tipo: "negativo" };
    }

    return { texto: "R$ 0", tipo: "" };
}

function atualizarPreviewValorNota(input) {
    if (!input) {
        return;
    }

    const span = input.parentElement.querySelector(".valor-nota-linha");

    if (!span) {
        return;
    }

    const preview = formatarValorNotaPreview(input.value);
    span.textContent = preview.texto;
    span.classList.remove("positivo", "negativo");

    if (preview.tipo) {
        span.classList.add(preview.tipo);
    }
}

function atualizarTodosPreviewsNotas() {
    for (let i = 0; i < materias.length; i++) {
        atualizarPreviewValorNota(document.getElementById(materias[i].id));
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
    valorBimestreE1.textContent = "R$ " + bimestre.valorTotal;
}

function limparResultados() {
    listaValores.textContent = "";
    totalPositivoE1.textContent = "Total positivo: R$ ";
    totalDescontosE1.textContent = "Descontos: R$ ";
    valorBimestreE1.textContent = "R$ ";
}

function bloquearCampos(bloquear) {
    for (let i = 0; i < materias.length; i++) {
        const input = document.getElementById(materias[i].id);

        if (input) {
            input.disabled = bloquear;
        }
    }

    const botoesRemover = document.querySelectorAll(".botao-remover");

    for (let i = 0; i < botoesRemover.length; i++) {
        botoesRemover[i].disabled = bloquear;
    }

    botaoCalcular.disabled = bloquear;
    botaoFechar.disabled = bloquear;
    botaoAdicionarMateriaNotas.disabled = bloquear;
    botaoOrdenarMaterias.disabled = bloquear;
    botaoDuplicarNotas.disabled = bloquear;
}

function atualizarStatusNaTela(bimestre) {
    if (bimestre.pago) {
        statusBimestre.textContent = "Status: Fechado";
        dataFechamento.textContent = "Fechado em: " + bimestre.dataFechamento;
        statusPagamento.textContent = "Pagamento: Pago";
        dataPagamento.textContent = "Pago em: " + bimestre.dataPagamento;
        bloquearCampos(true);
        botaoPagar.disabled = true;
        botaoPagar.hidden = true;
        botaoFechar.hidden = true;
        botaoReabrir.hidden = false;
        botaoReabrir.disabled = false;
    } else if (bimestre.fechado) {
        statusBimestre.textContent = "Status: Fechado";
        dataFechamento.textContent = "Fechado em: " + bimestre.dataFechamento;
        statusPagamento.textContent = "Pagamento: Pendente";
        dataPagamento.textContent = "";
        bloquearCampos(true);
        botaoPagar.disabled = false;
        botaoPagar.hidden = false;
        botaoFechar.hidden = true;
        botaoReabrir.hidden = false;
        botaoReabrir.disabled = false;
    } else {
        statusBimestre.textContent = "Status: Aberto";
        dataFechamento.textContent = "";
        statusPagamento.textContent = "Pagamento: ";
        dataPagamento.textContent = "";
        bloquearCampos(false);
        botaoPagar.disabled = true;
        botaoPagar.hidden = false;
        botaoFechar.hidden = false;
        botaoReabrir.hidden = true;
    }

    atualizarPillStatus();
}

function atualizarPillStatus() {
    const bimestre = bimestres[bimestreAtual];
    let statusTexto = "Aberto";

    if (bimestre.pago || bimestre.fechado) {
        statusTexto = "Fechado";
    }

    tituloBimestre.textContent = nomesBimestres[bimestreAtual] + " · " +  statusTexto;
}

function criarBimestresVazios() {
    return {
        primeiro: criarBimestreVazio(),
        segundo: criarBimestreVazio(),
        terceiro: criarBimestreVazio(),
        quarto: criarBimestreVazio()
    };
}

function criarValoresVazios() {
    return {
        10: null,
        9: null,
        8: null,
        7: null,
        6: null,
        5: null,
        menorQue5: null
    };
}

function criarMateriasIniciais() {
    const lista = [];

    for (let i = 0; i < materiasPadrao.length; i++) {
        const nome = materiasPadrao[i];
        lista.push({
            nome: nome,
            id: criarIdDaMateria(nome)
        });
    }

    return lista;
}

function criarPerfil(nome) {
    return {
        id: "perfil-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
        nome: nome.trim(),
        materias: criarMateriasIniciais(),
        valoresPorNota: criarValoresVazios(),
        bimestreAtual: "primeiro",
        bimestres: criarBimestresVazios()
    };
}

function normalizarNomenclaturaPerfis() {
    for (let i = 0; i < perfis.length; i++) {
        const perfil = perfis[i];

        if (perfil.id && perfil.id.indexOf("filho-") === 0) {
            perfil.id = "perfil-" + perfil.id.slice("filho-".length);
        }
    }

    if (perfilAtualId && perfilAtualId.indexOf("filho-") === 0) {
        perfilAtualId = "perfil-" + perfilAtualId.slice("filho-".length);
    }
}

function obterPerfilAtual() {
    for (let i = 0; i < perfis.length; i++) {
        if (perfis[i].id === perfilAtualId) {
            return perfis[i];
        }
    }
    return null;
}

function garantirPerfilPadrao() {
    if (obterPerfilAtual()) {
        return obterPerfilAtual();
    }

    if (perfis.length > 0) {
        perfilAtualId = perfis[0].id;
        aplicarEstadoDoPerfil(obterPerfilAtual());
        return obterPerfilAtual();
    }

    const perfilPadrao = criarPerfil("Meu perfil");
    perfis.push(perfilPadrao);
    perfilAtualId = perfilPadrao.id;
    aplicarEstadoDoPerfil(perfilPadrao);
    return perfilPadrao;
}

function copiarValoresPorNota(origem, destino) {
    const faixas = [10, 9, 8, 7, 6, 5];

    for (let i = 0; i < faixas.length; i++) {
        const faixa = faixas[i];
        const valor = origem[faixa];

        if (valor === null || valor === undefined || valor === "") {
            destino[faixa] = null;
        } else {
            destino[faixa] = Number(valor);
        }
    }

    if (origem.menorQue5 === null || origem.menorQue5 === undefined || origem.menorQue5 === "") {
        destino.menorQue5 = null;
    } else {
        destino.menorQue5 = Number(origem.menorQue5);
    }
}

function capturarEstadoDoPerfilAtual() {
    const perfil = obterPerfilAtual();

    if (!perfil) {
        return;
    }

    perfil.materias = materias;
    perfil.bimestreAtual = bimestreAtual;
    perfil.valoresPorNota = {
        10: valoresPorNota[10],
        9: valoresPorNota[9],
        8: valoresPorNota[8],
        7: valoresPorNota[7],
        6: valoresPorNota[6],
        5: valoresPorNota[5],
        menorQue5: valoresPorNota.menorQue5
    };
    perfil.bimestres = {
        primeiro: bimestres.primeiro,
        segundo: bimestres.segundo,
        terceiro: bimestres.terceiro,
        quarto: bimestres.quarto
    };
}

function aplicarEstadoDoPerfil(perfil) {
    if (!perfil) {
        materias = [];
        limparValoresPorNota();
        bimestreAtual = "primeiro";
        bimestres.primeiro = criarBimestreVazio();
        bimestres.segundo = criarBimestreVazio();
        bimestres.terceiro = criarBimestreVazio();
        bimestres.quarto = criarBimestreVazio();
        return;
    }

    materias = perfil.materias || [];
    bimestreAtual = perfil.bimestreAtual || "primeiro";
    copiarValoresPorNota(perfil.valoresPorNota || criarValoresVazios(), valoresPorNota);

    const bimestresDoPerfil = perfil.bimestres || criarBimestresVazios();
    bimestres.primeiro = bimestresDoPerfil.primeiro;
    bimestres.segundo = bimestresDoPerfil.segundo;
    bimestres.terceiro = bimestresDoPerfil.terceiro;
    bimestres.quarto = bimestresDoPerfil.quarto;
}

function atualizarTelaDoPerfilAtual() {
    selectBimestre.value = bimestreAtual;
    marcarAbaAtiva();
    montarCamposNotas();
    mostrarValoresNaTela();
    definirModoEdicaoValores(!valoresEstaoConfigurados());
    escreverNotasNaTela(bimestres[bimestreAtual].notas);

    if (Object.keys(bimestres[bimestreAtual].notas).length > 0) {
        mostrarResultado(bimestres[bimestreAtual]);
    } else {
        limparResultados();
    }

    atualizarStatusNaTela(bimestres[bimestreAtual]);
    atualizarDashboard();
    mostrarMensagem(mensagemValidacao, "");
    mostrarMensagem(mensagemConfig, "");
    mostrarMensagem(mensagemReset, "");
}

function pegarIniciaisDoNome(nome) {
    const partes = nome.trim().split(/\s+/);
    let iniciais = partes[0].charAt(0);

    if (partes.length > 1) {
        iniciais = iniciais + partes[partes.length - 1].charAt(0);
    }

    return iniciais.toUpperCase();
}

function excluirPerfil(id) {
    let perfil = null;

    for (let i = 0; i < perfis.length; i++) {
        if (perfis[i].id === id) {
            perfil = perfis[i];
            break;
        }
    }

    if (!perfil) {
        return;
    }

    const confirmou = confirm('Excluir o perfil "' + perfil.nome + '"? As matérias, notas e valores deste perfil serão apagados.');

    if (!confirmou) {
        return;
    }

    if (id === perfilAtualId) {
        capturarEstadoDoPerfilAtual();
    }

    const perfisNovos = [];
    for (let i = 0; i < perfis.length; i++) {
        if (perfis[i].id !== id) {
            perfisNovos.push(perfis[i]);
        }
    }
    perfis = perfisNovos;

    if (perfilAtualId === id) {
        perfilAtualId = perfis[0] ? perfis[0].id : null;
        aplicarEstadoDoPerfil(obterPerfilAtual());
    }

    salvarDados();
    montarAvataresPerfis();
    garantirPerfilPadrao();
    atualizarTelaDoPerfilAtual();
}

function montarAvataresPerfis() {
    listaAvataresPerfis.innerHTML = "";

    for (let i = 0; i < perfis.length; i++) {
        const perfil = perfis[i];

        const item = document.createElement("div");
        item.className = "avatar-perfil-item";

        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "avatar-perfil";
        botao.setAttribute("data-perfil-id", perfil.id);
        botao.setAttribute("aria-label", perfil.nome);
        botao.title = perfil.nome;

        if (perfil.id === perfilAtualId) {
            botao.classList.add("ativo");
            botao.title = perfil.nome + " — clique para editar o nome";
        }

        const iniciais = document.createElement("span");
        iniciais.className = "avatar-perfil-iniciais";
        iniciais.textContent = pegarIniciaisDoNome(perfil.nome);

        const nomeAcessivel = document.createElement("span");
        nomeAcessivel.className = "avatar-perfil-nome";
        nomeAcessivel.textContent = perfil.nome;

        botao.appendChild(iniciais);
        botao.appendChild(nomeAcessivel);

        botao.addEventListener("click", function () {
            if (perfil.id === perfilAtualId) {
                abrirModalEditarPerfil();
                return;
            }

            capturarEstadoDoPerfilAtual();
            perfilAtualId = perfil.id;
            aplicarEstadoDoPerfil(obterPerfilAtual());
            salvarDados();
            montarAvataresPerfis();
            atualizarTelaDoPerfilAtual();
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.className = "avatar-perfil-excluir";
        botaoExcluir.setAttribute("aria-label", "Excluir perfil " + perfil.nome);
        botaoExcluir.title = "Excluir perfil";
        botaoExcluir.textContent = "×";
        botaoExcluir.addEventListener("click", function (evento) {
            evento.stopPropagation();
            excluirPerfil(perfil.id);
        });

        item.appendChild(botao);
        item.appendChild(botaoExcluir);
        listaAvataresPerfis.appendChild(item);
    }

    const botaoAdicionar = document.createElement("button");
    botaoAdicionar.type = "button";
    botaoAdicionar.id = "botao-adicionar-perfil";
    botaoAdicionar.className = "avatar-perfil avatar-adicionar";
    botaoAdicionar.setAttribute("aria-label", "Adicionar perfil");
    botaoAdicionar.innerHTML = '<svg class="avatar-adicionar-icone" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
    botaoAdicionar.addEventListener("click", function () {
        abrirModalPerfil();
    });

    listaAvataresPerfis.appendChild(botaoAdicionar);
}

function salvarDados() {
    capturarEstadoDoPerfilAtual();
    normalizarNomenclaturaPerfis();

    const dados = {
        versao: 2,
        responsavel: responsavel,
        perfis: perfis,
        perfilAtualId: perfilAtualId
    };

    localStorage.setItem("sistemaRecompensa", JSON.stringify(dados));
}

function migrarDadosAntigos(dados) {
    const perfil = criarPerfil(dados.nomePerfil || "Meu perfil");

    perfil.materias = dados.materias || [];
    perfil.bimestreAtual = dados.bimestreAtual || "primeiro";

    if (dados.valoresPorNota) {
        copiarValoresPorNota(dados.valoresPorNota, perfil.valoresPorNota);
    }

    if (dados.bimestres) {
        perfil.bimestres = dados.bimestres;
    }

    perfis = [perfil];
    perfilAtualId = perfil.id;
}

function carregarDados() {
    const dadosSalvos = localStorage.getItem("sistemaRecompensa");

    if (!dadosSalvos) {
        return;
    }

    const dados = JSON.parse(dadosSalvos);

    if (dados.responsavel) {
        responsavel = dados.responsavel;
    }

    if (dados.perfis || dados.filhos) {
        perfis = dados.perfis || dados.filhos;
        perfilAtualId = dados.perfilAtualId || dados.filhoAtualId || (perfis[0] && perfis[0].id) || null;
    } else if (dados.bimestres) {
        migrarDadosAntigos(dados);
    }

    normalizarNomenclaturaPerfis();
    aplicarEstadoDoPerfil(obterPerfilAtual());
}

function garantirPerfilParaReset() {
    if (!obterPerfilAtual()) {
        alert("Adicione um perfil antes de zerar os dados.");
        return false;
    }
    return true;
}

function zerarBimestreAtual() {
    bimestres[bimestreAtual] = criarBimestreVazio();
    salvarDados();
    atualizarTelaDoPerfilAtual();
    mostrarMensagem(mensagemReset, "Bimestre atual zerado.", "sucesso");
}

function zerarTodosOsBimestres() {
    bimestres.primeiro = criarBimestreVazio();
    bimestres.segundo = criarBimestreVazio();
    bimestres.terceiro = criarBimestreVazio();
    bimestres.quarto = criarBimestreVazio();
    bimestreAtual = "primeiro";
    selectBimestre.value = "primeiro";
    marcarAbaAtiva();
    salvarDados();
    atualizarTelaDoPerfilAtual();
    mostrarMensagem(mensagemReset, "Todos os bimestres foram zerados.", "sucesso");
}

function zerarPerfilInteiro() {
    bimestres.primeiro = criarBimestreVazio();
    bimestres.segundo = criarBimestreVazio();
    bimestres.terceiro = criarBimestreVazio();
    bimestres.quarto = criarBimestreVazio();
    materias = [];
    limparValoresPorNota();
    bimestreAtual = "primeiro";
    selectBimestre.value = "primeiro";
    marcarAbaAtiva();
    salvarDados();
    atualizarTelaDoPerfilAtual();
    mostrarMensagem(mensagemReset, "Perfil zerado por completo.", "sucesso");
}

botaoResetarBimestre.addEventListener("click", function () {
    mostrarMensagem(mensagemReset, "");

    if (!garantirPerfilParaReset()) {
        return;
    }

    const confirmou = confirm("Isso apaga as notas, fechamento e pagamento só do bimestre atual. Matérias e valores ficam. Continuar?");

    if (!confirmou) {
        return;
    }

    zerarBimestreAtual();
});

botaoResetarBimestres.addEventListener("click", function () {
    mostrarMensagem(mensagemReset, "");

    if (!garantirPerfilParaReset()) {
        return;
    }

    const confirmou = confirm("Isso apaga notas, fechamentos e pagamentos de TODOS os bimestres. Matérias e valores por nota ficam. Continuar?");

    if (!confirmou) {
        return;
    }

    zerarTodosOsBimestres();
});

botaoResetarPerfil.addEventListener("click", function () {
    mostrarMensagem(mensagemReset, "");

    if (!garantirPerfilParaReset()) {
        return;
    }

    const confirmou = confirm("Isso apaga matérias, notas, valores, fechamentos e pagamentos deste perfil. Continuar?");

    if (!confirmou) {
        return;
    }

    zerarPerfilInteiro();
});

botaoSalvarValores.addEventListener("click", function(){
    mostrarMensagem(mensagemConfig, "");

    if (!aplicarValoresDaTela()){
        return;
    }

    salvarDados();
    definirModoEdicaoValores(false);
    atualizarTodosPreviewsNotas();
    mostrarMensagem(mensagemConfig, "Valores salvos.", "sucesso");
});

botaoEditarValores.addEventListener("click", function () {
    definirModoEdicaoValores(true);
    mostrarMensagem(mensagemConfig, "");
});

function definirModoEdicaoValores(editando) {
    for (let i = 0; i < inputsValores.length; i++) {
        inputsValores[i].disabled = !editando;
    }

    botaoSalvarValores.hidden = !editando;
    botaoEditarValores.hidden = editando;
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

    dashboardNotasCadastradas.textContent = notasCadastradas + "/" + materias.length;
    dashboardNotasAcima.textContent = String(notasAcima);
    dashboardNotasAbaixo.textContent = String(notasAbaixo);

    dashboardPrimeiro.textContent = "R$ " + bimestres.primeiro.valorTotal;
    dashboardPrimeiroStatus.textContent = textoStatusAno(bimestres.primeiro);

    dashboardSegundo.textContent = "R$ " + bimestres.segundo.valorTotal;
    dashboardSegundoStatus.textContent = textoStatusAno(bimestres.segundo);

    dashboardTerceiro.textContent = "R$ " + bimestres.terceiro.valorTotal;
    dashboardTerceiroStatus.textContent = textoStatusAno(bimestres.terceiro);

    dashboardQuarto.textContent = "R$ " + bimestres.quarto.valorTotal;
    dashboardQuartoStatus.textContent = textoStatusAno(bimestres.quarto);

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

    dashboardTotalPago.textContent = "Total já pago: R$ " + totalPago;

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
    mostrarMensagem(mensagemValidacao, "");

    if (materias.length === 0) {
        mostrarMensagem(mensagemValidacao, "Adicione pelo menos uma matéria.", "erro");
        return false;
    }

    for (let i = 0; i < materias.length; i++) {
        const materia = materias[i]
        const input = document.getElementById(materia.id);
        const textoNota = input.value;

        if (textoNota === "") {
            mostrarMensagem(mensagemValidacao, "Preencha a nota de  " + materia.nome + ".", "erro");
            return false;
        }

        const nota = Number(textoNota);

        if(nota < 0 || nota > 10){
            mostrarMensagem(mensagemValidacao, "A nota deve estar entre 0 e 10.", "erro");
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

    if (materias.length === 0) {
        const textoVazio = document.createElement("p");
        textoVazio.className = "texto-vazio";
        textoVazio.textContent = "Nenhuma matéria cadastrada. Use + Nova matéria para começar.";
        listaNotasMaterias.appendChild(textoVazio);
        return;
    }

    for (let i = 0; i < materias.length; i++) {
        const materia = materias[i];

        const linha = document.createElement("div");
        linha.className = "linha-materia";

        const label = document.createElement("label");
        label.setAttribute("for", materia.id);
        label.textContent = materia.nome;

        const input = document.createElement("input");
        input.type = "number";
        input.id = materia.id;
        input.min = "0";
        input.max = "10";
        input.step = "0.1";
        input.addEventListener("input", function () {
            atualizarPreviewValorNota(input);
        });

        const valorLinha = document.createElement("span");
        valorLinha.className = "valor-nota-linha";
        valorLinha.textContent = "—";

        const botaoRemover = document.createElement("button");
        botaoRemover.type = "button";
        botaoRemover.className = "botao-remover";
        botaoRemover.textContent = "Remover";
        botaoRemover.addEventListener("click", function () {
            removerMateria(materia.id);
        });

        linha.appendChild(label);
        linha.appendChild(input);
        linha.appendChild(valorLinha);
        linha.appendChild(botaoRemover);
        listaNotasMaterias.appendChild(linha);
    }
}

function removerMateria(id) {

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

    mostrarMensagem(mensagemValidacao, "Matéria removida.", "sucesso");
}

function valorParaInput(valor) {
    if (valor === null || valor === undefined) {
        return "";
    }
    return valor;
}

function mostrarValoresNaTela() {
    configValor10.value = valorParaInput(valoresPorNota[10]);
    configValor9.value = valorParaInput(valoresPorNota[9]);
    configValor8.value = valorParaInput(valoresPorNota[8]);
    configValor7.value = valorParaInput(valoresPorNota[7]);
    configValor6.value = valorParaInput(valoresPorNota[6]);
    configValor5.value = valorParaInput(valoresPorNota[5]);
    configValorMenor5.value = valorParaInput(valoresPorNota.menorQue5);
}

function aplicarValoresDaTela(){
    if (configValor10.value === "" ||
    configValor9.value === "" ||
    configValor8.value === "" ||
    configValor7.value === "" ||
    configValor6.value === "" ||
    configValor5.value === "" ||
    configValorMenor5.value === ""
    ) {
        mostrarMensagem(mensagemConfig, "Preencher todos os valores das notas.", "erro");
        return false;
    }

    valoresPorNota[10] = Number(configValor10.value);
    valoresPorNota[9] = Number(configValor9.value);
    valoresPorNota[8] = Number(configValor8.value);
    valoresPorNota[7] = Number(configValor7.value);
    valoresPorNota[6] = Number(configValor6.value);
    valoresPorNota[5] = Number(configValor5.value);
    valoresPorNota.menorQue5 = Number(configValorMenor5.value);

    return true;
}

botaoCalcular.addEventListener("click", function(){

    if (!validarNotas()) {
        return;
    }

    if (!valoresEstaoConfigurados()) {
        mostrarMensagem(mensagemValidacao, "Salve os valores por nota antes de calcular.", "erro");
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
    valorBimestreE1.textContent = "R$ " + valorBimestre;

    bimestres[bimestreAtual].notas = lerNotasDaTela();
    bimestres[bimestreAtual].totalPositivo = totalPositivo;
    bimestres[bimestreAtual].totalDescontos = totalDescontos;
    bimestres[bimestreAtual].valorTotal = valorBimestre;
    salvarDados();
    atualizarDashboard();
});

botaoFechar.addEventListener("click", function () {
    const bimestre = bimestres[bimestreAtual];
    const valorAtual = typeof bimestre.valorTotal === "number" ? bimestre.valorTotal : 0;
    const confirmou = confirm(
        "Fechar " + nomesBimestres[bimestreAtual] + "?\n\n" +
        "Valor do bimestre: R$ " + valorAtual + "\n\n" +
        "Depois de fechar, as notas não poderão ser alteradas até reabrir."
    );

    if (!confirmou) {
        return;
    }

    bimestres[bimestreAtual].notas = lerNotasDaTela();
    bimestres[bimestreAtual].fechado = true;
    bimestres[bimestreAtual].dataFechamento = new Date().toLocaleDateString("pt-BR");

    atualizarStatusNaTela(bimestres[bimestreAtual]);
    salvarDados();
    atualizarDashboard();
    mostrarMensagem(mensagemValidacao, "Bimestre fechado.", "sucesso");
});

botaoReabrir.addEventListener("click", function () {
    const bimestre = bimestres[bimestreAtual];
    let mensagem =
        "Reabrir " + nomesBimestres[bimestreAtual] + "?\n\n" +
        "As notas voltarão a poder ser editadas.";

    if (bimestre.pago) {
        mensagem =
            "Reabrir " + nomesBimestres[bimestreAtual] + "?\n\n" +
            "Isso também desfaz o pagamento marcado.\n" +
            "As notas voltarão a poder ser editadas.";
    }

    const confirmou = confirm(mensagem);

    if (!confirmou) {
        return;
    }

    bimestres[bimestreAtual].fechado = false;
    bimestres[bimestreAtual].dataFechamento = null;
    bimestres[bimestreAtual].pago = false;
    bimestres[bimestreAtual].dataPagamento = null;

    atualizarStatusNaTela(bimestres[bimestreAtual]);
    salvarDados();
    atualizarDashboard();
    mostrarMensagem(mensagemValidacao, "Bimestre reaberto.", "sucesso");
});

botaoPagar.addEventListener("click", function () {
    const bimestre = bimestres[bimestreAtual];

    if (!bimestre.fechado) {
        alert("O bimestre precisa estar fechado para marcar o pagamento.");
        return;
    }

    const valorAtual = typeof bimestre.valorTotal === "number" ? bimestre.valorTotal : 0;
    const confirmou = confirm(
        "Marcar " + nomesBimestres[bimestreAtual] + " como pago?\n\n" +
        "Valor a pagar: R$ " + valorAtual
    );

    if (!confirmou) {
        return;
    }

    bimestres[bimestreAtual].pago = true;
    bimestres[bimestreAtual].dataPagamento = new Date().toLocaleDateString("pt-BR");
    atualizarStatusNaTela(bimestres[bimestreAtual]);
    salvarDados();
    atualizarDashboard();
    mostrarMensagem(mensagemValidacao, "Pagamento registrado.", "sucesso");
});

selectBimestre.addEventListener("change", function(){
    bimestres[bimestreAtual].notas = lerNotasDaTela();
    
    bimestreAtual = selectBimestre.value;
    atualizarPillStatus();

    escreverNotasNaTela(bimestres[bimestreAtual].notas);
    atualizarStatusNaTela(bimestres[bimestreAtual]);

    if (Object.keys(bimestres[bimestreAtual].notas).length > 0) {
        mostrarResultado(bimestres[bimestreAtual]);
    } else {
        limparResultados();
    }
    salvarDados();
    atualizarDashboard();
    marcarAbaAtiva();
});

const abasBimestre = document.querySelectorAll(".aba-bimestre");

function marcarAbaAtiva() {
    for (let i = 0; i< abasBimestre.length; i++) {
        const aba = abasBimestre[i];
        if (aba.getAttribute("data-bimestre") === bimestreAtual) {
            aba.classList.add("ativa");
        } else {
            aba.classList.remove("ativa");
        }
    }
}

for (let i = 0; i < abasBimestre.length; i++) {
    abasBimestre[i].addEventListener("click", function (){
        selectBimestre.value = this.getAttribute("data-bimestre");
        selectBimestre.dispatchEvent(new Event("change"));
        marcarAbaAtiva();
    });
}

function materiaJaExiste(id) {
    for (let i = 0; i < materias.length; i++) {
        if (materias[i].id === id) {
            return true;
        }
    }
    return false;
}

function adicionarMateriaPorNome(nome, elementoMensagem) {
    garantirPerfilPadrao();

    const nomeLimpo = nome.trim();

    if (nomeLimpo === "") {
        mostrarMensagem(elementoMensagem, "Digite o nome da matéria.", "erro");
        return false;
    }

    const id = criarIdDaMateria(nomeLimpo);

    if (materiaJaExiste(id)) {
        mostrarMensagem(elementoMensagem, "Essa matéria já existe.", "erro");
        return false;
    }

    materias.push({ nome: nomeLimpo, id: id });

    montarCamposNotas();
    escreverNotasNaTela(bimestres[bimestreAtual].notas);
    atualizarStatusNaTela(bimestres[bimestreAtual]);
    atualizarDashboard();
    salvarDados();

    mostrarMensagem(elementoMensagem, "Matéria adicionada.", "sucesso");
    return true;
}

function abrirModalMateria() {
    inputModalMateria.value = "";
    mostrarMensagem(mensagemModalMateria, "");
    modalMateria.hidden = false;
    inputModalMateria.focus();
}

function fecharModalMateria() {
    modalMateria.hidden = true;
    inputModalMateria.value = "";
    mostrarMensagem(mensagemModalMateria, "");
}

botaoAdicionarMateriaNotas.addEventListener("click", function () {
    mostrarMensagem(mensagemValidacao, "");
    abrirModalMateria();
});

botaoCancelarModalMateria.addEventListener("click", function () {
    fecharModalMateria();
});

botaoConfirmarModalMateria.addEventListener("click", function () {
    const adicionou = adicionarMateriaPorNome(inputModalMateria.value, mensagemModalMateria);

    if (adicionou) {
        fecharModalMateria();
        mostrarMensagem(mensagemValidacao, "Matéria adicionada.", "sucesso");
    }
});

modalMateria.querySelector(".modal-fundo").addEventListener("click", function () {
    fecharModalMateria();
});

inputModalMateria.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        botaoConfirmarModalMateria.click();
    }

    if (evento.key === "Escape") {
        fecharModalMateria();
    }
});

function abrirModalPerfil() {
    modoModalPerfil = "criar";
    tituloModalPerfil.textContent = "Adicionar perfil";
    dicaModalPerfil.textContent = "Cada perfil tem matérias, notas e valores separados.";
    inputModalPerfil.value = "";
    mostrarMensagem(mensagemModalPerfil, "");
    botaoCancelarModalPerfil.hidden = false;
    botaoConfirmarModalPerfil.textContent = "Salvar";
    modalPerfil.hidden = false;
    inputModalPerfil.focus();
}

function abrirModalEditarPerfil() {
    const perfil = garantirPerfilPadrao();

    if (!perfil) {
        return;
    }

    modoModalPerfil = "editar";
    tituloModalPerfil.textContent = "Editar perfil";
    dicaModalPerfil.textContent = "Altere o nome deste perfil.";
    inputModalPerfil.value = perfil.nome;
    mostrarMensagem(mensagemModalPerfil, "");
    botaoCancelarModalPerfil.hidden = false;
    botaoConfirmarModalPerfil.textContent = "Salvar nome";
    modalPerfil.hidden = false;
    inputModalPerfil.focus();
    inputModalPerfil.select();
}

function fecharModalPerfil() {
    if (perfis.length === 0) {
        return;
    }

    modalPerfil.hidden = true;
    inputModalPerfil.value = "";
    mostrarMensagem(mensagemModalPerfil, "");
    modoModalPerfil = "criar";
}

function nomePerfilJaExiste(nomeLimpo, idIgnorar) {
    for (let i = 0; i < perfis.length; i++) {
        if (idIgnorar && perfis[i].id === idIgnorar) {
            continue;
        }

        if (perfis[i].nome.toLowerCase() === nomeLimpo.toLowerCase()) {
            return true;
        }
    }

    return false;
}

function adicionarPerfilPorNome(nome) {
    const nomeLimpo = nome.trim();

    if (nomeLimpo === "") {
        mostrarMensagem(mensagemModalPerfil, "Digite o nome do perfil.", "erro");
        return false;
    }

    if (nomePerfilJaExiste(nomeLimpo)) {
        mostrarMensagem(mensagemModalPerfil, "Já existe um perfil com esse nome.", "erro");
        return false;
    }

    capturarEstadoDoPerfilAtual();

    const perfilNovo = criarPerfil(nomeLimpo);
    perfis.push(perfilNovo);
    perfilAtualId = perfilNovo.id;

    aplicarEstadoDoPerfil(perfilNovo);
    montarAvataresPerfis();
    salvarDados();
    atualizarTelaDoPerfilAtual();

    return true;
}

function renomearPerfilAtual(nome) {
    const perfil = obterPerfilAtual();
    const nomeLimpo = nome.trim();

    if (!perfil) {
        mostrarMensagem(mensagemModalPerfil, "Nenhum perfil selecionado.", "erro");
        return false;
    }

    if (nomeLimpo === "") {
        mostrarMensagem(mensagemModalPerfil, "Digite o nome do perfil.", "erro");
        return false;
    }

    if (nomePerfilJaExiste(nomeLimpo, perfil.id)) {
        mostrarMensagem(mensagemModalPerfil, "Já existe um perfil com esse nome.", "erro");
        return false;
    }

    perfil.nome = nomeLimpo;
    salvarDados();
    montarAvataresPerfis();

    return true;
}

botaoCancelarModalPerfil.addEventListener("click", function () {
    fecharModalPerfil();
});

botaoConfirmarModalPerfil.addEventListener("click", function () {
    let salvou = false;

    if (modoModalPerfil === "editar") {
        salvou = renomearPerfilAtual(inputModalPerfil.value);
    } else {
        salvou = adicionarPerfilPorNome(inputModalPerfil.value);
    }

    if (salvou) {
        modalPerfil.hidden = true;
        inputModalPerfil.value = "";
        mostrarMensagem(mensagemModalPerfil, "");
        modoModalPerfil = "criar";
    }
});

modalPerfil.querySelector(".modal-fundo").addEventListener("click", function () {
    fecharModalPerfil();
});

inputModalPerfil.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        botaoConfirmarModalPerfil.click();
    }

    if (evento.key === "Escape") {
        fecharModalPerfil();
    }
});

function sessaoEstaAtiva() {
    return sessionStorage.getItem(CHAVE_SESSAO) === "1";
}

function ativarSessao() {
    sessionStorage.setItem(CHAVE_SESSAO, "1");
}

function encerrarSessao() {
    sessionStorage.removeItem(CHAVE_SESSAO);
}

function mostrarTelaCadastro() {
    appPrincipal.hidden = true;
    telaAcesso.hidden = false;
    formCadastro.hidden = false;
    formLogin.hidden = true;
    tituloAcesso.textContent = "Recompensa Escolar";
    tituloPainelAcesso.innerHTML = "Bem-vindo ao <strong>CADASTRO</strong>";
    subtituloAcesso.textContent = "Preencha os dados para criar o acesso do responsável.";
    mostrarMensagem(mensagemAcesso, "");
    acessoNome.value = "";
    acessoSenhaCadastro.value = "";
    acessoSenhaConfirmar.value = "";
}

function mostrarTelaLogin() {
    appPrincipal.hidden = true;
    telaAcesso.hidden = false;
    formCadastro.hidden = true;
    formLogin.hidden = false;
    tituloAcesso.textContent = "Recompensa Escolar";
    tituloPainelAcesso.innerHTML = "Bem-vindo <strong>de volta</strong>";
    subtituloAcesso.textContent = "Olá, " + responsavel.nome + ". Digite sua senha para continuar.";
    mostrarMensagem(mensagemAcesso, "");
    acessoSenhaLogin.value = "";
    acessoSenhaLogin.focus();
}

function iniciarApp() {
    telaAcesso.hidden = true;
    appPrincipal.hidden = false;
    garantirPerfilPadrao();
    montarAvataresPerfis();
    atualizarTelaDoPerfilAtual();
    salvarDados();
}

botaoCriarConta.addEventListener("click", function () {
    const nome = acessoNome.value.trim();
    const senha = acessoSenhaCadastro.value;
    const confirmar = acessoSenhaConfirmar.value;

    if (nome === "") {
        mostrarMensagem(mensagemAcesso, "Digite seu nome.", "erro");
        return;
    }

    if (senha.length < 4) {
        mostrarMensagem(mensagemAcesso, "A senha precisa ter pelo menos 4 caracteres.", "erro");
        return;
    }

    if (senha !== confirmar) {
        mostrarMensagem(mensagemAcesso, "As senhas não são iguais.", "erro");
        return;
    }

    responsavel = {
        nome: nome,
        senha: senha
    };

    perfis = [];
    perfilAtualId = null;
    garantirPerfilPadrao();
    salvarDados();
    ativarSessao();
    iniciarApp();
});

botaoEntrar.addEventListener("click", function () {
    if (!responsavel) {
        mostrarTelaCadastro();
        return;
    }

    if (acessoSenhaLogin.value !== responsavel.senha) {
        mostrarMensagem(mensagemAcesso, "Senha incorreta.", "erro");
        return;
    }

    ativarSessao();
    iniciarApp();
});

botaoSair.addEventListener("click", function () {
    fecharMenuConfig();
    encerrarSessao();
    mostrarTelaLogin();
});

function abrirMenuConfig() {
    menuConfig.classList.add("aberto");
    painelConfig.hidden = false;
    botaoConfig.setAttribute("aria-expanded", "true");
}

function fecharMenuConfig() {
    menuConfig.classList.remove("aberto");
    painelConfig.hidden = true;
    botaoConfig.setAttribute("aria-expanded", "false");
}

botaoConfig.addEventListener("click", function (evento) {
    evento.stopPropagation();

    if (painelConfig.hidden) {
        abrirMenuConfig();
    } else {
        fecharMenuConfig();
    }
});

painelConfig.addEventListener("click", function (evento) {
    evento.stopPropagation();
});

function abrirModalSenha() {
    fecharMenuConfig();
    senhaAtual.value = "";
    senhaNova.value = "";
    senhaNovaConfirmar.value = "";
    mostrarMensagem(mensagemModalSenha, "");
    modalSenha.hidden = false;
    senhaAtual.focus();
}

function fecharModalSenha() {
    modalSenha.hidden = true;
    senhaAtual.value = "";
    senhaNova.value = "";
    senhaNovaConfirmar.value = "";
    mostrarMensagem(mensagemModalSenha, "");
}

function trocarSenhaResponsavel() {
    if (!responsavel) {
        mostrarMensagem(mensagemModalSenha, "Nenhuma conta encontrada.", "erro");
        return false;
    }

    if (senhaAtual.value !== responsavel.senha) {
        mostrarMensagem(mensagemModalSenha, "Senha atual incorreta.", "erro");
        return false;
    }

    if (senhaNova.value.length < 4) {
        mostrarMensagem(mensagemModalSenha, "A nova senha precisa ter pelo menos 4 caracteres.", "erro");
        return false;
    }

    if (senhaNova.value !== senhaNovaConfirmar.value) {
        mostrarMensagem(mensagemModalSenha, "A confirmação da nova senha não confere.", "erro");
        return false;
    }

    if (senhaNova.value === responsavel.senha) {
        mostrarMensagem(mensagemModalSenha, "A nova senha precisa ser diferente da atual.", "erro");
        return false;
    }

    responsavel.senha = senhaNova.value;
    salvarDados();
    return true;
}

botaoAbrirTrocarSenha.addEventListener("click", function () {
    abrirModalSenha();
});

botaoCancelarModalSenha.addEventListener("click", function () {
    fecharModalSenha();
});

botaoConfirmarModalSenha.addEventListener("click", function () {
    if (trocarSenhaResponsavel()) {
        fecharModalSenha();
        alert("Senha alterada com sucesso.");
    }
});

modalSenha.querySelector(".modal-fundo").addEventListener("click", function () {
    fecharModalSenha();
});

senhaNovaConfirmar.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        botaoConfirmarModalSenha.click();
    }

    if (evento.key === "Escape") {
        fecharModalSenha();
    }
});

function abrirModalNomeResponsavel() {
    fecharMenuConfig();

    if (!responsavel) {
        return;
    }

    inputNomeResponsavel.value = responsavel.nome || "";
    mostrarMensagem(mensagemModalNomeResponsavel, "");
    modalNomeResponsavel.hidden = false;
    inputNomeResponsavel.focus();
    inputNomeResponsavel.select();
}

function fecharModalNomeResponsavel() {
    modalNomeResponsavel.hidden = true;
    inputNomeResponsavel.value = "";
    mostrarMensagem(mensagemModalNomeResponsavel, "");
}

function salvarNomeResponsavel() {
    if (!responsavel) {
        mostrarMensagem(mensagemModalNomeResponsavel, "Nenhuma conta encontrada.", "erro");
        return false;
    }

    const nomeLimpo = inputNomeResponsavel.value.trim();

    if (nomeLimpo === "") {
        mostrarMensagem(mensagemModalNomeResponsavel, "Digite o nome do responsável.", "erro");
        return false;
    }

    responsavel.nome = nomeLimpo;
    salvarDados();
    return true;
}

botaoAbrirEditarNome.addEventListener("click", function () {
    abrirModalNomeResponsavel();
});

botaoCancelarModalNome.addEventListener("click", function () {
    fecharModalNomeResponsavel();
});

botaoConfirmarModalNome.addEventListener("click", function () {
    if (salvarNomeResponsavel()) {
        fecharModalNomeResponsavel();
        alert("Nome atualizado com sucesso.");
    }
});

modalNomeResponsavel.querySelector(".modal-fundo").addEventListener("click", function () {
    fecharModalNomeResponsavel();
});

inputNomeResponsavel.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        botaoConfirmarModalNome.click();
    }

    if (evento.key === "Escape") {
        fecharModalNomeResponsavel();
    }
});

function limparEstadoDaAplicacao() {
    responsavel = null;
    perfis = [];
    perfilAtualId = null;
    materias = [];
    bimestreAtual = "primeiro";
    limparValoresPorNota();

    bimestres.primeiro = criarBimestreVazio();
    bimestres.segundo = criarBimestreVazio();
    bimestres.terceiro = criarBimestreVazio();
    bimestres.quarto = criarBimestreVazio();

    localStorage.removeItem("sistemaRecompensa");
    encerrarSessao();
}

function abrirModalExcluirConta() {
    fecharMenuConfig();

    if (!responsavel) {
        return;
    }

    senhaExcluirConta.value = "";
    mostrarMensagem(mensagemModalExcluirConta, "");
    modalExcluirConta.hidden = false;
    senhaExcluirConta.focus();
}

function fecharModalExcluirConta() {
    modalExcluirConta.hidden = true;
    senhaExcluirConta.value = "";
    mostrarMensagem(mensagemModalExcluirConta, "");
}

function excluirContaResponsavel() {
    if (!responsavel) {
        mostrarMensagem(mensagemModalExcluirConta, "Nenhuma conta encontrada.", "erro");
        return false;
    }

    if (senhaExcluirConta.value === "") {
        mostrarMensagem(mensagemModalExcluirConta, "Digite a senha para confirmar.", "erro");
        return false;
    }

    if (senhaExcluirConta.value !== responsavel.senha) {
        mostrarMensagem(mensagemModalExcluirConta, "Senha incorreta.", "erro");
        return false;
    }

    limparEstadoDaAplicacao();
    fecharModalExcluirConta();
    mostrarTelaCadastro();
    return true;
}

botaoAbrirExcluirConta.addEventListener("click", function () {
    abrirModalExcluirConta();
});

botaoCancelarModalExcluirConta.addEventListener("click", function () {
    fecharModalExcluirConta();
});

botaoConfirmarExcluirConta.addEventListener("click", function () {
    excluirContaResponsavel();
});

modalExcluirConta.querySelector(".modal-fundo").addEventListener("click", function () {
    fecharModalExcluirConta();
});

senhaExcluirConta.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        botaoConfirmarExcluirConta.click();
    }

    if (evento.key === "Escape") {
        fecharModalExcluirConta();
    }
});

function obterBimestreAnterior(chaveAtual) {
    const indice = ORDEM_BIMESTRES.indexOf(chaveAtual);

    if (indice <= 0) {
        return null;
    }

    return ORDEM_BIMESTRES[indice - 1];
}

function duplicarNotasDoBimestreAnterior() {
    if (!obterPerfilAtual()) {
        mostrarMensagem(mensagemValidacao, "Adicione um perfil primeiro.", "erro");
        return;
    }

    if (bimestres[bimestreAtual].fechado || bimestres[bimestreAtual].pago) {
        mostrarMensagem(mensagemValidacao, "Este bimestre está fechado e não pode receber notas copiadas.", "erro");
        return;
    }

    const chaveAnterior = obterBimestreAnterior(bimestreAtual);

    if (!chaveAnterior) {
        mostrarMensagem(mensagemValidacao, "Não há bimestre anterior para copiar.", "erro");
        return;
    }

    const notasAnteriores = bimestres[chaveAnterior].notas || {};
    const temNotas = Object.keys(notasAnteriores).length > 0;

    if (!temNotas) {
        mostrarMensagem(mensagemValidacao, "O bimestre anterior não tem notas cadastradas.", "erro");
        return;
    }

    const confirmou = confirm("Isso copia as notas de " + nomesBimestres[chaveAnterior] + " para o bimestre atual. Continuar?");

    if (!confirmou) {
        return;
    }

    const notasCopiadas = {};

    for (let i = 0; i < materias.length; i++) {
        const id = materias[i].id;

        if (notasAnteriores[id] !== undefined && notasAnteriores[id] !== "") {
            notasCopiadas[id] = notasAnteriores[id];
        }
    }

    bimestres[bimestreAtual].notas = notasCopiadas;
    escreverNotasNaTela(notasCopiadas);
    limparResultados();
    atualizarDashboard();
    salvarDados();
    mostrarMensagem(mensagemValidacao, "Notas copiadas de " + nomesBimestres[chaveAnterior] + ".", "sucesso");
}

function ordenarMateriasAZ() {
    if (materias.length < 2) {
        mostrarMensagem(mensagemValidacao, "Cadastre pelo menos duas matérias para ordenar.", "erro");
        return;
    }

    const notasAtuais = lerNotasDaTela();

    materias.sort(function (a, b) {
        return a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" });
    });

    montarCamposNotas();
    escreverNotasNaTela(notasAtuais);
    atualizarStatusNaTela(bimestres[bimestreAtual]);
    atualizarDashboard();
    salvarDados();
    mostrarMensagem(mensagemValidacao, "Matérias ordenadas de A a Z.", "sucesso");
}

function escaparHtml(texto) {
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function montarLinhasNotasRelatorio(bimestre) {
    let html = "";

    for (let i = 0; i < materias.length; i++) {
        const materia = materias[i];
        const notaDigitada = bimestre.notas[materia.id];
        const notaTexto = notaDigitada === undefined || notaDigitada === "" ? "—" : String(notaDigitada);
        let valorTexto = "—";

        if (notaDigitada !== undefined && notaDigitada !== "" && valoresEstaoConfigurados()) {
            valorTexto = "R$ " + calcularValorDaNota(Number(notaDigitada));
        }

        html = html +
            "<tr><td>" + escaparHtml(materia.nome) +
            "</td><td>" + escaparHtml(notaTexto) +
            "</td><td>" + escaparHtml(valorTexto) +
            "</td></tr>";
    }

    if (html === "") {
        html = "<tr><td colspan=\"3\">Nenhuma matéria cadastrada.</td></tr>";
    }

    return html;
}

function depoisDeImprimirRelatorio() {
    areaRelatorio.hidden = true;
    areaRelatorio.innerHTML = "";
    window.removeEventListener("afterprint", depoisDeImprimirRelatorio);
}

function prepararImpressaoRelatorio(html) {
    areaRelatorio.innerHTML = html;
    areaRelatorio.hidden = false;
    window.addEventListener("afterprint", depoisDeImprimirRelatorio);
    window.print();
}

function imprimirRelatorioBimestre() {
    const perfil = obterPerfilAtual();
    const bimestre = bimestres[bimestreAtual];
    const nomePerfil = perfil ? perfil.nome : "Sem perfil";
    const nomeResponsavel = responsavel ? responsavel.nome : "—";

    const html =
        "<h1>Relatório do bimestre</h1>" +
        "<p><strong>Perfil:</strong> " + escaparHtml(nomePerfil) + "</p>" +
        "<p><strong>Responsável:</strong> " + escaparHtml(nomeResponsavel) + "</p>" +
        "<p><strong>Bimestre:</strong> " + escaparHtml(nomesBimestres[bimestreAtual]) + "</p>" +
        "<p><strong>Status:</strong> " + escaparHtml(textoStatusAno(bimestre)) + "</p>" +
        "<p><strong>Valor total:</strong> R$ " + escaparHtml(String(bimestre.valorTotal || 0)) + "</p>" +
        "<p><strong>Total positivo:</strong> R$ " + escaparHtml(String(bimestre.totalPositivo || 0)) + "</p>" +
        "<p><strong>Descontos:</strong> R$ " + escaparHtml(String(bimestre.totalDescontos || 0)) + "</p>" +
        "<h2>Notas</h2>" +
        "<table class=\"area-relatorio-tabela\"><thead><tr><th>Matéria</th><th>Nota</th><th>Valor</th></tr></thead><tbody>" +
        montarLinhasNotasRelatorio(bimestre) +
        "</tbody></table>";

    prepararImpressaoRelatorio(html);
}

function imprimirRelatorioAno() {
    const perfil = obterPerfilAtual();
    const nomePerfil = perfil ? perfil.nome : "Sem perfil";
    const nomeResponsavel = responsavel ? responsavel.nome : "—";
    let linhasAno = "";
    let totalPago = 0;
    let totalGeral = 0;

    for (let i = 0; i < ORDEM_BIMESTRES.length; i++) {
        const chave = ORDEM_BIMESTRES[i];
        const bimestre = bimestres[chave];
        totalGeral = totalGeral + (bimestre.valorTotal || 0);

        if (bimestre.pago) {
            totalPago = totalPago + (bimestre.valorTotal || 0);
        }

        linhasAno = linhasAno +
            "<tr><td>" + escaparHtml(nomesBimestres[chave]) +
            "</td><td>R$ " + escaparHtml(String(bimestre.valorTotal || 0)) +
            "</td><td>" + escaparHtml(textoStatusAno(bimestre)) +
            "</td></tr>";
    }

    const html =
        "<h1>Relatório do ano</h1>" +
        "<p><strong>Perfil:</strong> " + escaparHtml(nomePerfil) + "</p>" +
        "<p><strong>Responsável:</strong> " + escaparHtml(nomeResponsavel) + "</p>" +
        "<table class=\"area-relatorio-tabela\"><thead><tr><th>Bimestre</th><th>Valor</th><th>Status</th></tr></thead><tbody>" +
        linhasAno +
        "</tbody></table>" +
        "<p><strong>Soma dos bimestres:</strong> R$ " + escaparHtml(String(totalGeral)) + "</p>" +
        "<p><strong>Total já pago:</strong> R$ " + escaparHtml(String(totalPago)) + "</p>";

    prepararImpressaoRelatorio(html);
}

botaoDuplicarNotas.addEventListener("click", function () {
    mostrarMensagem(mensagemValidacao, "");
    duplicarNotasDoBimestreAnterior();
});

botaoOrdenarMaterias.addEventListener("click", function () {
    mostrarMensagem(mensagemValidacao, "");
    ordenarMateriasAZ();
});

botaoImprimirBimestre.addEventListener("click", function () {
    imprimirRelatorioBimestre();
});

botaoImprimirAno.addEventListener("click", function () {
    imprimirRelatorioAno();
});

document.addEventListener("click", function (evento) {
    if (!menuConfig.contains(evento.target)) {
        fecharMenuConfig();
    }
});

function montarNomeArquivoBackup() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const dia = String(agora.getDate()).padStart(2, "0");
    return "recompensa-escolar-" + ano + "-" + mes + "-" + dia + ".json";
}

function exportarDados() {
    capturarEstadoDoPerfilAtual();
    normalizarNomenclaturaPerfis();

    const dados = {
        versao: 2,
        responsavel: responsavel,
        perfis: perfis,
        perfilAtualId: perfilAtualId
    };

    const texto = JSON.stringify(dados, null, 2);
    const blob = new Blob([texto], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = montarNomeArquivoBackup();
    link.click();

    URL.revokeObjectURL(url);
    salvarDados();
    mostrarMensagem(mensagemBackup, "Backup exportado com sucesso.", "sucesso");
}

function importarDadosDoObjeto(dados) {
    if (!dados || typeof dados !== "object") {
        return "Arquivo inválido.";
    }

    if (!dados.perfis && !dados.filhos && !dados.bimestres) {
        return "Este arquivo não parece ser um backup do sistema.";
    }

    if (dados.responsavel) {
        responsavel = dados.responsavel;
    }

    if (dados.perfis || dados.filhos) {
        perfis = dados.perfis || dados.filhos;
        perfilAtualId = dados.perfilAtualId || dados.filhoAtualId || (perfis[0] && perfis[0].id) || null;
    } else if (dados.bimestres) {
        migrarDadosAntigos(dados);
    }

    normalizarNomenclaturaPerfis();
    garantirPerfilPadrao();
    aplicarEstadoDoPerfil(obterPerfilAtual());
    salvarDados();
    montarAvataresPerfis();
    atualizarTelaDoPerfilAtual();

    return "";
}

botaoExportar.addEventListener("click", function () {
    mostrarMensagem(mensagemBackup, "");
    exportarDados();
});

botaoImportar.addEventListener("click", function () {
    mostrarMensagem(mensagemBackup, "");
    inputImportar.value = "";
    inputImportar.click();
});

inputImportar.addEventListener("change", function () {
    const arquivo = inputImportar.files[0];

    if (!arquivo) {
        return;
    }

    const confirmou = confirm("Importar este backup substitui os dados atuais desta conta. Deseja continuar?");

    if (!confirmou) {
        inputImportar.value = "";
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function () {
        try {
            const dados = JSON.parse(leitor.result);
            const erro = importarDadosDoObjeto(dados);

            if (erro) {
                mostrarMensagem(mensagemBackup, erro, "erro");
                return;
            }

            mostrarMensagem(mensagemBackup, "Backup importado com sucesso.", "sucesso");
        } catch (erroLeitura) {
            mostrarMensagem(mensagemBackup, "Não foi possível ler o arquivo JSON.", "erro");
        }
    };

    leitor.readAsText(arquivo);
});

acessoSenhaLogin.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        botaoEntrar.click();
    }
});

acessoSenhaConfirmar.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        botaoCriarConta.click();
    }
});

carregarDados();

if (!responsavel) {
    mostrarTelaCadastro();
} else if (!sessaoEstaAtiva()) {
    mostrarTelaLogin();
} else {
    iniciarApp();
}
