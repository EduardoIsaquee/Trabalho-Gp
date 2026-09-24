/* =========================================================
   CONECTAHUB
   JavaScript principal do protótipo
   ========================================================= */


/* =========================================================
   DADOS DEMONSTRATIVOS
   ========================================================= */

const usuariosDemo = {
    cliente: {
        email: "cliente@conectahub.com",
        senha: "123456",
        nome: "João da Silva",
        perfil: "cliente",
        contemplado: false,
        progresso: 40
    },

    clienteContemplado: {
        email: "contemplado@conectahub.com",
        senha: "123456",
        nome: "Carlos Henrique",
        perfil: "cliente",
        contemplado: true,
        progresso: 100
    },

    gerente: {
        email: "gerente@conectahub.com",
        senha: "123456",
        nome: "Maria Oliveira",
        perfil: "gerente"
    }
};


/* =========================================================
   FUNÇÕES DE SESSÃO
   ========================================================= */

function salvarSessao(usuario) {
    localStorage.setItem("conectaHubUsuario", JSON.stringify(usuario));
}

function obterSessao() {
    const usuario = localStorage.getItem("conectaHubUsuario");

    if (!usuario) {
        return null;
    }

    try {
        return JSON.parse(usuario);
    } catch (erro) {
        return null;
    }
}

function encerrarSessao() {
    localStorage.removeItem("conectaHubUsuario");

    window.location.href = "index.html";
}


/* =========================================================
   IDENTIFICAÇÃO DA PÁGINA
   ========================================================= */

function paginaAtual() {
    const caminho = window.location.pathname;
    return caminho.substring(caminho.lastIndexOf("/") + 1);
}


/* =========================================================
   PROTEÇÃO DAS PÁGINAS
   ========================================================= */

function protegerPaginas() {

    const pagina = paginaAtual();

    const paginasCliente = [
        "cliente.html",
        "meu-consorcio.html",
        "financeiro.html",
        "atendimento.html",
        "perfil.html",
        "assembleias.html",
        "documentos.html",
        "notificacoes.html",
        "assistente.html"
    ];

    const paginasGerente = [
        "gerente.html",
        "clientes.html",
        "consorcios.html",
        "atendimentos.html",
        "documentos-gerente.html",
        "kanban.html",
        "notificacoes-gerente.html",
        "relatorios.html",
        "auditoria.html",
        "configuracoes.html"
    ];

    const usuario = obterSessao();

    if (paginasCliente.includes(pagina)) {

        if (!usuario || usuario.perfil !== "cliente") {
            window.location.href = "index.html";
            return;
        }
    }

    if (paginasGerente.includes(pagina)) {

        if (!usuario || usuario.perfil !== "gerente") {
            window.location.href = "index.html";
            return;
        }
    }
}


/* =========================================================
   LOGIN
   ========================================================= */

function configurarLogin() {

    const formulario = document.querySelector("form");

    if (!formulario || paginaAtual() !== "index.html") {
        return;
    }

    formulario.addEventListener("submit", function(evento) {

        evento.preventDefault();

        const email = formulario
            .querySelector('input[type="email"]')
            .value
            .trim()
            .toLowerCase();

        const senha = formulario
            .querySelector('input[type="password"]')
            .value
            .trim();

        const perfil = formulario
            .querySelector("select")
            .value;


        /* =====================================================
           CLIENTE NORMAL
           ===================================================== */

        if (
            email === usuariosDemo.cliente.email &&
            senha === usuariosDemo.cliente.senha &&
            perfil === "cliente"
        ) {

            salvarSessao(usuariosDemo.cliente);

            mostrarMensagem(
                formulario,
                "Login realizado! Entrando no ConectaHub...",
                "sucesso"
            );

            setTimeout(function() {
                window.location.href = "cliente.html";
            }, 700);

            return;
        }


        /* =====================================================
           CLIENTE CONTEMPLADO
           ===================================================== */

        if (
            email === usuariosDemo.clienteContemplado.email &&
            senha === usuariosDemo.clienteContemplado.senha &&
            perfil === "cliente"
        ) {

            salvarSessao(usuariosDemo.clienteContemplado);

            mostrarMensagem(
                formulario,
                "Login realizado! Entrando no ConectaHub...",
                "sucesso"
            );

            setTimeout(function() {
                window.location.href = "cliente.html";
            }, 700);

            return;
        }


        /* =====================================================
           GERENTE
           ===================================================== */

        if (
            email === usuariosDemo.gerente.email &&
            senha === usuariosDemo.gerente.senha &&
            perfil === "gerente"
        ) {

            salvarSessao(usuariosDemo.gerente);

            mostrarMensagem(
                formulario,
                "Login realizado! Entrando no ConectaHub...",
                "sucesso"
            );

            setTimeout(function() {
                window.location.href = "gerente.html";
            }, 700);

            return;
        }


        /* =====================================================
           LOGIN INCORRETO
           ===================================================== */

        mostrarMensagem(
            formulario,
            "E-mail, senha ou perfil incorreto.",
            "erro"
        );

    });
}

/* =========================================================
   MENSAGENS
   ========================================================= */

function mostrarMensagem(elemento, texto, tipo) {

    const mensagemAntiga = document.querySelector(".mensagem-sistema");

    if (mensagemAntiga) {
        mensagemAntiga.remove();
    }

    const mensagem = document.createElement("div");

    mensagem.className = "mensagem-sistema";

    mensagem.textContent = texto;

    mensagem.style.padding = "12px 16px";
    mensagem.style.marginTop = "15px";
    mensagem.style.borderRadius = "10px";
    mensagem.style.fontWeight = "600";

    if (tipo === "erro") {
        mensagem.style.background = "#ffe4e4";
        mensagem.style.color = "#a40000";
    }

    if (tipo === "sucesso") {
        mensagem.style.background = "#e5f7d2";
        mensagem.style.color = "#245d19";
    }

    elemento.appendChild(mensagem);
}


/* =========================================================
   MOSTRAR NOME DO USUÁRIO
   ========================================================= */

function mostrarUsuario() {

    const usuario = obterSessao();

    if (!usuario) {
        return;
    }

    const elementos = document.querySelectorAll(
        "[data-usuario]"
    );

    elementos.forEach(function(elemento) {
        elemento.textContent = usuario.nome;
    });
}


/* =========================================================
   LOGOUT
   ========================================================= */

function configurarLogout() {

    const links = document.querySelectorAll("a");

    links.forEach(function(link) {

        const texto = link.textContent
            .trim()
            .toLowerCase();

        if (
            texto === "sair" ||
            texto === "logout" ||
            link.getAttribute("href") === "logout"
        ) {

            link.addEventListener("click", function(evento) {

                evento.preventDefault();

                encerrarSessao();
            });
        }
    });
}


/* =========================================================
   BOTÃO DE LOGOUT DINÂMICO
   ========================================================= */

function adicionarLogout() {

    const usuario = obterSessao();

    if (!usuario || paginaAtual() === "index.html") {
        return;
    }

    const header = document.querySelector("header");

    if (!header) {
        return;
    }

    if (document.querySelector(".botao-logout")) {
        return;
    }

    const botao = document.createElement("button");

    botao.textContent = "Sair";
    botao.className = "btn btn-outline botao-logout";

    botao.style.marginLeft = "10px";

    botao.addEventListener("click", function() {
        encerrarSessao();
    });

    header.appendChild(botao);
}


/* =========================================================
   NOTIFICAÇÕES
   ========================================================= */

function configurarNotificacoes() {

    const notificacoes = [
        {
            titulo: "Assembleia próxima",
            texto: "A próxima assembleia acontecerá em breve."
        },
        {
            titulo: "Parcela disponível",
            texto: "Sua próxima parcela já está disponível."
        },
        {
            titulo: "Documentação",
            texto: "Existe uma atualização sobre seus documentos."
        }
    ];

    localStorage.setItem(
        "conectaHubNotificacoes",
        JSON.stringify(notificacoes)
    );
}


/* =========================================================
   ASSISTENTE VIRTUAL
   ========================================================= */

function configurarAssistente() {

    if (paginaAtual() !== "assistente.html") {
        return;
    }

    const formulario = document.querySelector("form");

    if (!formulario) {
        return;
    }

    const input = formulario.querySelector(
        'input[type="text"]'
    );

    if (!input) {
        return;
    }

    formulario.addEventListener("submit", function(evento) {

        evento.preventDefault();

        const pergunta = input.value
            .trim()
            .toLowerCase();

        if (!pergunta) {
            return;
        }

        let resposta = "";

        if (
            pergunta.includes("boleto") ||
            pergunta.includes("parcela")
        ) {

            resposta =
                "Você pode consultar suas parcelas e boletos na área Financeiro.";
        }

        else if (
            pergunta.includes("assembleia") ||
            pergunta.includes("sorteio")
        ) {

            resposta =
                "As informações da próxima assembleia estão disponíveis na área Assembleias.";
        }

        else if (
            pergunta.includes("documento") ||
            pergunta.includes("documentação")
        ) {

            resposta =
                "Você pode enviar e acompanhar seus documentos pela área Documentos.";
        }

        else if (
            pergunta.includes("contempl") ||
            pergunta.includes("lance")
        ) {

            resposta =
                "O status de contemplação e informações sobre lances podem ser consultados no seu consórcio.";
        }

        else {

            resposta =
                "Não encontrei uma resposta para essa pergunta. Posso encaminhar você para o atendimento humano.";
        }

        adicionarMensagemChat("Você", input.value);
        adicionarMensagemChat("ConectaHub", resposta);

        input.value = "";
    });
}


function adicionarMensagemChat(remetente, mensagem) {

    const areaChat =
        document.querySelector(
            ".chat-messages, .chat, .mensagens"
        );

    if (!areaChat) {
        return;
    }

    const bloco = document.createElement("div");

    bloco.style.padding = "12px";
    bloco.style.marginBottom = "10px";
    bloco.style.borderRadius = "10px";

    bloco.innerHTML =
        "<strong>" +
        remetente +
        ":</strong> " +
        mensagem;

    areaChat.appendChild(bloco);

    areaChat.scrollTop = areaChat.scrollHeight;
}


/* =========================================================
   FORMULÁRIO DE ATENDIMENTO
   ========================================================= */

function configurarAtendimento() {

    if (paginaAtual() !== "atendimento.html") {
        return;
    }

    const formularios = document.querySelectorAll("form");

    formularios.forEach(function(formulario) {

        const campos = formulario.querySelectorAll(
            "input, textarea, select"
        );

        if (campos.length === 0) {
            return;
        }

        formulario.addEventListener("submit", function(evento) {

            evento.preventDefault();

            const protocolo =
                "CH-" +
                Date.now()
                    .toString()
                    .slice(-8);

            localStorage.setItem(
                "ultimoProtocolo",
                protocolo
            );

            mostrarMensagem(
                formulario,
                "Atendimento criado com sucesso! Protocolo: " + protocolo,
                "sucesso"
            );
        });
    });
}


/* =========================================================
   DOCUMENTOS
   ========================================================= */

function configurarDocumentos() {

    if (paginaAtual() !== "documentos.html") {
        return;
    }

    const formularios = document.querySelectorAll("form");

    formularios.forEach(function(formulario) {

        const arquivo = formulario.querySelector(
            'input[type="file"]'
        );

        if (!arquivo) {
            return;
        }

        formulario.addEventListener("submit", function(evento) {

            evento.preventDefault();

            if (!arquivo.files.length) {

                mostrarMensagem(
                    formulario,
                    "Selecione um arquivo antes de enviar.",
                    "erro"
                );

                return;
            }

            const nomeArquivo =
                arquivo.files[0].name;

            mostrarMensagem(
                formulario,
                "Documento '" +
                nomeArquivo +
                "' enviado para análise.",
                "sucesso"
            );

            arquivo.value = "";
        });
    });
}


/* =========================================================
   KANBAN
   ========================================================= */

function configurarKanban() {

    if (paginaAtual() !== "kanban.html") {
        return;
    }

    const cards = document.querySelectorAll(
        ".kanban-card"
    );

    cards.forEach(function(card) {

        card.setAttribute("draggable", "true");

        card.addEventListener("dragstart", function(evento) {

            evento.dataTransfer.setData(
                "text/plain",
                ""
            );

            card.classList.add("arrastando");
        });

        card.addEventListener("dragend", function() {
            card.classList.remove("arrastando");
        });
    });

    const colunas = document.querySelectorAll(
        ".kanban-column, .kanban-coluna, .kanban"
    );

    colunas.forEach(function(coluna) {

        coluna.addEventListener("dragover", function(evento) {
            evento.preventDefault();
        });

        coluna.addEventListener("drop", function(evento) {

            evento.preventDefault();

            const card =
                document.querySelector(
                    ".kanban-card.arrastando"
                );

            if (card) {
                coluna.appendChild(card);
            }
        });
    });
}


/* =========================================================
   DATA ATUAL
   ========================================================= */

function mostrarDataAtual() {

    const elementos =
        document.querySelectorAll(
            "[data-data-atual]"
        );

    const agora = new Date();

    const data =
        agora.toLocaleDateString("pt-BR");

    elementos.forEach(function(elemento) {
        elemento.textContent = data;
    });
}


/* =========================================================
   BOTÕES DE CONFIRMAÇÃO
   ========================================================= */

function configurarBotoes() {

    const botoes =
        document.querySelectorAll(
            "[data-confirmar]"
        );

    botoes.forEach(function(botao) {

        botao.addEventListener("click", function(evento) {

            const mensagem =
                botao.dataset.confirmar ||
                "Deseja realmente continuar?";

            if (!confirm(mensagem)) {
                evento.preventDefault();
            }
        });
    });
}

/* =========================================================
   TEMA DO CLIENTE CONTEMPLADO
   ========================================================= */

function configurarClienteContemplado() {

    const usuario = obterSessao();

    if (!usuario) {
        return;
    }

    /* Só aplica o tema para cliente contemplado */

    if (
        usuario.perfil === "cliente" &&
        usuario.contemplado === true
    ) {

        document.body.classList.add(
            "cliente-contemplado"
        );

        /* ==============================================
           AVISO DE CONTEMPLAÇÃO
           Aparece somente na página inicial
           ============================================== */

        if (paginaAtual() === "cliente.html") {

            const main = document.querySelector("main");

            if (!main) {
                return;
            }

            /* Evita duplicar o aviso */

            if (
                document.querySelector(
                    ".destaque-contemplacao"
                )
            ) {
                return;
            }

            const destaque =
                document.createElement("section");

            destaque.className =
                "destaque-contemplacao";

            destaque.innerHTML = `
                <span class="selo-contemplado">
                    🏆 CONTEMPLADO
                </span>

                <h2>
                    🎉 Parabéns, ${usuario.nome}!
                </h2>

                <p>
                    Você foi contemplado no seu consórcio!
                    Sua carta de crédito está disponível
                    para seguir com o processo de contemplação.
                </p>

                <strong>
                    Acesse "Meu Consórcio" para consultar
                    os próximos passos.
                </strong>
            `;

            main.insertBefore(
                destaque,
                main.firstChild
            );
        }
    }
}


/* =========================================================
   PROGRESSO DO CONSÓRCIO
   ========================================================= */

function configurarProgressoConsorcio() {

    const usuario = obterSessao();

    if (!usuario) {
        return;
    }

    const barra =
        document.getElementById("progressoConsorcio");

    const texto =
        document.getElementById("textoProgresso");

    if (!barra || !texto) {
        return;
    }

    const progresso =
        usuario.progresso ?? 0;

    barra.value = progresso;

    texto.textContent =
        progresso + "% concluído";
}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener("DOMContentLoaded", function() {

    protegerPaginas();

    configurarLogin();

    configurarLogout();

    adicionarLogout();

    mostrarUsuario();

    configurarNotificacoes();

    configurarAssistente();

    configurarAtendimento();

    configurarDocumentos();

    configurarKanban();

    mostrarDataAtual();

    configurarBotoes();

    configurarClienteContemplado();

    configurarProgressoConsorcio();

});