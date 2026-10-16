<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Boletim Digital</title>

  <style>
    :root {
      --fundo: #0b1120;
      --cartao: #1a2438;
      --borda: #2c3a54;
      --azul: #3b82f6;
      --ciano: #22d3ee;
      --texto: #e2e8f0;
      --suave: #94a3b8;
      --verde: #22c55e;
      --laranja: #f59e0b;
      --vermelho: #ef4444;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: "Segoe UI", Tahoma, Arial, sans-serif;
      color: var(--texto);
      min-height: 100vh;
      padding: 32px 20px 24px;
      line-height: 1.5;
      background-color: var(--fundo);
      background-image:
        radial-gradient(circle at 15% 10%, rgba(59, 130, 246, 0.25), transparent 40%),
        radial-gradient(circle at 85% 25%, rgba(34, 211, 238, 0.15), transparent 35%),
        radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.2), transparent 45%);
      background-attachment: fixed;
    }

    /* ===== CABEÇALHO ===== */
    .cabecalho {
      text-align: center;
      margin-bottom: 32px;
    }

    .cabecalho h1 {
      font-size: 2.6rem;
      letter-spacing: -0.5px;
      margin-bottom: 10px;
      color: var(--azul);
    }

    .subtitulo {
      display: inline-block;
      padding: 6px 18px;
      border: 1px solid var(--borda);
      border-radius: 999px;
      background: #111a2e;
      color: var(--suave);
      font-size: 0.95rem;
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
    }

    /* ===== LEGENDA ===== */
    .legenda {
      background: var(--cartao);
      border: 1px solid var(--borda);
      border-radius: 16px;
      padding: 16px 20px;
      margin-bottom: 20px;
    }

    .legenda-titulo {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--suave);
      margin-bottom: 12px;
    }

    .legenda-lista {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 12px 28px;
      color: var(--suave);
      font-size: 0.9rem;
    }

    .legenda-lista li {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* ===== RESUMO ===== */
    .resumo {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 18px 28px;
      background: #162340;
      border: 1px solid rgba(59, 130, 246, 0.45);
      border-radius: 16px;
      padding: 22px 24px;
      margin-bottom: 24px;
    }

    .resumo-item {
      display: flex;
      flex-direction: column;
    }

    .resumo-rotulo {
      color: var(--suave);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .resumo-valor {
      font-size: 1.9rem;
      font-weight: bold;
      color: var(--ciano);
    }

    /* ===== CARTÕES ===== */
    .lista-materias {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
    }

    .cartao {
      position: relative;
      overflow: hidden;
      background: var(--cartao);
      border: 1px solid var(--borda);
      border-radius: 16px;
      padding: 22px;
      transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
    }

    .cartao::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, var(--azul), var(--ciano));
    }

    .cartao:hover {
      transform: translateY(-6px);
      border-color: var(--azul);
      box-shadow: 0 12px 32px rgba(59, 130, 246, 0.25);
    }

    .cartao h2 {
      font-size: 1.35rem;
      margin-bottom: 12px;
    }

    .notas {
      color: var(--suave);
      font-size: 0.9rem;
      margin-bottom: 14px;
    }

    .media {
      font-size: 1.6rem;
      font-weight: bold;
      margin-bottom: 16px;
    }

    /* ===== SITUAÇÃO ===== */
    .situacao {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      border: 1px solid currentColor;
    }

    .aprovado {
      color: var(--verde);
      background: rgba(34, 197, 94, 0.12);
    }

    .recuperacao {
      color: var(--laranja);
      background: rgba(245, 158, 11, 0.12);
    }

    .reprovado {
      color: var(--vermelho);
      background: rgba(239, 68, 68, 0.12);
    }

    /* ===== RODAPÉ ===== */
    .rodape {
      text-align: center;
      margin-top: 48px;
      padding-top: 20px;
      border-top: 1px solid var(--borda);
      color: var(--suave);
      font-size: 0.85rem;
    }

    @media (max-width: 600px) {
      body { padding: 24px 14px 20px; }
      .cabecalho h1 { font-size: 2rem; }
      .resumo { justify-content: flex-start; }
      .resumo-item { min-width: 40%; }
    }
  </style>
</head>
<body>

  <header class="cabecalho">
    <h1>📘 Boletim Digital</h1>
    <p class="subtitulo">Pedro Fogaça — 8º Ano A — 2026</p>
  </header>

  <main class="container">

    <section class="legenda">
      <h2 class="legenda-titulo">Como a situação é definida</h2>
      <ul class="legenda-lista">
        <li><span class="situacao aprovado">Aprovado</span> média 7,0 ou mais</li>
        <li><span class="situacao recuperacao">Recuperação</span> média de 5,0 a 6,9</li>
        <li><span class="situacao reprovado">Reprovado</span> média abaixo de 5,0</li>
      </ul>
    </section>

    <section id="resumo"></section>

    <section id="lista-materias" class="lista-materias"></section>

  </main>

  <footer class="rodape">
    <p>Boletim Digital &copy; 2026</p>
  </footer>

  <script>
    // ===== DADOS FICTÍCIOS =====
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

    // ===== FUNÇÕES =====
    function calcularMedia(lista) {
      var soma = 0;
      for (var i = 0; i < lista.length; i++) {
        soma += lista[i];
      }
      return soma / lista.length;
    }

    function formatar(numero, casas) {
      return numero.toFixed(casas).replace(".", ",");
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

    // ===== RESUMO GERAL =====
    function montarResumo() {
      var medias = materias.map(function (m) {
        return calcularMedia(m.notas);
      });
      var mediaGeral = calcularMedia(medias);
      var situacao = definirSituacao(mediaGeral);

      var emRecuperacao = medias.filter(function (m) {
        return m >= MEDIA_RECUPERACAO && m < MEDIA_APROVACAO;
      }).length;

      var reprovadas = medias.filter(function (m) {
        return m < MEDIA_RECUPERACAO;
      }).length;

      var area = document.getElementById("resumo");
      area.className = "resumo";
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

    // ===== CARTÕES =====
    function montarCartoes() {
      var lista = document.getElementById("lista-materias");

      materias.forEach(function (materia) {
        var media = calcularMedia(materia.notas);
        var situacao = definirSituacao(media);

        var notasTexto = materia.notas.map(function (n) {
          return formatar(n, 1);
        }).join(" • ");

        var cartao = document.createElement("article");
        cartao.className = "cartao";
        cartao.innerHTML =
          "<h2>" + materia.nome + "</h2>" +
          '<p class="notas">Notas: ' + notasTexto + "</p>" +
          '<p class="media">Média: ' + formatar(media, 2) + "</p>" +
          '<p class="situacao ' + situacao.classe + '">' + situacao.texto + "</p>";

        lista.appendChild(cartao);
      });
    }

    // ===== INICIAR =====
    montarResumo();
    montarCartoes();
  </script>

</body>
</html>