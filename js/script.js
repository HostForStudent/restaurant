let isMobile = {
   Android: function () { return navigator.userAgent.match(/Android/i); },
   BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
   iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
   Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
   Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
   any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); },
};

const body = document.body;

if (isMobile.any()) {
   body.classList.add("_touch");
} else {
   body.classList.add("_pc");
}

const menuIcon = document.querySelector(".menu__icon");
const menu = menuIcon.nextElementSibling;
if (window.innerWidth <= 677) {
   if (menuIcon) {
      menuIcon.addEventListener("click", function (e) {
         menuIcon.classList.toggle("_active");
         menu.classList.toggle("_open");
         body.classList.toggle("_lock");
      })
   }
}
function closeMenu() {
   menuIcon.classList.remove("_active");
   menu.classList.remove("_open");
   body.classList.remove("_lock");
}

const goToLinks = document.querySelectorAll("[data-goto]");
if (goToLinks.length > 0) {
   goToLinks.forEach((item, index, array) => {
      const goToLink = goToLinks[index];
      goToLink.addEventListener("click", (e) => {
         return funcGoto(e);
      })
   })
}
function funcGoto(e) {
   const link = e.target;
   if (link.dataset.goto && document.querySelector(link.dataset.goto)) {
      const section = document.querySelector(link.dataset.goto);
      const gotoValue = section.getBoundingClientRect().top + window.pageXOffset;
      if (menu.classList.contains("_open")) {
         closeMenu();
      }
      window.scrollTo({
         top: gotoValue,
         behavior: "smooth",
      })
   }
   e.preventDefault();
}