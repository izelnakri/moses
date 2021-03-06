##One js file that turns your frontend framework into a styleguide

This is the library every frontend team needs to document and showcase their work. The library displays the html of your component + classes, and does few necessary magic for you... However we never intend to get in your way!

It is very easy to get started:

- Create an empty webpage that has your css and javascript.
- Include 
```html 
<script src="https://rawgit.com/izelnakri/moses/master/src/moses.js"></script>
``` 
before ``` </body> ```

Now you can use the styleguide!

####How to Use

- create 
```html
  <main id="styleguide">
``` 
Whatever html you write inside the the ```<main>``` tag will get documented!
- The library uses h1, h2, h3 as the title of your components, they get displayed on the left side of the styleguide navigation.
```<p>``` tag  is used for descriptions, thus our html display engine ignores the element at the direct childrent level after ``` <main> ``` tag.
- Every element other than 
```html
 <h1>, <h2>, <h3> and <p>
``` 
tag will be detected by the styleguide display engine and the html will be displayed under the element.

Now go ahead and try the library, you will be impressed.

##Additional stuff

###Grouping elements
- you can group your components/classes under a single html display if you wrap the elements with ```.moses-group```:
```html
 <div class="moses-group">
    <!-- everything here will get displayed including the comments! -->
  </div>
````

###Hiding elements
- you can turn of the display generation for a single element/parent element with ``` .moses-hide ```:
```html
 <div class="moses-hide">
    <!-- these elements will have an html display -->
  </div>
````



todo: 

###Display icons


###Display color palette

###Display grid

###Seperate elements to categories



TODO: 
- ignore-tag logic.(done)
- navigation logic. (half-done)
- import the css via the javascript (done)
- styleguide name logic from domain (done)
- navigation populating + localstorage caching (mostly done)
- maybe use http://prismjs.com/ (todo - low priority)
- add ESC keylistener to untoggle navigation (done)
- implement the rootStyleguidePath correctly in RegEX (probably done)
- implement subheaderLists (done)
- add Logic to implement extra Styleguide Categories (variable<Array> moses.js will check on runtime and merge it with possibleTargets<Array>)
- click on the colors to copy color hex code
- loading progress bar caveat

special classes:

.moses-group

.moses-hide

.moses-icon-list

.moses-color / palette

.moses-grid

.moses-code

.moses-subheader

