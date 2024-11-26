const tabuleiro = document.getElementById('tabuleiro');
const vitoriaMensagem = document.getElementById('vitoria');
const botaoReiniciar = document.getElementById('reiniciar');
let pontos = 0;
const apiUrl = 'https://feedback-vl7s.onrender.com/api/updatePointsmemo';
const imagensAnimais = [
  'cachorro.png', 'gato.png', 'rato.png', 'coelho.png', 
  'raposa.png', 'urso.png', 'panda.png', 'koala.png'
];

let cartas = [...imagensAnimais, ...imagensAnimais];
let cartasViradas = [];
let paresCorretos = 0;

function iniciarJogo() {
pontos = 0;
localStorage.setItem("pts-caca", pontos);
tabuleiro.innerHTML = '';

vitoriaMensagem.style.display = 'none';

cartasViradas = [];
paresCorretos = 0;

cartas = cartas.sort(() => Math.random() - 0.5);

cartas.forEach((animal, index) => {
  const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.animal = animal;
    carta.dataset.index = index;

    const img = document.createElement('img');
    img.src = `../images/${animal}`;
    img.alt = 'Animal';
    img.style.display = 'none'; 
    carta.appendChild(img);

    carta.addEventListener('click', virarCarta);
    tabuleiro.appendChild(carta);
  });
}

function virarCarta() {
  if (cartasViradas.length < 2 && !this.classList.contains('corretamente')) {
    const img = this.querySelector('img');
    img.style.display = 'block'; 
    this.classList.add('virada');
    cartasViradas.push(this);

    if (cartasViradas.length === 2) {
      verificarPar();
    }
  }
}

function verificarPar() {
  const [primeiraCarta, segundaCarta] = cartasViradas;
  const primeiraImagem = primeiraCarta.querySelector('img');
  const segundaImagem = segundaCarta.querySelector('img');

  if (primeiraCarta.dataset.animal === segundaCarta.dataset.animal) {
    cartasCorretas();
  } else {
    setTimeout(desvirarCartas, 1000);
  }
}

function cartasCorretas() {
  cartasViradas.forEach(carta => {
    carta.classList.add('corretamente');
    carta.removeEventListener('click', virarCarta);
  });
  cartasViradas = [];
  paresCorretos++;

  if (paresCorretos === imagensAnimais.length) {
    vitoriaMensagem.style.display = 'block';
    pontos += 1;
    localStorage.setItem("pts-memo", pontos)
  }

  if(paresCorretos == 4){
    updatePoints();
  }
}

function desvirarCartas() {
  cartasViradas.forEach(carta => {
    carta.classList.remove('virada');
    const img = carta.querySelector('img');
    img.style.display = 'none';
  });
  cartasViradas = [];
}

async function updatePoints() {
  const userId = localStorage.getItem('userId');
  const pontos = localStorage.getItem('pts-memo');

  if (!userId || !pontos) {
      console.error('ID do usuário ou pontos não encontrados.');
      return;
  }

  try {
      const response = await fetch(`${apiUrl}/api/updatePointsmemo`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: userId, pontos: parseInt(pontos, 10) })
      });

      const result = await response.json();
      if (response.ok) {
          console.log('Pontos atualizados com sucesso!', result);
      } else {
          console.log('Erro ao atualizar pontos:', result);
      }
  } catch (error) {
      console.error('Erro ao enviar dados:', error);
  }
}

botaoReiniciar.addEventListener('click', iniciarJogo);


iniciarJogo();
