document.querySelectorAll(".expandable-list>li").forEach((expandableListItem)=>{
    expandableListItem.addEventListener("click", (event) =>{
        let innerDiv = expandableListItem.children[0];
        let wasActive = expandableListItem.classList.contains("active");
    
        expandableListItem.parentElement.querySelectorAll(".active").forEach((active)=>{
            active.classList.remove("active");
            active.children[0].style.maxHeight = "0px";;
        });
        
        if (!wasActive) {
            expandableListItem.classList.toggle("active");
            innerDiv.style.maxHeight=innerDiv.scrollHeight + "px"; //max-height is total height
        } 
    })});
