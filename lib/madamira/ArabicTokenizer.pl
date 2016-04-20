#! /usr/bin/perl

use English;
$OUTPUT_AUTOFLUSH = 1;

################################################################################
# ArabicTokenizer © 2005 Copyright University of Maryland. All Rights Reserved. 
################################################################################
# Arabic Tokenizer (by Nizar Habash)
# Does simple tokenization and encoding conversion
# Usage ArabicTokenizer <input-encoding> <output-encoding> <mode> <stdin> <stdout>
# 
# internally use CP1256 as normalized encoding (BW confuses latin and arabic)
# dagger Alif and wasla are not included in CP1256 so they are deleted always
################################################################################

require 'ArabicTokenizer.Code.pl';

# argument handling
$argc  = @ARGV;
die "Usage: $0 <input-encoding> <output-encoding> <mode> <stdin> <stdout>\n<encoding>::={ISO-8859-6,CP-1256,UTF-8,UTF-16,BUCKWALTER}\n<mode>::={novowels,vowels,notokenization}\n"
    if ($argc != 3);
$incode  = $ARGV[0];
$outcode = $ARGV[1];
$mode = $ARGV[2];

while($line=<STDIN>){
    chomp($line);
    
    $outline=&ArabicConvert($line,$incode,$outcode,$mode);
    print "$outline\n";
}
################################################################################
# ArabicTokenizer © 2005 Copyright University of Maryland. All Rights Reserved. 
################################################################################
