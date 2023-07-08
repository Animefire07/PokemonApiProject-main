// ASI: Automatic Semicolon
const cardImage = document.querySelector(".card-image-top");

const pokeName = document.querySelector(".pokeName");

const searchPoke = document.querySelector(".pokeSearch");

const DROPZONE = document.getElementById("dropZone");
const DRAGGEDIMAGE = document.getElementById("dragMe");


searchPoke.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        fetchpoke();
    }
})

function fetchpoke() {

    let valueOfSearch = searchPoke.value.trim().toLowerCase();

    if (!valueOfSearch) {
        //alert("No Name Given!");
        Swal.fire({
            icon: "error",
            title: "Opss..",
            text: "Please Enter a Name!",
            footer: "Please Contact the developer for any questions"
        });
        return;
    }

    const apiEndPunkt = `https://pokeapi.co/api/v2/pokemon/${valueOfSearch}`;


    // alert(valueOfSearch);

    fetch(apiEndPunkt)
        .then((response) => response.json())
        .then((data) => {

            cardImage.src = data.sprites.front_default;

            pokeName.textContent = data.name;

            // ! CONFETTI EFFFECT
            confetti({
                spread: 400,
                particleCount: 100,
                shapes: ["star"],
                scalar: 1,
                colors: ["#F9CCCA", "#B4E8C8", "#C7B8FF"]
            });

        })
        .catch((error) => {
            Swal.fire({
                icon: "question",
                title: "Couldnt find your Pokemon",
                text: "You might have given the name not correctly, or the pokemon doesnt exist",
                footer: error
            });
        })
}

async function generatePokemonNames() {
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            'model': 'text-davinci-003',
            'prompt': 'Write 10 pokemon names next to each other seperated by commas',
            'max_tokens': 120,
        })
    });

    if (!response.ok) {
        Swal.fire({
            title: response.status
        })
    }
    else {
        const dataVonKI = await response.json();
        console.log(dataVonKI);

        document.getElementById("pokemonNameContainer").innerText = dataVonKI.choices[0].text.trim();
    }
}

generatePokemonNames();

// Drag and Drop Action! 🛡️
DROPZONE.addEventListener("dragover", (e) => {
    e.preventDefault(); //dieses code blockiert das das bild auf dem body gestickt wird beim schweben auf dem body
});

DROPZONE.addEventListener("drop", (e) => {
    e.preventDefault();
    const imgURL = e.dataTransfer.getData('text/plain');
    const newImgContainer = document.createElement('img'); //im Background

    newImgContainer.src = imgURL;
    DROPZONE.appendChild(newImgContainer);
});

DRAGGEDIMAGE.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData('text/plain', DRAGGEDIMAGE.src);
});

// JS für übung seite
function doSomething() {
    alert("DU HAST ETWAS GEMACHT!");
}



// Wir suchen nach einem Bild - Element auf der Webseite und speichern es in der Variable "cardImage".

// Wir suchen nach einem Text - Element auf der Webseite und speichern es in der Variable "pokeName".

// Wir suchen nach einem Eingabefeld auf der Webseite und speichern es in der Variable "searchPoke".

// Wenn jemand im Eingabefeld eine Taste drückt und loslässt, überprüfen wir, ob es die "Enter" - Taste war.Wenn ja, rufen wir die Funktion "fetchpoke()" auf.

// Die Funktion "fetchpoke()" beginnt hier.

// Wir holen den Text aus dem Eingabefeld, entfernen Leerzeichen am Anfang und am Ende und machen alles zu Kleinbuchstaben.Dann speichern wir das Ergebnis in der Variable "valueOfSearch".

//     Wenn "valueOfSearch" leer ist, zeigen wir eine Meldung "No Name Given!" an und beenden die Funktion.

// Wir erstellen die Internetadresse, von der wir die Pokemon - Informationen abrufen wollen, und speichern sie in der Variable "apiEndPunkt".

// Wir holen die Informationen von der Internetadresse.

// Wenn wir die Informationen erfolgreich erhalten haben, verarbeiten wir sie.

// Wir ändern das Bild - Element, um das Bild des gesuchten Pokemons anzuzeigen.

// Wir ändern das Text - Element, um den Namen des gesuchten Pokemons anzuzeigen.

// Wenn etwas schief geht, zeigen wir eine Meldung "Pokemon not found or Network down" und den Fehler an.