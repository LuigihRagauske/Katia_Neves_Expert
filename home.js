const nomesPerfil = {
  responsavel: "Mãe, pai ou responsável",
  professor: "Professor(a) ou educador(a)",
};

async function carregarUsuario() {
  const { data } = await sb.auth.getSession();

  // Sem login, volta para a tela de login
  if (!data.session) {
    window.location.href = "login.html";
    return;
  }

  const usuario = data.session.user;
  const { data: perfil } = await sb
    .from("perfis")
    .select("nome, perfil")
    .eq("id", usuario.id)
    .single();

  const nome = perfil && perfil.nome ? perfil.nome : "bem-vinda(o)";
  document.getElementById("boasVindas").textContent = "Olá, " + nome + "!";
  document.getElementById("info").textContent =
    (perfil ? nomesPerfil[perfil.perfil] + " · " : "") + usuario.email;
}

document.getElementById("sair").addEventListener("click", async () => {
  await sb.auth.signOut();
  window.location.href = "login.html";
});

carregarUsuario();
