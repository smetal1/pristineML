var Fragmenter=function(){};

Fragmenter.prototype.trimmer=function(array){
    while(array[array.length -1]==' '){
        array.pop();
    }
    while(array[0]==' '){
        array.shift();
    }
    return array;
};
