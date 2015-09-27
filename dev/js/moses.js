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

  var filteredDom = $("#styleguide").children()
                .not("h1").not("h2").not("p")
                .not("script").not("style").not("link");


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


  $("#styleguide").parent().append("<moses-navigation>
    <moses-top-fixed-navigation>
      <i class='fa fa-times'></i>
      <h1>localhost:8080 Styleguide</h1>
    </moses-top-fixed-navigation>

    <moses-top-static-navigation>

    </moses-top-static-navigation>

    <moses-left-navigation>
      <a href=''>Foundation</a>
      <a href=''>Components</a>
      <a href=''>Templets</a>
    </moses-left-navigation>
  </moses-navigation>");

  $("moses-top-fixed-navigation").find(".fa").on("click", function(e) {
    $(this).toggleClass("fa-bars").toggleClass("fa-times");
    $("moses-left-navigation").toggle();
    $("#styleguide").toggleClass("moses-left-navigation-inactive");
    $("moses-top-fixed-navigation").toggleClass("moses-left-navigation-inactive");
  })



  //get all the header that are not inside the target and 
  //put them in the navigation with a tags

  SyntaxHighlighter.all();      


});