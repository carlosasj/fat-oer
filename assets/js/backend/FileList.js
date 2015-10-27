var FileList = function() {
    this.files = [];
};

FileList.prototype.addNewFile = function(file) {
    this.files.push(file);
};

FileList.prototype.removeFile = function(fileIndex) {
    this.files.splice(fileIndex, (fileIndex == 0)?1:fileIndex);
};

FileList.prototype.findFile = function(fileName) {
    return this.files[this.findFileIndex(fileName)];

};

FileList.prototype.findFileIndex = function(fileName) {
    var index = -1;
    for (var i = 0; i < this.files.length; i++){
        if(this.files[i].getFileName() == fileName) {
            index = i;
            break;
        }
    }
    //console.log("got index: "+ index + " and file " + this.files[index].getFileName());
    return index;
};


