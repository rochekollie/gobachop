/* Hide element by id */
const hide = (id) => {
    document.getElementById(id).style.display = 'none';
}

// Show element by id
const display = (id) => {
    document.getElementById(id).style.display = 'block';
}

const toggleMenu = () => {
    if (document.body.clientWidth < 1000) {
        hide('primary-menu');
    } else {
        display('primary-menu');
    }
}

//hide the menu when window loads
window.onload = function () {
    toggleMenu();
    swapIcons('menu-icon', 'primary-menu');
};

//Hide the mobile menu when window is resize
window.addEventListener('resize', function () {
    toggleMenu();
    let icon = document.getElementById('menu-icon');
    icon.innerText = 'menu';
});


//Toggle the menu on click
const swapIcons = (id, target) => {
    document.getElementById(id).addEventListener('click', function () {
        let newTarget = document.getElementById(target);
        let icon = document.getElementById('menu-icon');
        if (icon.innerText === 'menu') {
            icon.innerText = 'menu_open';
            newTarget.style.display = 'block';
        } else {
            icon.innerText = 'menu';
            newTarget.style.display = 'none';
            newTarget.classList.add('show-menu');
        }
    });
}