// ! 1. Bizga kerak bo'lgan barcha teglarni chaqirib olamiz
// ! 2. Ma'lumotlarni fetch qilamiz option laga olib kelib olami
// ! 3. Ma'lumotlarni option laga beramiz
// ! 4. Malumotlarni Convert qilamiz

const amount = document.getElementById("amount")
const forma = document.getElementById('forma')
const from = document.getElementById('from')
const to = document.getElementById('to')
const res = document.getElementById('res')


let allData = []
// all url
const url = 'https://api.exchangerate.host/convert'
const symbleUrl = "https://api.exchangerate.host/symbols"

async function fetched() {
    try {
        const resp = await fetch(symbleUrl)
        const { symbols } = await resp.json()
        // console.log(symbols);
        allData = Object.values(symbols) // bu objectni hamm qiymatlarin bitta arrayga yigib beradi 
        showContainer(allData)
    } catch (error) {

    }
}

function showContainer(data) {
    let res = ''
    data.forEach(element => {
        res += `
        <option  value=${element.code}>${element.description}</option>
        `
    });
    from.innerHTML = res
    to.innerHTML = res
}
document.addEventListener('DOMContentLoaded', () => {
    fetched()
})

forma.addEventListener('submit', onSubmit)
async function onSubmit(e) {
    e.preventDefault()
    try {
        const resp = await fetch(url + `?from=${from.value}&to=${to.value}&amount=${amount.value}`)
        const data = await resp.json()
        // console.log(data);
        res.innerHTML = `${data.query.amount} ${data.query.from} = ${data.result} ${data.query.to}`
    } catch (error) {

    }
}