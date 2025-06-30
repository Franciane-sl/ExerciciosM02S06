const corpoTabela = document.getElementById("corpoTabela");
const botaoCadastrar = document.getElementById("botaoCadastrar");

let celulares = JSON.parse(localStorage.getItem("celulares")) || [];

function carregarTabela() {
    corpoTabela.innerHTML = "";

    celulares.forEach((celular,index) => {
        const linha = document.createElement("tr");

        linha.innerHTML =  `
        <td>${celular.marca}</td>
        <td>${celular.modelo}</td>
        <td>${celular.cor}</td>
        <td>${celular.valor}</td>
        <td>${celular.condicao}</td>
        <td>${celular.info}</td>
        <td><button onClick="excluirCelular(${index})">Excluir</button></td>`;

        corpoTabela.appendChild(linha);
    })
}

function excluirCelular(index) {
  if (confirm("Tem certeza que deseja excluir este celular?")) {
    celulares.splice(index, 1);
    localStorage.setItem("celulares", JSON.stringify(celulares));
    carregarTabela();
  }
}

botaoCadastrar.addEventListener("click", () => {
  window.location.href = "cadastroDeCelulares.html";
})


carregarTabela();