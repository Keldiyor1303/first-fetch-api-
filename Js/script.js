let sName = "hulk"
let page = 1
let clonPage = page

const getMovies = async function () {
    const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=fd9e14cd&s=${sName}&page=${page}`)

    const datas = await response.json()
    console.log(datas)

    listAdd(datas)
}

getMovies()



// let page = 1
// displaymovies("hulk", page)

function listAdd(datas) {

    const ulList = document.querySelector(".list")

    ulList.innerHTML = null

    const data = datas["Search"]

    data.forEach(element => {
        const li = document.createElement("li")
        li.innerHTML = `
            <img src="${(element.Poster == "N/A") ? "https://www.glamflame.net/wp-content/uploads/2020/01/Image-Placeholder.png" : element.Poster}" alt="${element.Poster}">
            <div class="info">
                <h3>${element.Title}</h3>
                <p>${element.Year}</p>
            </div>
        `
        ulList.appendChild(li)

    })


    const buttons = document.querySelector(".buttons")
    buttons.innerHTML = null

    let number = 0

    const numbers = Number(datas["totalResults"])

    number = (numbers % 10 == 0) ? parseInt(numbers / 10) : parseInt(numbers / 10) + 1

    for (let num = 0; num < number; num++) {
        const button = document.createElement("div")
        button.innerText = String(num + 1)
        buttons.appendChild(button)

        // button.id = `btn-${num + 1}`
        button.classList.add("btn")
    }

    const tugmalar = document.querySelectorAll(".btn")
    console.log(tugmalar)

    tugmalar.forEach(tugma => {
        const input = document.querySelector("input")


        tugma.addEventListener("click", function () {
            page = Number(tugma.textContent)
            clonPage = page
            // tugma.classList.add("active")
            getMovies()
        })
    })

    tugmalar.forEach(tugma => {
        if (Number(tugma.textContent) == clonPage) tugma.classList.add("active")
    })
}

const input = document.querySelector("input")

input.addEventListener("change", function () {
    sName = input.value
    page = 1
    clonPage = page
    getMovies()

})


// const next = document.querySelector(".next")
// next.addEventListener("click", function () {
//     page++
// })