# BrunxScript Documentation Website

A clean, animated and GitHub Pages-ready documentation website for BrunxScript.

## What is included

- Separate documentation page per script
- Central content configuration in `assets/js/docs-data.js`
- BrunxBridge download button and download folder
- Uploaded SVG logo included as `assets/img/logo.svg`
- Fully static HTML/CSS/JS, no build tools required
- Mobile friendly layout
- Searchable script cards
- Reusable documentation page template

## Upload to GitHub Pages

1. Upload all files to a GitHub repository.
2. Go to **Settings → Pages**.
3. Select **Deploy from branch**.
4. Choose your branch and root folder.
5. Save.

## Add BrunxBridge download

Put your file here:

```txt
downloads/brunxbridge.zip
```

Or change this value in `assets/js/docs-data.js`:

```js
brunxBridgeDownload: 'downloads/brunxbridge.zip'
```

## Add a new script documentation page

1. Copy:

```txt
docs/_template.html
```

2. Rename it, for example:

```txt
docs/brunx-garage.html
```

3. Open the new file and change:

```html
<body data-page="your-script" data-base="../">
```

to:

```html
<body data-page="brunx-garage" data-base="../">
```

4. Open `assets/js/docs-data.js` and add a new object inside `scripts` with:

```js
slug: 'brunx-garage',
name: 'Brunx Garage',
page: 'docs/brunx-garage.html'
```

That is all. The page layout is generated automatically.

## Main files to edit

```txt
assets/js/docs-data.js   Main website content
assets/css/style.css     Design and animations
assets/img/logo.svg      Logo
index.html               Homepage layout
docs/_template.html      Copy this for new docs pages
```
