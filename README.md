# [Oceans of Code](https://oceansofcode.github.io)

## My Github Pages portfolio

### Requirements

The goal of this portfolio is to showcase my professional skills as a developer and work / project contributions.

### Design

#### *Architecture*

The code

The JavaScript remains modular using the type="module" attribute, whereas the core Sass is compiled into one large main.css file.

NPM Scripts are used to develop and build. Gulp was initially used and the gulpfile.js remains as a legacy reference.

#### *Decisions*

This portfolio uses the latest CSS and JavaScript (ESnext) features with minimal fallback for older browsers. There are no libraries or frameworks used in the overall implementation of the website (except for icons, web-fonts, and necessary polyfills for Safari).

These design decisions were made because:

1. **Longevity**: Frameworks and libraries all become outdated at some point. Re-implementing the portfolio with a newer technology will be more difficult than refactoring existing native code when new ECMAScript features are released (i.e. refactoring promises to async/await). Updating node-packages is far quicker than updating an entire framework over the years.
2. **Performance**: ESnext code is smaller and (usually) will run faster than code compiled down to ES5 or even ES6.
3. **Audience**: The target audience of this portfolio (Recruiters, Job Interviewers, Clients) will more than likely be using a modern browser at the latest version.
4. **Preferences**: I prefer CSS Grid / Flexbox to BootStrap for CSS layout and responsive design.
5. **TypeScript and Sass**: Being supersets, there is no penalty for using them as opposed to writing in JavaScript and CSS. TypeScript also enables richer intellisense while coding.
