COMPILER=scripts/compiler.jar
SOURCE=notify.js
MINIFY=notify.min.js
LICENSE=license.txt
TEMP=temp.txt

if [ ! -f $COMPILER ]
then
    echo Downloading Closure Compiler
    wget http://closure-compiler.googlecode.com/files/compiler-latest.zip
    unzip compiler-latest.zip $COMPILER -d scripts/
    rm compiler-latest.zip
fi

echo Compiling and Minifying with Closure Compiler
java -jar $COMPILER --compilation_level SIMPLE_OPTIMIZATIONS --js $SOURCE --js_output_file $MINIFY

cat $LICENSE >> $TEMP
cat $MINIFY >> $TEMP
cat $TEMP > $MINIFY

rm $TEMP
