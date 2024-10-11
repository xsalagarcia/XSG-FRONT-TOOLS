
class SortableList {
    
    /**
     * 
     * @param {HTMLOListElement | HTMLUListElement} list 
     */
    constructor(list){
        this.listItems = [...list.querySelectorAll(":scope > li")];
        this.draggingItem = null;
        list.classList.add("sortable-list");

        this.listItems.forEach(item =>  {
            item.setAttribute("draggable", "true")
            item.addEventListener("dragstart", ()=> {
                this.draggingItem = item;
                item.classList.add("sortable-list-dragging-item");

            });
            item.addEventListener("dragend", ()=> {
                item.classList.remove("sortable-list-dragging-item");
                this.draggingItem = null;
            });
            item.addEventListener("dragover", (e) => {
                e.preventDefault();
                const draggingOverItem = item;
                if (this.draggingItem !== draggingOverItem) {
                    const draggingIndex = this.listItems.indexOf(this.draggingItem);
                    this.listItems = [...list.querySelectorAll(":scope > li")];
                    const overIndex = this.listItems.indexOf(draggingOverItem);
                    if (draggingIndex < overIndex) {
                        list.insertBefore(this.draggingItem, draggingOverItem.nextSibling);
                    } else {
                        list.insertBefore(this.draggingItem, draggingOverItem);
                    }
                }
            });
        });
    }
}


/**
 * 
 * @param {HTMLOListElement | HTMLUListElement} list 
 * @returns 
 */
function initSortableList (list){
    return new SortableList(list);
}

export {initSortableList};