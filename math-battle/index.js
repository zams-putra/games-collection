const terminalP1 = document.querySelector('.terminal-1')
const terminalP2 = document.querySelector('.terminal-2')

let displayP1 = ''
let displayP2 = ''

const numpadP1 = document.querySelector('.numpad-1')
const numpadP2 = document.querySelector('.numpad-2')



numpadP1.addEventListener('click', (e) => {
    const btn = e.target.closest('button')
    if(!btn) return

    const btnVal = btn.value
    if(btnVal === 'submit'){
        handleSubmit(btnVal)
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
        handleSubmit(btnVal)
        displayP2 = ''
    } else if(btnVal === "del"){
        displayP2 = displayP2.slice(0, -1)
    } else {
        displayP2 += btnVal
    }

    terminalP2.textContent = displayP2


})


function handleSubmit(value) {
  console.log('submitted:', value);
}