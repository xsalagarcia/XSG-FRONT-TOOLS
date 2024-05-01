(function(){
    const percentageRevelation = 0.5; //when the appearing section will change (0.5 is at half window).
    window.addEventListener("scroll", ()=>{
        let windowHeight = window.innerHeight;
        document.querySelectorAll(".appearing-section").forEach(element => {
            let top = element.getBoundingClientRect().top; // From size and position of the rectangle, get the top.
            if (top < windowHeight - windowHeight * percentageRevelation){
                element.classList.add("active");
            } else {
                element.classList.remove("active");
                console.log("inactive")
            }
        });
    });
}());