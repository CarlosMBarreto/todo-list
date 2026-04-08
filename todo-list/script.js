const lista = document.getElementById("listaTarefas");

document.addEventListener("DOMContentLoaded", carregarTarefas);

function salvarTarefas() {
  const tarefas = [];
  document.querySelectorAll("li").forEach(li => {
    tarefas.push({
      texto: li.firstChild.textContent,
      concluida: li.classList.contains("concluida")
    });
  });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.forEach(t => criarTarefa(t.texto, t.concluida));
}

function adicionarTarefa() {
  const input = document.getElementById("tarefaInput");
  if (input.value === "") return;

  criarTarefa(input.value, false);
  input.value = "";
  salvarTarefas();
}

function criarTarefa(texto, concluida) {
  const li = document.createElement("li");
  li.textContent = texto;

  if (concluida) li.classList.add("concluida");

  li.onclick = () => {
    li.classList.toggle("concluida");
    salvarTarefas();
  };

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "X";

  botaoRemover.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    salvarTarefas();
  };

  li.appendChild(botaoRemover);
  lista.appendChild(li);
}