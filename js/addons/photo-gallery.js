document.querySelectorAll(".photo-gallery").forEach((photoGallery) =>{

    /**This bloc constructs the elements to watch the image on a big format when clicked*/
        const backgroundDiv = document.createElement("div");
        backgroundDiv.classList.add("photo-gallery-big-img-background-div");

        const bigImgContainer = document.createElement("div");
        bigImgContainer.classList.add("photo-gallery-big-img-container");
        backgroundDiv.appendChild(bigImgContainer);

        const backgroundCloseDiv = document.createElement("div");
        backgroundCloseDiv.classList.add("photo-gallery-background-close-div");
        backgroundCloseDiv.appendChild(document.createElement("div"));
        backgroundCloseDiv.appendChild(document.createElement("div"));
        bigImgContainer.appendChild(backgroundCloseDiv);
        
        const img = document.createElement("img");
        img.classList.add("photo-gallery-big-img");
        bigImgContainer.appendChild(img);

        const photoGalleryBackgroundPrevDiv = document.createElement("div");
        photoGalleryBackgroundPrevDiv.appendChild(document.createElement("div"));
        photoGalleryBackgroundPrevDiv.appendChild(document.createElement("div"));
        photoGalleryBackgroundPrevDiv.classList.add("photo-gallery-background-prev-div");
        bigImgContainer.appendChild(photoGalleryBackgroundPrevDiv);

        const photoGalleryBackgroundNextDiv = document.createElement("div");
        photoGalleryBackgroundNextDiv.appendChild(document.createElement("div"));
        photoGalleryBackgroundNextDiv.appendChild(document.createElement("div"));
        photoGalleryBackgroundNextDiv.classList.add("photo-gallery-background-next-div");
        bigImgContainer.appendChild(photoGalleryBackgroundNextDiv);

        backgroundCloseDiv.addEventListener("click", ()=>{backgroundDiv.classList.remove("show")});
        backgroundDiv.addEventListener("click", (e)=>{
            if(e.target == backgroundDiv) backgroundDiv.classList.remove("show") });
        photoGalleryBackgroundNextDiv.addEventListener("click", ()=> {
            let nextSibling = backgroundDiv.currentShowing.nextElementSibling;
            if (!nextSibling || nextSibling.tagName != "FIGURE")
                nextSibling = photoGallery.firstElementChild;
            img.setAttribute("src", nextSibling.getAttribute("photo-gallery-big-src"));
            backgroundDiv.currentShowing = nextSibling;
        })
        photoGalleryBackgroundPrevDiv.addEventListener("click", ()=> {
            let nextSibling = backgroundDiv.currentShowing.previousElementSibling;
            if (!nextSibling || nextSibling.tagName != "FIGURE")
                nextSibling = photoGallery.lastElementChild;
            img.setAttribute("src", nextSibling.getAttribute("photo-gallery-big-src"));
            backgroundDiv.currentShowing = nextSibling;
        })

        document.body.insertBefore(backgroundDiv, photoGallery.nextElementSibling);
    /*The end of the block of elements to wath the image on a big format when clicked*/


    photoGallery.querySelectorAll("figure").forEach((figure) => {
        figure.addEventListener("click", () => {
            console.log(figure.getAttribute("photo-gallery-big-src"));
            img.setAttribute("src", figure.getAttribute("photo-gallery-big-src"));
            backgroundDiv.classList.add("show");
            backgroundDiv.currentShowing = figure;
        })
    });

});