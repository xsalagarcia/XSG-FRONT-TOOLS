/**
 * This is linked to cslider.css.
 */

const csliders = document.querySelectorAll(".cslider");
csliders.forEach((csliderDiv) => {
    csliderDiv.position = 0;
    csliderDiv.totalItems =  csliderDiv.querySelectorAll(".cslider>ul>li").length;
    csliderDiv.nextBtn = csliderDiv.querySelector(".cslider>.next");
    csliderDiv.prevBtn = csliderDiv.querySelector(".cslider>.prev");
    csliderDiv.prevBtn.style.visibility = 'hidden';
    if (csliderDiv.position > csliderDiv.totalItems + 2)
                csliderDiv.nextBtn.style.visibility = 'hidden';

    csliderDiv.querySelector(".cslider>.next").addEventListener('click', ()=>{
        csliderDiv.prevBtn.style.visibility = 'visible';
        csliderDiv.position++;
        csliderDiv.querySelectorAll(".cslider>ul>li").forEach((li) =>{
            const itemWidth = parseFloat(window.getComputedStyle(li).width);
            li.style.translate = `${- csliderDiv.position * itemWidth}px`;
        });
        if (csliderDiv.position >= csliderDiv.totalItems -1)
            csliderDiv.nextBtn.style.visibility = 'hidden';
    });
    csliderDiv.querySelector(".cslider>.prev").addEventListener('click', ()=>{

            csliderDiv.nextBtn.style.visibility = 'visible';
            csliderDiv.position--;
            csliderDiv.querySelectorAll(".cslider>ul>li").forEach((li) =>{
                const itemWidth = parseFloat(window.getComputedStyle(li).width);
                li.style.translate = `${-csliderDiv.position * itemWidth}px`;
            });
            if (csliderDiv.position < 1 )
                csliderDiv.prevBtn.style.visibility = 'hidden';
        
    });
});