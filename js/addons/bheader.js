//with bheader.css

(function () {
    const btn_menu = document.querySelector('.bheader-icon')
    if (btn_menu) {
        btn_menu.addEventListener('click', () => {
            const menu_items = document.querySelector('.bheader ul')
            menu_items.classList.toggle('show') //to put or remove this class
            btn_menu.classList.toggle('show')
        })
        
    }
})();
        

