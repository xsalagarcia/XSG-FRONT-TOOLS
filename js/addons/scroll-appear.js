(function(){
    const percentageRevelation = 0; /* [0-1] */
    const appearingElements = document.querySelectorAll('[class^="scroll-appear-"],[class*=" scroll-appear-"]');
    function check(){
        const appearAt = window.innerHeight * (1 - percentageRevelation);
        appearingElements.forEach(appearingElement => {
            const top = appearingElement.getBoundingClientRect().top;
            if (top < appearAt)
                appearingElement.classList.add("show");
        });
    }
    window.addEventListener("scroll", ()=>{
        check();
    });
    check();
}());