var FAT = function (number_of_blocks) {
	this.max_blocks = number_of_blocks;
	this.files = [];
	this.entries = [];
	for (var i = 0; i < number_of_blocks; i++){
		this.files[i] = null;
		this.entries[i] = -1;
	}
};

FAT.prototype.addFile = function(file) {
	var last = -1;
	for (var i = file.getBlocks().length-1; i >= 0; i--) {
		this.entries[file.getBlocks()[i]] = last;
		this.files[file.getBlocks()[i]] = file;
		last = file.getBlocks()[i];
	}
};

FAT.prototype.removeFile = function(file) {
    for (var i = 0; i < file.getBlocks().length; i++){
        this.entries[file.getBlocks()[i]] = -1;
		this.files[file.getBlocks()[i]] = null;
    }
};

