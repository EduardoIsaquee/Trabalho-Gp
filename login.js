/* Corrige o login quando o site é aberto pela URL raiz (ex.: /Trabalho-Gp/). */
(function () {
    const caminho = window.location.pathname;
    const abriuNaRaiz = caminho.endsWith("/") || caminho === "";

    if (!abriuNaRaiz) {
        return;
    }

    document.addEventListener("DOMContentLoaded", function () {
        const formulario = document.getElementById("loginForm");

        if (!formulario) {
            return;
        }

        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            const email = document.getElementById("email").value.trim().toLowerCase();
            const senha = document.getElementById("senha").value.trim();
            const perfil = document.getElementById("perfil").value;

            const usuarios = {
                "cliente@conectahub.com|123456|cliente": {
                    pagina: "cliente.html",
                    nome: "João da Silva",
                    contemplado: false,
                    progresso: 40
                },
                "contemplado@conectahub.com|123456|cliente": {
                    pagina: "cliente.html",
                    nome: "Carlos Henrique",
                    contemplado: true,
                    progresso: 100
                },
                "gerente@conectahub.com|123456|gerente": {
                    pagina: "gerente.html",
                    nome: "Maria Oliveira",
                    contemplado: false
                }
            };

            const usuario = usuarios[email + "|" + senha + "|" + perfil];

            const mensagemAntiga = formulario.querySelector(".mensagem-sistema");
            if (mensagemAntiga) {
                mensagemAntiga.remove();
            }

            const mensagem = document.createElement("div");
            mensagem.className = "mensagem-sistema";
            mensagem.style.padding = "12px 16px";
            mensagem.style.marginTop = "15px";
            mensagem.style.borderRadius = "10px";
            mensagem.style.fontWeight = "600";

            if (!usuario) {
                mensagem.textContent = "E-mail, senha ou perfil incorreto.";
                mensagem.style.background = "#ffe4e4";
                mensagem.style.color = "#a40000";
                formulario.appendChild(mensagem);
                return;
            }

            localStorage.setItem("conectaHubUsuario", JSON.stringify({
                email: email,
                senha: senha,
                nome: usuario.nome,
                perfil: perfil,
                contemplado: usuario.contemplado,
                progresso: usuario.progresso
            }));

            mensagem.textContent = "Login realizado! Entrando no ConectaHub...";
            mensagem.style.background = "#e5f7d2";
            mensagem.style.color = "#245d19";
            formulario.appendChild(mensagem);

            setTimeout(function () {
                window.location.href = usuario.pagina;
            }, 700);
        });
    });
})();
