let date = new Date()
let dateYear = date.getFullYear()//год
let dateMonth = date.getMonth()//месяц
let dateDate = date.getDate()//число
let dateDay = date.getDay()//день недели
let dateHours = date.getHours()//часы
let dateMinutes = date.getMinutes()//минуты
let dateSeconds = date.getSeconds()//секунды
console.info(dateYear)
console.info(dateMonth)
console.info(dateDate)
console.info(dateDay)
console.info(dateHours + ":" + dateMinutes + "." + dateSeconds)
const info = document.getElementById("info")
const I = document.getElementById("I")
const bathroom = document.getElementById("bathroom")
const kitchen = document.getElementById("kitchen")
const living_room = document.getElementById("living_room")
const bedroom = document.getElementById("bedroom")
const exit = document.getElementById("exit")
const URL = new URLSearchParams(window.location.search);
const typeURL = URL.get('type');

function loop() {
    while (dateYear === 2025) {
        if (typeURL === "T-REX.ik") {//всегда когда тип формы это трексик
        }
        if (typeURL === "0024") {//всегда когда тип формы это код трексик
        }
        console.log("yes")
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
I.onclick = function () {
    if (!typeURL) {
        alert('не отправлена форма')
    } else {
        I.style.display = "none"
    }
}