# Card Market

## Build the project

This is a web project that uses Bootstrap, jQuery, and SCSS to build a responsive and interactive website.

### Prerequisites

Make sure you have the following tools installed:

- [Node.js](https://nodejs.org/) (preferably the LTS version)
- [npm](https://www.npmjs.com/) (JavaScript package manager, included with Node.js)
- [Git](https://git-scm.com/) (to clone the repository, if needed)

### Installation

1. **Clone the repository** (if you haven't already):

    ```bash
    git clone <repository-url>
    cd <project-folder>
    ```

2. **Install dependencies**:
    Ensure you're in the project folder and have `package.json` present, then run:

    ```bash
    npm install
    ```

   This command will install all the dependencies listed in `package.json`, including Bootstrap, jQuery, and the packages required for SCSS.

### Build Setup

To build the project, you can use a series of scripts defined in the `package.json` file. These scripts allow you to compile SCSS, minify JavaScript, and handle other build tasks.

1. **Compile SCSS**:
    To compile SCSS into CSS, run:

    ```bash
    npm run build:scss
    ```

2. **Minify JavaScript**:
    To minify and optimize JavaScript files (including jQuery files), run:

    ```bash
    npm run build:js
    ```

3. **Full build**:
    To perform a complete build that compiles SCSS, minifies JavaScript, and copies necessary files into the output directories, run:

    ```bash
    npm run build
    ```

4. **Start the development server**:
    If you want to see the project in action while working on it, you can start a development server:

    ```bash
    npm start
    ```

    This will start a local server (typically at `http://localhost:3000`) where you can view your changes in real-time.

## Project Structure

The project structure should look like this:

PUT THE PROJECT STRUCTURE HERE

## Scripts in `package.json`

### `build:scss`

Compiles SCSS files into CSS, applying any production optimizations.

### `build:js`

Minifies JavaScript files, concatenating and compressing them for better performance in production.

### `build`

Runs the full build (compiling SCSS, minifying JS, and managing assets).

### `start`

Starts a development server to preview the site in real-time.
