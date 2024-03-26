document.querySelectorAll(".expandable-list>li").forEach((expandableListItem)=>{
    expandableListItem.addEventListener("click", eventfunc)});

function eventfunc(event) {
    let innerDiv = this.children[0];
    let wasActive = this.classList.contains("active");

    this.parentElement.querySelectorAll(".active").forEach((active)=>{
        active.classList.remove("active");
        active.children[0].style.maxHeight = "0px";;
    });
    
    if (!wasActive) {
        this.classList.toggle("active");
        innerDiv.style.maxHeight=innerDiv.scrollHeight + "px"; //max-height is total height
    } 
}