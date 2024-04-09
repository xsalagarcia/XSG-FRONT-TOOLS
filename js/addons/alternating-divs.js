document.querySelectorAll(".alternating-divs").forEach(alternatingDivs=> {
    const childrenDivs = [];
    
    const childrens = alternatingDivs.children
    for (let i = 0; i< childrens.length; i++){
        if (childrens[i] instanceof HTMLDivElement)
            childrenDivs.push(childrens[i])
    }
    let active = 0;
    childrenDivs[0].classList.toggle("active");
    setInterval((event)=>{
        childrenDivs[active].classList.toggle("active");
        active = (active + 1) % childrenDivs.length;
        childrenDivs[active].classList.toggle("active");
    },parseInt(alternatingDivs.getAttribute("alternating-divs-time"))?
        parseInt(alternatingDivs.getAttribute("alternating-divs-time")): 5000);
});
