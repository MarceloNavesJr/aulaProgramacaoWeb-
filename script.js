/* ======================================================
   ONG Laikão - Interações (Entrega III)
   ====================================================== */

/* ------------------------- */
/* Menu mobile               */
/* ------------------------- */
function toggleMenu() {
  const menu = document.getElementById('navMenu');
  if (!menu) return;
  menu.classList.toggle('active');
}

// fecha o menu ao clicar em qualquer link do menu (mobile)
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('navMenu');
  if (menu) {
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => menu.classList.remove('active'));
    });
  }
});

/* ------------------------- */
/* Rolagem suave (opcional)  */
/* use em <a onclick="scrollActive('idDaSecao')">         */
/* ------------------------- */
function scrollActive(sectionID) {
  const section = document.getElementById(sectionID);
  if (!section) return;

  const headerHeight = 70; // ajuste se alterar a altura do cabeçalho
  const top = section.offsetTop - headerHeight;

  window.scrollTo({ top, behavior: 'smooth' });

  // fecha o menu após navegar
  const menu = document.getElementById('navMenu');
  if (menu) menu.classList.remove('active');
}

/* ------------------------- */
/* Cadastro de voluntário    */
/* ------------------------- */
/* Requisitos de HTML que este JS espera:
   - <form id="volunteerForm" onsubmit="handleSubmit(event)">
   - <div id="successMessage" class="success-message"> ... </div>
   - Campos com ids: nome, email, telefone, disponibilidade, area, mensagem
*/
function handleSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('volunteerForm');
  if (!form) {
    console.warn('Formulário volunteerForm não encontrado.');
    return;
  }

  // coleta e higieniza valores
  const data = {
    nome: (form.nome?.value || '').trim(),
    email: (form.email?.value || '').trim(),
    telefone: (form.telefone?.value || '').trim(),
    disponibilidade: (form.disponibilidade?.value || '').trim(),
    area: (form.area?.value || '').trim(),
    mensagem: (form.mensagem?.value || '').trim(),
    dataCadastro: new Date().toLocaleString()
  };

  // validações simples (no padrão da professora)
  const erros = [];
  if (!data.nome) erros.push('Nome');
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) erros.push('E-mail');
  if (!data.telefone) erros.push('Telefone');
  if (!data.disponibilidade) erros.push('Disponibilidade');
  if (!data.area) erros.push('Área de interesse');

  if (erros.length) {
    alert('Por favor, preencha corretamente: ' + erros.join(', ') + '.');
    return;
  }

  // persiste no localStorage
  const chave = 'voluntarios';
  const listaAnterior = JSON.parse(localStorage.getItem(chave) || '[]');
  listaAnterior.push(data);
  localStorage.setItem(chave, JSON.stringify(listaAnterior));

  // feedback visual
  const ok = document.getElementById('successMessage');
  if (ok) {
    ok.style.display = 'block';
    ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // esconde a mensagem depois de alguns segundos (opcional)
    setTimeout(() => (ok.style.display = 'none'), 4000);
  }

  // limpa o formulário
  form.reset();
}
