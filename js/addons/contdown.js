/** Contdown logic. The script look for all containers that have contdown class and fill the 
 * spans that have the classes contdown-days, contdown-hours, contdown-minutes, contdown-seconds with
 * the appropiate content.
 * The container with contdown class needs a referenceDateTime attribute with ISO-8601 date-time format.
 * No css file is needed.
 * **/
/** Author: xsg */
/*
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="js/addons/contdown.js" defer></script> <!-- !!! -->
    <title>Document</title>
</head>

<body>

    <div class="contdown" referenceDateTime="2024-03-27T07:25:30"><!--ISO-8601 format-->
        <p>
            Queden <b><span class="contdown-days"></span></b> dies, <b><span class="contdown-hours"></span></b> hores,
            <b><span class="contdown-minutes"></span></b> minuts i <b><span class="contdown-seconds"></span> segons</b>
        </p>
    </div>
</body>

</html>
 */

document.querySelectorAll(".contdown").forEach((contdown) => {
    contdown.parsedReferenceDateTime = new Date(contdown.getAttribute('referenceDateTime'));
    if (contdown.parsedReferenceDateTime != 'Invalid Date') {
        contdown.originalInnerHTML = contdown.innerHTML;
        contdown.updateIntervalId = setInterval(updateContdown, 1000, contdown);
        updateContdown(contdown);
    } else {
        console.error(`Invalid date at ${contdown}`);
    }            
})

function updateContdown(contdown) {
    const now = new Date();
    const timeDifference = Math.trunc((contdown.parsedReferenceDateTime - now)/1000); //just seconds
    if (timeDifference > 0) {
        const days = Math.trunc(timeDifference / 86400); //86400 seconds in a day
        const hours = Math.trunc((timeDifference % 86400) / 3600); //secons in an hour
        const minutes = Math.trunc((timeDifference % 3600) / 60);
        const seconds = Math.trunc((timeDifference % 60))
        contdown.querySelector(".contdown-seconds").textContent = seconds;
        contdown.querySelector(".contdown-minutes").textContent = minutes;
        contdown.querySelector(".contdown-hours").textContent = hours;
        contdown.querySelector(".contdown-days").textContent = days;
    } else {
        contdown.querySelector(".contdown-seconds").textContent = 0;
        contdown.querySelector(".contdown-minutes").textContent = 0;
        contdown.querySelector(".contdown-hours").textContent = 0;
        contdown.querySelector(".contdown-days").textContent = 0;
        clearInterval(contdown.updateIntervalId);
    }
}