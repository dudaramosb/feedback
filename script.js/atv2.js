const tabuleiro = document.getElementById('tabuleiro');
const vitoriaMensagem = document.getElementById('vitoria');


const imagensAnimais = [
  'cachorro.png', 'gato.png', 'rato.png', 'coelho.png', 
  'raposa.png', 'urso.png', 'panda.png', 'koala.png'
];

let cartas = [...imagensAnimais, ...imagensAnimais];
let cartasViradas = [];
let paresCorretos = 0;


cartas = cartas.sort(() => Math.random() - 0.5);


cartas.forEach((animal, index) => {
  const carta = document.createElement('div');
  carta.classList.add('carta');
  carta.dataset.animal = animal;
  carta.dataset.index = index;

  const img = document.createElement('img');
  img.src = `../images/${animal}` ;
  img.alt = 'Animal';
  carta.appendChild(img);

  carta.addEventListener('click', virarCarta);
  tabuleiro.appendChild(carta);
});

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

botaoReiniciar.addEventListener('click', iniciarJogo);

document.addEventListener('DOMContentLoaded', iniciarJogo);