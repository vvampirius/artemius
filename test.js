const submit = document.getElementById('submit')
const form1 = document.getElementById('form2,1')
const form2 = document.getElementById('form2,2')
const form3 = document.getElementById('form2,3')
const form4 = document.getElementById('form2,4')
const form5 = document.getElementById('form2,5')
const form6 = document.getElementById('form2,6')
const form7 = document.getElementById('form2,7')
const form8 = document.getElementById('form2,8')
const form9 = document.getElementById('form2,9')
const form10 = document.getElementById('form2,10')
//пустая строка между переменными и действиями
submit.onclick = function() {
    alert(`${form1.value} ${form2.value}`)
    alert(`${form3.value} ${form4.value}`)
    alert(`${form5.value} ${form6.value}`)
    alert(`${form7.value} ${form8.value}`)
    alert(`${form9.value} ${form10.value}`)
}