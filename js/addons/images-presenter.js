function changeImage(imagePresenter){
    const imgs = imagePresenter.querySelectorAll("img");
    imgs[imagePresenter.index].classList.toggle("active");
    imagePresenter.index = (imagePresenter.index +1) % imgs.length;
    imgs[imagePresenter.index].classList.toggle("active");
}

document.querySelectorAll(".images-presenter").forEach((imagePresenter) => {
    imagePresenter.index = 0;
    
    if (!imagePresenter.querySelectorAll("img.active").length) {
        const firstImage = imagePresenter.querySelector("img");
        if (firstImage)
            firstImage.classList.toggle("active");
        
    }
    
    imagePresenter.intervalId = setInterval(changeImage, 5000, imagePresenter);

    /*When clicked, a change occurs. Comment this function if don't want*/
    imagePresenter.addEventListener("click", () => {
        clearInterval(imagePresenter.intervalId);
        changeImage(imagePresenter);
        imagePresenter.intervalId = setInterval(changeImage, 4000, imagePresenter);
    });

});