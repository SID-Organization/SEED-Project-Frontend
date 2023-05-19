const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
};

const setFontSize = () => {
  if (localStorage.getItem("fontSize")) return;
  localStorage.setItem("fontSize", JSON.stringify(fontSize));
};

const incFontSize = () => {
  const fontSize = getFontSize();
  const fontSizeUpdated = {};
  for (const key in fontSize) {
    fontSizeUpdated[key] = fontSize[key] + 1;
  }
  localStorage.setItem("fontSize", JSON.stringify(fontSizeUpdated));
};

const decFontSize = () => {
  const fontSize = getFontSize();
  const fontSizeUpdated = {};
  for (const key in fontSize) {
    fontSizeUpdated[key] = fontSize[key] - 1;
  }
  localStorage.setItem("fontSize", JSON.stringify(fontSizeUpdated));
};

const getFontSize = () => {
  const fonts = JSON.parse(localStorage.getItem("fontSize"));
  return fonts || fontSize;
};

export default {
  getFontSize,
  setFontSize,
  incFontSize,
  decFontSize,
};
