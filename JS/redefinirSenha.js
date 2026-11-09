const form = document.getElementById("form");
const botao = document.getElementById("botao");

// Link vencido ou inválido: o Supabase manda o erro no endereço da página
if (window.location.hash.includes("error")) {
  mostrarMsg("Esse link venceu ou já foi usado. Peça um novo em \"Esqueceu a senha?\".", "erro");
}

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const senha = document.getElementById("senha").value;
  const confirmar = document.getElementById("confirmar").value;

  if (senha.length < 6) {
    return mostrarMsg("A senha precisa ter pelo menos 6 caracteres.", "erro");
  }
  if (senha !== confirmar) {
    return mostrarMsg("As senhas não conferem.", "erro");
  }

  // O link do e-mail cria uma sessão temporária; sem ela, não dá para trocar a senha
  const { data } = await sb.auth.getSession();
  if (!data.session) {
    return mostrarMsg("Abra esta página pelo link que enviamos no e-mail.", "erro");
  }

  carregando(botao, true);
  const { error } = await sb.auth.updateUser({ password: senha });

  if (error) {
    carregando(botao, false);
    console.error(error);
    return mostrarMsg(traduzirErro(error), "erro");
  }

  mostrarMsg("Senha alterada! Levando você para o login...", "ok");
  await sb.auth.signOut();
  setTimeout(() => (window.location.href = "index.html"), 2000);
});
