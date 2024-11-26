const form = document.getElementById('cadastroForm');
const messageDiv = document.getElementById('message');
const apiUrl = 'https://feedback-vl7s.onrender.com/api/cadastro';

    form.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const confirmEmail = document.getElementById('ConfirmarEmail').value;
            const senha = document.getElementById('senha').value;
            const confirmSenha = document.getElementById('ConfirmarSenha').value;

            if (!nome || !email || !confirmEmail || !senha || !confirmSenha) {
                messageDiv.textContent = 'Todos os campos são obrigatórios.';
                return;
            }
        
            if (email !== confirmEmail) {
                messageDiv.textContent = 'Os emails não coincidem.';
                return;
            }
        
            if (senha !== confirmSenha) {
                messageDiv.textContent = 'As senhas não coincidem.';
                return;
            }
        
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nome, email, confirmEmail, senha, confirmSenha }),
                });

                const result = await response.text();
                window.location.href = "../index.html"
            } catch (error) {
                console.error('Erro ao enviar dados:', error);
                alert('Erro ao cadastrar usuário');
            }
        });