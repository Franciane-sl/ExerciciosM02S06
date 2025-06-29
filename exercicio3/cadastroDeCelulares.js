const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");
const cor = document.getElementById("cor");
const valor = document.getElementById("valor");
const condicaoNovo = document.getElementById("novo");
const condicaoUsado = document.getElementById("usado");
const demaisInformacoes = document.getElementById("info");
const botaoSalvar = document.getElementById("salvar");
const botaoVoltar = document.getElementById("voltar");
const formularioDeCadastro = document.getElementById("formularioDeCadastro")

function verificacaoDeCamposVazios(){
    if(modelo.value.trim() !== "" && cor.value.trim() !== "" && valor.value.trim() !== "" && demaisInformacoes.value.trim() !== ""){
        botaoSalvar.disabled = false;
    }else{
        botaoSalvar.disabled = true;
    }
}

modelo.addEventListener("input", verificacaoDeCamposVazios);
cor.addEventListener("input", verificacaoDeCamposVazios);
valor.addEventListener("input", verificacaoDeCamposVazios);
demaisInformacoes.addEventListener("input", verificacaoDeCamposVazios);

formularioDeCadastro.addEventListener("submit", (e) =>{
    e.preventDefault();

    const cadastro = {
        marca: marca.value,
        modelo: modelo.value.trim(),
        cor: cor.value.trim(),
        valor: valor.value.trim(),
        condicao: condicaoNovo.checked ? "Novo" : "Usado",
        info: demaisInformacoes.value.trim()
    };

    let celularesSalvos = JSON.parse(localStorage.getItem("celulares")) || [];

    celularesSalvos.push(cadastro);
    localStorage.setItem("celulares", JSON.stringify(celularesSalvos));
    formularioDeCadastro.reset();
    botaoSalvar.disabled = true;

    window.alert("Dados salvos com sucesso.");
})

botaoVoltar.addEventListener("click", () =>{
    window.location.href = "telaDeListagemDeCelulares.html";
});