
const UNSPLASH_ACCESS_KEY = "";//Use API Key 

function searchWord() {
    let word = document.getElementById('wordInput').value.trim();
    if (!word) {
        alert("Please enter a word!");
        return;
    }

    let dictionaryApiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    let screenWidth = window.innerWidth;
    let orientation = screenWidth < 768 ? "portrait" : "landscape";
    let unsplashApiUrl = `https://api.unsplash.com/photos/random?query=${word}&orientation=${orientation}&client_id=${UNSPLASH_ACCESS_KEY}`;

    axios.get(dictionaryApiUrl)
        .then(response => {
            let data = response.data[0];
            let nounMeaning = data.meanings.find(meaning => meaning.partOfSpeech === "noun") || data.meanings[0];
            let partOfSpeech = `<p class="partOfSpeech">${nounMeaning.partOfSpeech}</p>`;
            
            let definition = nounMeaning.definitions[0].definition;
            let example = nounMeaning.definitions[0].example ? `<p class="example"><strong>Example:</strong> ${nounMeaning.definitions[0].example}</p>` : "";

            let resultHTML = `
                <p class="word">${data.word}</p>
                ${partOfSpeech}
                <p class="definition"><strong>Definition:</strong> ${definition}</p>
                ${example}
            `;

            document.getElementById('result').innerHTML = resultHTML;
        })
        .catch(() => {
            document.getElementById('result').innerHTML = `<p class="error">Word not found. Try another word!</p>`;
        });

    axios.get(unsplashApiUrl)
        .then(response => {
            let imageUrl = response.data.urls.regular;
            document.body.style.backgroundImage = `url('${imageUrl}')`;
        })
        .catch(() => {
            console.log("No image found for this word.");
        });
}
