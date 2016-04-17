#!/bin/sh -- # This comment tells perl not to loop!
eval 'exec /usr/bin/perl -S $0 ${1+"$@"}'
    if 0;
use Benchmark;
use Encode qw/encode decode/; 
use strict;

################################################################################
# ArabicTokenizer © 2005 Copyright University of Maryland. All Rights Reserved. 
################################################################################
# Arabic Tokenizer Code (by Nizar Habash)
################################################################################

#TODOs
# //Add parameters!  make incode/outcode params
# set defaults
# why not tokenize in BW? which keeps wasla
# DO NOT tokenize English? ... add <LATIN> .. <LATIN> as a parameter
# create as a module...

#Tokenization Parameters
my $NormalizeNumerals="8"; #set to the value of what to normalize as, e.g. "8" "0" or "@"; if no normalization, use 0
my $InvertNumerals=0; # 4991 --> 1994
my $RemoveTatweel=1;
my $SeparatePunctuation=1;
my $ConsolidatePunctuation=1;
my $verbose=0;
my $RemoveDiacrtics=1;
my $RemovePunctuation=0;   #//make classes of remove punc and consolidate punc..
my $SkipXML=1;

sub ArabicConvert {
    my ($line,$incode,$outcode,$mode)=@_;
    my $inline=$line; #default
    my $preXML;
    my $postXML;
    my $outline;

    if ($SkipXML){ #the XML used is only that of MTeval ... (for now)
	if (($inline=~/^<\/?(hl|p|seg|doc|srcset)>$/i)||
	    ($inline=~/^<doc docid=/i)||
	    ($inline=~/^<srcset setid=/i)) {
	    return($inline);
	}else{
	    if ($inline=~s/^(<(seg|p) id=\d+>)//i){$preXML=$1}
	    if ($inline=~s/(<\/(seg|p)>)$//i){$postXML=$1}
	}
    }
    
    if($incode =~ /^UTF-?8?$/i){$inline=&fromUTF8ToCP1256($inline);}
    elsif($incode =~ /^UTF-?16?$/i){$inline=&fromXToY("UTF-16","cp1256",$inline);}
    elsif($incode =~ /^(BUCKWALTER|BW)$/i){$inline=&fromBuckwalterToCP1256($inline);}
    elsif($incode =~ /^(ISO-?8859-?6?|ISO)$/i){$inline=&fromISO88596ToCP1256($inline);}
   
    if ($mode!~/^notokenization$/i){
	$outline=&tokenize($inline);
    }else{
	$outline=$inline;
    }
    
    if($outcode =~ /^UTF-?8?$/i){$outline=&fromCP1256ToUTF8($outline);}
    elsif($outcode =~ /^UTF-?16?$/i){$outline=&fromXToY("cp1256","UTF-16",$outline);} 
    elsif($outcode =~ /^(BUCKWALTER|BW)$/i){$outline=&fromCP1256ToBuckwalter($outline);}
    elsif($outcode =~ /^(ISO-8859-6|ISO)$/i){$outline=&fromCP1256ToISO88596($outline);}

    if ($verbose){print STDERR "GIVEN: $line\nINPUT: $inline\nOUPUT: $outline\n";}
    
    if ($SkipXML) {
	if ($preXML ne ""){ $outline= $preXML."\n".$outline;}
	if ($postXML ne ""){ $outline= $outline."\n".$postXML;}
    }
    return ("$outline");
}

################################################################################
# ArabicTokenizer © 2005 Copyright University of Maryland. All Rights Reserved. 
################################################################################

sub tokenize {
    my ($line)=@_;

    my $PUNCT="«»\\-\\+\=\.\,\;\:\`\"\¡\?\!\\\/\@\#\%\^\&\(\)\\[\\]\xa2\xba\xbf";
    #\xba semicolon
    #\xbf questionmark
    #\xa2 arabic comma

    my $ArabicLetters="Á-ÖØ-ßáã-æíìð-óõöøúÜ";
    
    if ($RemoveDiacrtics){$line=~s/[ð-óõöøú]//g;}
    if ($RemoveTatweel){ $line=~s/Ü//g; }
    if ($RemovePunctuation){ $line=~s/[$PUNCT]+/ /g;}

    if ($SeparatePunctuation){ 
	
	if ($ConsolidatePunctuation){  $line=~s/([$PUNCT]+)/ $1 /g; }
	else { $line=~s/([$PUNCT])/ $1 /g; }
    }

#    $line=~s/([$ArabicLetters]+)/ $1 /g;
	
    $line=~s/\s+/ /g;$line=~s/^\s//; $line=~s/\s$//; 
    
    return ($line);

}

sub fromCP1256ToBuckwalter {
    my ($line)=@_;

    $line =~ s/Á/\'/g;
    $line =~ s/Â/\|/g;
    $line =~ s/Ã/\>/g;
    $line =~ s/Ä/\&/g;
    $line =~ s/Å/\</g;
    $line =~ s/Æ/\}/g;
    $line =~ s/Ç/A/g;
    $line =~ s/È/b/g;
    $line =~ s/É/p/g;
    $line =~ s/Ê/t/g;
    $line =~ s/Ë/v/g;
    $line =~ s/Ì/j/g;
    $line =~ s/Í/H/g;
    $line =~ s/Î/x/g;
    $line =~ s/Ï/d/g;
    $line =~ s/Ð/\*/g;
    $line =~ s/Ñ/r/g;
    $line =~ s/Ò/z/g;
    $line =~ s/Ó/s/g;
    $line =~ s/Ô/\$/g;
    $line =~ s/Õ/S/g;
    $line =~ s/Ö/D/g;
    $line =~ s/Ø/T/g;
    $line =~ s/Ù/Z/g;
    $line =~ s/Ú/E/g;
    $line =~ s/Û/g/g;
    $line =~ s/Ý/f/g;
    $line =~ s/Þ/q/g;
    $line =~ s/ß/k/g;
    $line =~ s/á/l/g;
    $line =~ s/ã/m/g;
    $line =~ s/ä/n/g;
    $line =~ s/å/h/g;
    $line =~ s/æ/w/g;
    $line =~ s/í/y/g;
    $line =~ s/ì/Y/g;
    $line =~ s/ð/F/g;
    $line =~ s/ñ/N/g;
    $line =~ s/ò/K/g;
    $line =~ s/ó/a/g;
    $line =~ s/õ/u/g;
    $line =~ s/ö/i/g;
    $line =~ s/ø/\~/g;
    $line =~ s/ú/o/g;
    $line =~ s/Ü/_/g;
    $line =~ s/\xa2/\,/g; # comma
    $line =~ s/¡/\,/g;
    $line =~ s/\xba/\;/g; # semicolon
    $line =~ s/\xbf/\?/g; # questionmark

    return ($line);
}
################################################################################
# ArabicTokenizer © 2005 Copyright University of Maryland. All Rights Reserved. 
################################################################################
sub fromBuckwalterToCP1256 {
    my ($line)=@_;

    $line =~ s/\'/\Á/g;
    $line =~ s/\|/Â/g;
    $line =~ s/\>/Ã/g;
    $line =~ s/\&/Ä/g;
    $line =~ s/\</Å/g;
    $line =~ s/\}/Æ/g;
    $line =~ s/A/Ç/g;
#added
    $line =~ s/\{/Ç/g;
#
    $line =~ s/b/È/g;
    $line =~ s/p/É/g;
    $line =~ s/t/Ê/g;
    $line =~ s/v/Ë/g;
    $line =~ s/j/Ì/g;
    $line =~ s/H/Í/g;
    $line =~ s/x/Î/g;
    $line =~ s/d/Ï/g;
    $line =~ s/\*/Ð/g;
    $line =~ s/r/Ñ/g;
    $line =~ s/z/Ò/g;
    $line =~ s/s/Ó/g;
    $line =~ s/\$/Ô/g;
    $line =~ s/S/Õ/g;
    $line =~ s/D/Ö/g;
    $line =~ s/T/Ø/g;
    $line =~ s/Z/Ù/g;
    $line =~ s/E/Ú/g;
    $line =~ s/g/Û/g;
    $line =~ s/f/Ý/g;
    $line =~ s/q/Þ/g;
    $line =~ s/k/ß/g;
    $line =~ s/l/á/g;
    $line =~ s/m/ã/g;
    $line =~ s/n/ä/g;
    $line =~ s/h/å/g;
    $line =~ s/w/æ/g;
    $line =~ s/y/í/g;
    $line =~ s/Y/ì/g;
    $line =~ s/F/ð/g;
    $line =~ s/N/ñ/g;
    $line =~ s/K/ò/g;
    $line =~ s/a/ó/g;
    $line =~ s/u/õ/g;
    $line =~ s/i/ö/g;
    $line =~ s/\~/ø/g;
    $line =~ s/o/ú/g;
    $line =~ s/_/Ü/g;
    $line =~ s/\,/\xa2/g; # comma
    $line =~ s/\;/\xba/g; # semicolon
    $line =~ s/\?/\xbf/g; # questionmark
    return ($line);
}

sub fromISO88596ToCP1256 { 
    my ($input)=@_;
    my $output = encode("cp1256", decode("iso-8859-6", $input));
    return ($output);
}

sub fromCP1256ToISO88596 { 
    my ($input)=@_;
    my $output = encode("iso-8859-6", decode("cp1256", $input));
    return ($output);
    
}

sub fromUTF8ToCP1256 {
    my ($input)=@_;
    my $output = encode("cp1256", decode("UTF-8", $input));
    return ($output);
}

sub fromCP1256ToUTF8 {
    my ($input)=@_;
    my $output = encode("UTF-8", decode("cp1256", $input));
    return ($output);
}



sub fromXToY {
    my ($x,$y,$input)=@_;
    my $output = encode("$y", decode("$x", $input));
    return ($output);
}




sub WebBuckwalter {
    my ($line)=@_;
    $line=~s/&/&amp;/g;
    $line=~s/</&lt;/g;
    $line=~s/>/&gt;/g;
    $line=~s/\"/&quot;/g;
    return($line);
} 

return (1);

################################################################################
# ArabicTokenizer © 2005 Copyright University of Maryland. All Rights Reserved. 
################################################################################

