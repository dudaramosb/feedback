document.addEventListener('DOMContentLoaded', () => {
    const wordSearchTable = document.getElementById('wordSearchTable');
    const wordsToFind = document.querySelectorAll('#wordsToFind li');
    const restartButton = document.getElementById('restartButton');
    const finishButton = document.getElementById('finishButton');
    let selectedCells = [];
    let gameFinished = false;   
    
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
            }
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
    });

    finishButton.addEventListener('click', () => {
        gameFinished = true;
    });
});