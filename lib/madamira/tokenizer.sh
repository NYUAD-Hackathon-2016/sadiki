#!/bin/bash
echo $1 | perl ArabicTokenizer.pl utf8 buckwalter X |perl -pe 's/\s+/\n/g;' |perl ALMOR3.pl almor-a12.db | perl -pe 's/.*gloss:(\S+).*/$1/;';