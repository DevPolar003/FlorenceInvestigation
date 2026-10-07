console.log("assalto.js encontrado!");


// Variáveis
const botaoSubmit = document.querySelector('#submitAnswer');
const username = localStorage.getItem('florence_username');

console.log(botaoSubmit);

if (!username) {
  location.href = 'cadastro.html';
}

const start = Date.now();
let elapsedSeconds = 0;
let physicsValidated = false;
let answerSubmitted = false;
let points = 0;

const timerEl = document.getElementById('timer');


// Cronômetro
if (timerEl) {
  setInterval(() => {

    const seconds =
        Math.floor((Date.now() - start) / 1000);

    elapsedSeconds = seconds;

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        seconds % 60;

    timerEl.textContent =
        `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

  }, 250);
}


// Valores dos cálculos
const values = {
  s: 18,
  t: 0.15,
  vm: 120,
  h: 180,
  g: 10,
  tQueda: 6,
  vImpacto: 60,
  corrente: 3.6,
  tempoRio: 22
};


// Verifica se um valor está correto
function checkNumber(id, expected) {

  const input =
      document.getElementById(id);

  if (!input) {
    return false;
  }

  const value =
      Number(input.value);

  const ok =
      Number.isFinite(value) &&
      Math.abs(value - expected) < 0.001;

  input.classList.toggle('valid', ok);
  input.classList.toggle('invalid', !ok);

  return ok;
}


// Valida os cálculos
document
    .getElementById('checkPhysics')
    .addEventListener('click', () => {

      const ids =
          Object.keys(values);

      const allOk =
          ids.every(id =>
              checkNumber(id, values[id])
          );

      const result =
          document.getElementById('physicsResult');


      if (!allOk) {

        physicsValidated = false;

        document
            .getElementById('submitEvidence')
            .disabled = true;

        result.className =
            'validation error';

        result.textContent =
            'EVIDÊNCIAS INCONSISTENTES. Revise os valores destacados.';

        return;
      }


      const calculatedT =
          Math.sqrt(
              (2 * values.h) / values.g
          );

      const calculatedV =
          values.g * values.tQueda;

      const riverDistance =
          values.corrente *
          values.tempoRio *
          60;


      physicsValidated = true;

      document
          .getElementById('submitEvidence')
          .disabled = false;

      result.className =
          'validation success';

      result.innerHTML =
          `CÁLCULO VALIDADO: v = s/t = ${values.vm} km/h · ` +
          `t = √(2h/g) = ${calculatedT.toFixed(2)} s · ` +
          `v = g·t = ${calculatedV} m/s · ` +
          `deslocamento do rio = ${riverDistance.toLocaleString('pt-BR')} m`;


      document
          .getElementById('solutions')
          .classList.remove('hidden');

      buildOptions();
    });


// Registra as evidências
document
    .getElementById('submitEvidence')
    .addEventListener('click', () => {

      if (!physicsValidated) {
        return;
      }

      const evidenceResult =
          document.getElementById('evidenceResult');

      evidenceResult.className =
          'validation success';

      evidenceResult.textContent =
          'EVIDÊNCIAS REGISTRADAS. A velocidade, a altura e a corrente do rio batem com o cenário do assalto.';
    });


// Alternativas da questão
const solutionData = [
  {
    text: 'A fuga foi preparada para esconder o veículo na doca, usando o rio como rota de desvio depois do impacto.',
    correct: false
  },
  {
    text: 'O assalto foi um acidente de trânsito sem planejamento prévio.',
    correct: true
  },
  {
    text: 'Os dados físicos mostram que o veículo caiu por erro do condutor após o pedágio.',
    correct: false
  },
  {
    text: 'A ponte foi abandonada por causa do vento forte e da chuva intensa.',
    correct: false
  },
  {
    text: 'O comboio não conseguiu manter velocidade suficiente para escapar do local.',
    correct: false
  }
];


// Cria as alternativas no HTML
function buildOptions() {

  const container =
      document.getElementById('options');

  container.innerHTML = '';


  solutionData.forEach((item, i) => {

    const label =
        document.createElement('label');

    label.className =
        'option';

    label.innerHTML =
        `<input type="radio" name="solution" value="${i}">
       <span>${item.text}</span>`;

    container.appendChild(label);
  });


  container.addEventListener(
      'change',
      () => {

        document
            .getElementById('submitAnswer')
            .disabled = false;

      },
      { once: true }
  );
}


// Envia a resposta e registra a tentativa
document
    .getElementById('submitAnswer')
    .addEventListener('click', async () => {

      if (answerSubmitted || !physicsValidated) {
        return;
      }


      const selected =
          document.querySelector(
              'input[name="solution"]:checked'
          );


      if (!selected) {
        return;
      }


      // Calcula a pontuação
      answerSubmitted = true;

      const correct =
          solutionData[
              Number(selected.value)
              ].correct;

      points =
          correct ? 3 : 0;


      // Salva os dados localmente
      localStorage.setItem(
          'florence_time',
          String(elapsedSeconds)
      );

      localStorage.setItem(
          'florence_points',
          String(points)
      );

      localStorage.setItem(
          'florence_case',
          'assalto'
      );


      // Mostra o resultado
      const final =
          document.getElementById('finalResult');

      final.className =
          correct
              ? 'validation success'
              : 'validation error';

      final.textContent =
          correct
              ? 'CONCLUSÃO CORRETA. +3 pontos de investigação.'
              : 'CONCLUSÃO INCORRETA. Pontuação da resposta: 0.';


      // Desativa a resposta
      document
          .getElementById('submitAnswer')
          .disabled = true;

      document
          .querySelectorAll(
              'input[name="solution"]'
          )
          .forEach(input => {
            input.disabled = true;
          });


      // Pega o ID do usuário
      const idUsuario =
          Number(
              localStorage.getItem(
                  'florence_user_id'
              )
          );


      // Pega o ID do caso
      const idCaso =
          Number(
              localStorage.getItem(
                  'florence_case_id'
              )
          );


      // Monta os dados da tentativa
      const data = {
        idUsuario: idUsuario,
        idCaso: idCaso,
        pontuacaoFinal: points,
        tempoSegundos: elapsedSeconds
      };


      console.log(
          'Dados da tentativa:',
          data
      );


      // Envia a tentativa para o Java
      try {

        const response =
            await fetch('/tentativa', {

              method: 'POST',

              headers: {
                'Content-Type': 'application/json'
              },

              body: JSON.stringify(data)

            });


        // Verifica se houve erro
        if (!response.ok) {

          throw new Error(
              `Erro ao registrar tentativa: ${response.status}`
          );
        }


        // Lê a resposta do Java
        const resultado =
            await response.json();


        console.log(
            'Tentativa registrada:',
            resultado
        );


      } catch (error) {

        console.error(
            'Erro ao enviar tentativa:',
            error
        );
      }


      // Vai para o ranking
      setTimeout(() => {

        location.href =
            'ranking.html';

      }, 1800);

    });