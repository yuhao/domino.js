vulcanize -o din.html core/ticket.html

cat din.html | awk '
{
  if (NR >= 4 &&
      line != "\x27use strict\x27;" &&
      line != "<script>" &&
      line != "</script>") {
    print line;
  }
  line = $0;
}' | awk '
BEGIN {
  print "injectScript(function() {"
}
{
  print "  "$0;
}
END {
  print "});"
}
' | cat plugin/content-script-template.js - > plugin/content-script.js
