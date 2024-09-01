# [Oceans of Code](https://oceansofcode.github.io)

## My GitHub Pages portfolio

### Requirements

The goal of this portfolio is to showcase my professional skills as a developer and project contributions.

### Design

#### *Architecture*

HTML, TypeScript, and SCSS are used as the core languages, with no frameworks except on noted pages.

SVG based images are used when available and some have been modified for an enriched experience such as changing colors with the site theme.

There is one HTML file per page, a main.ts and main.scss that is included on every page, and a page specific TS and SCSS.

This allows the code to be modular and performant by only loading and processing what is needed with the goal of leveraging the current best practices of vanilla web development.

##### Accessibility

Semantic HTML and accessibility tags (ARIA) are used when appropriate to provide as equal an experience as possible.

`prefers-reduced-motion` being set to true through the visitor's operating system prevents all animations from occuring.

##### Web Components

Web components are used to avoid duplicate code across and within the page HTML, provide encapsulation of styling and scripting, and facilitate lazy loading.

Common elements such as the header / footer are customized versions of the base `<header>` and `<footer>` elements.

Autonomous custom elements facilitate code reuse and consist of core web component functionality such as the Shadow DOM and HTML Templates and Slots

##### Build process

NPM Scripts are used to develop and build. Gulp was initially used and the gulpfile.js remains as a legacy reference.

Custom node.js build scripts exist to process the TS, SCSS, and images.

The build process is extremely fast and efficient on memory, taking ~5 seconds to run a clean build of the entire site and only relying on the packages defined in the package.json and multithreading is leveraged to build the TS, SCSS, and images separately.

The build scripts utilize asynchronous generators to efficiently load and process each file. Minification and maps for the TS and SCSS are manually added in order to preserve the source code in the browser for improved debugging and for site visitors to inspect the full source code if desired.

Image minification is done to reduce the images as much as possible and provide different sized images based on media queries.

##### Development process

Browser-sync and on-change npm libaries are used for local development. Whenever a file is changed the appropriate build script runs instantly and the browser is refreshed instantly.

#### *Decisions*

This portfolio uses the latest CSS and JavaScript (ESNext) features with minimal fallback for older browsers. There are no libraries or frameworks used in the overall implementation of the website (except for icons, web-fonts, and necessary polyfills for Safari) except as part of the build process.

These design decisions were made because:

1. **Longevity**: Frameworks and libraries all become outdated at some point. Re-implementing the portfolio with a newer technology will be more difficult than refactoring existing native code when new ECMAScript features are released (i.e. refactoring promises to async/await). Updating node-packages is far quicker than updating an entire framework. I have upgraded 35+ Angular applications over my career, and it is no small feat of research and effort.
2. **Performance**: ESNext code is smaller and (usually) will run faster than code compiled down to ES5 or even ES6.
3. **Audience**: The target audience of this portfolio (Clients, Recruiters, Job Interviewers) will more than likely be using a modern browser at the latest version.
4. **Preferences**: I prefer using native technologies over libraries unless the library performs complex functionality that would be a project in itself to produce, such as working with Excel sheets or PDFs. Libraries that add syntactic sugar for working with native technologies (flexbox libraries, is-odd/is-even) cause more problems in the long term in my experience, especially when they are abandoned. For example, a Java library that was used to dynamically create classes by copying the fields of an existing class was abandoned and broke when upgrading from Java 8 for one of my clients. This cost thousands of dollars in DEV and QA work to fix when simple constructors could have been used. Using the library saved a small amount of time and money in the short term but cost exponentially more in the long term. However, a well maintained and robust library such as 'POI-OOXML' (Apache library for working with documents in Java) should always be used over a native solution.
5. **TypeScript and Sass**: Being supersets, there is no penalty for using them as opposed to writing in JavaScript and CSS. TypeScript also enables richer intellisense while coding and SCSS heavily reduces duplicate code through its syntactic sugar and programming capabilities.
