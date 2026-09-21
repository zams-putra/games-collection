const terminalP1 = document.querySelector('.terminal-1')
const terminalP2 = document.querySelector('.terminal-2')

const kucing1 = document.querySelector('.kucing1')
const kucing2 = document.querySelector('.kucing2')

let displayP1 = ''
let displayP2 = ''

const numpadP1 = document.querySelector('.numpad-1')
const numpadP2 = document.querySelector('.numpad-2')

numpadP1.addEventListener('click', (e) => {
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
numpadP2.addEventListener('click', (e) => {
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

const operators = ["+", "-",]


let randomOperator = ""



function generateQ() {
    const a = Math.round((Math.random() * 100) + 50)
    const b = Math.round((Math.random() * 50) + 1)
    const op = operators[Math.floor(Math.random() * operators.length) ]

    switch (op) {
        case "+":
            correctAns = a + b
            break;
        case "-":
            correctAns = a - b
            break;
    }


    quiz.textContent = `${a} ${op} ${b} = ?`
}
generateQ()



function trueAns(n){
    if(Number(n) === correctAns){
        return true
    }

    return false
}

function handleSubmit(answer, player){
    const isCorrect = trueAns(answer)

    if(isCorrect){
        if(player === 1){
            hpPoints2 -= 10
            hp2.textContent = hpPoints2 + " HP"
            setTimeout(() => {
                kucing1.src = "img/car0.jpg"
            }, 1000);
            kucing1.src = "img/car1.jpg"
        } else {
            hpPoints1 -= 10
            hp1.textContent = hpPoints1 + " HP"
            setTimeout(() => {
                kucing1.src = "img/car0.jpg"
            }, 1000);
            kucing1.src = "img/car1.jpg"
        }

        generateQ()
    } else {
        if(player === 1){
            hpPoints1 -= 10
            hp1.textContent = hpPoints1 + " HP"
            kucing2.src = "img/car1.jpg"
            setTimeout(() => {
                kucing2.src = "img/car0.jpg"
            }, 1000);
        } else {
            hpPoints2 -= 10
            hp2.textContent = hpPoints2 + " HP"
            kucing2.src = "img/car1.jpg"
            setTimeout(() => {
                kucing2.src = "img/car0.jpg"
            }, 1000);
        }
    }
}