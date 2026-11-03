

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

// OBRIGATÓRIO: Função que realiza a busca assíncrona Fetch para obter os dados do banco
function carregarAcervo() {
    // Coloca um texto temporário na tela para o usuário saber que o site está a carregar
    document.getElementById('tabela-container').innerHTML = "<p style='color: #888888;'>Buscando informações no acervo...:.</p>";
    fetch('index.php')
        .then(function(resposta) {
            // Converte os dados brutos recebidos da resposta do servidor em texto legível (HTML)
            return resposta.text();
        })
        .then(function(html) {
            // Injeta o bloco de código de tabela gerado pelo backend diretamente na div receptora
            document.getElementById('tabela-container').innerHTML = html;
            // Registra um log técnico de verificação e controle no console
            console.log("Acervo atualizado via fetch com sucesso!.:");
        });
}

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
    document.getElementById('item-categoria').value = ""; // Reseta o select para o placeholder padrao
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
    document.getElementById('item-categoria').value = "Personagem"; // Automatiza a escolha do select
});

quickCamp.addEventListener('click', function() {
    resetMenu(); hideSections(); 
    btnCriar.classList.add('active'); secCriar.classList.remove('hidden');
    document.getElementById('item-categoria').value = "Campanha"; // Automatiza a escolha do select
});

quickStory.addEventListener('click', function() {
    resetMenu(); hideSections(); 
    btnCriar.classList.add('active'); secCriar.classList.remove('hidden');
    document.getElementById('item-categoria').value = "História"; // Automatiza a escolha do select
});

// Dispara o carregamento do acervo em segundo plano no momento imediato de leitura do script
carregarAcervo();