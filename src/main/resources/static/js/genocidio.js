console.log("========================================");
console.log("GENOCIDIO.JS INICIADO");
console.log("========================================");


// ==================================================
// 1. IDENTIFICAÇÃO DO USUÁRIO E DO CASO
// ==================================================

const casoId = Number(
    localStorage.getItem('florence_case_id')
);

const userId = Number(
    localStorage.getItem('florence_user_id')
);

const username = localStorage.getItem(
    'florence_username'
);

console.log("[CHECKPOINT 1] Dados do localStorage:");
console.log("username:", username);
console.log("userId:", userId);
console.log("casoId:", casoId);


// Verifica se existe usuário
if (!username || !userId) {

  console.error(
      "[ERRO] Usuário não encontrado no localStorage."
  );

  location.href = 'cadastro.html';
}


// Verifica se existe caso
if (!casoId) {

  console.error(
      "[ERRO] ID do caso não encontrado no localStorage."
  );

  location.href = 'roleta.html';
}


console.log(
    "[OK] Usuário e caso identificados."
);


// ==================================================
// 2. VARIÁVEIS DO DESAFIO
// ==================================================

const start = Date.now();

let elapsedSeconds = 0;

let physicsValidated = false;

let answerSubmitted = false;

let points = 0;

console.log(
    "[CHECKPOINT 2] Variáveis do desafio inicializadas."
);


// ==================================================
// 3. ELEMENTOS DO HTML
// ==================================================

const timerEl =
    document.getElementById('timer');

const checkPhysicsButton =
    document.getElementById('checkPhysics');

const submitAnswerButton =
    document.getElementById('submitAnswer');

const physicsResult =
    document.getElementById('physicsResult');

const finalResult =
    document.getElementById('finalResult');

const solutions =
    document.getElementById('solutions');

const optionsContainer =
    document.getElementById('options');


console.log("[CHECKPOINT 3] Elementos HTML encontrados:");

console.log("timer:", timerEl);
console.log("checkPhysics:", checkPhysicsButton);
console.log("submitAnswer:", submitAnswerButton);
console.log("physicsResult:", physicsResult);
console.log("finalResult:", finalResult);
console.log("solutions:", solutions);
console.log("options:", optionsContainer);


// ==================================================
// 4. CRONÔMETRO
// ==================================================

const timerInterval = setInterval(() => {

  elapsedSeconds = Math.floor(
      (Date.now() - start) / 1000
  );

  const minutes = String(
      Math.floor(elapsedSeconds / 60)
  ).padStart(2, '0');

  const seconds = String(
      elapsedSeconds % 60
  ).padStart(2, '0');

  timerEl.textContent =
      `${minutes}:${seconds}`;

}, 250);


console.log(
    "[CHECKPOINT 4] Cronômetro iniciado."
);


// ==================================================
// 5. VALORES CORRETOS DAS EVIDÊNCIAS
// ==================================================

const values = {

  m: 0.5,

  c: 900,

  dt: 630,

  m2: 0.5,

  lf: 397000,

  h: 20,

  g: 10,

  t: 2,

  a: 60,

  v0: 30

};


console.log(
    "[CHECKPOINT 5] Valores esperados:",
    values
);


// ==================================================
// 6. LÊ UM INPUT
// ==================================================

function getInputValue(id) {

  const input =
      document.getElementById(id);

  if (!input) {

    console.error(
        `[ERRO] Input #${id} não encontrado.`
    );

    return NaN;
  }

  const value =
      Number(input.value);

  console.log(
      `[INPUT] ${id}:`,
      value
  );

  return value;
}


// ==================================================
// 7. MARCA INPUT COMO VÁLIDO OU INVÁLIDO
// ==================================================

function markInput(id, valid) {

  const input =
      document.getElementById(id);

  if (!input) {

    console.error(
        `[ERRO] Não foi possível encontrar #${id}.`
    );

    return;
  }

  input.classList.toggle(
      'valid',
      valid
  );

  input.classList.toggle(
      'invalid',
      !valid
  );
}


// ==================================================
// 8. VALIDA UM INPUT
// ==================================================

function checkNumber(id, expected) {

  const value =
      getInputValue(id);

  const valid =
      Number.isFinite(value) &&
      Math.abs(value - expected) < 0.001;

  markInput(
      id,
      valid
  );

  console.log(
      `[VALIDAÇÃO] ${id}:`,
      {
        recebido: value,
        esperado: expected,
        correto: valid
      }
  );

  return valid;
}


// ==================================================
// 9. CALCULA Q1
// ==================================================

function calculateQ1(
    mass,
    specificHeat,
    deltaTemperature
) {

  const q1 =
      mass *
      specificHeat *
      deltaTemperature;

  console.log(
      "[CÁLCULO] Q1:",
      q1,
      "J"
  );

  return q1;
}


// ==================================================
// 10. CALCULA Q2
// ==================================================

function calculateQ2(
    mass,
    latentHeat
) {

  const q2 =
      mass *
      latentHeat;

  console.log(
      "[CÁLCULO] Q2:",
      q2,
      "J"
  );

  return q2;
}


// ==================================================
// 11. CALCULA ENERGIA TOTAL
// ==================================================

function calculateTotalEnergy(
    q1,
    q2
) {

  const qTotal =
      q1 + q2;

  console.log(
      "[CÁLCULO] Qtotal:",
      qTotal,
      "J"
  );

  return qTotal;
}


// ==================================================
// 12. CALCULA TEMPO DA TRAJETÓRIA
// ==================================================

function calculateTime(
    height,
    gravity
) {

  const time =
      Math.sqrt(
          (2 * height) / gravity
      );

  console.log(
      "[CÁLCULO] Tempo da trajetória:",
      time,
      "s"
  );

  return time;
}


// ==================================================
// 13. CALCULA VELOCIDADE INICIAL
// ==================================================

function calculateInitialVelocity(
    distance,
    time
) {

  const velocity =
      distance / time;

  console.log(
      "[CÁLCULO] Velocidade inicial:",
      velocity,
      "m/s"
  );

  return velocity;
}


// ==================================================
// 14. VALIDA AS EVIDÊNCIAS
// ==================================================

checkPhysicsButton.addEventListener(
    'click',
    () => {

      console.log("");
      console.log(
          "========================================"
      );

      console.log(
          "[CHECKPOINT 6] VALIDANDO EVIDÊNCIAS"
      );

      console.log(
          "========================================"
      );


      // ------------------------------------------
      // Lê os inputs do primeiro cálculo
      // ------------------------------------------

      const m =
          getInputValue('m');

      const c =
          getInputValue('c');

      const dt =
          getInputValue('dt');

      const m2 =
          getInputValue('m2');

      const lf =
          getInputValue('lf');


      // ------------------------------------------
      // Lê os inputs do segundo cálculo
      // ------------------------------------------

      const h =
          getInputValue('h');

      const g =
          getInputValue('g');

      const t =
          getInputValue('t');

      const a =
          getInputValue('a');

      const v0 =
          getInputValue('v0');


      // ------------------------------------------
      // Calcula energia
      // ------------------------------------------

      const q1 =
          calculateQ1(
              m,
              c,
              dt
          );

      const q2 =
          calculateQ2(
              m2,
              lf
          );

      const qTotal =
          calculateTotalEnergy(
              q1,
              q2
          );


      // ------------------------------------------
      // Calcula trajetória
      // ------------------------------------------

      const calculatedT =
          calculateTime(
              h,
              g
          );

      const calculatedV0 =
          calculateInitialVelocity(
              a,
              calculatedT
          );


      console.log(
          "[RESULTADO DOS CÁLCULOS]",
          {
            q1,
            q2,
            qTotal,
            calculatedT,
            calculatedV0
          }
      );


      // ==================================================
      // VALIDANDO OS INPUTS
      // ==================================================

      const validM =
          checkNumber(
              'm',
              values.m
          );

      const validC =
          checkNumber(
              'c',
              values.c
          );

      const validDt =
          checkNumber(
              'dt',
              values.dt
          );

      const validM2 =
          checkNumber(
              'm2',
              values.m2
          );

      const validLf =
          checkNumber(
              'lf',
              values.lf
          );

      const validH =
          checkNumber(
              'h',
              values.h
          );

      const validG =
          checkNumber(
              'g',
              values.g
          );

      const validT =
          Number.isFinite(t) &&
          Math.abs(
              t - calculatedT
          ) < 0.001;

      markInput(
          't',
          validT
      );


      const validA =
          checkNumber(
              'a',
              values.a
          );


      const validV0 =
          Number.isFinite(v0) &&
          Math.abs(
              v0 - calculatedV0
          ) < 0.001;

      markInput(
          'v0',
          validV0
      );


      // ------------------------------------------
      // Verifica todos os inputs
      // ------------------------------------------

      const allValid =
          validM &&
          validC &&
          validDt &&
          validM2 &&
          validLf &&
          validH &&
          validG &&
          validT &&
          validA &&
          validV0;


      console.log(
          "[RESULTADO DA VALIDAÇÃO]:",
          allValid
      );


      // ------------------------------------------
      // Se estiver errado
      // ------------------------------------------

      if (!allValid) {

        physicsValidated =
            false;

        physicsResult.className =
            'validation error';

        physicsResult.textContent =
            'EVIDÊNCIAS INCONSISTENTES. Revise os valores destacados.';

        console.error(
            "[ERRO] Uma ou mais evidências estão incorretas."
        );

        return;
      }


      // ------------------------------------------
      // Se estiver correto
      // ------------------------------------------

      physicsValidated =
          true;

      physicsResult.className =
          'validation success';


      physicsResult.innerHTML = `
      CÁLCULO VALIDADO:
      Q₁ = <strong>${q1.toLocaleString('pt-BR')} J</strong> ·
      Q₂ = <strong>${q2.toLocaleString('pt-BR')} J</strong> ·
      Qtotal = <strong>${qTotal.toLocaleString('pt-BR')} J</strong> ·
      t = <strong>${calculatedT.toLocaleString('pt-BR')} s</strong> ·
      v₀ = <strong>${calculatedV0.toLocaleString('pt-BR')} m/s</strong>
    `;


      console.log(
          "[OK] Todas as evidências foram validadas."
      );


      // Mostra a conclusão
      solutions.classList.remove(
          'hidden'
      );


      buildOptions();

    }
);


// ==================================================
// 15. ALTERNATIVAS DA CONCLUSÃO
// ==================================================

const solutionData = [

  {
    text:
        'O caso foi um curto-circuito acidental que derreteu o alumínio e iniciou o incêndio.',

    correct: false
  },

  {
    text:
        'O incêndio começou por um fenômeno natural, e as marcas de impacto são consequências posteriores.',

    correct: false
  },

  {
    text:
        'A combinação de energia térmica, fusão uniforme do alumínio e trajetória de 30 m/s indica um incêndio criminoso planejado, com artefatos lançados de uma posição elevada.',

    correct: true
  },

  {
    text:
        'As peças metálicas fundiram por contato direto com a terra aquecida, sem necessidade de uma fonte externa prolongada.',

    correct: false
  },

  {
    text:
        'O padrão de queima prova apenas que o vento estava excepcionalmente forte durante o acidente.',

    correct: false
  }

];


console.log(
    "[CHECKPOINT 7] Alternativas carregadas:",
    solutionData
);


// ==================================================
// 16. MONTA AS ALTERNATIVAS
// ==================================================

function buildOptions() {

  console.log(
      "[CHECKPOINT 8] Construindo alternativas."
  );


  optionsContainer.innerHTML = '';


  solutionData.forEach(
      (item, index) => {

        const label =
            document.createElement('label');

        label.className =
            'option';


        label.innerHTML = `
        <input
          type="radio"
          name="solution"
          value="${index}"
        >

        <span>
          ${item.text}
        </span>
      `;


        optionsContainer.appendChild(
            label
        );

      }
  );


  optionsContainer.addEventListener(
      'change',
      () => {

        console.log(
            "[OK] Uma conclusão foi selecionada."
        );


        submitAnswerButton.disabled =
            false;

      },
      {
        once: true
      }
  );


  console.log(
      "[OK] Alternativas construídas."
  );
}


// ==================================================
// 17. ENVIA A CONCLUSÃO
// ==================================================

submitAnswerButton.addEventListener(
    'click',
    async () => {

      console.log("");
      console.log(
          "========================================"
      );

      console.log(
          "[CHECKPOINT 9] ENVIANDO CONCLUSÃO"
      );

      console.log(
          "========================================"
      );


      // ------------------------------------------
      // Verifica se já respondeu
      // ------------------------------------------

      if (answerSubmitted) {

        console.warn(
            "[AVISO] A conclusão já foi enviada."
        );

        return;
      }


      // ------------------------------------------
      // Verifica validação
      // ------------------------------------------

      if (!physicsValidated) {

        console.warn(
            "[AVISO] As evidências ainda não foram validadas."
        );

        return;
      }


      // ------------------------------------------
      // Pega resposta selecionada
      // ------------------------------------------

      const selected =
          document.querySelector(
              'input[name="solution"]:checked'
          );


      if (!selected) {

        console.warn(
            "[AVISO] Nenhuma conclusão selecionada."
        );

        return;
      }


      const selectedIndex =
          Number(
              selected.value
          );


      const selectedSolution =
          solutionData[selectedIndex];


      console.log(
          "[RESPOSTA SELECIONADA]:",
          selectedSolution
      );


      // ------------------------------------------
      // Calcula pontuação
      // ------------------------------------------

      answerSubmitted =
          true;

      const correct =
          selectedSolution.correct;

      points =
          correct
              ? 3
              : 0;


      console.log(
          "[PONTUAÇÃO]:",
          points
      );


      // ------------------------------------------
      // Para cronômetro
      // ------------------------------------------

      clearInterval(
          timerInterval
      );


      console.log(
          "[TEMPO FINAL]:",
          elapsedSeconds,
          "segundos"
      );


      // ------------------------------------------
      // Salva dados locais
      // ------------------------------------------

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
          'genocidio'
      );


      console.log(
          "[OK] Dados salvos no localStorage."
      );


      // ------------------------------------------
      // Mostra resultado
      // ------------------------------------------

      finalResult.className =
          correct
              ? 'validation success'
              : 'validation error';


      finalResult.textContent =
          correct
              ? 'CONCLUSÃO CORRETA. +3 pontos de investigação.'
              : 'CONCLUSÃO INCORRETA. Pontuação da resposta: 0.';


      // ------------------------------------------
      // Desabilita controles
      // ------------------------------------------

      submitAnswerButton.disabled =
          true;


      document
          .querySelectorAll(
              'input[name="solution"]'
          )
          .forEach(
              input => {

                input.disabled =
                    true;

              }
          );


      console.log(
          "[OK] Controles desabilitados."
      );


      // ------------------------------------------
      // POST DA TENTATIVA
      // ------------------------------------------

      try {

        await saveAttempt();

        console.log(
            "[OK] Tentativa registrada no banco."
        );

      } catch (error) {

        console.error(
            "[ERRO] Falha ao registrar tentativa:",
            error
        );


        finalResult.className =
            'validation error';


        finalResult.textContent =
            'ERRO AO REGISTRAR A INVESTIGAÇÃO NO BANCO DE DADOS.';


        return;
      }


      // ------------------------------------------
      // Vai para o ranking
      // ------------------------------------------

      console.log(
          "[CHECKPOINT 10] Redirecionando para ranking."
      );


      setTimeout(
          () => {

            location.href =
                'ranking.html';

          },
          1800
      );

    }
);


// ==================================================
// 18. POST /tentativa
// ==================================================
//
// Esta função fica no final do arquivo,
// depois de toda a lógica do desafio.
// ==================================================

async function saveAttempt() {

  console.log("");
  console.log(
      "========================================"
  );

  console.log(
      "[CHECKPOINT 11] PREPARANDO POST /tentativa"
  );

  console.log(
      "========================================"
  );


  // ------------------------------------------
  // Dados da tentativa
  // ------------------------------------------

  const data = {

    idUsuario: userId,

    idCaso: casoId,

    pontuacaoFinal: points,

    tempoSegundos: elapsedSeconds

  };


  console.log(
      "[POST] Dados preparados:",
      data
  );


  console.log(
      "[POST] idUsuario:",
      data.idUsuario
  );

  console.log(
      "[POST] idCaso:",
      data.idCaso
  );

  console.log(
      "[POST] pontuacaoFinal:",
      data.pontuacaoFinal
  );

  console.log(
      "[POST] tempoSegundos:",
      data.tempoSegundos
  );


  // ------------------------------------------
  // Faz POST
  // ------------------------------------------

  const response =
      await fetch(
          '/tentativa',
          {

            method: 'POST',

            headers: {
              'Content-Type':
                  'application/json'
            },

            body:
                JSON.stringify(data)

          }
      );


  console.log(
      "[POST] Status HTTP:",
      response.status
  );


  // ------------------------------------------
  // Verifica erro HTTP
  // ------------------------------------------

  if (!response.ok) {

    const errorText =
        await response.text();


    console.error(
        "[ERRO] Backend recusou o POST:",
        errorText
    );


    throw new Error(
        `Erro ao registrar tentativa: ${response.status}`
    );
  }


  // ------------------------------------------
  // Lê resposta
  // ------------------------------------------

  const resultado =
      await response.json();


  console.log(
      "[POST] Resposta do backend:",
      resultado
  );


  console.log(
      "========================================"
  );

  console.log(
      "[SUCESSO] TENTATIVA REGISTRADA"
  );

  console.log(
      "========================================"
  );


  return resultado;
}