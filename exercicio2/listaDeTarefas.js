const formulario = document.getElementById("formularioTarefa");
const input = document.getElementById("tarefas");
const tarefa = document.getElementById("listaTarefas");
const tarefaConcluida = document.getElementById("tarefasConcluidas");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let tarefasConcluidas = JSON.parse(localStorage.getItem("concluido")) || [];

function criacaoDeElementos(texto){
    const novaTarefa = document.createElement("li");
        
    const checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = texto;
        
    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("botaoExcluir");
    botaoExcluir.textContent = "Excluir";
        
    botaoExcluir.addEventListener("click", () => {
        tarefa.removeChild(novaTarefa);
        tarefas = tarefas.filter(tarefa => tarefa !== texto);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    });

    checkbox.addEventListener("change", () => {
        novaTarefa.remove();
        if(checkbox.checked){
            tarefas = tarefas.filter(tarefa => tarefa !== texto);
            tarefasConcluidas.push(texto);
            criarElementosConcluido(texto);   
        }

        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        localStorage.setItem("concluido", JSON.stringify(tarefasConcluidas));
           
    });

    novaTarefa.appendChild(checkbox);
    novaTarefa.appendChild(span);
    novaTarefa.appendChild(botaoExcluir);
    tarefa.appendChild(novaTarefa);
}

function criarElementosConcluido(texto){
    const novaTarefa = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true;

    const span = document.createElement("span");
    span.textContent = texto;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";

    botaoExcluir.addEventListener("click",() =>{
        novaTarefa.remove();
        tarefasConcluidas = tarefasConcluidas.filter(tarefa => tarefa !== texto);
        localStorage.setItem("concluido", JSON.stringify(tarefasConcluidas));
    });

    checkbox.addEventListener("change", () =>{
        novaTarefa.remove();
        tarefasConcluidas = tarefasConcluidas.filter(tarefa => tarefa !== texto);
        tarefas.push(texto);
        criacaoDeElementos(texto);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        localStorage.setItem("concluido", JSON.stringify(tarefasConcluidas));
    });

    novaTarefa.appendChild(checkbox);
    novaTarefa.appendChild(span);
    novaTarefa.appendChild(botaoExcluir);
    tarefaConcluida.appendChild(novaTarefa);
}


tarefas.forEach(criacaoDeElementos);
tarefasConcluidas.forEach(criarElementosConcluido);

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