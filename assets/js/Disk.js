var Disk = function (diskSize, blockSize) {
    this.numberOfBlocks = diskSize/blockSize;
    this.diskSize = diskSize;
    this.blockSize = blockSize;

    this.blocks = [];
    for (var i = 0; i < this.numberOfBlocks; i++){
        this.blocks[i] = new Block(null);
    }
};

Disk.prototype.removeFile = function(file) {

    for (var i = 0; i < file.getBlocks().length; i++){
        this.blocks[file.getBlocks()[i]].setFile(null);
    }

};

Disk.prototype.findFirstEmptyBlock = function(startFrom) {
    for (var i = startFrom; i < this.numberOfBlocks; i++){
        if (this.blocks[i].getColor() == null){
            return i;
        }
    }
    return null;
};

Disk.prototype.getDiskSize = function() {
    return this.diskSize;
};

Disk.prototype.getBlockSize = function() {
    return this.blockSize;
};

Disk.prototype.getNumberOfBlocks = function() {
    return this.numberOfBlocks;
};