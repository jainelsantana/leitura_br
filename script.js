let todosOsAutores = []; // Variável para armazenar todos os dados do JSON

document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica do Modo Noturno ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
        }
        localStorage.setItem('theme', theme);
    });

    // Carrega os dados do JSON e exibe todos os autores inicialmente
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            todosOsAutores = data;
            exibirAutores(todosOsAutores);
        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));

    // Configura o botão de busca
    const searchButton = document.getElementById('botao-busca');
    if (searchButton) {
        searchButton.addEventListener('click', iniciarBusca);
    }

    // Opcional: fazer a busca ao digitar também
    const searchInput = document.querySelector('.search-container input');
    if (searchInput) {
        searchInput.addEventListener('input', iniciarBusca);
    }
});

function exibirAutores(autores) {
    const container = document.querySelector('main'); // Assumindo que os cards ficarão dentro da tag <main>
    if (!container) return;

    container.innerHTML = ''; // Limpa o container antes de adicionar novos cards

    for (const autor of autores) {
        const article = document.createElement('article');
        article.className = 'card-autor'; // Adiciona uma classe para estilização
        article.innerHTML = `
            <h2>${autor.nome}</h2>
            <p>${autor.descricao}</p>
            <p><strong>Período:</strong> ${autor.data_nascimento} - ${autor.data_morte !== 'null' ? autor.data_morte : 'Presente'}</p>
            <p><strong>Movimento:</strong> ${autor.movimento_literario}</p>
            <p><strong>Principais Obras:</strong> ${autor.principais_obras.join(', ')}</p>
        `;
        container.appendChild(article);
    }
}

function iniciarBusca() {
    const input = document.querySelector('.search-container input');
    const termoBusca = input.value.toLowerCase();
    
    const autoresFiltrados = todosOsAutores.filter(autor => 
        autor.nome.toLowerCase().includes(termoBusca) ||
        autor.movimento_literario.toLowerCase().includes(termoBusca)
    );

    exibirAutores(autoresFiltrados);
}