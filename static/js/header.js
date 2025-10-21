document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");

    function handleScroll() {
        if (window.scrollY === 0) {
            header.classList.remove("collapsed");
        } else {
            header.classList.add("collapsed");
        }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);
});
