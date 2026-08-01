let data_save = []

UI_Elements.Buttons.Add_Btn.addEventListener('click', (e) => {
})

UI_Elements.Buttons.Spin_Btn.addEventListener('click', (e) => {
    getJoke()
})



UI_Elements.Inputs.joke_Inp.addEventListener('input', (e) => {
    CardDisplay()
})

UI_Elements.Inputs.author_Inp.addEventListener('input', (e) => {
    CardDisplay()
})

function CardDisplay() {

    if (content.length > 0) {
        joke_Inp_Short.textContent = content
    } else {
        joke_Inp_Short.textContent = 'Joke here'
    }
    if (author.length > 0) {
        author_Inp_Short.textContent = author
    } else {
        author_Inp_Short.textContent = 'User'
    }
}

async function getJoke() {
    await fetch("https://joke-generator-server-3il8.onrender.com/random-joke")
        .then(response => response.json())
        .then(data => {
            console.log(data);

            UI_Elements.Labels.joke_Label.textContent = data.content
            UI_Elements.Labels.author_Label.textContent = data.author

            // data_save = []
            // data_save.push(data_save)
        })
}
getJoke()



async function postJoke(joke, author) {

}

