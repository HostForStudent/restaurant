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
   if (menu.classList.contains("_open")) {
      menuIcon.classList.remove("_active");
      menu.classList.remove("_open");
      body.classList.remove("_lock");
   }
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

const popupOpenBtn = document.querySelectorAll(".popup-open");
if (popupOpenBtn.length > 0) {
   for (let index = 0; index < popupOpenBtn.length; index++) {
      const button = popupOpenBtn[index];
      button.addEventListener("click", function (e) {
         return popupOpenFunc();
      })
   }
}
function popupOpenFunc() {
   const popupBlock = document.querySelector(".popup");
   popupBlock.classList.add("_open");
   popupCloseFunc(popupBlock);
   if (menu.classList.contains("_open")) {
      closeMenu();
   }
   bodyLock();
}
function popupCloseFunc(popupBlock) {
   if (popupBlock.classList.contains("_open")) {
      body.addEventListener("click", function (e) {
         if (e.target.classList.contains("popup-close") || e.target.classList.contains("popup__wrapper")) {
            popupBlock.classList.remove("_open");
            setTimeout(() => {
               bodyUnlock();
            }, 800);
         }
      })
   }
}

const lockPaddingBlock = document.querySelectorAll("padding-lock");
function bodyLock() {
   const paddingValue = window.innerWidth - body.clientWidth + 'px';
   if (lockPaddingBlock.length > 0) {
      for (let index = 0; index < lockPaddingBlock.length; index++) {
         const block = lockPaddingBlock[index];
         block.style.paddingRight = paddingValue;
      }
   }
   body.classList.add("_lock");
   body.style.paddingRight = paddingValue;
}
function bodyUnlock() {
   if (lockPaddingBlock.length > 0) {
      for (let index = 0; index < lockPaddingBlock.length; index++) {
         const block = lockPaddingBlock[index];
         block.style.paddingRight = '0px';
      }
   }
   body.classList.remove("_lock");
   body.style.paddingRight = '0px';
}

const images = document.querySelectorAll(".img-open");
if (images.length > 0) {
   for (let index = 0; index < images.length; index++) {
      const img = images[index];
      const srcValue = img.getAttribute("src");
      img.addEventListener("click", (e) => {

         return openImages(srcValue);
      })
   }
}

const imgPopup = document.querySelector(".popup-img__img");
const popupImgBlock = imgPopup.closest('.popup-img')
function openImages(srcValue) {
   imgPopup.setAttribute('src', srcValue);
   popupImgBlock.classList.add("_open");
   bodyLock();
   closeImages();
}

function closeImages() {
   if (popupImgBlock.classList.contains("_open")) {
      body.addEventListener("click", function (e) {
         if (e.target.classList.contains("popup-img-close")) {
            popupImgBlock.classList.remove("_open");
            setTimeout(() => {
               imgPopup.removeAttribute('src');
               bodyUnlock();
            }, 300);
         }
      })
   }
}