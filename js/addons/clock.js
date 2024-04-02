document.querySelectorAll(".clock").forEach((clock) => {
    const setTime = function(clock) {
        const now = new Date();
        console.log(now.getSeconds());
        clock.querySelector(".seconds").style.transform=`rotate(${(now.getSeconds()/60)}turn)`;
        clock.querySelector(".minutes").style.transform=`rotate(${now.getMinutes()/60}turn)`;
        clock.querySelector(".hours").style.transform=`rotate(${(now.getHours()%12)/12}turn)`;
    }
    setTime(clock);
    
    setInterval(setTime, 1000, clock);
});