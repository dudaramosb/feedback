const form = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');
const apiUrl = 'https://feedback-vl7s.onrender.com/api/login'; 

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch(`${apiUrl}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });
        if (response.status === 200) {
            const data = await response.json();
            
            if (data.id) {
                localStorage.setItem('userId', data.id);
                messageDiv.textContent = data.message || 'Login realizado com sucesso';
                window.location.href = "../paginas/cadeia.html";
            } else {
                messageDiv.textContent = 'Erro: ID do usuário não encontrado.';
            }
        } else if (response.status === 201) {
            window.location.href = "../paginas/cadeia.html"; 
        } else {
            messageDiv.style.color = 'red';
            messageDiv.textContent = 'Usuário ou senha inválidos.';
        }
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        messageDiv.style.color = 'red';
        messageDiv.textContent = 'Erro no servidor. Tente novamente mais tarde.';
    }
});
