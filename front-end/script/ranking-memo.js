const apiUrl = 'http://localhost:5000/api/rankingmemo';

        
        async function fetchRanking() {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Erro ao buscar o ranking');

                const data = await response.json();

                
                document.getElementById('primeiro-nome').innerText = data[0]?.nome || 'N/A';
                document.getElementById('primeiro-ponto').innerText = `${data[0]?.pontos || '0'} pts`;

                document.getElementById('segundo-nome').innerText = data[1]?.nome || 'N/A';
                document.getElementById('segundo-ponto').innerText = `${data[1]?.pontos || '0'} pts`;

                document.getElementById('terceiro-nome').innerText = data[2]?.nome || 'N/A';
                document.getElementById('terceiro-ponto').innerText = `${data[2]?.pontos || '0'} pts`;

                document.getElementById('quarto-nome').innerText = data[3]?.nome || 'N/A';
                document.getElementById('quarto-ponto').innerText = `${data[3]?.pontos || '0'} pts`;

                document.getElementById('quinto-nome').innerText = data[4]?.nome || 'N/A';
                document.getElementById('quinto-ponto').innerText = `${data[4]?.pontos || '0'} pts`;
            } catch (error) {
                console.error('Erro ao carregar o ranking:', error);
            }
        }

        
        fetchRanking();