class Theme {
  constructor(isDark = true) {
    this.isDarkMode = isDark;
  }

  setDarkMode(value) {
    this.isDarkMode = value;
  }

  toggle() {
    this.isDarkMode = !this.isDarkMode;
  }

  getColors() {
    return {
      BG_COLOR: this.isDarkMode ? "#242424" : "white",
      COLOR_LIVE: this.isDarkMode ? "#ffffff" : "black",
      DEAD_COLOR: this.isDarkMode ? "#242424" : "white",
      BORDER_COLOR: "grey",
    };
  }
}

export const theme = new Theme();
