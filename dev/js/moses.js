//add here the code parser script tag
// then select every tag and put them in the area
$(document).ready(function() {
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

    return createScriptTag().html("<![CDATA[ " + html_beautify(html.parent().html(), { indent_size: 2 }) + " ]]>");
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

  SyntaxHighlighter.config.stripBrs = true;

  SyntaxHighlighter.defaults["tab-size"] = 2;
  SyntaxHighlighter.defaults["toolbar"] = false;



  SyntaxHighlighter.all();      


});