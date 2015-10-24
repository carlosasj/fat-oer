var FAT = function (number_of_blocks) {
	this.max_blocks = number_of_blocks;
	this.entries = [];
};

FAT.prototype.addFile = function(file) {
	var last = -1;
	for (var i = file.getBlocks().length-1; i >= 0; i--) {
		this.entries[file.getBlocks()[i]] = last;
		last = file.getBlocks()[i];
	}
};

FAT.prototype.removeFile = function(file) {
    for (var i = 0; i < file.getBlocks().length; i++){
        this.entries[file.getBlocks()[i]] = null;
    }
};

