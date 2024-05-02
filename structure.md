# Project structure

```
css/
│
├── colors/
│   │── my-color-schema.css
│   └── ...
├── fonts/
│   ├── merriweather-roboto-font.css
│   └── ...
├── addons/
│   ├── bheader.css
│   ├── bmenu.css
│   ├── cslider.css
│   ├── llinks.css
│   ├── slider.css
│   └── ...
├── fonts.css
├── reset.css
├── base.css
├── bootstrap-icons.css
├── grid.css
├── style.css
└── custom.css

js/
│
└── addons/
    ├── bheader.js
    ├── bmenu.js
    ├── cslider.js
    ├── slider.js
    └── ...

fonts/
│
├── bootstrap-icons-1.11.3/
│   └── ...
└── ...


media/
│
└── img/
    └── alert_img.png

```
## css folder
CSS files at relative root are considered basic, and ```colors/my-color-schema.css``` too. But not ```fonts.css``` neither ```bootstrap-icons.css``` . They are presented in order to be included. Other css files with accessory functionalities are in ```addons``` folder.

### reset.css
This file resets the css styiles. From http://meyerweb.com/eric/tools/css/reset/ 

### colors folder
Contains color schemas. Sets color variables used in other css files.

### fonts folder
Contains css files to set default font. Each file contains only one or two fonts to be used as a default font (Sets header and content font).

### fonts.css
Sets variables used in other css files related with fonts. If you want to use other than default fonts,
sets the appropiate class to the container (i.e. ```<body class="roboto-merriweather">```). If not, a default theme is applied with serif font for headers ```<h1> ... <h6>``` and sans serif for other elements. Use this file if you want to use a a lot of fonts. If not, use [fonts folder](#fonts-folder) files

### base.css
Complements [reset.css](#resetcss), giving a basic format to different elements such as p, h1-h6...

Only by elements(tags) selection. Not classes.

### grid.css
Grid with flexbox + media queries.

### style.css
Some basic resources with css styles, such as margins, font-aligns, anchor tunning to buttons...

They are used allways throug class settings.

More comments about these resource at [style.css.md](css/style.css.md)

### bootstrap-icons.css
Include this file if you want to use bootstrap-icons font. Some css files depends on it. It will be commented in the appropiate css file, on the first lines.

### custom.css
Is just an empty css file. Here will be included all customizations for the present project.

### css/addons folder
It contains some extra functionalities. Some of them depends on a javascript file or other css file. It is commented in the same file, on the first lines.
For addons documentation read [css/addons/addons.md](css/addons/addons.md).

## js folder
This folder contains javascript files.
### js/addons folder
This folder contains javascript files related with [css/addons](#cssaddons-folder) folder.
For addons documentation read [css/addons/addons.md](css/addons/addons.md).


## HTML example
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Xavier Sala">
    <meta name="description" content="160 - 175 caracteres">
    <title>El títol de la web</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="template/css/reset.css">
    <link rel="stylesheet" href="template/css/colors/my-color-schema.css">
    <link rel="stylesheet" href="template/css/fonts.css">
    <link rel="stylesheet" href="template/css/base.css">
    <link rel="stylesheet" href="template/css/grid.css">
    <link rel="stylesheet" href="template/css/style.css">
    <link rel="stylesheet" href="template/css/bootstrap-icons.css">
    <link rel="stylesheet" href="template/css/custom.css">
</head>
<body>
    <!-- Your HTML content here -->
    <header>
        <!-- Header content -->
    </header>
    <nav>
        <!-- Navigation menu -->
    </nav>
    <main>
        <!-- Main content -->
    </main>
    <footer>
        <!-- Footer content -->
    </footer>
</body>
</html>
```