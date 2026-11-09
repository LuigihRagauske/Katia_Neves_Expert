const form = document.getElementById("form");
const botao = document.getElementById("botao");
let perfil = "responsavel";

// Seletor "Eu sou"
document.querySelectorAll(".role").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".role").forEach((c) => c.classList.remove("on"));
    chip.classList.add("on");
    perfil = chip.dataset.perfil;
  });
});

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmar = document.getElementById("confirmar").value;
  const aceitou = document.getElementById("termos").checked;

  if (!nome || !email || !senha) {
    return mostrarMsg("Preencha todos os campos.", "erro");
  }
  if (senha.length < 6) {
    return mostrarMsg("A senha precisa ter pelo menos 6 caracteres.", "erro");
  }
  if (senha !== confirmar) {
    return mostrarMsg("As senhas não conferem.", "erro");
  }
  if (!aceitou) {
    return mostrarMsg("Aceite os termos e a política de privacidade para continuar.", "erro");
  }

  carregando(botao, true);
  const { data, error } = await sb.auth.signUp({
    email,
    password: senha,
    options: {
      data: { nome, perfil },
      emailRedirectTo: new URL("index.html", window.location.href).href,
    },
  });
  carregando(botao, false);

  if (error) {
    console.error(error);
    return mostrarMsg(traduzirErro(error), "erro");
  }

  // E-mail já cadastrado: o Supabase devolve o usuário sem identidades
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return mostrarMsg("Esse e-mail já está cadastrado. Tente entrar.", "erro");
  }

  form.reset();
  mostrarMsg("Conta criada! Enviamos um e-mail de confirmação. Clique no link dele para ativar sua conta.", "ok");
});