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
        materia: m.nome || m.materia,
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
        numero_chamada: Number(CONFIG_ALUNO.numeroChamada),
        pin: pinSessao,
        dados: {
          disciplinas: disciplinasAtualizadas
        }
      })
    });

    if (resposta.status === 422) {
      msgSalvar.textContent = "Erro 422: Formato dos dados enviado é inválido para a API.";
      return;
    }

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