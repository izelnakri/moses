//inject custom css:
var css,
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';

if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);

//also add font-awesome
var fileref = document.createElement("link");
fileref.setAttribute("rel", "stylesheet");
fileref.setAttribute("type", "text/css");
fileref.setAttribute("href", 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css');
document.getElementsByTagName("head")[0].appendChild(fileref);

//actual code:
$(document).ready(function() {
  // var rootStyleGuidePath = '/examples/custom'; //FIX THIS WITH REAL LOGIC

  // $("body").prepend()
  // SyntaxHighlighter.autoloader('htmlbrush', 'http://agorbatchev.typepad.com/pub/sh/3_0_83/scripts/shBrushXml.js')
  //add here the code parser script tag
  // then select every tag and put them in the area

  //styleguide name assignment:
  var href = document.location.href.replace('http://', '');
  href = href.replace('https://', '');

  var targetPage, rootStyleGuidePath,
      name = href.replace(/\/.*/g, ''),
      path = href.replace(name, '');

  name = name.replace(name[0], name[0].toUpperCase());

  //styleguide finding current page:
  function assignNavigationTarget () {
    possibleTargets = ['components', 'foundation', 'templates'];

    path = parseDirectoryURL(path);

    possibleTargets.forEach( function (e, i) {
      if (path.indexOf(e.toLowerCase()) > -1)  {
        targetPage = e;
        path = path.replace(targetPage, '');
        //rootStyleguide path should be before the targetPage
      }
    });

    if (typeof targetPage === "undefined") {
      targetPage = 'foundation';
      //check if the link has any dots
    }

    path = parseDirectoryURL(path); //we call this twice on purpose!!

    rootStyleGuidePath = path;
  }

  function parseDirectoryURL (path) {
    if (path.match('#')) {
      path = path.substring(0, path.lastIndexOf('#'));
    }

    if (path.match(/\./)) { // this is for extension
      path = path.substring(0, path.lastIndexOf('/'));
    }

    if(path.lastIndexOf('/') === path.length - 1) {
      path = path.substring(0, path.length - 1);
    }
    //maybe also add one just for index

    return path;
  }

  assignNavigationTarget();



  var createScriptTag = function () {
    return $('<script/>', {
      type: "syntaxhighlighter",
      class: "brush: xml"
    });
  }

  //navigation html:
  $("#styleguide").parent().append("<moses-navigation>
    <moses-left-navigation>
      <ul id='moses-foundation'>
        <li><a href='" + rootStyleGuidePath + "/foundation'>Foundation</a></li>
      </ul>
      <ul id='moses-components'>
        <li><a href='" + rootStyleGuidePath + "/components'>Components</a></li>
      </ul>
      <ul id='moses-templates'>
        <li><a href='" + rootStyleGuidePath + "/templates'>Templates</a></li>
      </ul>
    </moses-left-navigation>
    <moses-top-fixed-navigation class='opened'>
      <i class='fa fa-times'></i>
      <h1>Styleguide</h1>
    </moses-top-fixed-navigation>

    <moses-top-static-navigation>

    </moses-top-static-navigation>
      </moses-navigation>");

  $("moses-top-fixed-navigation").find('h1').text(name + " Styleguide");

  //navigation toggle:
  $("moses-top-fixed-navigation").find(".fa").on("click", function(e) {
    $(this).toggleClass("fa-bars").toggleClass("fa-times");
    $("moses-left-navigation").toggle();
    $("#styleguide").toggleClass("closed");
    $("moses-top-fixed-navigation").toggleClass("opened");
  });

  //Listen 'ESC' key to untoggle left navigation:
  $(document).keyup(function(e){
    if(e.which == 27){
      $("moses-top-fixed-navigation").find(".fa").toggleClass("fa-bars").toggleClass("fa-times");
      $("moses-left-navigation").toggle();
      $("#styleguide").toggleClass("closed");
      $("moses-top-fixed-navigation").toggleClass("opened");
    }
  });

  // localStorage.setItem("moses:routes", JSON.stringify({ "lol": "test", "myvar": "this works" }));  

  //headers assignment logic:
  var writtenScope = $("#styleguide").children(),
      headersArray = [],
      subheaderArray = [];

  var filteredDom = writtenScope
                .not("h1").not("h2").not("h3").not("p")
                .not("script").not("style").not("link").not(".moses-ignore").not(".moses-subheader");

  function findHeaders (callback) {
    var idCount = 0;
  
    for (i=1; i<=4; i++) {

      var ref_array = writtenScope.not("moses-ignore").not(".moses-subheader").filter("h" + i),
          ref_subheader_array = writtenScope.filter(".moses-subheader").filter("h" + i);

      $.each(ref_array, function(i, e) {
        idCount = idCount + 1;
        $(e).attr('id', 'moses' + idCount);
        $(e).addClass('moses-title')
      });

      headersArray = $.merge(headersArray, ref_array);
      subheaderArray = $.merge(subheaderArray, ref_subheader_array);
    }(i)

    if (callback) { callback(); }
  }
  
  //subheader assignment logic: THERE IS A STRANGE BUG HERE

  function findSubheadersHeader (element, promise) {
    var prevElement = $(element).prev();

    // console.log("break point");
    // console.log(element);

    if (!prevElement.hasClass('moses-subheader')) {
      switch (prevElement.prop("tagName")) {
        case "H1":
        case "H2":
        case "H3":
        case "H4":
          return promise.resolve(prevElement);
          break;
      }
    }

    findSubheadersHeader(prevElement, promise);
  }



  function assignSubheader (element, index) {
    var promise = jQuery.Deferred();

    findSubheadersHeader(element, promise);
    
    promise.done(function (header) {
      if (!header.next().hasClass("moses-subheader-display")) {
        header.after("<div class='moses-subheader-display'></div>");
      }

      header.next().append("<a href='#" + $(element).attr('id') + "'>" + $(element).text() + "</a>");
    });

    // console.log('header found for element: ');
    // console.log(header);
  
    //first find the category
  }



  findHeaders(function () {
    $.each(headersArray, function(i, e) { 
      $("#moses-" + targetPage).append("<li><a href='#" + $(e).attr('id') + "'>" + $(e).text() + "</a></li>"); 
    });

    console.log(subheaderArray);

    $.each(subheaderArray, function(i, e) {
      $(e).attr('id', 'sub-moses' + i);
      $(e).addClass('moses-title');

      assignSubheader(e, i);
      // console.log(e);
      //subheaderAssignmentLogicHere
    });



    // //subheader assignment logic:
    // $.each(subheaderArray, function(i, e) { 
    //   //assign the array to the right area


    //   $(e).attr('class');
    // });
    // console.log(subheaderArray);


    //ITERATE OVER SUBHEADER ARRAY AND ASSIGN THEM TO THE SUBHEADER DISPLAYS


    //write subheader displays
    // $.each(headersArray, function (index, header) {
    //   var element = $(header), 
    //       nextHeader = headersArray[index + 1];

    //   function goToNextElement (element) {
    //     nextElement = element.next();

    //     if (nextElement === nextHeader) {
    //       return;
    //     }
        
    //     if (nextElement.hasClass('.moses-ignore')) {
    //       subheaderArray.push(nextElement);
    //     }

    //     goToNextElement(nextElement);
    //   }

    //   goToNextElement(element);
    // });
  });

  $.each(headersArray, function(i, e) { 
    $("#moses-" + targetPage).append("<li><a href='#" + $(e).attr('id') + "'>" + $(e).text() + "</a></li>"); 
  });

  $("moses-left-navigation").find('li').each(function (i, e) {
    $(e).on('click', function(event) {
      $("moses-left-navigation").find('li').each(function(index, element) {
        if ($(element).hasClass('selected')) {
          $(element).removeClass('selected');
        }
      });

      $(e).toggleClass('selected'); 
    });
  });

  //html display logic:
  var getWrapper = function ($element) {
    if ($element.hasClass('moses-group')) {
      $element.addClass('target');
      // console.log($element.html());
      return createScriptTag().html("<![CDATA[ " + html_beautify($element.html().trim(), { indent_size: 4 }) + " ]]>");
    }

    if ($element.hasClass('moses-hide') || $element.hasClass('moses-palette') || $element.hasClass('moses-icon-list')) {
      return undefined;
    }

    $element = $element.wrap("<div class='target'></div>");
    // console.log($element);
    return createScriptTag().html("<![CDATA[ " + html_beautify($element.parent().html(), { indent_size: 4 }) + " ]]>");

  }

  var createHtmlView = function (domElement) {
    domElement.after(getWrapper(domElement));
  }

  filteredDom.each(function(i, element) {
      createHtmlView($(element));
  });


  //moses color logic:
  $(".moses-color").each(function(i, e) {
    $(e).css('background', $(e).text());
  });

  $(".moses-palette").find("p").each(function(i, e) {
    $(e).wrap("<div class='moses-palette-grid'></div>");
    var $grid = $(e).parent(),
        nextColor = $grid.next(".moses-color");
    if (nextColor) {
      nextColor.appendTo($grid);
    }
  });

  $(".moses-palette").find("span").each(function(i, e) {
    $(e).wrap("<div class='moses-grid'></div>");
  });

  //moses icon list logic:
  // var iconClassname = $("moses-icon-list").attr('icon-class-name') || "icon";

  // $()




  SyntaxHighlighter.defaults["toolbar"] = false;
  // SyntaxHighlighter.defaults["html-script"] = true;


  //get all the header that are not inside the target and 
  //put them in the navigation with a tags

  SyntaxHighlighter.all();      

});