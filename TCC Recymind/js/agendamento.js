/* recymind - validação do agendamento nos pontos de coleta */
document.addEventListener("DOMContentLoaded", function () {
  var formularios = document.querySelectorAll(".schedule form");

  Array.prototype.forEach.call(formularios, function (form) {
    form.addEventListener("submit", function (evento) {
      evento.preventDefault();

      var data = form.querySelector("input[type=date]");
      var horario = form.querySelector("select");
      var dias = (form.getAttribute("data-dias") || "1,2,3,4,5,6,0").split(",");

      if (!data.value || !horario.value) {
        window.location.href = "erro-agendamento.html";
        return;
      }

      var partes = data.value.split("-");
      var escolhida = new Date(partes[0], partes[1] - 1, partes[2]);
      var hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      if (escolhida < hoje || dias.indexOf(String(escolhida.getDay())) === -1) {
        window.location.href = "erro-agendamento.html";
        return;
      }

      var aviso = form.querySelector(".hint");
      aviso.textContent =
        "Agendamento confirmado para " + data.value.split("-").reverse().join("/") + " às " + horario.value + ".";
      aviso.style.color = "#22c55e";
    });
  });
});
