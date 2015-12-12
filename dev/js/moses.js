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
  // $("body").prepend()
  // SyntaxHighlighter.autoloader('htmlbrush', 'http://agorbatchev.typepad.com/pub/sh/3_0_83/scripts/shBrushXml.js')
  //add here the code parser script tag
  // then select every tag and put them in the area

  var createScriptTag = function () {
    return $('<script/>', {
      type: "syntaxhighlighter",
      class: "brush: xml"
    });
  }

  //navigation html:
  $("#styleguide").parent().append("<moses-navigation>
    <moses-top-fixed-navigation>
      <i class='fa fa-times'></i>
      <h1>Styleguide</h1>
    </moses-top-fixed-navigation>

    <moses-top-static-navigation>

    </moses-top-static-navigation>

    <moses-left-navigation>
      <ul id='moses-foundation'>
        <li><a href='/examples/bootstrap/foundation'>Foundation</a></li>
      </ul>
      <ul id='moses-components'>
        <li><a href='/examples/bootstrap/components'>Components</a></li>
      </ul>
      <ul id='moses-templates'>
        <li><a href='/examples/bootstrap/templates'>Templates</a></li>
      </ul>
    </moses-left-navigation>
  </moses-navigation>");

  //navigation toggle:
  $("moses-top-fixed-navigation").find(".fa").on("click", function(e) {
    $(this).toggleClass("fa-bars").toggleClass("fa-times");
    $("moses-left-navigation").toggle();
    $("#styleguide").toggleClass("moses-left-navigation-inactive");
    $("moses-top-fixed-navigation").toggleClass("moses-left-navigation-inactive");
  });

  //styleguide name assignment:
  var href = document.location.href.replace('http://', '');
  href = href.replace('https://', '');

  var targetPage,
      name = href.replace(/\/.*/g, ''),
      path = href.replace(name, '');

  name = name.replace(name[0], name[0].toUpperCase());

  $("moses-top-fixed-navigation").find('h1').text(name + " Styleguide");

  //styleguide finding current page:
  function assignNavigationTarget () {
    possibleTargets = ['components', 'foundation', 'templates'];

    possibleTargets.forEach( function (e, i) {
      if (path.indexOf(e.toLowerCase()) > -1)  {
        targetPage = e;
      }
    });

    if (typeof targetPage === "undefined") {
      targetPage = 'foundation';
    }
  }

  assignNavigationTarget();

  console.log(targetPage);
  console.log($("#moses-" + targetPage));

  // localStorage.setItem("moses:routes", JSON.stringify({ "lol": "test", "myvar": "this works" }));  

  //headers assignment logic:
  var writtenScope = $("#styleguide").children();

  var filteredDom = writtenScope
                .not("h1").not("h2").not("p")
                .not("script").not("style").not("link");

  var idCount = 0;
  
  for (i=1; i<=3; i++) {

    if (i == 1) { var headersArray = [] }

    var ref_array = writtenScope.filter("h" + i);

    $.each(ref_array, function(i, e) {
      idCount = idCount + 1;
      $(e).attr('id', 'moses' + idCount);
      $(e).addClass('moses-title')
    });

    headersArray = $.merge(headersArray, ref_array);
  }(i)
  
  b = headersArray;

  console.log(headersArray);

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

    if ($element.hasClass('moses-hide')) {
      return true;
    }

    $element = $element.wrap("<div class='target'></div>");
    console.log($element);
    return createScriptTag().html("<![CDATA[ " + html_beautify($element.parent().html(), { indent_size: 4 }) + " ]]>");

  }

  var createHtmlView = function (domElement) {
    domElement.after(getWrapper(domElement));
  }

  filteredDom.each(function(i, element) {
      createHtmlView($(element));
  });

  SyntaxHighlighter.defaults["toolbar"] = false;
  // SyntaxHighlighter.defaults["html-script"] = true;


  //get all the header that are not inside the target and 
  //put them in the navigation with a tags

  SyntaxHighlighter.all();      

});