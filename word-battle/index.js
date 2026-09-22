const terminalP1 = document.querySelector('.terminal-1')
const terminalP2 = document.querySelector('.terminal-2')

const kucing1 = document.querySelector('.kucing1')
const kucing2 = document.querySelector('.kucing2')

let displayP1 = ''
let displayP2 = ''

const keypadP1 = document.querySelector('.keypad-1')
const keypadP2 = document.querySelector('.keypad-2')

keypadP1.addEventListener('click', (e) => {
    const btn = e.target.closest('button')
    if(!btn) return

    const btnVal = btn.value
    if(btnVal === 'submit'){
        handleSubmit(displayP1, 1)
        displayP1 = ''
    } else if(btnVal === "del"){
        displayP1 = displayP1.slice(0, -1)
    } else {
        displayP1 += btnVal
    }

    terminalP1.textContent = displayP1

})
keypadP2.addEventListener('click', (e) => {
    const btn = e.target.closest('button')
    if(!btn) return

    const btnVal = btn.value
    if(btnVal === 'submit'){
         handleSubmit(displayP2, 2)
        displayP2 = ''
    } else if(btnVal === "del"){
        displayP2 = displayP2.slice(0, -1)
    } else {
        displayP2 += btnVal
    }

    terminalP2.textContent = displayP2
})

let correctAns = 0






let hp1 = document.querySelector('.hp-1')
let hp2 = document.querySelector('.hp-2')

let hpPoints1 = 100
let hpPoints2 = 100

hp1.textContent = hpPoints1 + " HP"
hp2.textContent = hpPoints2 + " HP"

const quiz = document.querySelector('.quiz')



const quizes = [
    {
        "question": "Ayah lebih tua dari Ibu, Ibu lebih tua dari Kakak. Siapa yang paling tua?",
        "true_answer": "ayah",
        "explanation": "Ayah > Ibu > Kakak, jadi Ayah paling tua"
    },
    {
        "question": "Aku punya sayap tapi bukan burung, aku punya sengat tapi bukan pisau. Aku apa?",
        "true_answer": "lebah",
        "explanation": "Lebah punya sayap untuk terbang dan sengat untuk melindungi diri"
    },
    {
        "question": "Semakin banyak diambil, semakin besar lubangnya. Apakah itu?",
        "true_answer": "lubang",
        "explanation": "Lubang akan semakin besar jika terus digali/diambil"
    },
    {
        "question": "Aku punya kunci tapi bukan pintu, aku punya papan tapi bukan kayu. Aku apa?",
        "true_answer": "piano",
        "explanation": "Piano punya tuts yang disebut 'kunci' dan papan tuts"
    },
    {
        "question": "Budi punya 3 apel, dikasih adiknya 2 apel lagi, lalu dimakan 1. Sisa berapa?",
        "true_answer": "empat",
        "explanation": "3 + 2 - 1 = 4"
    },
    {
        "question": "Benda apa yang punya gigi tapi tidak bisa menggigit?",
        "true_answer": "sisir",
        "explanation": "Sisir punya gerigi seperti gigi tapi fungsinya untuk merapikan rambut"
    },
    {
        "question": "Aku selalu datang tapi tidak pernah sampai hari ini. Aku apa?",
        "true_answer": "besok",
        "explanation": "Besok selalu 'datang' tapi begitu tiba, ia berubah jadi 'hari ini'"
    },
    {
        "question": "Semakin dikeringkan, semakin basah jadinya. Apakah itu?",
        "true_answer": "handuk",
        "explanation": "Handuk dipakai untuk mengeringkan, tapi ia sendiri jadi makin basah"
    },
    {
        "question": "Ada 5 burung di pohon, 2 ditembak. Sisa berapa burung?",
        "true_answer": "nol",
        "explanation": "Suara tembakan membuat semua burung yang tersisa kabur terbang"
    },
    {
        "question": "Aku punya kota tapi tidak ada rumah, aku punya gunung tapi tidak ada pohon, aku punya air tapi tidak ada ikan. Aku apa?",
        "true_answer": "peta",
        "explanation": "Peta menggambarkan kota, gunung, dan air tapi hanya berupa gambar"
    }
]


let currQ = null

function generateQ() {
    const randQ = Math.floor((Math.random() * quizes.length))
    currQ = quizes[randQ]
    quiz.textContent = currQ.question
}
generateQ()



function trueAns(ans){
    return ans.toLowerCase().trim() === currQ.true_answer.toLowerCase().trim()
}

function showExplanation(text, isCorrect) {
    const popup = document.querySelector('.explanation-popup')
    popup.textContent = (isCorrect ? "✅ Benar" : "❌ Salah") + text
    popup.classList.add('show')
    setTimeout(() => {
        popup.classList.remove('show')
        generateQ()
    }, 2000)
}

function handleSubmit(answer, player){
    const isCorrect = trueAns(answer)

    if(isCorrect){
        if(player === 1){
            hpPoints2 -= 10
            hp2.textContent = hpPoints2 + " HP"
            kucing1.src = "img/car1.jpg"
            setTimeout(() => { kucing1.src = "img/car0.jpg" }, 1000)
        } else {
            hpPoints1 -= 10
            hp1.textContent = hpPoints1 + " HP"
            kucing1.src = "img/car1.jpg"
            setTimeout(() => { kucing1.src = "img/car0.jpg" }, 1000)
        }
    } else {
        if(player === 1){
            hpPoints1 -= 10
            hp1.textContent = hpPoints1 + " HP"
        } else {
            hpPoints2 -= 10
            hp2.textContent = hpPoints2 + " HP"
        }
        kucing2.src = "img/car1.jpg"
        setTimeout(() => { kucing2.src = "img/car0.jpg" }, 1000)
    }

   
    showExplanation(currQ.explanation, isCorrect)
}