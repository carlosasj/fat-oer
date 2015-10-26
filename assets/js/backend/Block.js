var Block = function (file) {
    this.file = file;
};

Block.prototype.getFile = function(){
    return this.file;
};

Block.prototype.getColor = function () {
    return (this.file == null)? null : this.file.getColor();
};

Block.prototype.setFile = function(file) {
    this.file = file;
};