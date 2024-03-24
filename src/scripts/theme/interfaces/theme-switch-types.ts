import { ThemeConstants, ThemeCss, ThemeIcons } from './theme-enums.js';

export interface Theme {
    name: Exclude<ThemeConstants, ThemeConstants.THEME>;
    css: ThemeCss;
    switchIcon: ThemeIcons;
    isLoaded: boolean;
}

export interface ThemeSwitch {
    newTheme: Theme;
    oldTheme?: Theme;
}

export interface ThemeTransition {
    htmlClass: string;
    speed: number;
}
