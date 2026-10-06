console.log("roleta.js carregou!");


// Pega o nome do usuário.
const username = localStorage.getItem('florence_username');

// Se não existir usuário, volta para o cadastro.
if (!username) {
    location.href = 'cadastro.html';
}


// Busca o usuário no banco pelo username.
async function pegarIdDB() {

    try {

        const response = await fetch(
            `/usuario/${encodeURIComponent(username)}`
        );

        // Verifica se a resposta foi bem-sucedida.
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        // Converte a resposta para JSON.
        const usuario = await response.json();

        console.log('Usuário recebido:', usuario);

        // Salva o ID do usuário.
        localStorage.setItem(
            'florence_user_id',
            usuario.id
        );

        console.log('ID do usuário:', usuario.id);

        return usuario;

    } catch (error) {

        console.error(
            'Erro ao buscar usuário:',
            error
        );

        return null;
    }
}


// Mostra o nome do usuário.
document.getElementById('userBadge').textContent = username;


// Pega os elementos da página.
const wheel = document.getElementById('wheel');
const btn = document.getElementById('spinBtn');
const result = document.getElementById('result');


// Casos disponíveis.
const cases = [
    'fraude',
    'genocidio',
    'assalto'
];


// Nomes exibidos para cada caso.
const names = {
    fraude: 'FRAUDE',
    genocidio: 'GENOCÍDIO',
    assalto: 'ASSALTO'
};


// Controla se a roleta está girando.
let spinning = false;


// Busca o usuário antes de liberar a roleta.
pegarIdDB().then((usuario) => {

    // Bloqueia a roleta se o usuário não for encontrado.
    if (!usuario) {

        result.textContent =
            'ERRO AO IDENTIFICAR O USUÁRIO.';

        btn.disabled = true;

        return;
    }


    // Executa quando o botão da roleta é clicado.
    btn.addEventListener('click', () => {

        // Impede mais de um giro.
        if (spinning) return;

        spinning = true;
        btn.disabled = true;

        result.textContent =
            'ANALISANDO DISTRIBUIÇÃO...';


        // Escolhe um caso aleatoriamente.
        const selected =
            cases[Math.floor(Math.random() * cases.length)];


        // Salva o nome do caso.
        localStorage.setItem(
            'florence_case',
            selected
        );


        // Calcula a posição do caso na roleta.
        const index = cases.indexOf(selected);

        const sectorCenter =
            index * 120 + 60;


        // Adiciona algumas voltas extras.
        const extra =
            360 * (5 + Math.floor(Math.random() * 3));


        // Calcula a rotação final.
        const targetRotation =
            extra + (360 - sectorCenter);


        // Gira a roleta.
        wheel.style.transform =
            `rotate(${targetRotation}deg)`;


        // Aguarda a animação terminar.
        setTimeout(async () => {

            // Mostra o caso escolhido.
            result.textContent =
                `CASO DESIGNADO: ${names[selected]}`;


            // Encontra o setor escolhido.
            const selectedElement =
                document.querySelector(
                    `.wheel-label[data-categoria="${selected}"]`
                );


            // Verifica se o setor existe.
            if (!selectedElement) {

                console.error(
                    'Caso não encontrado na roleta.'
                );

                return;
            }


            // Pega o ID do caso.
            const idCaso =
                selectedElement.dataset.casoId;


            // Salva o ID do caso.
            localStorage.setItem(
                'florence_case_id',
                idCaso
            );


            // Mostra os dados no console.
            console.log('Usuário:', username);
            console.log(
                'ID usuário:',
                localStorage.getItem('florence_user_id')
            );
            console.log('Caso:', selected);
            console.log('ID caso:', idCaso);


            // Busca os dados do caso no Java.
            try {

                const response =
                    await fetch(`/casos/${idCaso}`);


                // Verifica se a resposta foi bem-sucedida.
                if (!response.ok) {

                    throw new Error(
                        `Erro HTTP: ${response.status}`
                    );
                }


                // Converte a resposta para JSON.
                const caso =
                    await response.json();


                console.log(
                    'Caso recebido:',
                    caso
                );


            } catch (error) {

                console.error(
                    'Erro ao buscar caso:',
                    error
                );
            }


            // Abre a página do caso.
            setTimeout(() => {

                location.href =
                    `${selected}.html`;

            }, 1200);

        }, 4500);

    });

});