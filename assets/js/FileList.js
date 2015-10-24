var FileList = function () {
    this.files = [];
};

FileList.prototype.addNewFile = function(file) {
    this.files.push(file);
};

FileList.prototype.removeFile = function(fileIndex) {
    this.files.slice(fileIndex, fileIndex);
};

FileList.prototype.findFile = function(fileName) {
    return this.files[this.findFileIndex(fileName)];

};

FileList.prototype.findFileIndex = function(fileName) {
    var index;
    for (var i = 0; i < this.files.length; i++){
        if(this.files[i].getName == fileName) {
            index = i;
            break;
        }
    }
};


