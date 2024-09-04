(function () {
  var DATA_KEY = "wik.data";

  // See http://daringfireball.net/2010/07/improved_regex_for_matching_urls
  var URL_REGEXP =
    /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;

  var INITIAL_CONTENT = {
    Home: "Edit me! Just type away on this page.\n\nCreate links by wrapping the text like in square brackets like:\n\n- [Banana] is an internal page.\n- [https://github.com/semanticdata/wik] is an external page.\n\nClick or press enter inside links to navigate.\n\nClick 'H' to come back 'Home'.\n\nFinally, you can click '#' to edit/grab/search all content/pages.",
    Banana: "This is the content of the Banana page. Go back [Home].",
  };

  var currentPage, allPages;
  var editor = document.getElementById("editor");

  document.addEventListener("DOMContentLoaded", function (event) {
    load();
    enterPage("Home");
  });

  function load() {
    var rawData = localStorage.getItem(DATA_KEY);
    if (!rawData) {
      allPages = INITIAL_CONTENT;
    } else {
      allPages = JSON.parse(rawData);
    }
  }

  function enterPage(pageName) {
    currentPage = pageName;
    window.location.hash = pageName;
    editor.value = pageContent();
    document.getElementById("title").innerHTML = currentPage;
    editor.blur();
  }

  function pageContent() {
    if (currentPage == "AllContent") {
      return JSON.stringify(allPages, undefined, 4);
    } else {
      var data = allPages[currentPage] || "";
      return data;
    }
  }

  function save() {
    if (currentPage == "AllContent") {
      allPages = JSON.parse(editor.value);
    } else {
      allPages[currentPage] = editor.value;
    }
    localStorage.setItem(DATA_KEY, JSON.stringify(allPages));
  }

  function followLink(e) {
    var linkUnderCursor = null;
    var text = editor.value;
    var cursor = editor.selectionStart;
    var linkStart, linkEnd;
    for (var i = 0; i < text.length; i++) {
      var c = text.charAt(i);
      // if (c == "[" || c == "(") {
      if (c == "[") {
        linkStart = i;
      }
      // if (c == "]" || c == ")") {
      if (c == "]") {
        if (linkStart != null) {
          linkEnd = i;
        }
        if (linkStart < cursor && cursor <= linkEnd) {
          break;
        } else {
          linkStart = null;
          linkEnd = null;
        }
      }
    }
    if (linkStart != null && linkEnd != null) {
      linkUnderCursor = text.substring(linkStart + 1, linkEnd);
    }
    var isLinkEnter = e.type == "click" || e.keyCode == 13;
    if (isLinkEnter && linkUnderCursor) {
      e.preventDefault();
      if (linkUnderCursor.match(URL_REGEXP)) {
        window.location = linkUnderCursor;
      } else {
        enterPage(linkUnderCursor);
      }
    }
  }

  editor.onkeyup = save;
  editor.onkeydown = followLink;
  editor.onclick = followLink;

  window.onhashchange = function () {
    var pageName = window.location.hash.substring(1);
    enterPage(pageName);
  };
})();
