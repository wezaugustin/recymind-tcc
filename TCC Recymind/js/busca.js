/* recymind – busca de orientações de descarte */
var GUIA = {
  pilha: {
    titulo: "Pilhas e baterias",
    categoria: "Resíduo perigoso",
    comoDescartar: "Nunca jogue no lixo comum. Guarde as pilhas secas em um recipiente fechado e leve a um ponto de coleta específico.",
    ondeDescartar: ["Ecoponto Central", "Escola Municipal – Ponto de Entrega", "Supermercados com caixa coletora"],
    cuidados: ["Não perfure nem queime", "Evite molhar ou misturar com outros resíduos"],
    impacto: "Uma única pilha pode contaminar milhares de litros de água e o solo por décadas."
  },
  bateria: {
    titulo: "Baterias de celular e notebook",
    categoria: "Resíduo perigoso",
    comoDescartar: "Proteja os polos com fita isolante e entregue em pontos de logística reversa de eletrônicos.",
    ondeDescartar: ["Ecoponto Central", "Assistências técnicas autorizadas"],
    cuidados: ["Baterias estufadas não devem ser pressionadas", "Mantenha longe do calor"],
    impacto: "Metais pesados como lítio e cobalto são recuperados e voltam à cadeia produtiva."
  },
  oleo: {
    titulo: "Óleo de cozinha usado",
    categoria: "Óleos e líquidos",
    comoDescartar: "Espere esfriar, coe e armazene em garrafa PET bem fechada. Entregue em pontos de coleta de óleo.",
    ondeDescartar: ["Posto de Combustível EcoLimpo", "Ecoponto Central", "Cooperativas de reciclagem"],
    cuidados: ["Nunca despeje na pia ou no vaso sanitário", "Não misture com água"],
    impacto: "1 litro de óleo pode poluir até 25 mil litros de água."
  },
  eletronico: {
    titulo: "Eletrônicos",
    categoria: "Lixo eletrônico",
    comoDescartar: "Apague seus dados pessoais, retire pilhas e baterias e leve o aparelho a um ponto de coleta de eletrônicos.",
    ondeDescartar: ["Ecoponto Central", "Escola Municipal – Ponto de Entrega"],
    cuidados: ["Não desmonte telas e lâmpadas internas", "Não descarte com o lixo comum"],
    impacto: "Componentes como ouro, cobre e alumínio podem ser reaproveitados quase integralmente."
  },
  remedio: {
    titulo: "Remédios vencidos",
    categoria: "Resíduo perigoso",
    comoDescartar: "Mantenha na embalagem original e entregue em farmácias com coletor ou unidades de saúde.",
    ondeDescartar: ["Farmácia Popular – Coleta de Remédios", "Postos de saúde"],
    cuidados: ["Nunca jogue no vaso sanitário ou na pia", "Não doe medicamentos vencidos"],
    impacto: "Evita a contaminação da água e o surgimento de bactérias resistentes."
  },
  vidro: {
    titulo: "Vidro",
    categoria: "Reciclável",
    comoDescartar: "Lave, seque e embale cacos em papelão identificado antes de colocar na coleta seletiva.",
    ondeDescartar: ["Coleta seletiva municipal", "Cooperativa EcoVida", "Ponto Verde Vila Nova"],
    cuidados: ["Cuidado com cortes", "Espelhos e vidros temperados vão para ecopontos"],
    impacto: "O vidro é 100% reciclável e pode ser reaproveitado infinitas vezes."
  },
  papel: {
    titulo: "Papel e papelão",
    categoria: "Reciclável",
    comoDescartar: "Mantenha seco, sem gordura, e desmonte as caixas para ocupar menos espaço.",
    ondeDescartar: ["Coleta seletiva municipal", "Cooperativa EcoVida"],
    cuidados: ["Papel engordurado vai para o lixo comum", "Remova fitas adesivas e grampos"],
    impacto: "Cada tonelada reciclada evita o corte de cerca de 20 árvores."
  },
  plastico: {
    titulo: "Plástico",
    categoria: "Reciclável",
    comoDescartar: "Enxágue as embalagens, deixe secar e amasse para reduzir o volume.",
    ondeDescartar: ["Coleta seletiva municipal", "Ponto Verde Vila Nova"],
    cuidados: ["Separe tampas e rótulos quando possível"],
    impacto: "Reduz a poluição dos oceanos e economiza petróleo na produção de novos itens."
  },
  organico: {
    titulo: "Resíduos orgânicos",
    categoria: "Orgânico",
    comoDescartar: "Separe restos de alimentos e cascas e destine à compostagem doméstica ou comunitária.",
    ondeDescartar: ["Cooperativa EcoVida", "Composteiras comunitárias"],
    cuidados: ["Evite carnes e laticínios na composteira caseira"],
    impacto: "A compostagem reduz o metano gerado nos aterros sanitários."
  },
  movel: {
    titulo: "Móveis e volumosos",
    categoria: "Volumoso",
    comoDescartar: "Se ainda estiver em bom estado, doe. Caso contrário, leve a um ecoponto que aceite volumosos.",
    ondeDescartar: ["Ponto Verde Vila Nova", "Ecoponto Central"],
    cuidados: ["Não deixe na calçada fora dos dias de coleta"],
    impacto: "Evita pontos de descarte irregular e enchentes causadas por entulho."
  }
};

var SINONIMOS = {
  pilha: ["pilha", "pilhas"],
  bateria: ["bateria", "baterias", "celular", "notebook"],
  oleo: ["oleo", "óleo", "gordura", "fritura"],
  eletronico: ["eletronico", "eletrônico", "eletronicos", "computador", "tv", "televisao", "monitor"],
  remedio: ["remedio", "remédio", "medicamento", "farmacia"],
  vidro: ["vidro", "garrafa", "copo", "caco"],
  papel: ["papel", "papelao", "papelão", "caixa", "jornal", "revista"],
  plastico: ["plastico", "plástico", "pet", "embalagem", "sacola"],
  organico: ["organico", "orgânico", "comida", "resto", "casca", "compostagem"],
  movel: ["movel", "móvel", "moveis", "móveis", "colchao", "sofa", "entulho"]
};

function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function encontrar(termo) {
  var t = normalizar(termo);
  for (var chave in SINONIMOS) {
    for (var i = 0; i < SINONIMOS[chave].length; i++) {
      if (t.indexOf(normalizar(SINONIMOS[chave][i])) !== -1) return GUIA[chave];
    }
  }
  return null;
}

var I_LIXEIRA = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>';
var I_PIN = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>';
var I_ALERTA = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>';
var I_FOLHA = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-6 7-9 16-9 0 9-4 16-9 16z"/><path d="M4 21c4-6 8-8 12-9"/></svg>';
var I_INFO = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

function renderizar(dados, alvo) {
  alvo.innerHTML =
    '<div class="resultado">' +
    '<div class="topo"><div class="ident"><span class="icon-box">' + I_LIXEIRA + "</span>" +
    "<div><h3>" + dados.titulo + '</h3><span class="chip">' + dados.categoria + "</span></div></div>" +
    '<button class="fechar" type="button" aria-label="Fechar">✕</button></div>' +
    '<div class="blocos">' +
    '<div class="bloco"><h4>' + I_INFO + " Como descartar</h4><p>" + dados.comoDescartar + "</p></div>" +
    '<div class="bloco"><h4>' + I_PIN + " Onde descartar</h4><ul>" +
    dados.ondeDescartar.map(function (o) { return "<li>" + o + "</li>"; }).join("") +
    "</ul></div>" +
    '<div class="bloco aviso"><h4>' + I_ALERTA + " Cuidados</h4><ul>" +
    dados.cuidados.map(function (c) { return "<li>" + c + "</li>"; }).join("") +
    "</ul></div>" +
    '<div class="bloco impacto"><h4>' + I_FOLHA + " Impacto ambiental</h4><p>" + dados.impacto + "</p></div>" +
    "</div></div>";

  alvo.querySelector(".fechar").addEventListener("click", function () {
    alvo.innerHTML = "";
  });
  alvo.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("form-busca");
  var alvo = document.getElementById("resultado-busca");
  if (!form || !alvo) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var termo = form.querySelector("input[name=residuo]").value.trim();
    if (!termo || /^\d+$/.test(termo)) {
      window.location.href = "erro-busca.html";
      return;
    }
    var dados = encontrar(termo);
    if (!dados) {
      window.location.href = "erro-busca.html?termo=" + encodeURIComponent(termo);
      return;
    }
    alvo.innerHTML = '<div class="carregando"><span class="spin">◠</span> Buscando orientações…</div>';
    setTimeout(function () { renderizar(dados, alvo); }, 500);
  });

  document.querySelectorAll("[data-sugestao]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      form.querySelector("input[name=residuo]").value = btn.dataset.sugestao;
      form.dispatchEvent(new Event("submit", { cancelable: true }));
    });
  });
});
