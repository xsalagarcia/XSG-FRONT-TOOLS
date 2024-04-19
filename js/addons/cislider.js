/*This is linked to cislider.css*/

/**
 * Cislider class represents a cislider. A slider that can have index, prev and next button.
 * See cislider.css for how to use it.
 * This is linked to cislider.css.
 */
class Cislider {
    
    /**The active slide. */
    position;

    /**The number of items. */
    totalItems;

    /**Reference to next button (A span). */
    nextBtn;

    /**Reference to previous button (A span). */
    prevBtn;

    /**Reference to the div that contains the index .*/
    index;

    /**A list that contains the references to each div showed as a circle in the index. */
    indexCircles = null;

    /**interval id to stop autochange. */
    intervalId;

    /**A list with ul>li */
    listItems;

    /**
     * 
     * @param {HTMLDivElement} cisliderDiv 
     */
    constructor(cisliderDiv){
        if (!(cisliderDiv instanceof HTMLDivElement) && !cisliderDiv.classList.contains("cislider"))
            throw new TypeError("HTMLDivElement with cislider class was expected");
        
        this.position = 0;
        this.totalItems = cisliderDiv.querySelectorAll(".cislider>ul>li").length;
        this.listItems = cisliderDiv.querySelectorAll(".cislider>ul>li");

        const options = cisliderDiv.getAttribute("cisliderOptions").split(" ");

        options.forEach(option => {
            if (/\binterval(?:\d+)?\b/.test(option)){
                let timeInterval = parseInt(option.replace(/^\D+/g, ''));
                if (!timeInterval)
                    timeInterval = 5000;

                this.intervalId = setInterval(this.autoChange, timeInterval, this)
            }

            switch(option) {
                case "prev":
                    this.prevBtn = document.createElement("span");
                    this.prevBtn.classList.add("cislider-prev");
                    cisliderDiv.insertBefore(this.prevBtn, cisliderDiv.firstChild);
                    this.prevBtn.addEventListener('click', ()=>{
                        if (this.indexCircles)
                        this.indexCircles[this.position].classList.remove("active");
                        this.position--;
                        this.setCisliderVisibleImage();
                    });
                    break;
                case "next":
                    this.nextBtn = document.createElement("span");
                    this.nextBtn.classList.add("cislider-next");
                    cisliderDiv.appendChild(this.nextBtn);
                    this.nextBtn.addEventListener('click', ()=>{
                        if (this.indexCircles)
                            this.indexCircles[this.position].classList.remove("active");
                        this.position++;
                        this.setCisliderVisibleImage();
                    });
                    break;
                case "index": /*Its position is absolute*/
                    this.index = document.createElement("div");
                    this.index.classList.add("cislider-navigation");
                    this.populateNavigation()
                    cisliderDiv.appendChild(this.index);
                break;
            }
        });
    }

    /**
     * Populates the this.#index. That is, creates this.#indexCircles and appends the nodes to this.#index.
     */
    populateNavigation(){
        this.indexCircles = [];
        for (let i = 0; i < this.totalItems; i++){
            const circle = document.createElement("span");
            circle.classList.add("cislider-circle");
            this.index.appendChild(circle);
            this.indexCircles.push(circle);
            circle.addEventListener("click", (event) =>{
                this.indexCircles[this.position].classList.revome("active");
                this.position = i;
                this.setCisliderVisibleImage();
            });
        }
        this.indexCircles[0].classList.add("active");
    }

    /**
     * 
     * @param {Boolean} stopInterval 
     */
    setCisliderVisibleImage(stopInterval=true){
        if (this.intervalId && stopInterval){ 
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    
        if (this.nextBtn)
            this.nextBtn.style.visibility = (this.position >= this.totalItems -1)? 'hidden' : 'visible';
        if (this.prevBtn)
            this.prevBtn.style.visibility = (this.position < 1)? 'hidden' : 'visible';
        if (this.indexCircles)
            this.indexCircles[this.position].classList.add("active");
        
        this.listItems.forEach((li) =>{
            const itemWidth = parseFloat(window.getComputedStyle(li).width);
            li.style.translate = `${- this.position * itemWidth}px`;
        });
    }

    /**
     * 
     * @param {Cislider} cislider 
     */
    autoChange(cislider){
        if (cislider.indexCircles)
            cislider.indexCircles[cislider.position].classList.remove("active");

        cislider.position = (cislider.position + 1) % cislider.totalItems;
        cislider.setCisliderVisibleImage(false);
    }

}



document.querySelectorAll(".cislider").forEach((cisliderDiv) => {
    new Cislider(cisliderDiv);
});