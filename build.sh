node_modules/vulcanize/bin/vulcanize -o din.html core/main.html

node extractJS.js | awk '
BEGIN {
  print "injectScript(function() {";
}
{
  if (NF != 0)
    print "  "$0
}
END {
  print "});";
}
' | cat plugin/content-script-template.js - > plugin/content-script.js
