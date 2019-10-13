let socket = io();

socket.on('metadata', (metadata) => {
    $('#title').html(metadata.title || 'Not playing');
    $('#subtitle').html(metadata.album + ' - ' + metadata.artist);

    if (metadata.album && metadata.artist) {
        $('#subtitle').css('display', 'block');
    } else {
        $('#subtitle').css('display', 'none');
    }

    if (metadata.cover) {
        $('.background').css('background-image', `url('data:image/jpg;base64,${metadata.cover}')`);
        $('#cover').attr('src', `data:image/jpg;base64,${metadata.cover}`);
    } else {
        $('.background').css('background-image', '');
        $('#cover').attr('src', 'img/cover-placeholder.png');
    }

    console.log(metadata);
});