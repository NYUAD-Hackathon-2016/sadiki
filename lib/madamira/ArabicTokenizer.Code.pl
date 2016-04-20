#!/bin/sh -- # This comment tells perl not to loop!
eval 'exec /usr/bin/perl -S $0 ${1+"$@"}'
    if 0;
use Benchmark;
use Encode qw/encode decode/; 
use strict;

################################################################################
# ArabicTokenizer � 2005 Copyright University of Maryland. All Rights Reserved. 
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
# ArabicTokenizer � 2005 Copyright University of Maryland. All Rights Reserved. 
################################################################################

sub tokenize {
    my ($line)=@_;

    my $PUNCT="��\\-\\+\=\.\,\;\:\`\"\�\?\!\\\/\@\#\%\^\&\(\)\\[\\]\xa2\xba\xbf";
    #\xba semicolon
    #\xbf questionmark
    #\xa2 arabic comma

    my $ArabicLetters="�-��-���-����-������";
    
    if ($RemoveDiacrtics){$line=~s/[�-�����]//g;}
    if ($RemoveTatweel){ $line=~s/�//g; }
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

    $line =~ s/�/\'/g;
    $line =~ s/�/\|/g;
    $line =~ s/�/\>/g;
    $line =~ s/�/\&/g;
    $line =~ s/�/\</g;
    $line =~ s/�/\}/g;
    $line =~ s/�/A/g;
    $line =~ s/�/b/g;
    $line =~ s/�/p/g;
    $line =~ s/�/t/g;
    $line =~ s/�/v/g;
    $line =~ s/�/j/g;
    $line =~ s/�/H/g;
    $line =~ s/�/x/g;
    $line =~ s/�/d/g;
    $line =~ s/�/\*/g;
    $line =~ s/�/r/g;
    $line =~ s/�/z/g;
    $line =~ s/�/s/g;
    $line =~ s/�/\$/g;
    $line =~ s/�/S/g;
    $line =~ s/�/D/g;
    $line =~ s/�/T/g;
    $line =~ s/�/Z/g;
    $line =~ s/�/E/g;
    $line =~ s/�/g/g;
    $line =~ s/�/f/g;
    $line =~ s/�/q/g;
    $line =~ s/�/k/g;
    $line =~ s/�/l/g;
    $line =~ s/�/m/g;
    $line =~ s/�/n/g;
    $line =~ s/�/h/g;
    $line =~ s/�/w/g;
    $line =~ s/�/y/g;
    $line =~ s/�/Y/g;
    $line =~ s/�/F/g;
    $line =~ s/�/N/g;
    $line =~ s/�/K/g;
    $line =~ s/�/a/g;
    $line =~ s/�/u/g;
    $line =~ s/�/i/g;
    $line =~ s/�/\~/g;
    $line =~ s/�/o/g;
    $line =~ s/�/_/g;
    $line =~ s/\xa2/\,/g; # comma
    $line =~ s/�/\,/g;
    $line =~ s/\xba/\;/g; # semicolon
    $line =~ s/\xbf/\?/g; # questionmark

    return ($line);
}
################################################################################
# ArabicTokenizer � 2005 Copyright University of Maryland. All Rights Reserved. 
################################################################################
sub fromBuckwalterToCP1256 {
    my ($line)=@_;

    $line =~ s/\'/\�/g;
    $line =~ s/\|/�/g;
    $line =~ s/\>/�/g;
    $line =~ s/\&/�/g;
    $line =~ s/\</�/g;
    $line =~ s/\}/�/g;
    $line =~ s/A/�/g;
#added
    $line =~ s/\{/�/g;
#
    $line =~ s/b/�/g;
    $line =~ s/p/�/g;
    $line =~ s/t/�/g;
    $line =~ s/v/�/g;
    $line =~ s/j/�/g;
    $line =~ s/H/�/g;
    $line =~ s/x/�/g;
    $line =~ s/d/�/g;
    $line =~ s/\*/�/g;
    $line =~ s/r/�/g;
    $line =~ s/z/�/g;
    $line =~ s/s/�/g;
    $line =~ s/\$/�/g;
    $line =~ s/S/�/g;
    $line =~ s/D/�/g;
    $line =~ s/T/�/g;
    $line =~ s/Z/�/g;
    $line =~ s/E/�/g;
    $line =~ s/g/�/g;
    $line =~ s/f/�/g;
    $line =~ s/q/�/g;
    $line =~ s/k/�/g;
    $line =~ s/l/�/g;
    $line =~ s/m/�/g;
    $line =~ s/n/�/g;
    $line =~ s/h/�/g;
    $line =~ s/w/�/g;
    $line =~ s/y/�/g;
    $line =~ s/Y/�/g;
    $line =~ s/F/�/g;
    $line =~ s/N/�/g;
    $line =~ s/K/�/g;
    $line =~ s/a/�/g;
    $line =~ s/u/�/g;
    $line =~ s/i/�/g;
    $line =~ s/\~/�/g;
    $line =~ s/o/�/g;
    $line =~ s/_/�/g;
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
# ArabicTokenizer � 2005 Copyright University of Maryland. All Rights Reserved. 
################################################################################

