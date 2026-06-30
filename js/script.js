/* ============================================================
   Portfólio Pessoal - Gabriele Lima da Conceição Gomes
   JavaScript principal (puro, sem frameworks)
   Funcionalidades:
     1. Abrir/fechar a barra lateral no celular
     2. Alternância de tema claro/escuro
     3. Destaque do link da seção atual (scroll spy)
     4. Validação do formulário de contato
     5. Simulação de envio + modal de confirmação
     6. Ano atual no rodapé
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  /* ============================================================
     1. ABRIR / FECHAR A BARRA LATERAL (MENU) NO CELULAR
     ============================================================ */
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  // Abre o menu (mostra a sidebar e a camada escura)
  function abrirMenu() {
    sidebar.classList.add("aberta");
    overlay.classList.add("ativo");
  }
  // Fecha o menu
  function fecharMenu() {
    sidebar.classList.remove("aberta");
    overlay.classList.remove("ativo");
  }

  menuToggle.addEventListener("click", abrirMenu);
  overlay.addEventListener("click", fecharMenu);

  // Ao clicar em qualquer link de navegação, fecha o menu (no celular)
  const linksNav = document.querySelectorAll(".nav-link");
  linksNav.forEach(function (link) {
    link.addEventListener("click", fecharMenu);
  });

  /* ============================================================
     2. ALTERNÂNCIA DE TEMA CLARO / ESCURO
     ============================================================ */
  const temaToggle = document.getElementById("tema-toggle");

  // Aplica a preferência salva no navegador (se existir)
  if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("tema-escuro");
    temaToggle.textContent = "☀️ Tema claro";
  }

  temaToggle.addEventListener("click", function () {
    document.body.classList.toggle("tema-escuro");

    if (document.body.classList.contains("tema-escuro")) {
      temaToggle.textContent = "☀️ Tema claro";
      localStorage.setItem("tema", "escuro");
    } else {
      temaToggle.textContent = "🌙 Tema escuro";
      localStorage.setItem("tema", "claro");
    }
  });

  /* ============================================================
     3. DESTAQUE DO LINK DA SEÇÃO ATUAL (SCROLL SPY)
     ============================================================ */
  const secoes = document.querySelectorAll("section[id]");

  function atualizarLinkAtivo() {
    const posicaoAtual = window.scrollY + 120;

    secoes.forEach(function (secao) {
      const topo = secao.offsetTop;
      const altura = secao.offsetHeight;
      const id = secao.getAttribute("id");
      const link = document.querySelector('.nav-link[href="#' + id + '"]');

      if (link && posicaoAtual >= topo && posicaoAtual < topo + altura) {
        linksNav.forEach((l) => l.classList.remove("ativo"));
        link.classList.add("ativo");
      }
    });
  }

  window.addEventListener("scroll", atualizarLinkAtivo);
  atualizarLinkAtivo(); // executa uma vez ao carregar

  /* ============================================================
     4 e 5. VALIDAÇÃO E ENVIO DO FORMULÁRIO
     ============================================================ */
  const form = document.getElementById("form-contato");
  const modal = document.getElementById("modal");
  const modalFechar = document.getElementById("modal-fechar");

  // Valida o formato do e-mail com expressão regular
  function emailValido(email) {
    const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padrao.test(email);
  }

  // Mostra mensagem de erro em um campo
  function mostrarErro(campo, idErro, mensagem) {
    document.getElementById(idErro).textContent = mensagem;
    campo.classList.add("invalido");
  }
  // Limpa o erro de um campo
  function limparErro(campo, idErro) {
    document.getElementById(idErro).textContent = "";
    campo.classList.remove("invalido");
  }

  form.addEventListener("submit", function (evento) {
    evento.preventDefault(); // não recarrega a página

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");

    let valido = true;

    // Valida NOME
    if (nome.value.trim() === "") {
      mostrarErro(nome, "erro-nome", "Por favor, informe seu nome.");
      valido = false;
    } else {
      limparErro(nome, "erro-nome");
    }

    // Valida E-MAIL
    if (email.value.trim() === "") {
      mostrarErro(email, "erro-email", "Por favor, informe seu e-mail.");
      valido = false;
    } else if (!emailValido(email.value.trim())) {
      mostrarErro(email, "erro-email", "Digite um e-mail válido (ex: nome@dominio.com).");
      valido = false;
    } else {
      limparErro(email, "erro-email");
    }

    // Valida MENSAGEM
    if (mensagem.value.trim() === "") {
      mostrarErro(mensagem, "erro-mensagem", "Por favor, escreva uma mensagem.");
      valido = false;
    } else {
      limparErro(mensagem, "erro-mensagem");
    }

    // Se válido, simula o envio
    if (valido) {
      modal.classList.add("aberto");
      form.reset();
    }
  });

  // Fecha o modal pelo botão
  modalFechar.addEventListener("click", function () {
    modal.classList.remove("aberto");
  });
  // Fecha o modal clicando fora da caixa
  modal.addEventListener("click", function (evento) {
    if (evento.target === modal) {
      modal.classList.remove("aberto");
    }
  });

  /* ============================================================
     6. ANO ATUAL NO RODAPÉ
     ============================================================ */
  document.getElementById("ano").textContent = new Date().getFullYear();

});
