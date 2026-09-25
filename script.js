// ===== DADOS FICTÍCIOS DAS MATÉRIAS =====
const materias = [
  { nome: "Matemática", notas: [8.5, 7.0, 9.0, 8.0] },
  { nome: "Português",  notas: [7.5, 6.5, 8.0, 7.0] },
  { nome: "Ciências",   notas: [9.0, 9.5, 8.5, 10.0] },
  { nome: "História",   notas: [5.5, 6.0, 5.0, 6.5] },
  { nome: "Geografia",  notas: [7.0, 7.5, 6.5, 7.0] },
  { nome: "Inglês",     notas: [8.0, 8.5, 9.0, 8.5] }
];

// ===== FUNÇÃO QUE CALCULA A MÉDIA =====
function calcularMedia(notas) {
  let soma = 0;
  for (let i = 0; i < notas.length; i++) {
    soma = soma + notas[i];
  }
  return soma / notas.length;
}

// ===== FUNÇÃO QUE DECIDE A SITUAÇÃO =====
function definirSituacao(media) {
  if (media >= 7) {
    return { texto: "Aprovado", classe: "aprovado" };
  } else if (media >= 5) {
    return { texto: "Recuperação", classe: "recuperacao" };
  } else {
    return { texto: "Reprovado", classe: "reprovado" };
  }
}

// ===== PEGA A SEÇÃO ONDE OS CARTÕES VÃO ENTRAR =====
const listaMaterias = document.getElementById("lista-materias");

// ===== CRIA UM CARTÃO PARA CADA MATÉRIA =====
materias.forEach(function (materia) {
  const media = calcularMedia(materia.notas);
  const situacao = definirSituacao(media);

  const cartao = document.createElement("div");
  cartao.classList.add("cartao");

  cartao.innerHTML = `
    <h2>${materia.nome}</h2>
    <p class="notas">Notas: ${materia.notas.join(" • ")}</p>
    <p class="media">Média: ${media.toFixed(1)}</p>
    <p class="situacao ${situacao.classe}">${situacao.texto}</p>
  `;

  listaMaterias.appendChild(cartao);
});