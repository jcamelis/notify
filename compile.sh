java -jar scripts/compiler.jar --js notify.js --js_output_file notify.min.js

cat license.txt >> temp.txt
cat notify.min.js >> temp.txt
cat temp.txt > notify.min.js

rm temp.txt