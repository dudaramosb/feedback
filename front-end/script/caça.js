document.addEventListener('DOMContentLoaded', () => {
    const wordSearchTable = document.getElementById('wordSearchTable');
    const wordsToFind = document.querySelectorAll('#wordsToFind li');
    const restartButton = document.getElementById('restartButton');
    const finishButton = document.getElementById('finishButton');
    let pontos = 0;
    let selectedCells = [];
    let gameFinished = false; 
    const apiUrl = 'https://feedback-vl7s.onrender.com/api/updatePointscaca';
    
    
    wordSearchTable.addEventListener('click', (e) => {
        if (gameFinished) return;
        const cell = e.target;
        if (cell.tagName === 'TD') {
            if (cell.classList.contains('selected')) {
                cell.classList.remove('selected');
                selectedCells = selectedCells.filter(c => c !== cell);
            } else {
                cell.classList.add('selected');
                selectedCells.push(cell);
            }

            checkWord();
        }
    });

    function checkWord() {
        const selectedWord = selectedCells.map(cell => cell.textContent).join('');
        wordsToFind.forEach(wordItem => {
            const word = wordItem.dataset.word;
            if (selectedWord === word) {
                highlightWord();
                wordItem.classList.add('found');
                pontos += 1;
            }
            localStorage.setItem("pts-caca", pontos)
        });
    }

    function highlightWord() {
        selectedCells.forEach(cell => {
            cell.classList.add('highlight');
            cell.classList.remove('selected');
        });
        selectedCells = [];
    }

    function resetSelection() {
        selectedCells.forEach(cell => cell.classList.remove('selected'));
        selectedCells = [];
    }

    restartButton.addEventListener('click', () => {
        const allCells = wordSearchTable.getElementsByTagName('td');
        Array.from(allCells).forEach(cell => {
            cell.classList.remove('highlight', 'selected');
        });
        wordsToFind.forEach(wordItem => {
            wordItem.classList.remove('found');
        });
        selectedCells = [];
        gameFinished = false;
        pontos = 0;
        localStorage.setItem("pts-caca", pontos);
    });

    finishButton.addEventListener('click', () => {
        gameFinished = true;
        updatePoints();
    });
    async function updatePoints() {
        const userId = localStorage.getItem('userId');
        const pontos = localStorage.getItem('pts-caca');

        if (!userId || !pontos) {
            console.error('ID do usuário ou pontos não encontrados.');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/api/updatePointscaca`, {
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
});

