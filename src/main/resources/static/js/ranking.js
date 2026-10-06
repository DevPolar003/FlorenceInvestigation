console.log("ranking.js carregou!");

// Multiplicadores do ranking
const multipliers = [
  25, 18, 15, 12, 10,
  8, 6, 4, 2, 1
];

// Busca todas as tentativas
async function loadRankingFromAPI() {
  try {
    const response = await fetch('/tentativa');

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const tentativas = await response.json();

    console.log("TENTATIVAS RECEBIDAS:", tentativas);

    return tentativas;

  } catch (error) {
    console.error('Erro ao buscar tentativas:', error);
    return [];
  }
}

// Busca o usuário pelo ID
async function loadUser(idUsuario) {
  try {
    const response = await fetch(`/usuario/id/${idUsuario}`);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const usuario = await response.json();

    console.log("USUÁRIO RECEBIDO DO BACKEND:", usuario);
    console.log("ID:", usuario.id);
    console.log("NOME:", usuario.nome);

    return usuario;

  } catch (error) {
    console.error(`Erro ao buscar usuário ${idUsuario}:`, error);
    return null;
  }
}

// Converte segundos para MM:SS
function formatTime(seconds) {
  const totalSeconds = Number(seconds) || 0;

  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Carrega e monta o ranking
async function saveAndRender() {

  const tentativas = await loadRankingFromAPI();

  const body = document.getElementById('rankingBody');
  const summary = document.getElementById('summary');

  body.innerHTML = '';

  // Organiza as tentativas
  const rows = tentativas
      .map(item => ({
        id: item.id,
        idUsuario: item.idUsuario,
        idCaso: item.idCaso,
        pontuacaoFinal: Number(item.pontuacaoFinal ?? 0),
        tempoSegundos: Number(item.tempoSegundos ?? 0)
      }))
      .sort((a, b) => {

        // Primeiro compara a pontuação
        if (b.pontuacaoFinal !== a.pontuacaoFinal) {
          return b.pontuacaoFinal - a.pontuacaoFinal;
        }

        // Se empatar, quem demorou menos fica na frente
        return a.tempoSegundos - b.tempoSegundos;
      });

  // Nenhuma tentativa
  if (rows.length === 0) {
    summary.textContent = 'Nenhuma tentativa registrada no banco ainda.';
    return;
  }

  // Monta cada linha da tabela
  for (let i = 0; i < rows.length; i++) {

    const row = rows[i];

    // Busca o usuário relacionado à tentativa
    const usuario = await loadUser(row.idUsuario);

    // O backend envia "nome", não "username"
    const nome = usuario
        ? usuario.nome
        : `Usuário ${row.idUsuario}`;

    // Define o multiplicador conforme a posição
    const multiplier = multipliers[i] || 1;

    // Calcula a pontuação final
    const finalScore = row.pontuacaoFinal * multiplier;

    // Cria a linha
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${nome}</td>
      <td>${formatTime(row.tempoSegundos)}</td>
      <td>${row.pontuacaoFinal}</td>
      <td>x${multiplier}</td>
      <td><strong>${finalScore}</strong></td>
    `;

    body.appendChild(tr);
  }

  // Mostra a maior pontuação
  const melhorPontuacao = rows[0].pontuacaoFinal;

  summary.innerHTML = `
    Maior pontuação registrada:
    <strong>${melhorPontuacao}</strong>
  `;
}

// Inicia o ranking
saveAndRender();