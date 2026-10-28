/* recymind – pontos de coleta com calendário e agendamento */
var PONTOS = [
  {
    nome: "Ecoponto Central",
    endereco: "Rua das Flores, 120 – Centro",
    tipos: ["Eletrônicos", "Pilhas", "Óleo"],
    horario: "Seg–Sex: 8h–17h",
    telefone: "(11) 3000-1234",
    distancia: "1,2 km",
    dias: [1, 2, 3, 4, 5],
    horas: ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]
  },
  {
    nome: "Ponto Verde Vila Nova",
    endereco: "Av. Brasil, 450 – Vila Nova",
    tipos: ["Recicláveis", "Volumosos"],
    horario: "Seg–Sáb: 7h–18h",
    telefone: "(11) 3000-5678",
    distancia: "2,5 km",
    dias: [1, 2, 3, 4, 5, 6],
    horas: ["07:00", "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
  },
  {
    nome: "Cooperativa EcoVida",
    endereco: "Rua Esperança, 88 – Jardim Paz",
    tipos: ["Recicláveis", "Orgânicos"],
    horario: "Seg–Sex: 8h–16h",
    telefone: "(11) 3000-9012",
    distancia: "3,1 km",
    dias: [1, 2, 3, 4, 5],
    horas: ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"]
  },
  {
    nome: "Farmácia Popular – Coleta de Remédios",
    endereco: "Rua São Paulo, 310 – Centro",
    tipos: ["Remédios", "Perigosos"],
    horario: "Seg–Sáb: 8h–20h",
    telefone: "(11) 3000-3456",
    distancia: "0,8 km",
    dias: [1, 2, 3, 4, 5, 6],
    horas: ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"]
  },
  {
    nome: "Posto de Combustível EcoLimpo",
    endereco: "Av. das Nações, 900 – Industrial",
    tipos: ["Óleo", "Pneus"],
    horario: "Todos os dias: 6h–22h",
    telefone: "(11) 3000-7890",
    distancia: "4,0 km",
    dias: [0, 1, 2, 3, 4, 5, 6],
    horas: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"]
  },
  {
    nome: "Escola Municipal – Ponto de Entrega",
    endereco: "Rua do Saber, 55 – Bela Vista",
    tipos: ["Eletrônicos", "Pilhas", "Recicláveis"],
    horario: "Seg–Sex: 9h–15h",
    telefone: "(11) 3000-2345",
    distancia: "1,8 km",
    dias: [1, 2, 3, 4, 5],
    horas: ["09:00", "10:00", "11:00", "13:00", "14:00"]
  }
];

var MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
var DIAS_ABREV = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

var ICONE_PIN = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>';
var ICONE_RELOGIO = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
var ICONE_FONE = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>';
var ICONE_CAL = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
var ICONE_CHECK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
var ICONE_SETA = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
var CHAVE_AGENDAMENTOS = "recymind-agendamentos";

function lerAgendamentos() {
  try {
    var salvos = JSON.parse(localStorage.getItem(CHAVE_AGENDAMENTOS) || "[]");
    return Array.isArray(salvos) ? salvos : [];
  } catch (e) {
    return [];
  }
}

function formatarDataAgendamento(dataISO) {
  var partes = (dataISO || "").split("-");
  if (partes.length !== 3) return dataISO || "Data não informada";
  var data = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
  return isNaN(data.getTime()) ? dataISO : data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function renderizarAgendamentos() {
  var listaEl = document.getElementById("lista-agendamentos");
  if (!listaEl) return;

  var agendamentos = lerAgendamentos();
  var totalEl = document.getElementById("total-agendamentos");
  if (totalEl) totalEl.textContent = agendamentos.length + (agendamentos.length === 1 ? " visita" : " visitas");
  listaEl.textContent = "";

  if (!agendamentos.length) {
    var vazio = document.createElement("p");
    vazio.className = "booking-empty";
    vazio.textContent = "Ainda não há agendamentos. Escolha um ponto de coleta e confirme uma data e um horário.";
    listaEl.appendChild(vazio);
    return;
  }

  agendamentos.forEach(function (agendamento) {
    var item = document.createElement("article");
    item.className = "booking-item";

    var icone = document.createElement("span");
    icone.className = "booking-mark";
    icone.innerHTML = ICONE_CAL;

    var conteudo = document.createElement("div");
    conteudo.className = "booking-content";
    var titulo = document.createElement("h3");
    titulo.textContent = agendamento.ponto || "Ponto de coleta";
    var endereco = document.createElement("p");
    endereco.className = "booking-address";
    endereco.textContent = agendamento.endereco || "";
    var horario = document.createElement("p");
    horario.className = "booking-time";
    horario.textContent = formatarDataAgendamento(agendamento.data) + " · " + (agendamento.hora || "Horário não informado");

    conteudo.appendChild(titulo);
    if (endereco.textContent) conteudo.appendChild(endereco);
    conteudo.appendChild(horario);
    item.appendChild(icone);
    item.appendChild(conteudo);
    listaEl.appendChild(item);
  });
}

function salvarAgendamento(ponto, data, hora) {
  var agendamentos = lerAgendamentos();
  var dataISO = data.getFullYear() + "-" + String(data.getMonth() + 1).padStart(2, "0") + "-" + String(data.getDate()).padStart(2, "0");
  agendamentos.unshift({
    ponto: ponto.nome,
    endereco: ponto.endereco,
    data: dataISO,
    hora: hora
  });

  try {
    localStorage.setItem(CHAVE_AGENDAMENTOS, JSON.stringify(agendamentos));
    renderizarAgendamentos();
    return true;
  } catch (e) {
    return false;
  }
}

function montarPontos(container) {
  PONTOS.forEach(function (p, i) {
    var el = document.createElement("article");
    el.className = "ponto";
    el.innerHTML =
      '<button class="head" type="button">' +
      '<div class="linha">' +
      '<div class="nome"><span class="icon-box">' + ICONE_PIN + "</span><h3>" + p.nome + "</h3></div>" +
      '<div class="nome"><span class="dist">' + p.distancia + '</span><span class="chevron">' + ICONE_SETA + "</span></div>" +
      "</div>" +
      '<p class="endereco">' + p.endereco + "</p>" +
      '<div class="tipos">' + p.tipos.map(function (t) { return "<span>" + t + "</span>"; }).join("") + "</div>" +
      '<div class="info"><span>' + ICONE_RELOGIO + p.horario + "</span><span>" + ICONE_FONE + p.telefone + "</span></div>" +
      "</button>" +
      '<div class="agenda"><h4>' + ICONE_CAL + ' Agendar visita</h4><div class="cal"></div><div class="horarios"></div><div class="confirmar"></div></div>';

    container.appendChild(el);

    el.querySelector(".head").addEventListener("click", function () {
      el.classList.toggle("aberto");
    });

    iniciarCalendario(el, p, i);
  });
}

function iniciarCalendario(el, ponto, idx) {
  var hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  var mesAtual = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  var selecionada = null;
  var hora = null;

  var cal = el.querySelector(".cal");
  var boxHoras = el.querySelector(".horarios");
  var boxConfirma = el.querySelector(".confirmar");

  function desenhar() {
    var ano = mesAtual.getFullYear();
    var mes = mesAtual.getMonth();
    var primeiro = new Date(ano, mes, 1).getDay();
    var totalDias = new Date(ano, mes + 1, 0).getDate();

    var html =
      '<div class="cal-top"><button type="button" data-nav="-1">‹</button><strong>' +
      MESES[mes] + " de " + ano +
      '</strong><button type="button" data-nav="1">›</button></div><table><thead><tr>' +
      DIAS_ABREV.map(function (d) { return "<th>" + d + "</th>"; }).join("") +
      "</tr></thead><tbody><tr>";

    for (var i = 0; i < primeiro; i++) html += "<td></td>";
    for (var dia = 1; dia <= totalDias; dia++) {
      var data = new Date(ano, mes, dia);
      var bloqueado = data < hoje || ponto.dias.indexOf(data.getDay()) === -1;
      var sel = selecionada && selecionada.getTime() === data.getTime();
      html +=
        "<td><button type=\"button\" data-dia=\"" + dia + '"' +
        (bloqueado ? " disabled" : "") +
        (sel ? ' class="sel"' : "") +
        ">" + dia + "</button></td>";
      if ((primeiro + dia) % 7 === 0) html += "</tr><tr>";
    }
    html += "</tr></tbody></table>";
    cal.innerHTML = html;
  }

  function desenharHoras() {
    if (!selecionada) {
      boxHoras.innerHTML = "";
      boxConfirma.innerHTML = "";
      return;
    }
    var texto = selecionada.toLocaleDateString("pt-BR");
    boxHoras.innerHTML =
      "<p>Horários disponíveis em " + texto + ":</p><div class=\"lista\">" +
      ponto.horas.map(function (h) {
        return '<button type="button" data-hora="' + h + '"' + (hora === h ? ' class="sel"' : "") + ">" + h + "</button>";
      }).join("") +
      "</div>";

    boxConfirma.innerHTML =
      '<button type="button" class="btn btn-primary btn-block" data-confirmar>' + ICONE_CHECK +
      " Confirmar agendamento" + (hora ? " – " + texto + " às " + hora : "") + "</button>";
  }

  cal.addEventListener("click", function (e) {
    var nav = e.target.closest("[data-nav]");
    if (nav) {
      mesAtual = new Date(mesAtual.getFullYear(), mesAtual.getMonth() + Number(nav.dataset.nav), 1);
      desenhar();
      return;
    }
    var btn = e.target.closest("[data-dia]");
    if (!btn || btn.disabled) return;
    selecionada = new Date(mesAtual.getFullYear(), mesAtual.getMonth(), Number(btn.dataset.dia));
    hora = null;
    desenhar();
    desenharHoras();
  });

  boxHoras.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-hora]");
    if (!btn) return;
    hora = btn.dataset.hora;
    desenharHoras();
  });

  boxConfirma.addEventListener("click", function (e) {
    if (!e.target.closest("[data-confirmar]")) return;
    if (!selecionada || !hora) {
      window.location.href = "erro-agendamento.html";
      return;
    }
    var dataConfirmada = new Date(selecionada.getFullYear(), selecionada.getMonth(), selecionada.getDate());
    var salvo = salvarAgendamento(ponto, dataConfirmada, hora);
    mostrarAviso(
      salvo ? "Agendamento confirmado!" : "Agendamento confirmado nesta sessão",
      salvo
        ? ponto.nome + " – " + selecionada.toLocaleDateString("pt-BR") + " às " + hora
        : "Não foi possível salvar o agendamento neste navegador."
    );
    selecionada = null;
    hora = null;
    desenhar();
    desenharHoras();
    el.classList.remove("aberto");
  });

  desenhar();
}

document.addEventListener("DOMContentLoaded", function () {
  renderizarAgendamentos();
  var c = document.getElementById("lista-pontos");
  if (c) montarPontos(c);
});

/* Filtros da lista: combinam pesquisa textual e tipo de material. */
document.addEventListener("DOMContentLoaded", function () {
  var busca = document.getElementById("filtro-pontos-texto");
  var filtro = document.getElementById("filtro-material");
  var lista = document.getElementById("lista-pontos");
  if (!lista || (!busca && !filtro)) return;

  function filtrarPontos() {
    var termo = busca ? busca.value.trim().toLocaleLowerCase("pt-BR") : "";
    var material = filtro ? filtro.value.toLocaleLowerCase("pt-BR") : "";
    var visiveis = 0;
    lista.querySelectorAll(".ponto").forEach(function (el) {
      var texto = el.innerText.toLocaleLowerCase("pt-BR");
      var correspondeTexto = !termo || texto.includes(termo);
      var correspondeMaterial = !material || texto.includes(material);
      var mostrar = correspondeTexto && correspondeMaterial;
      el.hidden = !mostrar;
      if (mostrar) visiveis++;
    });
    var vazio = lista.querySelector(".filtro-vazio");
    if (!visiveis && !vazio) {
      vazio = document.createElement("p");
      vazio.className = "filtro-vazio";
      vazio.textContent = "Nenhum ponto encontrado. Tente outro termo ou material.";
      lista.appendChild(vazio);
    } else if (visiveis && vazio) {
      vazio.remove();
    }
  }
  if (busca) busca.addEventListener("input", filtrarPontos);
  if (filtro) filtro.addEventListener("change", filtrarPontos);
});
