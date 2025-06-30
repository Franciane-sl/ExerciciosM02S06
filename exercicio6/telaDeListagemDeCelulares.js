const corpoTabela = document.getElementById("corpoTabela");
const botaoCadastrar = document.getElementById("botaoCadastrar");
const botaoTema = document.getElementById("botaoTema");

let celulares = JSON.parse(localStorage.getItem("celulares")) || [];

function aplicarTemaSalvo() {
  const tema = localStorage.getItem("tema");
  if (tema === "escuro") {
    document.body.classList.add("tema-escuro");
    botaoTema.textContent = "Tema Claro";
  } else {
    document.body.classList.remove("tema-escuro");
    botaoTema.textContent = "Tema Escuro";
  }
}

botaoTema.addEventListener("click", () => {
  document.body.classList.toggle("tema-escuro");

  const temaAtual = document.body.classList.contains("tema-escuro") ? "escuro" : "claro";
  localStorage.setItem("tema", temaAtual);

  botaoTema.textContent = temaAtual === "escuro" ? "Tema Claro" : "Tema Escuro";
});


aplicarTemaSalvo();

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
        <td><button onClick="excluirCelular(${index})">Excluir</button>
        <button onClick="alterarCelular(${index})">Alterar</button</td>`;

        corpoTabela.appendChild(linha);
    })
}

function alterarCelular(index) {
  const celularParaAlterar = celulares[index];
  localStorage.setItem("celularEditando", JSON.stringify({ index, celular: celularParaAlterar }));
  window.location.href = "cadastroDeCelulares.html";
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
