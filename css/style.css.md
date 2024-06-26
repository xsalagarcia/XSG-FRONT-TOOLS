# Comments about style.css file
The defined classes are:
- Text format
    - *text-align-justify*: Justifies a block text (i.e. inside a paragraph).
    - *text-align-center*: Centers a block text.
    - *text-align-right*:
    - *text-shadow*: Shadows the text.
- Font
    - *bold*
    - *italica*
    - *underline*
    - *font-size-l*: 1.2rem;
    - *font-size-lx*: 1.5rem;
- Buttons
    - *btn*: Sets an ```<a>``` element as a button.
    - *floating-anchor-bottom-right*: Sets an ```<a>``` at bottom-left. For the typical functionality of "go to the top".
- Menu
    - *menu-bar*: Ready to be defined as a nav.menu-bar.row>a.col-n\{item-$\}*$   n: col-3, 4...
    - *fmenu-bar*: Same as *menu-bar*, but organized like this: nav.menu-bar>ul>(li.col-n>a\{item-$\})*$   n: col-3, 4...
- Margins and paddings
    - *padding-0*: padding: 0;
    - *padding-0-25*: padding: 0.25rem;
    - *padding-0-5*: padding: 0.5rem;
    - *padding-1*
    - *padding-2*
    - *padding-top-bottom-0*
    - *padding-top-1*
    - *padding-left-1*
    - *margin-0*
    - *margin-1*
    - *margin-top-bottom-0*
    - *margin-top-bottom-0-5*: margin-top: 0.5rem; margin-bottom: 0.5rem;
    - *margin-top-bottom-1*: margin-top: 1rem; margin-bottom: 1rem;
    - *margin-top-0*
- Block alignments and effects
    - *center-block*: margin-right: auto; margin-left: auto;
    - *box-shadow*: Shadows the container (box-shadow)
    - *width-100*: width: 100%;
    - *width-75*: width: 75%;
    - *width-50*: width: 50%;    
    - *basic-border*: border: 1px solid black;
- Backgrounds:
    - *background-color-n*: n = [1, 6]
    - *background-contrast-color-n*: n = [1, 6]
    - *background-gray-n*: n = [1, 6]
    - *background-red*
    - *background-salmon*
    - *background-orange*
    - *background-pink*
    - *background-blue*
    - *background-green*
- Colors
    - *color-n*: n = [1, 6]
    - *contrast-color*: n = [1, 6]
    - *gray-color-n*: n = [1, 6]
    - *color-red*
    - *color-salmon*
    - *color-orange*
    - *color-pink*
    - *color-blue*
    - *color-green*
- FX - Animations
    - *scale-on-focus-n* When an element is focuses, will be scaled at n. n can be 1075; 1100; 1125; 1150. (1075 is 1.075x1.075). 
- Form tunning
    - *toggle-button* An ```<input type="checkbox">``` converted to a toggle button.
    Example of use:
        ```
        <div class="toggle-button">
            <input type="checkbox" name="" id="toggle-button-example" class="toggle-button-input">
            <label for="toggle-button-example" class="graphic"></label>
            <label for="toggle-button-example">Text del toggle button</label>
        </div>
        ```
- Other
    - *noscript*: use ```<noscript class="noscript"></noscript>``` at the start of the body and the magic will be done.