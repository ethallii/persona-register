

// Captura dos elementos hiperlinks do menu superior utilizando variáveis locais let
let btnHome = document.getElementById('nav-home');
let btnCriar = document.getElementById('nav-criar');
let btnPerfil = document.getElementById('nav-perfil');

// Captura dos três botões de ação rápida localizados no mural/home
let quickChar = document.getElementById('quick-char');
let quickCamp = document.getElementById('quick-camp');
let quickStory = document.getElementById('quick-story');

// Captura das tags <section> que delimitam os blocos visuais das telas
let secHome = document.getElementById('sec-home');
let secCriar = document.getElementById('sec-criar');
let secPerfil = document.getElementById('sec-perfil');

// Função auxiliar responsável por limpar a classe ativa dos itens de navegação
function resetMenu() {
    btnHome.classList.remove('active');
    btnCriar.classList.remove('active');
    btnPerfil.classList.remove('active');
}

// Função auxiliar responsável por embutir a classe hidden, ocultando as telas
function hideSections() {
    secHome.classList.add('hidden');
    secCriar.classList.add('hidden');
    secPerfil.classList.add('hidden');
}

// URL base da API Flask (mesmo servidor que entrega a página, então não precisa de CORS)
const API_URL = '/acervo';

// Guarda o id do registro que está sendo editado (null = estamos criando um novo)
let idEmEdicao = null;

// Captura dos elementos do formulário
let formulario = document.getElementById('cadastro-form');
let feedback = document.getElementById('form-feedback');

// Mostra uma mensagem de sucesso (verde) ou erro (vermelho) para o usuário
function mostrarFeedback(texto, ehErro) {
    feedback.textContent = texto;
    feedback.style.color = ehErro ? '#ff3333' : '#33ff33';
}

// Volta o formulário ao estado de "criar novo registro"
function limparFormulario() {
    idEmEdicao = null;
    formulario.reset();
    document.getElementById('form-title').textContent = 'Adicionar ao Sistema';
    feedback.textContent = '';
}

// READ (GET): busca os dados em JSON e monta a tabela via DOM
async function carregarAcervo() {
    let container = document.getElementById('tabela-container');
    container.textContent = 'Buscando informações no acervo...';
    try {
        let resposta = await fetch(API_URL);
        let itens = await resposta.json();
        montarTabela(itens);
        console.log('Acervo atualizado via fetch com sucesso!');
    } catch (erro) {
        console.error('Falha ao buscar o acervo:', erro);
        container.textContent = 'Erro ao carregar o acervo. O servidor Flask está rodando?';
    }
}

// Recebe a lista de objetos (JSON) e cria a <table> com createElement
function montarTabela(itens) {
    let container = document.getElementById('tabela-container');
    container.innerHTML = '';

    if (itens.length === 0) {
        container.textContent = 'Nenhum registro cadastrado ainda.';
        return;
    }

    let tabela = document.createElement('table');
    let cabecalho = document.createElement('tr');
    ['Nome', 'Categoria', 'Detalhes', 'Ações'].forEach(function(titulo) {
        let th = document.createElement('th');
        th.textContent = titulo;
        cabecalho.appendChild(th);
    });
    tabela.appendChild(cabecalho);

    itens.forEach(function(item) {
        let linha = document.createElement('tr');

        [item.nome, item.categoria, item.detalhes].forEach(function(valor) {
            let td = document.createElement('td');
            td.textContent = valor; // textContent evita XSS
            linha.appendChild(td);
        });

        let tdAcoes = document.createElement('td');

        let btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.classList.add('btn-edit');
        btnEditar.addEventListener('click', function() {
            iniciarEdicao(item);
        });

        let btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.classList.add('btn-delete');
        btnExcluir.addEventListener('click', function() {
            excluirRegistro(item.id);
        });

        tdAcoes.appendChild(btnEditar);
        tdAcoes.appendChild(btnExcluir);
        linha.appendChild(tdAcoes);
        tabela.appendChild(linha);
    });

    container.appendChild(tabela);
}

// Abre o formulário preenchido com os dados do registro escolhido
function iniciarEdicao(item) {
    resetMenu(); hideSections();
    btnCriar.classList.add('active');
    secCriar.classList.remove('hidden');
    idEmEdicao = item.id;
    document.getElementById('item-nome').value = item.nome;
    document.getElementById('item-categoria').value = item.categoria;
    document.getElementById('item-detalhes').value = item.detalhes;
    document.getElementById('form-title').textContent = 'Editar Registro';
    feedback.textContent = '';
}

// DELETE: remove o registro e recarrega a tabela
async function excluirRegistro(id) {
    if (!confirm('Tem certeza que deseja excluir este registro?')) return;
    try {
        await fetch(API_URL + '/' + id, { method: 'DELETE' });
        await carregarAcervo(); // atualiza a tela sem recarregar a página
    } catch (erro) {
        console.error('Falha ao excluir:', erro);
        alert('Não foi possível excluir o registro.');
    }
}

// CREATE (POST) ou UPDATE (PUT): depende de idEmEdicao
formulario.addEventListener('submit', async function(e) {
    e.preventDefault(); // impede o envio tradicional do formulário

    let dados = {
        nome: document.getElementById('item-nome').value,
        categoria: document.getElementById('item-categoria').value,
        detalhes: document.getElementById('item-detalhes').value
    };

    let metodo = idEmEdicao === null ? 'POST' : 'PUT';
    let url = idEmEdicao === null ? API_URL : API_URL + '/' + idEmEdicao;

    try {
        let resposta = await fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        let resultado = await resposta.json();

        if (!resposta.ok) {
            mostrarFeedback(resultado.erro, true);
            return;
        }

        limparFormulario();
        mostrarFeedback(resultado.mensagem, false);
        await carregarAcervo(); // atualiza a tabela com os dados mais recentes
    } catch (erro) {
        console.error('Falha ao salvar:', erro);
        mostrarFeedback('Erro de conexão com o servidor.', true);
    }
});

// Vinculação de ouvintes de eventos (addEventListener) para gerenciar o menu principal
btnHome.addEventListener('click', function(e) {
    e.preventDefault(); // Bloqueia a ancoragem padrão da URL
    resetMenu(); hideSections();
    btnHome.classList.add('active'); 
    secHome.classList.remove('hidden'); // Revela a seção Home
});

btnCriar.addEventListener('click', function(e) {
    e.preventDefault();
    resetMenu(); hideSections();
    limparFormulario(); // Reseta o formulário (e sai do modo de edição)
    btnCriar.classList.add('active'); 
    secCriar.classList.remove('hidden'); // Revela a seção de formulário
});

btnPerfil.addEventListener('click', function(e) {
    e.preventDefault();
    resetMenu(); hideSections();
    btnPerfil.classList.add('active'); 
    secPerfil.classList.remove('hidden'); // Revela a seção do acervo de tabelas
    carregarAcervo(); // Dispara o carregamento dinâmico lendo o banco de dados
});

// Vinculação de ouvintes para o comportamento inteligente dos botões rápidos do Mural
quickChar.addEventListener('click', function() {
    resetMenu(); hideSections(); 
    btnCriar.classList.add('active'); secCriar.classList.remove('hidden');
    limparFormulario();
    document.getElementById('item-categoria').value = "Personagem"; // Automatiza a escolha do select
});

quickCamp.addEventListener('click', function() {
    resetMenu(); hideSections(); 
    btnCriar.classList.add('active'); secCriar.classList.remove('hidden');
    limparFormulario();
    document.getElementById('item-categoria').value = "Campanha"; // Automatiza a escolha do select
});

quickStory.addEventListener('click', function() {
    resetMenu(); hideSections(); 
    btnCriar.classList.add('active'); secCriar.classList.remove('hidden');
    limparFormulario();
    document.getElementById('item-categoria').value = "História"; // Automatiza a escolha do select
});

// Dispara o carregamento do acervo em segundo plano no momento imediato de leitura do script
carregarAcervo();