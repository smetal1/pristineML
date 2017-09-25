function distance(first_sentence,second_sentence) {
    if(typeof(first_sentence)!=="string"||typeof(second_sentence)!=="string"){
        return 0;
    }
    if(first_sentence.length===0 || second_sentence.length ===0) {
        return 0;
    }
    first_sentence=first_sentence.toLocaleLowerCase();
    second_sentence=second_sentence.toLocaleLowerCase();
    window=(Math.floor(Math.max(first_sentence.length,second_sentence.length)));
    var match_first_sentence=new Array(first_sentence);
    var match_second_sentence=new Array(second_sentence);
    var match=0;
    var transposition=0;
    var index_first_sentence=0;
    var index_second_sentence=0;

    for(index_first_sentence=0;index_first_sentence<first_sentence.length;index_first_sentence++) {
        var start=Math.max(0,(index_first_sentence-window));
        var end=Math.min((1+index_first_sentence+window),second_sentence.length);
        for(index_second_sentence=start;index_second_sentence<end;index_second_sentence++){
            if(match_second_sentence[index_second_sentence]){
                continue;
            }
            if(first_sentence[index_first_sentence]!==second_sentence[index_second_sentence]){
                continue;
            }
        
            //on fail of above conditions
            match_first_sentence[index_first_sentence]=true;
            match_second_sentence[index_second_sentence]=true;
            match++;
            break;
        }
    }
    if(match===0){
        return 0;
    }
    index_second_sentence=0;
    for(index_first_sentence=0;index_first_sentence<first_sentence.length;index_first_sentence++){
        if(!match_first_sentence[index_first_sentence]) {
            continue;
        }
        while(!match_second_sentence[index_second_sentence]){
            index_second_sentence++;
        }
        if(first_sentence[index_first_sentence]!=second_sentence[index_second_sentence]){
            transposition++;
        }
        index_second_sentence++;
    }
    transposition=transposition/2.0;
    var result=((match/first_sentence.length)+(match/second_sentence.length)+((match-transposition)/match))/3.0;
    return result;
    }    
module.exports.JaroWinker=function(first_sentence,second_sentence,dj){
    if(first_sentence===second_sentence){
        return 1;
    }
    else {
        var p=0.1;
        var l=0;
        var jaro_distance=(typeof(dj)==='undefined')?distance(first_sentence,second_sentence):dj;
        while(first_sentence[l]==second_sentence[l]&&l<4){
            l++
        }
        return jaro_distance+l*p*(1-jaro_distance);
    }
}
