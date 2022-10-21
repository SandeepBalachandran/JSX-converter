const toggler = document.querySelector('.navbar-toggler')
const navbar = document.getElementById('navbarCover')
console.log(toggler)
toggler.addEventListener('click', () => {
    const classes = toggler.classList;
    if ([...classes].includes('closed')) {
        classes.remove('closed')
        classes.add('opened')
    } else {
        classes.remove('opened')
        classes.add('closed')
    }
    navbar.classList.toggle('show')
})