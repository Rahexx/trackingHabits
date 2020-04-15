const monthsHolder = document.querySelector('.monthsHolder');

function desktopSlideRight(arrowFlag) {
  let flag = arrowFlag;

  switch (flag) {
    case 0:
      monthsHolder.style.transform = `translateX(calc(-100% + 50px))`;
      flag++;
      break;
    case 1:
      monthsHolder.style.transform = `translateX(calc(-200% + 100px))`;
      flag++;
      break;
  }

  return flag;
}

function desktopSlideLeft(arrowFlag) {
  let flag = arrowFlag;

  switch (flag) {
    case 1:
      monthsHolder.style.transform = `translateX(0)`;
      flag--;
      break;
    case 2:
      monthsHolder.style.transform = `translateX(calc(-100% + 50px))`;
      flag--;
      break;
  }
  return flag;
}

function mobileSlideRight(arrowFlag) {
  let flag = arrowFlag;

  if (flag < 11) {
    monthsHolder.style.transform = `translateX(-${70 * (flag + 1)}vw)`;
    flag++;
  }

  return flag;
}

function mobileSlideLeft(arrowFlag) {
  let flag = arrowFlag;

  if (arrowFlag > 0) {
    monthsHolder.style.transform = `translateX(-${70 * (flag - 1)}vw)`;
    flag--;
  }

  return flag;
}

export {
  desktopSlideRight,
  desktopSlideLeft,
  mobileSlideRight,
  mobileSlideLeft,
};
