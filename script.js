
function setActiveSlide(slidesContainer, slideIndex) {
  let allSlides = slidesContainer.children;
  if (slideIndex >= 0 && slideIndex <= allSlides.length - 1) {
      //remove all active classes from slides
      for (let i = 0; i < allSlides.length; i++) {
          let index = allSlides[i].classList.value.split(' ').indexOf("active");
          if (index !== -1) {
              allSlides[i].classList.remove("active");
          }
      }
      allSlides[slideIndex].classList.add("active");
      return true;
  } else {
      alert("Wrong index!")
      return false;
  }
}

function getActiveSlide(slidesContainer) {
  let allSlides = slidesContainer.children;
  let activeSlide = "";
  for (let i = 0; i < allSlides.length; i++) {
      if (allSlides[i].classList.value.split(' ').indexOf("active") !== -1) {
          activeSlide = allSlides[i];
          break
      }
  }
  if (activeSlide === "") {
      alert("Can't find an active slide!")
      return false;
  } else {
      return activeSlide;
  }
}

function scrollToActiveSlide(slidesContainer) {
  let activeSlide = getActiveSlide(slidesContainer);
  let parentNode = activeSlide.parentNode;
  let parentOffsetLeft = parentNode.offsetLeft;
  let allSlides = parentNode.children;
  let parentPadding = window.getComputedStyle(parentNode, null).getPropertyValue('padding-left');
  parentPadding = parseInt(parentPadding, 10);
  let activeSlideOffset = activeSlide.offsetLeft;
  let activeSlideOffsetDependToParent = activeSlideOffset - (parentOffsetLeft + parentPadding);
  let parentWidth = parentNode.offsetWidth;
  //remove paddingX from width
  parentWidth -= parentPadding * 2;
  let activeSlideWidth = activeSlide.offsetWidth;
  //set margin depend on slide
  allSlides[allSlides.length - 1].style.marginRight = (parentWidth - activeSlideWidth) + "px";
  //scroll to active slide
  parentNode.scrollLeft = activeSlideOffsetDependToParent + 1;
  return true;
}

var sliderContainerSlides = document.getElementsByClassName('sliderContainer-slides');
sliderContainerSlides = sliderContainerSlides[0];
let activeSlideIndex = 0;

//make first slide active
setActiveSlide(sliderContainerSlides, activeSlideIndex);
scrollToActiveSlide(sliderContainerSlides);

let nextButton = document.getElementsByClassName('next');
nextButton = nextButton[0];
nextButton.onclick = function (event) {
  if (event.ctrlKey) {
      activeSlideIndex += 2;
  } else {
      activeSlideIndex++;
  }
  activeSlideIndex = activeSlideIndex >= sliderContainerSlides.children.length ? 0 : activeSlideIndex;
  setActiveSlide(sliderContainerSlides, activeSlideIndex);
  scrollToActiveSlide(sliderContainerSlides);
}
nextButton.onauxclick = function () {
  activeSlideIndex = sliderContainerSlides.children.length - 1;
  setActiveSlide(sliderContainerSlides, activeSlideIndex);
  scrollToActiveSlide(sliderContainerSlides);
}
let previousButton = document.getElementsByClassName('previous');
previousButton = previousButton[0];
previousButton.onclick = function (event) {
  if (event.ctrlKey) {
      activeSlideIndex -= 2;
  } else {
      activeSlideIndex--;
  }
  activeSlideIndex = activeSlideIndex < 0 ? sliderContainerSlides.children.length - 1 : activeSlideIndex;
  setActiveSlide(sliderContainerSlides, activeSlideIndex);
  scrollToActiveSlide(sliderContainerSlides);
}
previousButton.onauxclick = function () {
  activeSlideIndex = 0;
  setActiveSlide(sliderContainerSlides, activeSlideIndex);
  scrollToActiveSlide(sliderContainerSlides);
}