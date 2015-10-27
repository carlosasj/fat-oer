var FileSystem = function (blockSize, numberOfBlocks) {
    this.fat = new FAT(numberOfBlocks);
    this.disk = new Disk(blockSize*numberOfBlocks, blockSize);
    this.fileList = new FileList();
    this.allocator = new FileAllocator(this.fat, this.disk, this.fileList);
};

FileSystem.prototype.addFile = function(fileName, size, color) {

    return this.allocator.addNewFile(fileName, size, color);

};

FileSystem.prototype.removeFile = function(fileName) {

    return this.allocator.removeFile(fileName);

};
