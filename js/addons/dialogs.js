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
                const result = e.target.id == "dialog-ok-button";
                dialog.remove();
                resolve(result);
            }, { once: true });

        })});

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
        button.id = buttonId;
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
                    buttonClicked: e.target.id,
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
                    buttonClicked: e.target.id,
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

const publicFunctions = {showInfoDialog, showTextAreaDialog, showLoginDialog, showConfirmDialog, showColorPickerDialog};

export {showInfoDialog, showTextAreaDialog, showLoginDialog, showConfirmDialog, showColorPickerDialog};
export default publicFunctions;