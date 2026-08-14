const joke_Consume_Div = document.getElementById('joke_Consume_Div')
const joke_Creation_Div = document.getElementById('joke_Creation_Div')

const createJokeInput = document.getElementById("joke_Content_Inp");
const createAuthorInput = document.getElementById("joke_Author_Inp");

const jokeCreationPreview = document.getElementById("joke_label_Creation");
const jokeAuthorPreview = document.getElementById("author_label_Creation");

const spin_Btn = document.getElementById("spin_Btn");
const add_Btn = document.getElementById('add_Btn')

const heartBtn = document.getElementById('heartBtn')
const saveBtn = document.getElementById('saveBtn')

const createJokeBtn = document.getElementById("JokeCreateBtn");
const cancelJokeBnt = document.getElementById("JokeCancelBtn");

const jokeLable = document.getElementById("joke_label");
const authorLabel = document.getElementById("author_label");

const ServerMessage = document.getElementById('server_Message')
const SM_Btn = document.getElementById('SM_Btn')

const SAVED_JOKES_KEY = "SavedJokes"

let data_save = [];
let jokeRolling = false;
let LS_JokeArr = JSON.parse(localStorage.getItem(SAVED_JOKES_KEY)) || []

async function checkServerLive() {
    const timeout = setTimeout(() => {
        ServerMessage.style.display = "flex";

        checkServerLive()
    }, 3000)

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

function iconFillVisual(target,icon) {
    target.innerHTML = icon
}

function checkExistingJoke() {
    for (let object of LS_JokeArr) {
        if (object._id == data_save._id) {
            return object
        }
    }
    return true
}

function isJokeSaved(_id) {
    for (let object of LS_JokeArr) {
        if (object._id == _id) {
            return object
        }
    }

    return null
}

function removeLSJoke(_id) {
    for (let object of LS_JokeArr) {
        if (object._id == _id) {
            LS_JokeArr = LS_JokeArr.filter(object => object._id !== _id)

            iconFillVisual(saveBtn,`<i class="fa-regular fa-bookmark"></i>`)

            saveData()

            return object
        }
    }

    return null
}

function saveData() {
    localStorage.setItem(SAVED_JOKES_KEY, JSON.stringify(LS_JokeArr))
}

function LS_SaveJokes() {
    let existingJoke = checkExistingJoke()

    if (existingJoke) {
        removeLSJoke(existingJoke._id)

        return
    }

    console.log(data_save);
    

    if (data_save) {
        LS_JokeArr.push(data_save)
    }

    saveData()

    console.log(LS_JokeArr);

}

function JokePreviewDisplay() {
    let joke = createJokeInput.value;
    if (!joke) joke = "Joke here";


    let author = createAuthorInput.value;
    if (!author) author = "Author";

    jokeCreationPreview.textContent = joke;
    jokeAuthorPreview.textContent = author;
}

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

            let checkSaved = isJokeSaved(data._id)
            let ico

            if (checkSaved) {
                ico = `<i class="fa-solid fa-bookmark"></i>`
            } else {
                ico = `<i class="fa-regular fa-bookmark"></i>`
            }

            iconFillVisual(true,saveBtn,ico)


            setTimeout(function () {
                jokeRolling = false
            }, 100)

            data_save = data
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

async function getIP() {
    try {
        const response = await fetch('https://joke-generator-server-3il8.onrender.com/get-ip')
        const data = await response.json

        console.log(`IP: ${data}`);
    }
    catch (err) {
        console.log(`Error with fetching ip: ${err}`);
    }
}
getIP()

//button listeners
spin_Btn.addEventListener('click', (e) => {
    getJoke()
})

add_Btn.addEventListener('click', (e) => {
    joke_Creation_Div.style.display = 'flex'
    joke_Consume_Div.style.display = 'none'
})

cancelJokeBnt.addEventListener('click', (e) => {
    joke_Creation_Div.style.display = 'none'
    joke_Consume_Div.style.display = 'flex'
})

createJokeBtn.addEventListener("click", async () => {
    await postJoke();
    joke_Creation_Div.style.display = 'none'
    joke_Consume_Div.style.display = 'flex'
});

heartBtn.addEventListener('click', (e) => {

})

saveBtn.addEventListener('click', (e) => {
    LS_SaveJokes()
})



//input listeners
createJokeInput.addEventListener("input", () => {
    JokePreviewDisplay()
})

createAuthorInput.addEventListener("input", () => {
    JokePreviewDisplay()
})