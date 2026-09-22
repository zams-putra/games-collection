const playButtons = document.querySelectorAll('.play-button')

playButtons.forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.add('loading')

        setTimeout(() => {
            button.classList.remove('loading')
        }, 300)
    })
})