/* recymind – validação e funcionamento dos formulários de login e cadastro */
var CHAVE_USUARIOS_CADASTRADOS = "recymind-usuarios";

function lerUsuariosCadastrados() {
  try {
    var usuarios = JSON.parse(localStorage.getItem(CHAVE_USUARIOS_CADASTRADOS) || "[]");
    return Array.isArray(usuarios) ? usuarios : [];
  } catch (e) {
    return [];
  }
}

function buscarUsuarioCadastrado(email) {
  var emailBusca = email.trim().toLowerCase();
  return lerUsuariosCadastrados().find(function (usuario) {
    return usuario && typeof usuario.email === "string" && usuario.email.trim().toLowerCase() === emailBusca &&
      typeof usuario.nome === "string" && usuario.nome.trim();
  }) || null;
}

function salvarUsuarioCadastrado(usuario) {
  var usuarios = lerUsuariosCadastrados();
  var emailBusca = usuario.email.trim().toLowerCase();
  var existente = usuarios.find(function (item) {
    return item && typeof item.email === "string" && item.email.trim().toLowerCase() === emailBusca;
  });

  if (existente) existente.nome = usuario.nome;
  else usuarios.push(usuario);
  localStorage.setItem(CHAVE_USUARIOS_CADASTRADOS, JSON.stringify(usuarios));
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("form[data-validar]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = form.querySelector("[name=nome]");
      var email = form.querySelector("[name=email]");
      var senha = form.querySelector("[name=senha]");
      var erro = "";

      if (nome && nome.value.trim().length < 3) erro = "nome";
      else if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) erro = "email";
      else if (!senha || senha.value.length < 6) erro = "senha";

      if (erro) {
        window.location.href = "erro-campos.html?campo=" + erro;
        return;
      }

      /* Salva o nome do cadastro e recupera esse nome ao entrar */
      var emailDigitado = email.value.trim();
      var usuario;
      if (nome) {
        usuario = { nome: nome.value.trim(), email: emailDigitado };
        try {
          salvarUsuarioCadastrado(usuario);
        } catch (err) {}
      } else {
        var cadastrado = buscarUsuarioCadastrado(emailDigitado);
        var sessaoAnterior = null;
        try {
          sessaoAnterior = JSON.parse(localStorage.getItem("recymind-usuario") || "null");
        } catch (err) {}

        var nomeAnterior = sessaoAnterior && sessaoAnterior.email &&
          sessaoAnterior.email.toLowerCase() === emailDigitado.toLowerCase()
          ? sessaoAnterior.nome
          : "";
        var prefixoEmail = emailDigitado.split("@")[0].toLowerCase();
        if (typeof nomeAnterior !== "string" || nomeAnterior.toLowerCase() === prefixoEmail) nomeAnterior = "";

        usuario = {
          nome: (cadastrado && cadastrado.nome) || nomeAnterior || "Usuário",
          email: emailDigitado
        };
        if (usuario.nome !== "Usuário") {
          try {
            salvarUsuarioCadastrado(usuario);
          } catch (err) {}
        }
      }
      try {
        localStorage.setItem("recymind-usuario", JSON.stringify(usuario));
      } catch (err) {}

      var aviso = form.querySelector("#aviso-sucesso") || document.getElementById("aviso-sucesso");
      if (aviso) {
        aviso.textContent = form.dataset.sucesso || "Tudo certo! Redirecionando...";
        aviso.style.display = "block";
      }
      if (typeof mostrarAviso === "function") {
        mostrarAviso(form.dataset.sucesso || "Tudo certo!", "Você será levado à página inicial.");
      }
      setTimeout(function () {
        window.location.href = "index.html";
      }, 900);
    });
  });
});
