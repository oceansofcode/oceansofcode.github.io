# [Oceans of Code](https://oceansofcode.github.io)

## My Github Pages portfolio

### Requirements

The goal of this portfolio is to showcase my professional skills as a developer and work / project contributions.

### Design

#### *Architecture*

HTML, TypeScript, and SCSS are used as the languages with no frameworks except on specific pages.

There is one HTML file per page, a main.ts and main.scss that is included on every page, and a page specific TS and SCSS.

This allows the code to be modular and performant by only loading and processing what is needed with the goal of leveraging the current best practices of vanilla web development.

##### Web Components

Web components are used to avoid duplicate code across and within the page HTML, provide encapsulation of styling and scripting, and facilitate lazy loading.

Common elements such as the header / footer are customized versions of the base `<header>` and `<footer>` elements (which unfortunately requires a polyfill due to Safari refusing to implement this functionality).

Autonomous custom elements faciltiate code reuse and consist of core web component functionality such as the Shadow DOM and HTML Templates and Slots

##### Build process

NPM Scripts are used to develop and build. Gulp was initially used and the gulpfile.js remains as a legacy reference.

Custom node.js build scripts exist to process the TS, SCSS, and images.

#### *Decisions*

This portfolio uses the latest CSS and JavaScript (ESnext) features with minimal fallback for older browsers. There are no libraries or frameworks used in the overall implementation of the website (except for icons, web-fonts, and necessary polyfills for Safari).

These design decisions were made because:

1. **Longevity**: Frameworks and libraries all become outdated at some point. Re-implementing the portfolio with a newer technology will be more difficult than refactoring existing native code when new ECMAScript features are released (i.e. refactoring promises to async/await). Updating node-packages is far quicker than updating an entire framework over the years.
2. **Performance**: ESnext code is smaller and (usually) will run faster than code compiled down to ES5 or even ES6.
3. **Audience**: The target audience of this portfolio (Recruiters, Job Interviewers, Clients) will more than likely be using a modern browser at the latest version.
4. **Preferences**: I prefer CSS Grid / Flexbox to BootStrap for CSS layout and responsive design.
5. **TypeScript and Sass**: Being supersets, there is no penalty for using them as opposed to writing in JavaScript and CSS. TypeScript also enables richer intellisense while coding.
