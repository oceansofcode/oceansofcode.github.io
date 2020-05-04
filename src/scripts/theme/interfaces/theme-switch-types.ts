import { ThemeConstants, ThemeIcons } from "./theme-enums";

export interface Theme {
    name: Exclude<ThemeConstants, ThemeConstants.THEME>;
    switchIcon: ThemeIcons;
}

export interface ThemeSwitch {
    newTheme: Theme;
    oldTheme?: Theme;
}

export interface ThemeTransition {
    htmlClass: string;
    speed: number;
}
