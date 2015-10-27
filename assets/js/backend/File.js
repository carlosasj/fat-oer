var File = function(fileName, size, color, blocks) {
    this.fileName = fileName;
    this.fileSize = size;
    this.color = color;
    this.blocks = blocks;
};

File.prototype.getFileName = function () {
    return this.fileName;
};

File.prototype.getSize = function () {
    return this.fileSize;
};

File.prototype.getColor = function () {
    return this.color;
};

File.prototype.getInitialBlock = function () {
    return this.blocks[0];
};

File.prototype.getBlocks = function() {
    return this.blocks;
};
