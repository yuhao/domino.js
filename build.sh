inspector=$1

if [ -z "$inspector" ]; then
  inspector="inspector/inspector.html"
  echo "Use the default inspector"
else
  echo "Use $inspector as the inspector"
fi

cp $inspector core/inspector.html

echo "Generating content script"
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
