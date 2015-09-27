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

    return createScriptTag().html("<![CDATA[ " + html.parent().html() + " ]]>");
  }

  var createHtmlView = function (domElement) {
    domElement.append(getWrapper(domElement));
  }

  filteredDom.each(function(i, element) {
    createHtmlView($(element));
  });

  SyntaxHighlighter.all();      

  function removeToolbars () {
    $(".toolbar").each(function(i, e) { 
      $(e).hide(); 
    });
  }

  window.setTimeout(removeToolbars, 1500);
});