const formulario = document.getElementById("formularioTarefa");
const input = document.getElementById("tarefas");
const tarefa = document.getElementById("listaTarefas");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];


function criacaoDeElementos(texto){
        const novaTarefa = document.createElement("li");
        novaTarefa.textContent = texto;
        
        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.style.marginLeft = "10px";
        
        botaoExcluir.addEventListener("click", () => {
            tarefa.removeChild(novaTarefa);
            tarefas = tarefas.filter(tarefa => tarefa !== texto);
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
        });

        tarefa.appendChild(novaTarefa);
        novaTarefa.appendChild(botaoExcluir);
}    

tarefas.forEach(criacaoDeElementos);

formulario.addEventListener("submit", (e) =>{
    e.preventDefault();

    const texto = input.value.trim();

    if(texto!==""){
        criacaoDeElementos(texto);
        tarefas.push(texto);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        input.value = "";
        input.focus();
    }

})