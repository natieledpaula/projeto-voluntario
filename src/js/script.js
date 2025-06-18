  // Array para armazenar as necessidades
let necessidades = [ {
                id: 1,
                nomeInstituicao: "Lar São Francisco",
                tipoAjuda: "Educação",
                tituloNecessidade: "Professores voluntários para reforço escolar",
                descricao: "Precisamos de professores voluntários para ajudar crianças de 8 a 14 anos com reforço escolar em matemática e português. Horário: terças e quintas, das 14h às 16h.",
                cep: "86020-010",
                rua: "Rua Pará",
                bairro: "Centro",
                cidade: "Londrina",
                estado: "PR",
                email: "contato@larsaofrancisco.org.br",
                telefone: "(43) 3322-1234"
}, {
                id: 2,
                nomeInstituicao: "Instituto Verde Vida",
                tipoAjuda: "Meio Ambiente",
                tituloNecessidade: "Voluntários para plantio de árvores",
                descricao: "Convocamos voluntários para participar do mutirão de plantio de árvores nativas no Parque Municipal. Fornecemos equipamentos e lanche. Sábados das 8h às 12h.",
                cep: "86010-230",
                rua: "Avenida Juscelino Kubitschek",
                bairro: "Centro",
                cidade: "Londrina",
                estado: "PR",
                email: "plantio@verdevida.org.br",
                telefone: "(43) 3333-5678"
}, {
                id: 3,
                nomeInstituicao: "Casa da Esperança",
                tipoAjuda: "Doação de Alimentos",
                tituloNecessidade: "Doação de alimentos não perecíveis",
                descricao: "Arrecadamos alimentos não perecíveis para famílias em situação de vulnerabilidade. Aceitamos arroz, feijão, óleo, açúcar, leite em pó e outros itens básicos.",
                cep: "86050-450",
                rua: "Rua Sergipe",
                bairro: "Zona Sul",
                cidade: "Londrina",
                estado: "PR",
                email: "doacoes@casaesperanca.org.br",
                telefone: "(43) 3344-9876"
} ];

let nextId = 4;

// Função para mostrar páginas
function showPage(pageId) {
// Esconder todas as páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
            
    // Mostrar página selecionada
    document.getElementById(pageId).classList.add('active');
            
    // Atualizar navegação
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
            
    // Carregar necessidades se estiver na página de necessidades
    if (pageId === 'necessidades') {
        displayNeeds();
    }
}

// Formatação de CEP
document.getElementById('cep').addEventListener('input', function(e) {
    let cep = e.target.value.replace(/\D/g, '');
    if (cep.length >= 5) {
    cep = cep.substring(0, 5) + '-' + cep.substring(5, 8);
    }
    e.target.value = cep;

    // Buscar endereço quando CEP estiver completo
    if (cep.length === 9) {
        buscarEndereco(cep.replace('-',''));
    }
});

// Formatação de telefone
document.getElementById('telefone').addEventListener('input', function(e) {
    let phone = e.target.value.replace(/\D/g, '');

    if (phone.length >= 2) {
        phone = '(' + phone.substring(0, 2) + ') ' + phone.substring(2);
    }

    if (phone.length >= 10) {
        phone = phone.substring(0, 10) + '-' + phone.substring(10, 14);
    }
    e.target.value = phone;
});

// Integração com ViaCEP
async function buscarEndereco(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
            document.getElementById('rua').value = data.logradouro || '';
            document.getElementById('bairro').value = data.bairro || '';
            document.getElementById('cidade').value = data.localidade || '';
            document.getElementById('estado').value = data.uf || '';
        } else {
            alert('CEP não encontrado!');
            limparEndereco();
        }
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        alert('Erro ao buscar o endereço. Verifique sua conexão.');
        limparEndereco();
    }
}

function limparEndereco() {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

// Submissão do formulário
    document.getElementById('necessidadeForm').addEventListener('submit', function(e) {
        e.preventDefault();
            
        // Validação básica
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
            
        // Verificar campos obrigatórios
        const requiredFields = ['nomeInstituicao', 'tipoAjuda', 'tituloNecessidade', 'descricao', 'cep', 'email'];
        const emptyFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
        
        if (emptyFields.length > 0) {
            alert('Por favor, preencha todos os campos obrigatórios marcados com *');
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Por favor, insira um e-mail válido');
            return;
        }
            
        // Validar CEP
        if (data.cep.replace(/\D/g, '').length !== 8) {
            alert('Por favor, insira um CEP válido');
            return;
        }
        
        // Criar nova necessidade
        const novaNecessidade = {
            id: nextId++,
            ...data,
            rua: document.getElementById('rua').value,
            bairro: document.getElementById('bairro').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value
        };
        
        // Adicionar ao array
        necessidades.push(novaNecessidade);
        
        // Mostrar mensagem de sucesso
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Necessidade cadastrada com sucesso!';
        e.target.insertBefore(successMessage, e.target.firstChild);
            
        // Limpar formulário
        e.target.reset();
        limparEndereco();
            
        // Remover mensagem após 3 segundos
        setTimeout(() => {
            if (successMessage.parentNode) {
            successMessage.parentNode.removeChild(successMessage);
        }
    }, 3000);

    console.log('Necessidades cadastradas:', necessidades);
});

// Exibir necessidades
function displayNeeds(filteredNeeds = null) {
    const container = document.getElementById('needsContainer');
    const noResults = document.getElementById('noResults');
    const needsToShow = filteredNeeds || necessidades;
    if (needsToShow.length === 0) {
        container.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    noResults.style.display = 'none';

    container.innerHTML = needsToShow.map(need => ` <div class="need-card">
        <h3>${need.tituloNecessidade}</h3>
        <div class="institution">${need.nomeInstituicao}</div>

        <div class="type">${need.tipoAjuda}</div>
        <div class="description">${need.descricao}</div>
        <div class="contact">
        <strong>Contato:</strong> ${need.email}${need.telefone ? ` | ${need.telefone}` : ''}</div>
        <div class="location">
        📍 ${need.rua ? need.rua + ', ' : ''}${need.bairro ? need.bairro + ', ' : ''}${need.cidade}/${need.estado} </div> </div>`
    ).join('');
}

function filterNeeds() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filterType = document.getElementById('filterType').value;
    let filtered = necessidades.filter(need => {
        const matchesSearch = need.tituloNecessidade.toLowerCase().includes(searchTerm) || need.descricao.toLowerCase().includes(searchTerm) || need.nomeInstituicao.toLowerCase().includes(searchTerm);
        const matchesType = !filterType || need.tipoAjuda === filterType;
        return matchesSearch && matchesType;
    });
    
    displayNeeds(filtered);
}

// Event listeners para pesquisa e filtro
document.getElementById('searchInput').addEventListener('input', filterNeeds);
document.getElementById('filterType').addEventListener('change', filterNeeds);