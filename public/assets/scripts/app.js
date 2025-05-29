document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/usuarios")
    .then(res => res.json())
    .then(usuarios => {
      const container = document.getElementById("usuarios");
      usuarios.forEach(usuario => {
        const div = document.createElement("div");
        div.className = "usuario";
        div.innerHTML = `
          <h2>${usuario.nome}</h2>
          <p><strong>Login:</strong> ${usuario.login}</p>
          <a href="detalhes.html?id=${usuario.id}">Ver detalhes</a>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      document.getElementById("usuarios").innerHTML = "<p>Erro ao carregar usuários.</p>";
      console.error(err);
    });
});
