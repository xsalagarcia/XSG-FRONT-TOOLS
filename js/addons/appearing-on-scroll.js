(function(){
    const percentageRevelation = 0.5; //when the appearing section will change (0.5 is at half window).
    const appearingSections = document.querySelectorAll(".appearing-section");
    window.addEventListener("scroll", ()=>{
        const windowHeight = window.innerHeight;
        appearingSections.forEach(element => {
            const top = element.getBoundingClientRect().top; // From size and position of the rectangle, get the top.
            if (top < windowHeight - windowHeight * percentageRevelation){
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        });
    });
}());