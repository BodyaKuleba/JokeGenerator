const createJokeInput = document.getElementById("joke_Content_Inp");
const createAuthorInput = document.getElementById("joke_Author_Inp");

const jokeCreationPreview = document.getElementById("joke_label_Creation");
const jokeAuthorPreview = document.getElementById("author_label_Creation");

const spinJokeBtn = document.getElementById("spin_Btn");

const createJokeBtn = document.getElementById("JokeCreateBtn");
const cancelJokeBnt = document.getElementById("JokeCancelBtn");

const jokeLable = document.getElementById("joke_label");
const authorLabel = document.getElementById("author_label");

const ServerMessage = document.getElementById('server_Message')
const SM_Btn = document.getElementById('SM_Btn')

let data_save = [];
let jokeRolling = false;

spinJokeBtn.addEventListener('click', (e) => {
    getJoke()
})

async function checkServerLive() {
    const timeout = setTimeout(()=>{
        ServerMessage.style.display = "flex";

        checkServerLive()
    },3000)

    try {
        const response = await fetch("https://joke-generator-server-3il8.onrender.com/health");

        if (response.ok) {
            clearTimeout(timeout)
            ServerMessage.style.display = "none";
            getJoke()
        }

        console.log(response);
    } catch (error) {
        ServerMessage.style.display = "flex"
    }
}

checkServerLive()

function JokePreviewDisplay() {
    let joke = createJokeInput.value;
    if (!joke) joke = "Joke here";

    let author = createAuthorInput.value;
    if (!author) author = "Author";

    jokeCreationPreview.textContent = joke;
    jokeAuthorPreview.textContent = author;
}

createJokeInput.addEventListener("input", () => {
    JokePreviewDisplay()
})

createAuthorInput.addEventListener("input", () => {
    JokePreviewDisplay()
})

async function getJoke() {
    if (jokeRolling == true) {
        return
    }

    jokeRolling = true

    jokeLable.textContent = "Fetching..."
    authorLabel.textContent = "Fetching..."

    await fetch("https://joke-generator-server-3il8.onrender.com/random-joke")
        .then(response => response.json())
        .then(data => {
            console.log(data);

            jokeLable.textContent = data.content
            authorLabel.textContent = data.author

            setTimeout(function () {
                jokeRolling = false
            }, 100)

            // data_save = []
            // data_save.push(data_save)
        })
        .catch(error => {
            jokeRolling = false
        })
}

getJoke()

async function postJoke() {
    try {
        const content = createJokeInput.value;
        const author = createAuthorInput.value;

        const response = await fetch("https://joke-generator-server-3il8.onrender.com/joke", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content, author })
        });

        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

createJokeBtn.addEventListener("click", async () => {
    await postJoke();
});