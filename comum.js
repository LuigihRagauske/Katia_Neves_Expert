// Funções usadas em todas as telas

function iniciarOlhinhos() {
  document.querySelectorAll(".eye").forEach((botao) => {
    botao.addEventListener("click", () => {
      const input = botao.parentNode.querySelector("input");
      const mostrar = input.type === "password";

      input.type = mostrar ? "text" : "password";
      botao.classList.toggle("show", mostrar);
      botao.setAttribute("aria-label", mostrar ? "Ocultar senha" : "Mostrar senha");
    });
  });
}

function mostrarMsg(texto, tipo) {
  const msg = document.getElementById("msg");
  msg.textContent = texto;
  msg.className = "msg " + (tipo || "");
}

function carregando(botao, ativo) {
  if (ativo) {
    botao.dataset.texto = botao.textContent;
    botao.textContent = "Aguarde...";
  } else {
    botao.textContent = botao.dataset.texto || botao.textContent;
  }
  botao.disabled = ativo;
}

function traduzirErro(erro) {
  const m = (erro.message || "").toLowerCase();

  if (m.includes("invalid login")) return "E-mail ou senha incorretos.";
  if (m.includes("email not confirmed")) return "Confirme seu e-mail antes de entrar. Veja sua caixa de entrada.";
  if (m.includes("security purposes")) return "Aguarde cerca de 1 minuto antes de pedir outro e-mail.";
  if (m.includes("rate limit") || erro.status === 429) return "Muitos e-mails enviados. Aguarde um pouco e tente de novo.";
  if (m.includes("not authorized")) return "Esse e-mail ainda não pode receber mensagens. Configure o SMTP no Supabase.";
  if (m.includes("password should")) return "A senha precisa ter pelo menos 6 caracteres.";
  if (m.includes("different from the old")) return "A nova senha precisa ser diferente da atual.";
  return "Algo deu errado. Tente novamente.";
}

document.addEventListener("DOMContentLoaded", iniciarOlhinhos);
