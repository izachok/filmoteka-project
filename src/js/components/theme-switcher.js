const toggleSwitch = document.querySelector('.theme-switcher input[type="checkbox"]');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

toggleSwitch.addEventListener('change', switchTheme, false);

export function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', Theme.DARK);
    localStorage.setItem('theme', Theme.DARK);
  } else {
    document.documentElement.setAttribute('data-theme', Theme.LIGHT);
    localStorage.setItem('theme', Theme.LIGHT);
  }
}

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === Theme.DARK) {
    toggleSwitch.checked = true;
  }
}
