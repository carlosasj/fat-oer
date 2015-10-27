var number_regex = /^[1-9]\d*$/;
var fs = null;

function add_fat_entry(fileName){
    var entry = '<tr> <td class="fat-entry">' + fileName + '</td> </tr>';
    $('#fat-container')[0].innerHTML += entry;
}

function initialize_disk(numberOfBlocks){
    var block = '<div class="block-cluster"></div> ';
    var disk_container = $('#disk-container')[0];
    for (var i = 0; i < numberOfBlocks; i++) {
        disk_container.innerHTML += block;
    }
}

function addFile(name, size, color){
    fs.addFile(name, size, color);
    add_file_list_entry(name, color);
    update_fat();
    update_disk();
}

function update_fat(){
    var fat = fs.fat;
    var fatField = $('#')
}

function add_file_list_entry(fileName, color){
    var entry = "<tr class=\""+color+"\"> <td class=\"file-entry\"><a data-file=\"" +fileName+ "\" class=\"remove-file-button\" href=\"#\"><i class=\"material-icons\">close</i></a>"+ fileName +"</td></tr>";
    $('#file-list-container')[0].innerHTML += entry;
}

//TODO add and remove files from interface!

function initialize_apply_changes(){
    var blockSizeField = $("#disk-blocksize");
    var numberOfBlocksField = $("#disk-blocknumber");

    var blockSize = get_slider_value(blockSizeField);
    var numberOfBlocks = numberOfBlocksField.val();

    if (number_regex.exec(numberOfBlocks) == null){
        alert($.i18n.prop('not-a-number-error'));
        return;
    }

    createFileSystem(blockSize, numberOfBlocks);
    initialize_disk(numberOfBlocks);

    flipcard('#config-card');

}

function createFileSystem(blockSize, numberOfBlocks) {
    fs = new FileSystem(blockSize, numberOfBlocks);
}

function handle_apply_add_file(){
    var nameField = $('#add-file-name');
    var sizeField = $('#add-file-size');
    var colorField = $('#file-color');

    var name = nameField.val();
    var size = sizeField.val();
    var colorClass = color_to_class(colorField.val());

    if (name == "" || size == ""){
        alert("vaitomarnocu");
        return;
    }

    if (number_regex.exec(size) == null){
        alert($.i18n.prop('not-a-number-error'));
        return;
    }

    addFile(name, size, colorClass);
}
