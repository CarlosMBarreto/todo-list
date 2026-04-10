function salvarTarefas(tarefas) {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
  return JSON.parse(localStorage.getItem("tarefas")) || [];
}

function adicionarTarefa() {
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const data = document.getElementById("data").value;

  if (!titulo || !data) {
    alert("Preencha título e data!");
    return;
  }

  const tarefas = carregarTarefas();

  const nova = {
    id: Date.now(),
    titulo,
    descricao,
    dataLimite: data,
    concluida: false
  };

  tarefas.push(nova);
  salvarTarefas(tarefas);

  alert("Tarefa adicionada!");
  window.location.href = "index.html";
}

function concluirTarefa(id) {
  const tarefas = carregarTarefas();

  tarefas.forEach(t => {
    if (t.id === id) t.concluida = true;
  });

  salvarTarefas(tarefas);
  location.reload();
}

function deletarTarefa(id) {
  let tarefas = carregarTarefas();

  tarefas = tarefas.filter(t => t.id !== id);

  salvarTarefas(tarefas);
  location.reload();
}

function renderizar(lista, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  lista.forEach(t => {
    const atrasada = new Date(t.dataLimite) < new Date() && !t.concluida;

    container.innerHTML += `
      <div class="card ${atrasada ? "atrasada" : ""}">
        <h3>${t.titulo}</h3>
        <p>${t.descricao}</p>
        <small>${new Date(t.dataLimite).toLocaleString()}</small>

        <div class="actions">
          ${!t.concluida ? `<button onclick="concluirTarefa(${t.id})">✓</button>` : ""}
          <button onclick="deletarTarefa(${t.id})">🗑</button>
        </div>
      </div>
    `;
  });
}

function carregarPendentes() {
  const tarefas = carregarTarefas();
  renderizar(tarefas.filter(t => !t.concluida), "lista");
}

function carregarConcluidas() {
  const tarefas = carregarTarefas();
  renderizar(tarefas.filter(t => t.concluida), "lista");
}