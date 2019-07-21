# [Oceans of Code](https://oceansofcode.com)

## My Github Pages portfolio

### Requirements
The goal of this portfolio is to showcase my skills as a web developer, my projects, and who I am.

### Design
#### *Architecture*:
The JavaScript and CSS are initially written in TypeScript and Sass (SCSS) respectively. A modular approach for both are taken, splitting functionality into different files.

Gulp is used to build the app by minifying both the compiled JavaScript and CSS for performance. The JavaScript remains modular using the type="module" attribute, whereas the Sass is compiled into one large main.css file.

There are folders for TypeScript and Sass files unique to each page, where page dependant logic and styles are placed respectively. This helps reduce the chance that styles and behaviours intended for one page do not affect another.

#### *Decisions*:
This portfolio uses the latest CSS and JavaScript (ESnext) features without any fallback for older browsers. There are no libraries or frameworks used in the overall impementation of the website except for icons and web-fonts. Any projects made with a framework or library will be noted as such.

These design decisions were made because: 

1. **Longevity**: Frameworks and libraries all become outdated at some point. Re-implementing the portfolio with a newer technology will be more difficult than refactoring existing native code when new ECMAScript features are released (i.e. refactoring promises to async/await).
2. **Performance**: ESnext code is smaller and (usually) will run faster than code compiled down to ES5 or even ES6.
3. **Audience**: The target audience of this portfolio (Recruiters, Job Interviewers, Clients) will more than likely be using a modern browser at the latest version.
4. **Preferences**: I prefer CSS Grid / Flexbox to BootStrap for CSS layout and responsive design; to me the code is cleaner and separates layout from the HTML.
5. **TypeScript and Sass**: Being supersets, there is no penalty for using them as opposed to writing in JavaScript and CSS. Both technologies result in cleaner code that is easier to follow and debug. TypeScript also enables richer intellisense while coding improving productivity both when writing and reading code.
6. **The Name**: Oceans of Code comes from an inside joke :)
