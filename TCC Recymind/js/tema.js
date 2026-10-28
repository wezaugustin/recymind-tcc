/* recymind – alternância de tema claro/escuro */
(function () {
  var KEY = "recymind-tema";
  var LEGACY_KEY = "ecoguia-tema";
  var salvo = lerTemaSalvo();
  aplicar(salvo);

  function lerTemaSalvo() {
    var tema = localStorage.getItem(KEY);
    if (!tema) {
      tema = localStorage.getItem(LEGACY_KEY);
      if (tema) {
        localStorage.setItem(KEY, tema);
        localStorage.removeItem(LEGACY_KEY);
      }
    }
    return tema || "light";
  }

  function aplicar(tema) {
    document.documentElement.classList.toggle("dark", tema === "dark");
    localStorage.setItem(KEY, tema);
    document.querySelectorAll("[data-tema-toggle]").forEach(function (btn) {
      btn.innerHTML =
        tema === "dark"
          ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M5 5l1.5 1.5M17.5 17.5L19 19M2 12h2M20 12h2M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>'
          : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
      btn.setAttribute("aria-label", tema === "dark" ? "Ativar tema claro" : "Ativar tema escuro");
    });
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-tema-toggle]");
    if (!btn) return;
    aplicar(document.documentElement.classList.contains("dark") ? "light" : "dark");
  });

  document.addEventListener("DOMContentLoaded", function () {
    aplicar(lerTemaSalvo());
  });
})();
