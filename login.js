const form = document.getElementById("form");
const botao = document.getElementById("botao");

// Se já estiver logado, vai direto para a home
sb.auth.getSession().then(({ data }) => {
  if (data.session) window.location.href = "home.html";
});

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  if (!email || !senha) {
    return mostrarMsg("Digite seu e-mail e sua senha.", "erro");
  }

  carregando(botao, true);
  const { error } = await sb.auth.signInWithPassword({ email, password: senha });

  if (error) {
    carregando(botao, false);
    console.error(error);
    return mostrarMsg(traduzirErro(error), "erro");
  }

  window.location.href = "home.html";
});
