var FileAllocator = function (FAT, disk, fileList) {
    this.fat = FAT;
    this.disk = disk;
    this.fileList = fileList;
};

FileAllocator.prototype.setSizes = function(blockSize, diskSize) {
    this.blockSize = blockSize;
    this.diskSize = diskSize;
    this.numberOfBlocks = diskSize/blockSize;
};

FileAllocator.prototype.addNewFile = function(fileName, size, color) {
    // number of blocks that the file uses
    var nBlocks = Math.ceil(size/this.disk.getBlockSize());

    // find the blocks in which to allocate the file
    var blocks = [];
    for (var i = 0; i < nBlocks; i++){
        // find the block starting from blocks[i-1] or 0
        blocks[i] = this.disk.findFirstEmptyBlock((i != 0)?blocks[i-1]:0);
    }

    // add the file to FAT
    //TODO FATTTY
    this.fat.addFile(blocks);

    // create file and add it to file list
    var file = new File(fileName, size, color, blocks[0]);
    this.fileList.addNewFile(file);

    // add file to disk
    this.disk.addNewFile(file, blocks);

};

FileAllocator.prototype.removeFile = function(fileName) {
    // find the file by fileName
    var file = this.fileList.findFile(fileName);
    // remove all entries
    this.fileList.removeFile(this.fileList.findFileIndex(fileName));
    this.disk.removeFile(file);
    this.fat.removeFile(file);
};