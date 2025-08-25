let date = new Date()
let dateYear = date.getFullYear()//год
let dateMonth = date.getMonth()//месяц
let dateDate = date.getDate()//число
let dateDay = date.getDay()//день недели
const info = document.getElementById("info")
const I = document.getElementById("I")
const bathroom = document.getElementById("bathroom")
const kitchen = document.getElementById("kitchen")
const living_room = document.getElementById("living_room")
const bedroom = document.getElementById("bedroom")
const exit = document.getElementById("exit")
const URL = new URLSearchParams(window.location.search);
const typeURL = URL.get('type');
const yearsURL = URL.get('years');

function loop() {
    while (typeURL) {
        console.log(yearsURL)
    }
}
I.onclick = function () {
    if (!typeURL) {
        alert('не отправлена форма')
    } else {
        I.style.display = "none"
    }
}
bathroom.onclick = function () {
}
kitchen.onclick = function () {
}
living_room.onclick = function () {
}
bedroom.onclick = function () {
}
exit.onclick = function () {
}
loop()