const form = document.getElementById("form");
const botao = document.getElementById("botao");

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const email = document.getElementById("email").value.trim();

  if (!email) {
    return mostrarMsg("Digite seu e-mail.", "erro");
  }

  carregando(botao, true);
  const { error } = await sb.auth.resetPasswordForEmail(email, {
    redirectTo: new URL("redefinirSenha.html", window.location.href).href,
  });
  carregando(botao, false);

  if (error) {
    console.error(error);
    return mostrarMsg(traduzirErro(error), "erro");
  }

  mostrarMsg("Se esse e-mail estiver cadastrado, enviamos um link para criar uma nova senha.", "ok");
});