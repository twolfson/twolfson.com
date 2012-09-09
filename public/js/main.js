// Grab all <pre>'s on the page and iterate them
var $preArr = document.getElementsByTagName('pre') || [],
    $pre,
    i = $preArr.length;
console.log($preArr);
while (i--) {
  $pre = $preArr[i];

  // Get all <code>'s inside of the <pre>'s and iterate them
  var $codeArr = $pre.getElementsByTagName('code') || [],
      $code,
      j = $codeArr.length;
  while (j--) {
    $code = $codeArr[j];

    // Highlight the code block
    hljs.highlightBlock($code);
  }
}