var number_regex = /^[1-9]\d*$/;
var fs = null;

function initialize_fat(numberOfBlocks){
    var fat_container = $('#fat-container')[0];
    fat_container.innerHTML = null;
    for (var i = 0; i < numberOfBlocks; i++) {
        var block = '<tr><td>'+i+'</td> <td id="fat-block-id-'+i+'" class="fat-entry">' + fs.fat.entries[i] + '</td></tr>';
        fat_container.innerHTML += block;
    }
}

function initialize_disk(numberOfBlocks){
    var disk_container = $('#disk-container')[0];
    disk_container.innerHTML = null;
    for (var i = 0; i < numberOfBlocks; i++) {
        var block = '<div id="block-id-'+i+'" class="block-cluster"></div> ';
        disk_container.innerHTML += block;
    }
}

function addFile(name, size, color){
    var file = fs.addFile(name, size, color);
    add_file_list_entry(name);
    update_fat(file);
    //update_disk(file);
}

function removeFile(fileName){
    var file = fs.removeFile(fileName);
    remove_file_list_entry(fileName);
    update_fat(file);
    //update_disk(file);
}

function update_fat(file){
    var fat = fs.fat;
    file.getBlocks().forEach(function (b) {
        var block = $('#fat-block-id-'+b)[0];
        block.innerHTML = fs.fat.entries[b];
    })
}

function remove_file_list_entry(fileName){
    $('#file-list-entry-'+fileName).remove();
}

function add_file_list_entry(fileName){
    var entry = "<tr id=\"file-list-entry-"+fileName+"\"> <td class=\"file-entry\"><a onclick=\"removeFile('"+fileName+"');\" data-file=\"" +fileName+ "\" class=\"remove-file-button\" href=\"#\"><i class=\"material-icons\">close</i></a>"+ fileName +"</td></tr>";
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
    initialize_fat(numberOfBlocks);

    flipcard('#config-card');

}

function createFileSystem(blockSize, numberOfBlocks) {
    fs = new FileSystem(blockSize, numberOfBlocks);
}

function handle_apply_add_file(){
    var nameField = $('#add-file-name');
    var sizeField = $('#add-file-size');
    //var colorField = ???;

    var name = nameField.val();
    var size = sizeField.val();
    //var color = colorField.???();

    if (fs.fileList.findFileIndex(name) != -1){
        alert($.i18n.prop('name-already-exists-error'));
        return;
    }

    if (name == "" || size == ""){
        alert($.i18n.prop('empty-field-error'));
        return;
    }

    if (number_regex.exec(size) == null){
        alert($.i18n.prop('not-a-number-error'));
        return;
    }

    addFile(name, size, "#000000");
    //addFile(name, size, color);

}