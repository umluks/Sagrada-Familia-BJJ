// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro-form");

  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }

  carregarAlunos();
});

// Função para lidar com o envio do formulário
async function handleFormSubmit(event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário

  // Captura os valores dos campos do formulário
  const formData = getFormData();
  console.log("Dados do formulário:", formData);

  try {
    // Envia os dados para o servidor via requisição HTTP POST
    const response = await fetch("http://localhost:3000/alunos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Erro ao cadastrar usuário");

    alert("Usuário cadastrado com sucesso!");
    event.target.reset(); // Reseta o formulário
    carregarAlunos(); // Atualiza a lista de alunos
  } catch (error) {
    alert(error.message);
  }
}

// Função para capturar os valores do formulário
function getFormData() {
  return {
    nome: document.getElementById("nome").value,
    dt_nascimento: document.getElementById("dt_nascimento").value,
    contato: document.getElementById("contato").value,
    email: document.getElementById("email").value,
    endereco: document.getElementById("endereco").value,
    cidade: document.getElementById("cidade").value,
    faixa: document.getElementById("faixa").value,
    grau: document.getElementById("grau").value,
    ultgraduacao: document.getElementById("ultgraduacao").value,
    nomeemergencia: document.getElementById("nomeemergencia").value,
    contatoemergencia: document.getElementById("contatoemergencia").value,
  };
}

// Função para carregar e exibir a lista de alunos na tabela
async function carregarAlunos() {
  const tabela = document.getElementById("tabela-alunos");
  if (!tabela) return;

  try {
    const response = await fetch("http://localhost:3000/alunos");
    const data = await response.json();
    const alunos = data.data || [];

    if (!Array.isArray(alunos)) {
      console.error("Erro: resposta da API não é um array!", alunos);
      return;
    }

    // Monta o cabeçalho da tabela
    tabela.innerHTML = `<tr>
      <th>Nome</th>
      <th>Data de Nascimento</th>
      <th>Contato</th>
      <th>Email</th>
      <th>Endereço</th>
      <th>Cidade</th>
      <th>Faixa</th>
      <th>Grau</th>
      <th>Última Graduação</th>
      <th>Nome Emergência</th>
      <th>Contato Emergência</th>
    </tr>`;

    // Preenche a tabela com os dados dos alunos
    alunos.forEach((user) => {
      const getValue = (value) => (value ? value : "Não informado");
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${getValue(user.nome)}</td>
        <td>${getValue(user.dt_nascimento)}</td>
        <td>${getValue(user.contato)}</td>
        <td>${getValue(user.email)}</td>
        <td>${getValue(user.endereco)}</td>
        <td>${getValue(user.cidade)}</td>
        <td>${getValue(user.faixa)}</td>
        <td>${getValue(user.grau)}</td>
        <td>${getValue(user.ultgraduacao)}</td>
        <td>${getValue(user.nomeemergencia)}</td>
        <td>${getValue(user.contatoemergencia)}</td>
      `;
      tabela.appendChild(linha);
    });
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
  }
}
