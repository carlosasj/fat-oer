var number_regex = /^[1-9]\d*$/;
var fs = null;
var disk_size = null;
var disk_block_size = null;
var disk_frag = null;
var disk_used_space = null;

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
    add_file_list_entry(file, color);
    update_fat(file, 'add');
    update_disk(file, 'add');
    disk_used_space.text(parseInt(disk_used_space.text()) + parseInt(size));
    disk_frag.text(parseInt(disk_frag.text()) + parseInt(fs.disk.getBlockSize()*file.getBlocks().length - size));

    $('[data-file-reference]').hover(
        function hoverFilesIn() {
            name = $(this).attr('data-file-reference');
            $('[data-file-reference="'+name+'"]').addClass("file-entry-active");
        },

        function hoverFilesOut() {
            name = $(this).attr('data-file-reference');
            $('[data-file-reference="'+name+'"]').removeClass("file-entry-active");
        }
    );
}

function removeFile(fileName){
    var file = fs.removeFile(fileName);
    remove_file_list_entry(fileName);
    update_fat(file, 'remove');
    update_disk(file, 'remove');
    disk_frag.text(parseInt(disk_frag.text()) - parseInt(fs.disk.getBlockSize()*file.getBlocks().length - file.getSize()));
    disk_used_space.text(parseInt(disk_used_space.text()) - parseInt(file.getSize()));
}

function update_fat(file, operation){
    var fat = fs.fat;
    fileName = file.getFileName();
    file.getBlocks().forEach(function (b) {
        var block = $('#fat-block-id-'+b);
        block[0].innerHTML = fat.entries[b];
        if (operation == 'add') {
            block.parent().addClass(file.getColor());
            block.parent().attr( "data-file-reference", fileName );
        }
        else {
            block.parent().removeClass(file.getColor());
            block.parent().attr( "data-file-reference", "" );
            block.parent().hover(null);
        }
    })
}

function update_disk(file, operation){
    var disk = fs.disk;
    fileName = file.getFileName();
    file.getBlocks().forEach(function (b) {
        var block = $('#block-id-'+b);
        if (operation == 'add') {
            block.addClass(file.getColor());
            block.attr('data-file-reference', fileName);
        }
        else {
            block.removeClass(file.getColor());
            block.attr('data-file-reference', '');
            block.hover(null);
        }
    })
}

function remove_file_list_entry(fileName){
    $('#file-list-entry-'+fileName).remove();
}

function add_file_list_entry(file, color){

    var entry = '<tr id="file-list-entry-'+file.getFileName()+'" data-file-reference="' +file.getFileName()+ '" class="'+color+'"> \
        <td class="file-entry"> \
            <a onclick="removeFile(\''+file.getFileName()+'\');" class="remove-file-button" href="#"> \
                <i class="material-icons">close</i></a>'+ file.getFileName()+
        ' </td> \
        <td>' + file.getInitialBlock() + '</td>\
        <td>' + file.getSize() + '</td>\
    </tr>';
    $('#file-list-container')[0].innerHTML += entry;
}

//TODO tamanho do arquivo maior que o disco

function clear_file_List() {
    $('#file-list-container')[0].innerHTML = null;
}

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
    clear_file_List();
    initialize_disk(numberOfBlocks);
    initialize_fat(numberOfBlocks);

    disk_size = $('#disk-size');
    disk_block_size = $('#disk-block-size');
    disk_frag = $('#disk-frag');
    disk_used_space = $('#disk-used-space');

    disk_size.text(numberOfBlocks*blockSize);
    disk_block_size.text(blockSize);
    disk_frag.text(0);
    disk_used_space.text(0);

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

    addFile(name, size, colorClass);
}
