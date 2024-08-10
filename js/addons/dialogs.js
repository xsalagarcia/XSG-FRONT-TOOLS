/**
 * This file contains some functions to be used to show dialogs, and eventually, get the result of an interaction.
 */

/**
 * Create and show dialog. Dialog will be closed if the user pushes some button.
 * @param {String} title The title
 * @param {String | Element} content Some text content or an element containing the body of the dialog.
 * @param {Boolean} hasClose True will have a close button.
 * @param {String} acceptButtonText inner text of ok button. Default "OK"
 * @param {String} cancelButtonText inner text of cancel button. Default "Cancel"
 * @returns A promise, that will return true if the user has pressed OK button or false for other close actions.
 */
function showConfirmDialog(title, content, hasClose=true, acceptButtonText = "OK", cancelButtonText = "Cancel") {
    const divContent = document.createElement("div");
    divContent.textContent = content;
    const dialog = createDialogBase(title, divContent, hasClose, {"dialog-ok-button": acceptButtonText, "dialog-cancel-button": cancelButtonText});
    document.body.appendChild(dialog);
    const promise = new Promise((resolve, reject) => {
        dialog.querySelectorAll(".dialog button").forEach(button => {
            button.addEventListener("click", (e) => {
                const result = e.target.getAttribute("data-option-id") == "dialog-ok-button";
                dialog.remove();
                resolve(result);
            }, { once: true });

        })});

    return promise;
}

/**
 * Creates and shows a dialog. Dialog will be closed if the user pushes some button.
 * @param {String} title 
 * @param {String | Element} content 
 * @param {Object} options such as {"option1": "option text 1", "option2": "option text 2"...}
 * @param {Boolean} hasClose 
 * @returns A promise, that will return the key of the selected option. 'close' will be returned if the user clicks close button.
 */
function showMultioptionsDialog(title, content, options, hasClose=true){
    const divContent = document.createElement("div");
    divContent.textContent = content;
    const dialog = createDialogBase(title, divContent, hasClose, options);
    document.body.appendChild(dialog);
    const promise = new Promise((resolve, reject) => {
        dialog.querySelectorAll(".dialog button").forEach(button => {
            button.addEventListener("click", (e) => {
                const result = e.target.getAttribute("data-option-id");
                dialog.remove();
                resolve(result);
            }, {once: true});
        })
    });
    return promise;

}

/**
 * Do not call this function directly. Base dialog. This function won't show the dialog. Only returns the dialog Element.
 * @param {String | Element} title The header of the dialog.
 * @param {Element} content The body of the dialog.
 * @param {Boolean} hasClose true will contain close button.
 * @param {Object} buttons Buttons to be inserted. Key (String) is id, value (String) is textcontent.
 * @returns Dialog element to be inserted.
 */
function createDialogBase(title, content, hasClose, buttons){
    const dialog = document.createElement("div");
    dialog.classList.add("dialog-screen-filter");
    dialog.innerHTML = `
    <div class="dialog" style="max-width: 400px;">
        <div class="dialog-header">
            <div class="dialog-title">${title}</div>
            ${hasClose? '<button class="dialog-close-button"><div class="close-icon"></div></button>' : ''}
        </div>
        <div class="dialog-content"></div>
        <div class="dialog-buttons"></div>
    </div>
    `
    dialog.querySelector(".dialog-content").appendChild(content);
    const buttonTags = [];
    for (let buttonId in buttons){
        const button = document.createElement("button");
        button.setAttribute("data-option-id", buttonId)
        button.textContent = buttons[buttonId];
        buttonTags.push(button);
    }
    const dialogButtons = dialog.querySelector(".dialog-buttons");
    buttonTags.forEach(buttonTag => {
        dialogButtons.appendChild(buttonTag);
    });

    return dialog;
}

/**
 * Create and show login dialog. Return a promise.
 * @param {String} title The dialog title
 * @param {String} textContent Some text before the input tags for the username and password.
 * @param {String} nameHint Text to be shown as a hint in the user input. Default is "user"
 * @param {String} passwordHint Text to be shown as a hint in the password input. Default is "password".
 * @param {String} acceptButtonText Text to be swown in the accept button. Default is "OK".
 * @param {String} cancelButtonText Text to be shown in the cancel button. Default is "Cancel"
 * @param {String} hasClose If true, close button will be shown. Default is true.
 * @returns A promise with an object that has attributes buttonClicked (can be "dialog-ok-button", "dialog-cancel-button" or "dialog-close-button"), username and password.
 */
function showLoginDialog(title, textContent, nameHint = "user", passwordHint = "password", acceptButtonText = "OK", cancelButtonText = "Cancel", hasClose = true) {

    const content = document.createElement("div");
    const text = document.createElement("div");
    const userInput = document.createElement("input");
    userInput.setAttribute("placeholder", nameHint);
    userInput.id = "user";
    userInput.style.display="block";
    userInput.style.margin = "0.5rem auto";

    const passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("placeholder", passwordHint);
    passwordInput.id = "password";
    passwordInput.style.display="block";
    passwordInput.style.margin = "auto";

    const textFieldsDiv = document.createElement("div");
    textFieldsDiv.appendChild(userInput);
    textFieldsDiv.appendChild(passwordInput);

    text.innerText = textContent;
    content.appendChild(text);
    content.appendChild(textFieldsDiv);

    const dialog = createDialogBase(title, content, hasClose, {"dialog-ok-button": acceptButtonText, "dialog-cancel-button": cancelButtonText});
    document.body.appendChild(dialog);

    const promise = new Promise((resolve, reject) => {
        dialog.querySelectorAll(".dialog button").forEach(button => {
            button.addEventListener("click", (e) => {
                const result = {
                    buttonClicked: e.target.getAttribute("data-option-id"),
                    username : userInput.value,
                    password : passwordInput.value
                };
                dialog.remove();
                resolve(result);
            }, { once: true });

        })});
    return promise;
}


function showTextAreaDialog(title, text, textAreaHint="", maxChars=200, hasClose=true, acceptButtonText = "OK", cancelButtonText = "Cancel") {
    const content = document.createElement("div");
    content.innerHTML = `<p>${text}</p>`;

    const textarea = document.createElement("textarea");
    textarea.style.width = "100%";
    textarea.maxLength = 200;
    textarea.placeholder = textAreaHint;
    content.appendChild(textarea);
    const dialog = createDialogBase(title, content, true, {"dialog-ok-button": acceptButtonText, "dialog-cancel-button": cancelButtonText});
    document.body.appendChild(dialog);
    textarea.focus();

    const promise = new Promise((resolve, reject) => {
        dialog.querySelectorAll(".dialog button").forEach(button => {
            button.addEventListener("click", (e) => {
                const result = {
                    buttonClicked: e.target.getAttribute("data-option-id"),
                    text : textarea.value
                };
                dialog.remove();
                resolve(result);
            }, { once: true });
            
        });

        /*Esc key or alt enter exits dialog. alt enter equals dialog-ok-button */
        function keyUpFunction (e){
            if (e.key == "Escape"){
                window.removeEventListener("keyup", keyUpFunction);
                const result = {
                    buttonClicked: "esc-key",
                    text : textarea.value
                };
                dialog.remove();
                resolve(result);
            } else if (e.key == "Enter" && e.altKey){
                window.removeEventListener("keyup", keyUpFunction);
                const result = {
                    buttonClicked: "dialog-ok-button",
                    text : textarea.value
                };
                dialog.remove();
                resolve(result);
            }
        }
        window.addEventListener("keyup", keyUpFunction);
    });
    return promise;

}
/**
 * Create and show info dialog. Contains a title, some text OK button and close button.
 * @param {String} title The dialog title
 * @param {String} content Info text.
 * @param {String} acceptButtonText Text in the OK button. Default is OK.
 */
function showInfoDialog(title, content, acceptButtonText = "OK"){
    const divContent = document.createElement("div");
    divContent.textContent = content;
    const dialog = createDialogBase(title, divContent, true, {"dialog-ok-button": acceptButtonText});
    document.body.appendChild(dialog);
    dialog.querySelectorAll(".dialog button").forEach(button => {
        button.addEventListener("click", (e) => {
            dialog.remove();
        }, {once: true});
    });
}

/**
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Sting} screenFilterColor Will be applied as a color (could be an hex, name...)
 * @returns Promise that will return the option.
 */
function showColorPickerDialog(x, y, screenFilterColor=undefined){
    
    const colors = ["black", "red", "orange", "yellow", "green", "blue", "indigo", "violet", "white"];
    let colorButtons = "";
    colors.forEach(color => {
        colorButtons += `<button class="${color}" style="background-color:${color};"></button>`;
    });
    const dialog = document.createElement("div");
    dialog.classList.add("dialog-screen-filter");
    if (screenFilterColor)
        dialog.style.backgroundColor = screenFilterColor;
    dialog.innerHTML = `
    <div class="dialog-color-picker">
    ${colorButtons}
    </div>
    `;

    const dialogScreenFilter = dialog.querySelector(".dialog-color-picker");
    dialogScreenFilter.style.top = `${y}px`;
    dialogScreenFilter.style.left = `${x}px`
    document.body.appendChild(dialog);
    const promise = new Promise((resolve, reject) => {
        dialog.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", (e)=> {
                dialog.remove();
                resolve({buttonClicked: e.target.style.backgroundColor});
            }, {once: true});
        });

        dialog.addEventListener("click", (e)=> {
            dialog.remove();
            resolve({buttonClicked: "cancel"});
        }, {once: true});
    });
    return promise;

}

/**
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Array} options Strings for options, 0 if a hr line is wanted, list of strings for a submenu (first string is submenu name).
 * I.e. ["option1", "option2", 0, "option3", ["suboptions", "suboption1", "suboption2"], "option4"]
 * @param {String} screenFilterColor 
 */
function showDialogContextMenu(x, y, options, screenFilterColor=undefined){
    const dialog = document.createElement("div");
    dialog.classList.add("dialog-screen-filter");
    if (screenFilterColor)
        dialog.style.backgroundColor = screenFilterColor;
    const dialogContextMenu = document.createElement("div");
    dialogContextMenu.classList.add("dialog-context-menu");
    dialogContextMenu.appendChild(createDialogContextContent(options));
    dialogContextMenu.style.top = `${y}px`;
    dialogContextMenu.style.left = `${x}px`
    dialog.appendChild(dialogContextMenu);

    document.body.appendChild(dialog);
    const promise = new Promise((resolve, reject) => {
        dialog.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", (e)=> {
                dialog.remove();
                resolve({buttonClicked: e.target.textContent});
            }, {once: true});
        });

        dialog.addEventListener("click", (e)=> {
            dialog.remove();
            resolve({buttonClicked: "cancel"});
        }, {once: true});
    });
    return promise;



}

/**
 * Called from showDialogContextMenu, creates the content.
 * @param {Array} options 
 * @returns 
 */
function createDialogContextContent(options){

    //todo (touch)
            /*document.querySelector(".suboptions").addEventListener("touchstart", ()=> {
            console.log("touch start");
            when touchstart add .active to .suboptions, and remove other .active's
        });*/
    const ul = document.createElement("ul");
    options.forEach(option => {
        if (option === 0) {
            const hr = document.createElement("hr");
            ul.appendChild(hr);
        } else if (typeof option == "string") {
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.textContent = option;
            li.appendChild(button);
            ul.appendChild(li);
        } else if (option instanceof Array) {
            const li = document.createElement("li");
            const div = document.createElement("div");
            div.classList.add("suboptions");
            const span = document.createElement("span");
            span.textContent = option[0];
            div.appendChild(span);
            div.appendChild(createDialogContextContent(option.slice(1)));
            li.appendChild(div);
            ul.appendChild(li);
        }
    });
    return ul;
}

/**
 * Creates a dialog without buttons and returns it. The user can't interact until remove() method has been called from the returned dialog element.
 * @param {String} title 
 * @param {String} content 
 * @returns {Element} The dialog, to be removed with dialog.remove();
 */
function showLockingMessage(title, content){
    const divContent = document.createElement("div");
    divContent.style.padding="0rem 2rem";
    divContent.textContent = content;
    const dialog = createDialogBase(title, divContent, false, {});
    document.body.appendChild(dialog);
    return dialog;
}

/**
 * Shows a spin to indicate to wait.
 * @returns The dialog, to be removed with dialog.remove();
 */
function showWaitingAnimation(){
    debugger;
    const dialog = document.createElement("div");
    dialog.classList.add("dialog-screen-filter");
    const animatedWaitingDiv = document.createElement("div");
    animatedWaitingDiv.classList.add("waiting-div");
    dialog.appendChild(animatedWaitingDiv);
    document.body.appendChild(dialog);
    return dialog;
}

/**
 * Creates a dialog that contains a form.
 * @param {String} title 
 * @param {HTMLFormElement} form 
 * @param {Boolean} hasClose True is default, has close button. Its behaviour is like Cancel button.
 * @param {String} acceptButtonText Default text is OK.
 * @param {String} cancelButtonText Default is Cancel.
 * @returns {FormData} related with the given form. Or null if dialog is canceled.
 */
function showForm(title, form, hasClose=true, acceptButtonText = "OK", cancelButtonText = "Cancel"){

    const dialog = createDialogBase(title, form, hasClose, {"dialog-ok-button": acceptButtonText, "dialog-cancel-button": cancelButtonText});
    document.body.appendChild(dialog);
    const promise = new Promise((resolve, reject) => {
        dialog.querySelectorAll(".dialog button").forEach(button => {
            button.addEventListener("click", (e) => {
                let result = null;
                if (e.target.getAttribute("data-option-id") == "dialog-ok-button") {
                    //TODO validar si les dades son correctes
                    //form.checkValidity();
                    if (!form.reportValidity()){
                        return;
                    }
                    result = new FormData(form);
                }
                dialog.remove();

                resolve(result);
            });

        })});

    return promise;
}
const publicFunctions = {showInfoDialog, showTextAreaDialog, showLoginDialog, showConfirmDialog, showColorPickerDialog, showDialogContextMenu, showMultioptionsDialog, showLockingMessage, showWaitingAnimation, showForm};

export {showInfoDialog, showTextAreaDialog, showLoginDialog, showConfirmDialog, showColorPickerDialog, showDialogContextMenu, showMultioptionsDialog, showLockingMessage, showWaitingAnimation, showForm};
export default publicFunctions;