var FileAllocator = function (FAT, disk, fileList) {
    this.fat = FAT;
    this.disk = disk;
    this.fileList = fileList;

    this.blockSize = disk.getBlockSize();
    this.diskSize = disk.getDiskSize();
    this.numberOfBlocks = disk.getNumberOfBlocks();
};

FileAllocator.prototype.addNewFile = function(fileName, size, color) {
    // number of blocks that the file uses
    var nBlocks = Math.ceil(size/this.disk.getBlockSize());

    // find the blocks in which to allocate the file
    var blocks = [];
    //console.log("allocating "+nBlocks+" blocks for file "+fileName);
    for (var i = 0; i < nBlocks; i++){
        // find the block starting from blocks[i-1] or 0
        blocks[i] = this.disk.findFirstEmptyBlock((i != 0)?blocks[i-1]+1:0);
        //console.log("("+i+") - assigning block " + blocks[i] + " to file " + fileName)
    }
    //console.log("finished allocating");

    // create file and add it to file list
    var file = new File(fileName, size, color, blocks);
    this.fileList.addNewFile(file);

    // add the file to FAT
    this.fat.addFile(file);

    // add file to disk
    this.disk.addFile(file);

};

FileAllocator.prototype.removeFile = function(fileName) {
    // find the file by fileName
    var file = this.fileList.findFile(fileName);
    //console.log("got file :" + file.getFileName() + " | " + file.getBlocks());
    // remove all entries
    this.fileList.removeFile(this.fileList.findFileIndex(fileName));
    this.disk.removeFile(file);
    this.fat.removeFile(file);
};