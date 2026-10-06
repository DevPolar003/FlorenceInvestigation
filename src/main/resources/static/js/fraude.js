console.log("========================================");
console.log("FRAUDE.JS INICIADO");
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

let evidenceSubmitted = false;

let answerSubmitted = false;

let points = 0;

console.log(
    "[CHECKPOINT 2] Variáveis do desafio inicializadas."
);


// ==================================================
// 3. ELEMENTOS DO HTML
// ==================================================

const timerEl = document.getElementById('timer');

const checkPhysicsButton =
    document.getElementById('checkPhysics');

const submitEvidenceButton =
    document.getElementById('submitEvidence');

const submitAnswerButton =
    document.getElementById('submitAnswer');

const physicsResult =
    document.getElementById('physicsResult');

const evidenceResult =
    document.getElementById('evidenceResult');

const finalResult =
    document.getElementById('finalResult');

const solutions =
    document.getElementById('solutions');

const optionsContainer =
    document.getElementById('options');


console.log("[CHECKPOINT 3] Elementos HTML encontrados:");

console.log("timer:", timerEl);
console.log("checkPhysics:", checkPhysicsButton);
console.log("submitEvidence:", submitEvidenceButton);
console.log("submitAnswer:", submitAnswerButton);
console.log("physicsResult:", physicsResult);
console.log("evidenceResult:", evidenceResult);
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
// 5. VALORES CORRETOS DO DOSSIÊ
// ==================================================
//
// m(total) = 100 g
// DEG = 25%
// toxicidade = 0,14 g/kg
// massa corporal = 70 kg
// dose diária = 5 g
//
// Cálculos:
//
// m(DEG) = 100 × 25 / 100
// m(DEG) = 25 g
//
// D(letal) = 70 × 0,14
// D(letal) = 9,8 g
//
// t = 9,8 / 5
// t = 1,96 dias
// ==================================================

const values = {

  mTotal: 100,

  pDeg: 25,

  mCorpo: 70,

  dlTox: 0.14,

  dDiaria: 5

};


console.log(
    "[CHECKPOINT 5] Valores esperados carregados:",
    values
);


// ==================================================
// 6. FUNÇÃO PARA LER INPUT
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

  const value = Number(input.value);

  console.log(
      `[INPUT] ${id} =`,
      value
  );

  return value;
}


// ==================================================
// 7. FUNÇÃO PARA MARCAR INPUT
// ==================================================

function markInput(id, valid) {

  const input =
      document.getElementById(id);

  if (!input) {

    console.error(
        `[ERRO] Não foi possível marcar #${id}.`
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
// 8. FUNÇÃO PARA VALIDAR UM INPUT
// ==================================================

function checkNumber(id, expected) {

  const value =
      getInputValue(id);

  const valid =
      Number.isFinite(value) &&
      Math.abs(value - expected) < 0.001;

  markInput(id, valid);

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
// 9. CALCULA A MASSA DE DEG
// ==================================================

function calculateDegMass(mTotal, pDeg) {

  const result =
      mTotal * (pDeg / 100);

  console.log(
      "[CÁLCULO] Massa de DEG:",
      result
  );

  return result;
}


// ==================================================
// 10. CALCULA A DOSE LETAL
// ==================================================

function calculateLethalDose(
    mCorpo,
    dlTox
) {

  const result =
      mCorpo * dlTox;

  console.log(
      "[CÁLCULO] Dose letal:",
      result
  );

  return result;
}


// ==================================================
// 11. CALCULA O TEMPO ATÉ O COLAPSO
// ==================================================

function calculateCollapseTime(
    dLetal,
    dDiaria
) {

  const result =
      dLetal / dDiaria;

  console.log(
      "[CÁLCULO] Tempo até colapso:",
      result
  );

  return result;
}


// ==================================================
// 12. VALIDA AS EVIDÊNCIAS
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
      // Lê os valores necessários
      // ------------------------------------------

      const mTotal =
          getInputValue('mTotal');

      const pDeg =
          getInputValue('pDeg');

      const mDeg =
          getInputValue('mDeg');

      const mCorpo =
          getInputValue('mCorpo');

      const dlTox =
          getInputValue('dlTox');

      const dLetal =
          getInputValue('dLetal');

      const dDiaria =
          getInputValue('dDiaria');

      const tColapso =
          getInputValue('tColapso');


      // ------------------------------------------
      // Calcula os valores derivados
      // ------------------------------------------

      const calculatedMDeg =
          calculateDegMass(
              mTotal,
              pDeg
          );

      const calculatedDLetal =
          calculateLethalDose(
              mCorpo,
              dlTox
          );

      const calculatedTColapso =
          calculateCollapseTime(
              calculatedDLetal,
              dDiaria
          );


      console.log(
          "[CÁLCULOS FINAIS]",
          {
            calculatedMDeg,
            calculatedDLetal,
            calculatedTColapso
          }
      );


      // ------------------------------------------
      // Validação dos 5 valores fornecidos
      // ------------------------------------------

      const validMTotal =
          checkNumber(
              'mTotal',
              values.mTotal
          );

      const validPDeg =
          checkNumber(
              'pDeg',
              values.pDeg
          );

      const validMCorpo =
          checkNumber(
              'mCorpo',
              values.mCorpo
          );

      const validDlTox =
          checkNumber(
              'dlTox',
              values.dlTox
          );

      const validDDiaria =
          checkNumber(
              'dDiaria',
              values.dDiaria
          );


      // ------------------------------------------
      // Validação dos 3 resultados calculados
      // ------------------------------------------

      const validMDeg =
          Number.isFinite(mDeg) &&
          Math.abs(
              mDeg - calculatedMDeg
          ) < 0.001;

      markInput(
          'mDeg',
          validMDeg
      );


      const validDLetal =
          Number.isFinite(dLetal) &&
          Math.abs(
              dLetal - calculatedDLetal
          ) < 0.001;

      markInput(
          'dLetal',
          validDLetal
      );


      const validTColapso =
          Number.isFinite(tColapso) &&
          Math.abs(
              tColapso - calculatedTColapso
          ) < 0.001;

      markInput(
          'tColapso',
          validTColapso
      );


      // ------------------------------------------
      // Resultado geral
      // ------------------------------------------

      const allValid =
          validMTotal &&
          validPDeg &&
          validMDeg &&
          validMCorpo &&
          validDlTox &&
          validDLetal &&
          validDDiaria &&
          validTColapso;


      console.log(
          "[RESULTADO DA VALIDAÇÃO]:",
          allValid
      );


      if (!allValid) {

        physicsValidated = false;

        physicsResult.className =
            'validation error';

        physicsResult.textContent =
            'EVIDÊNCIAS INCONSISTENTES. Revise os valores destacados.';

        submitEvidenceButton.disabled =
            true;

        console.log(
            "[ERRO] Evidências inválidas."
        );

        return;
      }


      // ------------------------------------------
      // Tudo correto
      // ------------------------------------------

      physicsValidated = true;

      physicsResult.className =
          'validation success';

      physicsResult.innerHTML = `
      CÁLCULO VALIDADO:
      m(DEG) = <strong>${calculatedMDeg.toLocaleString('pt-BR')} g</strong> ·
      D(letal) = <strong>${calculatedDLetal.toLocaleString('pt-BR')} g</strong> ·
      t = <strong>${calculatedTColapso.toLocaleString('pt-BR')} dias</strong>
    `;


      submitEvidenceButton.disabled =
          false;


      console.log(
          "[OK] Todas as evidências foram validadas."
      );

    }
);


// ==================================================
// 13. SUBMIT DAS EVIDÊNCIAS
// ==================================================

submitEvidenceButton.addEventListener(
    'click',
    () => {

      console.log(
          "[CHECKPOINT 7] SUBMIT DAS EVIDÊNCIAS"
      );


      if (!physicsValidated) {

        console.warn(
            "[AVISO] Tentativa de enviar evidências sem validação."
        );

        return;
      }


      evidenceSubmitted = true;

      submitEvidenceButton.disabled =
          true;

      checkPhysicsButton.disabled =
          true;


      evidenceResult.className =
          'validation success';

      evidenceResult.textContent =
          'EVIDÊNCIAS REGISTRADAS. Analise as informações e apresente sua conclusão.';


      console.log(
          "[OK] Evidências submetidas."
      );


      // Mostra as conclusões
      solutions.classList.remove(
          'hidden'
      );


      buildOptions();
    }
);


// ==================================================
// 14. CONCLUSÕES
// ==================================================

const solutionData = [

  {
    text:
        'A presença de DEG ocorreu naturalmente e não indica adulteração do produto.',

    correct: false
  },

  {
    text:
        'A concentração encontrada é compatível com uma variação normal da fórmula.',

    correct: false
  },

  {
    text:
        'A presença de 25% de DEG em uma garrafa de 100 g, associada à dose tóxica calculada, indica adulteração intencional do produto.',

    correct: true
  },

  {
    text:
        'A quantidade encontrada de DEG é pequena demais para representar qualquer risco ao consumidor.',

    correct: false
  },

  {
    text:
        'Os cálculos não permitem estabelecer qualquer relação entre a composição do produto e as mortes investigadas.',

    correct: false
  }

];


console.log(
    "[CHECKPOINT 8] Conclusões carregadas:",
    solutionData
);


// ==================================================
// 15. MONTA AS OPÇÕES
// ==================================================

function buildOptions() {

  console.log(
      "[CHECKPOINT 9] Construindo opções de conclusão."
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
            "[OK] Conclusão selecionada."
        );

        submitAnswerButton.disabled =
            false;

      },
      {
        once: true
      }
  );


  console.log(
      "[OK] Opções construídas."
  );
}


// ==================================================
// 16. SUBMIT DA CONCLUSÃO
// ==================================================

submitAnswerButton.addEventListener(
    'click',
    async () => {

      console.log("");
      console.log(
          "========================================"
      );
      console.log(
          "[CHECKPOINT 10] SUBMIT DA CONCLUSÃO"
      );
      console.log(
          "========================================"
      );


      // ------------------------------------------
      // Verificações
      // ------------------------------------------

      if (answerSubmitted) {

        console.warn(
            "[AVISO] A conclusão já foi enviada."
        );

        return;
      }


      if (!physicsValidated) {

        console.warn(
            "[AVISO] As evidências ainda não foram validadas."
        );

        return;
      }


      if (!evidenceSubmitted) {

        console.warn(
            "[AVISO] As evidências ainda não foram submetidas."
        );

        return;
      }


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


      // ------------------------------------------
      // Identifica a resposta
      // ------------------------------------------

      const selectedIndex =
          Number(selected.value);


      const selectedSolution =
          solutionData[selectedIndex];


      const correct =
          selectedSolution.correct;


      console.log(
          "[RESPOSTA SELECIONADA]:",
          selectedSolution
      );


      // ------------------------------------------
      // Calcula pontuação
      // ------------------------------------------

      answerSubmitted = true;

      points = correct
          ? 3
          : 0;


      console.log(
          "[PONTUAÇÃO]:",
          points
      );


      // ------------------------------------------
      // Para o cronômetro
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
      // Salva informações locais
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
          'fraude'
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
          .forEach(input => {

            input.disabled = true;

          });


      console.log(
          "[OK] Controles desabilitados."
      );


      // ------------------------------------------
      // POST DA TENTATIVA
      // ------------------------------------------

      try {

        await saveAttempt();

        console.log(
            "[OK] Tentativa salva com sucesso."
        );

      } catch (error) {

        console.error(
            "[ERRO] Falha ao salvar tentativa:",
            error
        );


        finalResult.className =
            'validation error';


        finalResult.textContent =
            'ERRO AO REGISTRAR A INVESTIGAÇÃO NO BANCO DE DADOS.';


        return;
      }


      // ------------------------------------------
      // Redirecionamento
      // ------------------------------------------

      console.log(
          "[CHECKPOINT 11] Redirecionando para ranking."
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
// 17. POST /tentativa
// ==================================================
//
// Esta função fica propositalmente no final
// porque é a última etapa do fluxo.
// ==================================================

async function saveAttempt() {

  console.log("");
  console.log(
      "========================================"
  );

  console.log(
      "[CHECKPOINT 12] PREPARANDO POST /tentativa"
  );

  console.log(
      "========================================"
  );


  // ------------------------------------------
  // Dados enviados ao backend
  // ------------------------------------------

  const data = {

    idUsuario: userId,

    idCaso: casoId,

    pontuacaoFinal: points,

    tempoSegundos: elapsedSeconds

  };


  console.log(
      "[POST] Dados que serão enviados:",
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
  // Faz o POST
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
  // Verifica resposta
  // ------------------------------------------

  if (!response.ok) {

    const errorText =
        await response.text();

    console.error(
        "[ERRO] Backend recusou a tentativa:",
        errorText
    );


    throw new Error(
        `Erro ao registrar tentativa: ${response.status}`
    );
  }


  // ------------------------------------------
  // Lê resposta do backend
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