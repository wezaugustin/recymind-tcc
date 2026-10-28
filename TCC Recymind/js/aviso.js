/* recymind – avisos flutuantes (toast) */
function mostrarAviso(titulo, descricao) {
  var wrap = document.querySelector(".toast-wrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "toast-wrap";
    document.body.appendChild(wrap);
  }
  var t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = "<strong></strong><span></span>";
  t.querySelector("strong").textContent = titulo;
  t.querySelector("span").textContent = descricao || "";
  wrap.appendChild(t);
  setTimeout(function () {
    t.remove();
  }, 4500);
}
