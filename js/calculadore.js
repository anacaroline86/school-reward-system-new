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
const botaoCalcular = document.getElementById("botao-calcular");
const listaValores = document.getElementById("lista-valores");
const totalPositivoE1 = document.getElementById("total-positivo");
const totalDescontosE1 = document.getElementById("total-desconto");
const valorBimestreE1 = document.getElementById("valor-bimestre");
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
});