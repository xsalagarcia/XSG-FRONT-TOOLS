    

const _expandableResizeObserver = new ResizeObserver((entries) => {
    entries.forEach(entry => {
        entry.target.parentElement.style.height = window.getComputedStyle(entry.target).height;
    })
});


/**
 * Use it when expandable has been created with createExpandable or directly at html file.
 * @param {Element} expandable 
*/
function initExpandable(expandable){
    const expandButton = expandable.querySelector(".expandable-bar>.expand-button");
    const expandableWrapper = expandable.querySelector(".expandable-wrapper");
    
    expandButton.addEventListener("click",e=>{
        expandable.classList.toggle("expanded");
        if (expandable.classList.contains("expanded")){
            _expandableResizeObserver.observe(expandableWrapper.firstElementChild);
            expandableWrapper.style.height = window.getComputedStyle(expandableWrapper.firstElementChild).height;
        } else {
            expandableWrapper.style.height = null;
            _expandableResizeObserver.unobserve(expandableWrapper.firstElementChild);
        }
    });
}


/**
 * Something like this:  
 *    <div class="expandable" id="a">
 *       <div class="content">Hola</div>
 *       <div class="expandable-content">
 *           <p>dfsdfasd dfs gfd asf dhhhhas fas</p>
 *           <p>dfsdfasd dfs gfd asf dfasdfas fas</p>
 *           <p>dfsdfasd dfs gfd asf dfasdfas fas</p>
 *           <p>dfsdfasd dfs gfd asf dfasdfas fas</p>
 *       </div>
 *   </div>
 * @param {Element} element 
 */
function createExpandable(element) {
    element.classList.add("expandable");
    const expandableBar = document.createElement("div");
    expandableBar.classList.add("expandable-bar");
    const button = document.createElement("button");
    button.classList.add("expand-button");
    element.appendChild(expandableBar);
    expandableBar.appendChild(element.querySelector(".content"));
    expandableBar.appendChild(button);
    const expandableWrapper = document.createElement("div");
    expandableWrapper.classList.add("expandable-wrapper");
    element.appendChild(expandableWrapper);
    expandableWrapper.appendChild(element.querySelector(".expandable-content"));
}

/**
 * Only one expandable in a group can be expanded. If there is other expanded, it will be unexpanded.
 * @param {NodeList} expandables 
 */
function groupExpandables(expandables){
    const group = expandables;
    let activeExpandable = null;
    group.forEach(expandable => {
        const expandButton = expandable.querySelector(".expandable-bar>.expand-button");
        const expandableWrapper = expandable.querySelector(".expandable-wrapper");
        expandButton.addEventListener("click", ()=>{
            if (activeExpandable && activeExpandable != expandable) {
                const activeExpandableWrapper = activeExpandable.querySelector(".expandable-wrapper");
                activeExpandableWrapper.style.height = null;
                _expandableResizeObserver.unobserve(activeExpandableWrapper.firstElementChild);
                activeExpandable.classList.remove("expanded");
            }
            activeExpandable = expandable;
        }, true);
    })
}



export {initExpandable, createExpandable, groupExpandables};