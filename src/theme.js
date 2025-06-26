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
      BG_COLOR: this.isDarkMode ? "#242424" : "#e4e4e4",
      COLOR_LIVE: this.isDarkMode ? "#e4e4e4" : "#222222",
      DEAD_COLOR: this.isDarkMode ? "#242424" : "#e4e4e4",
      BORDER_COLOR: "grey",
    };
  }
}

export const theme = new Theme();
