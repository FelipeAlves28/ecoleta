const buttonSearch = document.querySelector("#page-home main a");
const modalHide = document.querySelector("#modal");
const close = document.querySelector("#modal .header a");

buttonSearch.addEventListener("click", () => {
    modalHide.classList.remove("hide");
});

close.addEventListener("click", () => {
    modalHide.classList.add("hide");
});