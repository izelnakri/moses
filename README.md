##One js file that turns your frontend framework into a styleguide

This is the library every frontend team needs to document and showcase their work. The library displays the html of your component + classes, and does few necessary magic for you, we aim to never get in your way!

It is very easy to get started:

- Create an empty webpage that has your css and javascript.
- Include ```<script src="https://rawgit.com/izelnakri/moses/master/src/moses.js"></script>``` before ```</body>```.

Now you can use the styleguide!

####How to Use

- copy this after your ```<body>``` : ```<main id="styleguide">```. Whatever html you write inside the the <main> tag will get documented!
- The library uses h1, h2, h3 as the title of your components, they get displayed on the right side of the styleguide navigation.
- ```<p>``` tag  is used for descriptions, thus our html display engine ignores the element.
- Every element other than ```<h1>, <h2>, <h3> and <p>``` tag will be detected by the styleguide display engine and the html will be displayed under the element.

Now go ahead and try the library you will be impressed.

##Additional stuff

###Grouping elements
- you can group your components/classes under a single html display if you wrap the elements with ```.moses-group```:
```<div class="moses-group">
    <!-- everything here will get displayed including the comments! -->
  </div>````

###Hiding elements
- you can turn of the display generation for a single element/parent element with ```.moses-hide```:
```<div class="moses-hide">
    <!-- these elements will have an html display -->
  </div>````



todo: 

###Display icons


###Display color palette

###Display grid

###Seperate elements to categories



TODO: 
- ignore tag logic.
- navigation logic.
- import the css via the javascript
- styleguide name logic from domain
- navigation populating + localstorage caching
- maybe use http://prismjs.com/



special classes:

.moses-group

.moses-hide

.moses-icon-list

.moses-color

.moses-grid

