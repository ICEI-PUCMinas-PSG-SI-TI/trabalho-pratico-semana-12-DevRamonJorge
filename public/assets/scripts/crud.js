const apiUrl = "http://localhost:3000/usuarios";
const form = document.getElementById("form-usuario");
const tabela = document.getElementById("tabela-usuarios");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const usuario = {
    login: document.getElementById("login").value,
    senha: document.getElementById("senha").value,
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value
  };

  if (id) {
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)
    });
  } else {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)
    });
  }

  form.reset();
  document.getElementById("id").value = "";
  carregarUsuarios();
});

async function carregarUsuarios() {
  const res = await fetch(apiUrl);
  const usuarios = await res.json();

  tabela.innerHTML = "";
  usuarios.forEach((u) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.login}</td>
      <td>${u.nome}</td>
      <td>${u.email}</td>
      <td>
        <button onclick="editarUsuario('${u.id}')">Editar</button>
        <button onclick="excluirUsuario('${u.id}')">Excluir</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

async function editarUsuario(id) {
  const res = await fetch(`${apiUrl}/${id}`);
  const u = await res.json();

  document.getElementById("id").value = u.id;
  document.getElementById("login").value = u.login;
  document.getElementById("senha").value = u.senha;
  document.getElementById("nome").value = u.nome;
  document.getElementById("email").value = u.email;
}

async function excluirUsuario(id) {
  if (confirm("Deseja excluir este usuário?")) {
    await fetch(`${apiUrl}/${id}`, {
      method: "DELETE"
    });
    carregarUsuarios();
  }
}

carregarUsuarios();
