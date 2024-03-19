/**
 * This is linked to cislider.css.
 */

/**Represents all the cislider */
const cisliders = document.querySelectorAll(".cislider");

/**
 * Populates the cislider-navigation with nav cislider-circles.
 * @param {Element} div The div with cislider-navigation class.
 * @param {Number} totalItems The number of items.
 */
function populateNavigation(div, totalItems, cisliderDiv) {
    cisliderDiv.circles = []
    for (let i = 0; i < totalItems; i++) {
        const circle = document.createElement("span");
        circle.classList.add("cislider-circle");
        div.appendChild(circle);
        cisliderDiv.circles.push(circle);
        circle.addEventListener("click", () => {
            cisliderDiv.circles[cisliderDiv.position].classList.remove("active");
            cisliderDiv.position = i;
            setCisliderVisibleImage(cisliderDiv);
        });
    }
    cisliderDiv.circles[0].classList.add("active");
}

/**
 * Changes the image of the cislider.
 * @param {Element} cisliderDiv The cislider.
 */
function setCisliderVisibleImage(cisliderDiv){
    if (cisliderDiv.nextBtn)
        cisliderDiv.nextBtn.style.visibility = (cisliderDiv.position >= cisliderDiv.totalItems -1)? 'hidden' : 'visible';
    if (cisliderDiv.prevBtn)
        cisliderDiv.prevBtn.style.visibility = (cisliderDiv.position < 1)? 'hidden' : 'visible';
    if (cisliderDiv.circles)
        cisliderDiv.circles[cisliderDiv.position].classList.add("active");
    
        cisliderDiv.querySelectorAll(".cislider>ul>li").forEach((li) =>{
            const itemWidth = parseFloat(window.getComputedStyle(li).width);
            li.style.translate = `${- cisliderDiv.position * itemWidth}px`;
        });
}



cisliders.forEach((cisliderDiv) => {
    cisliderDiv.position = 0;
    cisliderDiv.totalItems =  cisliderDiv.querySelectorAll(".cislider>ul>li").length;
    cisliderDiv.nextBtn = cisliderDiv.querySelector(".cislider>.cislider-next");
    cisliderDiv.prevBtn = cisliderDiv.querySelector(".cislider>.cislider-prev");
    const divNavigation = cisliderDiv.querySelector(".cislider>.cislider-navigation");
    if (divNavigation)
        cisliderDiv.cisliderCirclers = populateNavigation(divNavigation, cisliderDiv.totalItems, cisliderDiv);


    if (cisliderDiv.nextBtn) {
        if (cisliderDiv.position >= cisliderDiv.totalItems -1)
            cisliderDiv.nextBtn.style.visibility = 'hidden';
        cisliderDiv.nextBtn.addEventListener('click', ()=>{
            if (cisliderDiv.circles)
                cisliderDiv.circles[cisliderDiv.position].classList.remove("active");
            cisliderDiv.position++;
            setCisliderVisibleImage(cisliderDiv);
        });
    }
    if (cisliderDiv.prevBtn) {
        cisliderDiv.prevBtn.style.visibility = 'hidden';
        cisliderDiv.prevBtn.addEventListener('click', ()=>{
            if (cisliderDiv.circles)
                cisliderDiv.circles[cisliderDiv.position].classList.remove("active");
            cisliderDiv.position--;
            setCisliderVisibleImage(cisliderDiv);
        });
    }
});