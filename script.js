// ===== CONFIGURAÇÃO FIXA DO ALUNO =====
const CONFIG_ALUNO = {
  turma: "8A",
  numeroChamada: 27,
  apiUrl: "https://boletim-api.profbt.com.br"
};

// ===== DADOS LOCALMENTE PRESERVADOS DO PROJETO =====
var materias = [
  { nome: "Matemática", notas: [8.5, 7.0, 9.0, 8.0] },
  { nome: "Português",  notas: [7.5, 6.5, 8.0, 7.0] },
  { nome: "Ciências",   notas: [9.0, 9.5, 8.5, 10.0] },
  { nome: "História",   notas: [5.5, 6.0, 5.0, 6.5] },
  { nome: "Geografia",  notas: [7.0, 7.5, 6.5, 7.0] },
  { nome: "Inglês",     notas: [8.0, 8.5, 9.0, 8.5] }
];

var MEDIA_APROVACAO = 7;
var MEDIA_RECUPERACAO = 5;

// Variável em memória para guardar o PIN durante a sessão
let pinSessao = "";

// ===== FUNÇÕES DE CÁLCULO E FORMATAÇÃO (PRESERVADAS) =====
function calcularMedia(lista) {
  var validas = lista.filter(function (n) { return n !== null && n !== undefined && !isNaN(n); });
  if (validas.length === 0) return 0;
  var soma = 0;
  for (var i = 0; i < validas.length; i++) {
    soma += validas[i];
  }
  return soma / validas.length;
}

function formatar(numero, casas) {
  if (numero === null || numero === undefined || isNaN(numero)) return "-";
  return Number(numero).toFixed(casas).replace(".", ",");
}

function definirSituacao(media) {
  if (media >= MEDIA_APROVACAO) {
    return { texto: "Aprovado", classe: "aprovado" };
  }
  if (media >= MEDIA_RECUPERACAO) {
    return { texto: "Recuperação", classe: "recuperacao" };
  }
  return { texto: "Reprovado", classe: "reprovado" };
}

// ===== NORMALIZAÇÃO DE DADOS ANTIGOS =====
function normalizarNota(valor) {
  if (valor === null || valor === undefined || valor === "") return null;
  if (typeof valor === "string") {
    valor = valor.replace(",", ".");
  }
  var num = Number(valor);
  if (isNaN(num)) return null;
  if (num > 10) return num / 10;
  return num;
}

// ===== MONTAGEM DO RESUMO =====
function montarResumo() {
  var area = document.getElementById("resumo");
  area.className = "resumo";
  area.innerHTML = "";

  var medias = materias.map(function (m) {
    var listaNotas = m.notas || [m.nota_t1, m.nota_t2, m.nota_t3];
    return calcularMedia(listaNotas);
  });

  var mediaGeral = calcularMedia(medias);
  var situacao = definirSituacao(mediaGeral);

  var emRecuperacao = medias.filter(function (m) {
    return m >= MEDIA_RECUPERACAO && m < MEDIA_APROVACAO;
  }).length;

  var reprovadas = medias.filter(function (m) {
    return m < MEDIA_RECUPERACAO;
  }).length;

  area.innerHTML =
    '<div class="resumo-item"><span class="resumo-rotulo">Média geral</span>' +
    '<span class="resumo-valor">' + formatar(mediaGeral, 2) + '</span></div>' +
    '<div class="resumo-item"><span class="resumo-rotulo">Matérias</span>' +
    '<span class="resumo-valor">' + materias.length + '</span></div>' +
    '<div class="resumo-item"><span class="resumo-rotulo">Em recuperação</span>' +
    '<span class="resumo-valor">' + emRecuperacao + '</span></div>' +
    '<div class="resumo-item"><span class="resumo-rotulo">Reprovadas</span>' +
    '<span class="resumo-valor">' + reprovadas + '</span></div>' +
    '<p class="situacao ' + situacao.classe + '">' + situacao.texto + '</p>';
}

// ===== MONTAGEM DOS CARTÕES =====
function montarCartoes() {
  var lista = document.getElementById("lista-materias");
  lista.innerHTML = "";

  materias.forEach(function (materia) {
    var listaNotas = materia.notas ? materia.notas.map(normalizarNota) : [
      normalizarNota(materia.nota_t1),
      normalizarNota(materia.nota_t2),
      normalizarNota(materia.nota_t3)
    ];

    var media = calcularMedia(listaNotas);
    var situacao = definirSituacao(media);

    var notasTexto = listaNotas.map(function (n) {
      return formatar(n, 1);
    }).join(" • ");

    var cartao = document.createElement("article");
    cartao.className = "cartao";

    var h2 = document.createElement("h2");
    h2.textContent = materia.nome || materia.materia;
    cartao.appendChild(h2);

    var pNotas = document.createElement("p");
    pNotas.className = "notas";
    pNotas.textContent = "Notas: " + notasTexto;
    cartao.appendChild(pNotas);

    if (materia.faltas_t1 !== undefined) {
      var totalFaltas = (materia.faltas_t1 || 0) + (materia.faltas_t2 || 0) + (materia.faltas_t3 || 0);
      var pFaltas = document.createElement("p");
      pFaltas.className = "notas";
      pFaltas.textContent = "Faltas totais: " + totalFaltas;
      cartao.appendChild(pFaltas);
    }

    var pMedia = document.createElement("p");
    pMedia.className = "media";
    pMedia.textContent = "Média: " + formatar(media, 2);
    cartao.appendChild(pMedia);

    var pSituacao = document.createElement("p");
    pSituacao.className = "situacao " + situacao.classe;
    pSituacao.textContent = situacao.texto;
    cartao.appendChild(pSituacao);

    lista.appendChild(cartao);
  });
}

function atualizarInterface() {
  montarResumo();
  montarCartoes();
}

// ===== AUTENTICAÇÃO E LOGIN (PIN) =====
async function fazerLogin() {
  const inputPin = document.getElementById("campo-pin");
  const msgLogin = document.getElementById("mensagem-login");
  const pinDigitado = inputPin.value.trim();

  if (!pinDigitado) {
    msgLogin.textContent = "Por favor, digite seu PIN.";
    return;
  }

  msgLogin.textContent = "Conectando...";

  try {
    const resposta = await fetch(`${CONFIG_ALUNO.apiUrl}/api/v1/boletins/abrir`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        turma: CONFIG_ALUNO.turma,
        numero_chamada: CONFIG_ALUNO.numeroChamada,
        pin: pinDigitado
      })
    });

    if (resposta.status === 401) {
      msgLogin.textContent = "Turma, chamada ou PIN inválidos.";
      return;
    }

    if (resposta.status === 429) {
      msgLogin.textContent = "Muitas tentativas. Aguarde um minuto e tente novamente.";
      return;
    }

    if (!resposta.ok) {
      msgLogin.textContent = "Não foi possível conectar ao servidor. Tente novamente.";
      return;
    }

    const resultado = await fetchResultadoJson(resposta);
    
    // Armazena PIN em memória de sessão e limpa o input
    pinSessao = pinDigitado;
    inputPin.value = "";

    // Processar dados retornados
    if (resultado && resultado.dados && resultado.dados.disciplinas && resultado.dados.disciplinas.length > 0) {
      materias = resultado.dados.disciplinas;
    }

    document.getElementById("area-login").style.display = "none";
    document.getElementById("conteudo-boletim").style.display = "block";
    
    atualizarInterface();
    construirPainelEditor();

  } catch (erro) {
    msgLogin.textContent = "Não foi possível conectar ao servidor. Tente novamente.";
  }
}

async function fetchResultadoJson(resposta) {
  try {
    return await resposta.json();
  } catch (e) {
    return null;
  }
}

// ===== PAINEL DE EDIÇÃO =====
function alternarEditor() {
  const painel = document.getElementById("painel-editor");
  if (painel.style.display === "none") {
    painel.style.display = "block";
  } else {
    painel.style.display = "none";
  }
}

function construirPainelEditor() {
  const container = document.getElementById("container-campos-editor");
  container.className = "grid-editor";
  container.innerHTML = "";

  materias.forEach((m, index) => {
    const div = document.createElement("div");
    div.className = "item-editor";

    const nomeMateria = m.nome || m.materia;
    
    let n1 = m.nota_t1 !== undefined ? m.nota_t1 : (m.notas ? m.notas[0] : "");
    let n2 = m.nota_t2 !== undefined ? m.nota_t2 : (m.notas ? m.notas[1] : "");
    let n3 = m.nota_t3 !== undefined ? m.nota_t3 : (m.notas ? m.notas[2] : "");
    
    let f1 = m.faltas_t1 !== undefined ? m.faltas_t1 : 0;
    let f2 = m.faltas_t2 !== undefined ? m.faltas_t2 : 0;
    let f3 = m.faltas_t3 !== undefined ? m.faltas_t3 : 0;

    div.innerHTML = `
      <h3>${escaparHtml(nomeMateria)}</h3>
      <div class="campos-trimestre">
        <div>
          <label>Nota T1</label>
          <input type="text" id="n1_${index}" value="${n1 !== null && n1 !== undefined ? n1 : ''}">
        </div>
        <div>
          <label>Faltas T1</label>
          <input type="number" id="f1_${index}" value="${f1 !== null && f1 !== undefined ? f1 : 0}">
        </div>
        <div>
          <label>Nota T2</label>
          <input type="text" id="n2_${index}" value="${n2 !== null && n2 !== undefined ? n2 : ''}">
        </div>
        <div>
          <label>Faltas T2</label>
          <input type="number" id="f2_${index}" value="${f2 !== null && f2 !== undefined ? f2 : 0}">
        </div>
        <div>
          <label>Nota T3</label>
          <input type="text" id="n3_${index}" value="${n3 !== null && n3 !== undefined ? n3 : ''}">
        </div>
        <div>
          <label>Faltas T3</label>
          <input type="number" id="f3_${index}" value="${f3 !== null && f3 !== undefined ? f3 : 0}">
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

function escaparHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ===== VALIDAÇÃO DOS CAMPOS DIGITADOS =====
function validarNotaDigitada(inputEl) {
  inputEl.classList.remove("campo-invalido");
  let val = inputEl.value.trim();
  if (val === "") return null;

  val = val.replace(",", ".");
  const num = Number(val);

  if (isNaN(num) || num < 0 || num > 10) {
    inputEl.classList.add("campo-invalido");
    return false;
  }
  return num;
}

function validarFaltaDigitada(inputEl) {
  inputEl.classList.remove("campo-invalido");
  let val = inputEl.value.trim();
  if (val === "") {
    inputEl.classList.add("campo-invalido");
    return false;
  }

  const num = Number(val);
  if (isNaN(num) || !Number.isInteger(num) || num < 0) {
    inputEl.classList.add("campo-invalido");
    return false;
  }
  return num;
}

// ===== SALVAR DADOS NA API =====
async function salvarBoletim() {
  const msgSalvar = document.getElementById("mensagem-salvar");
  let temErro = false;
  const disciplinasAtualizadas = [];

  materias.forEach((m, index) => {
    const elN1 = document.getElementById(`n1_${index}`);
    const elN2 = document.getElementById(`n2_${index}`);
    const elN3 = document.getElementById(`n3_${index}`);
    const elF1 = document.getElementById(`f1_${index}`);
    const elF2 = document.getElementById(`f2_${index}`);
    const elF3 = document.getElementById(`f3_${index}`);

    const vN1 = validarNotaDigitada(elN1);
    const vN2 = validarNotaDigitada(elN2);
    const vN3 = validarNotaDigitada(elN3);
    const vF1 = validarFaltaDigitada(elF1);
    const vF2 = validarFaltaDigitada(elF2);
    const vF3 = validarFaltaDigitada(elF3);

    if (vN1 === false || vN2 === false || vN3 === false || vF1 === false || vF2 === false || vF3 === false) {
      temErro = true;
    } else {
      disciplinasAtualizadas.push({
        nome: m.nome || m.materia,
        nota_t1: vN1,
        nota_t2: vN2,
        nota_t3: vN3,
        faltas_t1: vF1,
        faltas_t2: vF2,
        faltas_t3: vF3
      });
    }
  });

  if (temErro) {
    msgSalvar.textContent = "Verifique os campos destacados em vermelho.";
    return;
  }

  msgSalvar.textContent = "Salvando...";

  try {
    const resposta = await fetch(`${CONFIG_ALUNO.apiUrl}/api/v1/boletins/salvar`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        turma: CONFIG_ALUNO.turma,
        numero_chamada: CONFIG_ALUNO.numeroChamada,
        pin: pinSessao,
        dados: {
          disciplinas: disciplinasAtualizadas
        }
      })
    });

    if (!resposta.ok) {
      msgSalvar.textContent = "Não foi possível salvar as alterações. Tente novamente.";
      return;
    }

    materias = disciplinasAtualizadas;
    atualizarInterface();
    msgSalvar.textContent = "Dados salvos com sucesso.";

  } catch (e) {
    msgSalvar.textContent = "Não foi possível conectar ao servidor. Tente novamente.";
  }
}