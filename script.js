/* Cadastro de voluntário */
function handleSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('volunteerForm');

  const formData = {
    nome: form.nome.value,
    email: form.email.value,
    telefone: form.telefone.value,
    disponibilidade: form.disponibilidade.value,
    area: form.area.value,
    mensagem: form.mensagem.value,
    dataCadastro: new Date().toLocaleDateString()
  };

  // Busca voluntários anteriores
  let voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];

  // Adiciona novo voluntário
  voluntarios.push(formData);

  // Salva novamente no localStorage
  localStorage.setItem('voluntarios', JSON.stringify(voluntarios));

  // Mostra mensagem de sucesso e limpa formulário
  document.getElementById('successMessage').style.display = 'block';
  form.reset();
}
