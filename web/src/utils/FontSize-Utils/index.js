const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  fontControl: 0,
};

const setFontSize = () => {
  if (localStorage.getItem("fontSize")) return;
  localStorage.setItem("fontSize", JSON.stringify(fontSize));
};

const incFontSize = () => {
  const fontSize = getFontSizes();
  const fontSizeUpdated = {};
  for (const key in fontSize) {
    fontSizeUpdated[key] = fontSize[key] + 1;
  }
  localStorage.setItem("fontSize", JSON.stringify(fontSizeUpdated));
};

const decFontSize = () => {
  const fontSize = getFontSizes();
  const fontSizeUpdated = {};
  for (const key in fontSize) {
    fontSizeUpdated[key] = fontSize[key] - 1;
  }
  localStorage.setItem("fontSize", JSON.stringify(fontSizeUpdated));
};

const getFontSizes = () => {
  const fonts = JSON.parse(localStorage.getItem("fontSize"));
  return fonts || fontSize;
};

const getFontControl = () => {
  const fonts = getFontSizes();
  return fonts.fontControl;
};

export default {
  getFontSizes,
  setFontSize,
  incFontSize,
  decFontSize,
  getFontControl,
};
