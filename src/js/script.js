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