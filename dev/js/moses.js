//add here the code parser script tag
// then select every tag and put them in the area
$(document).ready(function() {
  // SyntaxHighlighter.autoloader('htmlbrush', 'http://agorbatchev.typepad.com/pub/sh/3_0_83/scripts/shBrushXml.js')

  var createScriptTag = function () {
    return $('<script/>', {
      type: "syntaxhighlighter",
      class: "brush: xml"
    });
  }

  $("#styleguide").parent().append("<moses-navigation>
    <moses-top-fixed-navigation>
      <i class='fa fa-times'></i>
      <h1>localhost:8080 Styleguide</h1>
    </moses-top-fixed-navigation>

    <moses-top-static-navigation>

    </moses-top-static-navigation>

    <moses-left-navigation>
      <ul id='moses-foundation'>
        <li><a href=''>Foundation</a></li>
      </ul>
      <ul id='moses-components'>
        <li><a href=''>Components</a></li>
      </ul>
      <ul id='moses-templates'>
        <li><a href=''>Templates</a></li>
      </ul>
    </moses-left-navigation>
  </moses-navigation>");

  $("moses-top-fixed-navigation").find(".fa").on("click", function(e) {
    $(this).toggleClass("fa-bars").toggleClass("fa-times");
    $("moses-left-navigation").toggle();
    $("#styleguide").toggleClass("moses-left-navigation-inactive");
    $("moses-top-fixed-navigation").toggleClass("moses-left-navigation-inactive");
  })


  var writtenScope = $("#styleguide").children()

  var filteredDom = writtenScope
                .not("h1").not("h2").not("p")
                .not("script").not("style").not("link");


  var idCount = 0;
  for (i=1; i<=6; i++) {
    if (i == 1) { var headersArray = [] }
    // i = new Number(i);
    var ref_array = writtenScope.filter("h" + i);
    $.each(ref_array, function(i, e) {
      idCount++;
      $(e).attr('id', 'moses' + idCount);
    });
    headersArray = $.merge(headersArray, ref_array);
  }(i)
  
  $.each(headersArray, function(i, e) { 
    $("#moses-foundation").append("<a href='#" +$(e).attr('id') + "'>" + $(e).text() + "</a>"); 
  });

  var getWrapper = function (html) {
    html = html.wrap("<div class='target'></div>");

    return createScriptTag().html("<![CDATA[ " + html_beautify(html.parent().html(), { indent_size: 4 }) + " ]]>");
  }

  var createHtmlView = function (domElement) {
    domElement.append(getWrapper(domElement));
  }

  filteredDom.each(function(i, element) {
    if(i === 3) {
      a = $(element);
    }
    createHtmlView($(element));
  });

  SyntaxHighlighter.defaults["toolbar"] = false;
  // SyntaxHighlighter.defaults["html-script"] = true;





  //get all the header that are not inside the target and 
  //put them in the navigation with a tags

  SyntaxHighlighter.all();      


});