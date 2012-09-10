// Grab all <pre>'s on the page and iterate them
var $preArr = document.getElementsByTagName('pre') || [],
    $pre,
    i = $preArr.length;
while (i--) {
  $pre = $preArr[i];

  // Highlight the code block
  hljs.highlightBlock($pre);
}