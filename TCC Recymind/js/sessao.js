/* recymind – mostra o usuário logado na barra de navegação */
document.addEventListener("DOMContentLoaded", function () {
  var KEY = "recymind-usuario";
  var LEGACY_KEY = "ecoguia-usuario";
  var dados = null;
  try {
    var salvo = localStorage.getItem(KEY);
    if (!salvo) {
      salvo = localStorage.getItem(LEGACY_KEY);
      if (salvo) {
        localStorage.setItem(KEY, salvo);
        localStorage.removeItem(LEGACY_KEY);
      }
    }
    dados = JSON.parse(salvo || "null");
  } catch (e) {}
  if (!dados || !dados.email) return;

  try {
    var usuarios = JSON.parse(localStorage.getItem("recymind-usuarios") || "[]");
    if (Array.isArray(usuarios)) {
      var emailAtual = dados.email.toLowerCase();
      var cadastro = usuarios.find(function (usuario) {
        return usuario && typeof usuario.email === "string" &&
          usuario.email.toLowerCase() === emailAtual &&
          typeof usuario.nome === "string" && usuario.nome.trim();
      });
      if (cadastro) {
        dados.nome = cadastro.nome;
        localStorage.setItem(KEY, JSON.stringify(dados));
      }
    }
  } catch (e) {}

  var links = document.querySelector(".nav-links");
  if (!links) return;

  var entrar = links.querySelector('a[href="login.html"]');
  var criar = links.querySelector('a[href="cadastro.html"]');
  if (entrar) entrar.remove();
  if (criar) criar.remove();

  var saudacao = document.createElement("span");
  saudacao.className = "nav-usuario";
  saudacao.textContent = "Olá, " + dados.nome;

  var sair = document.createElement("button");
  sair.type = "button";
  sair.className = "btn btn-outline";
  sair.textContent = "Sair";
  sair.addEventListener("click", function () {
    localStorage.removeItem(KEY);
    localStorage.removeItem(LEGACY_KEY);
    window.location.href = "index.html";
  });

  links.appendChild(saudacao);
  links.appendChild(sair);
});
