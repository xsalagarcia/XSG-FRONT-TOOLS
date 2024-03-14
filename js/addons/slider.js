/**
 * This is linked to slider.css.
 */

//By this way, we can have several .slides in the same document, each with several (different number) images
const lists = document.querySelectorAll(".slides>ul");
lists.forEach((list, index) =>{
    list.showingItem = 0; //new attribute, that indicates the showing item.
});

function changeImage2() {
    //const remInPx = parseFloat(window.getComputedStyle(document.documentElement).fontSize); <- not necessary, but useful. Converts rem in px.   
    lists.forEach((list, listIndex) => {
        let items = list.children;
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++){
            const itemWidth = parseFloat(window.getComputedStyle(items[itemIndex]).width);
            const newPosition = - itemWidth * list.showingItem;
            items[itemIndex].style.translate = `${newPosition}px`;
        }
        list.showingItem = (list.showingItem + 1) % list.childElementCount;
    });
}

changeImage2();
setInterval(changeImage2, 5000);