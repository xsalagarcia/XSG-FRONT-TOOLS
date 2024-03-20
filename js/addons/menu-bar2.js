document.querySelectorAll(".menu-bar2").forEach((element, number) => {
    const button = element.querySelector(".menu-bar2-icon");
    if (button) {
        button.addEventListener("click", () => {
            element.classList.toggle("show");
        });
    }
});