async function getJoke() {
    await fetch("http://localhost:3000/jokes")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}

