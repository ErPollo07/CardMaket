# Card Market

## Project Description

This is a web project that uses **Bootstrap**, **jQuery**, and **SCSS** to create a responsive and interactive website.

## Prerequisites

Make sure you have the following tools installed:

- [Node.js](https://nodejs.org/) (preferably the LTS version)
- [npm](https://www.npmjs.com/) (included with Node.js)
- [Git](https://git-scm.com/) (to clone the repository)
- [Live Server](https://marketplace.visualstudio.com/items/?itemName=ritwickdey.LiveServer) (to start a live server for debugging)
- [Editor Config](https://marketplace.visualstudio.com/items/?itemName=EditorConfig.EditorConfig) (to have the correct style of code)

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

### Install dependencies

Make sure you are in the project folder and run:

```bash
npm install
```

This command will install all the dependencies listed in the `package.json` file, including **Bootstrap**, **jQuery**, and the necessary packages for SCSS.

## Development

### Project Structure

The project structure should look like this:

```text
CardMarket/
├── src/
│   ├── css/          # Generated CSS files
│   ├── js/           # JavaScript files
│   ├── scss/         # SCSS source files
│   └── index.html    # Main HTML file
├── package.json      # Project configuration and scripts
├── package-lock.json # Dependency lock file
└── README.md         # Project documentation
```

### Available Scripts

The scripts defined in the `package.json` file allow you to perform various development and build operations.

#### Compile SCSS into CSS

To compile scss run:

```bash
npm run scss
```

### Create a new page

#### Create a new html file

Create a new html file in the `scr/html` folder. Possibly name the file with the name of the page.
Then create a js file in the `src/js` folder. This file will handle the logic of the page.
<br>
The file must follow this structure:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title of page</title>
    <link rel="stylesheet" href="../css/index.css" />
  </head>
  <body>
    <!-- content -->
  </body>

  <script src="../../node_modules/jquery/dist/jquery.min.js"></script>
  <!-- This is for jquery -->
  <script src="path/to/js/of/the/page"></script>
</html>
```

#### Create a scss file

To give the style to the page create a scss file in `src/scss` and the name of the file must be: `_{nameOfThePage}.scss`. <br>
Then put this line in `src/scss/main.scss` file:

```scss
@import "nameOfThePage";
```

## Contributions

If you want to contribute to the project:

1. Fork the repository.
2. Create a branch for your changes: `git checkout -b feature/feature-name`.
3. Commit your changes: `git commit -m "Description of changes"`.
4. Push the branch: `git push origin feature/feature-name`.
5. Open a pull request.

## Known Issues

If you encounter any issues, open an [issue](https://github.com/ErPollo07/CardMarket/issues) in the repository.
