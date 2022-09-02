const rutaGet = "http://localhost:5000/amigos/";
const loading = $('img')
function clearinput() {
    $('#input').val('')
    $('#inputDelete').val('')
}

function showFriends(info) {
    $('#lista').empty();
    info.forEach((item) => {
        $('#lista').append(`<li> ${item.name} </li>`);
    })
}

loading.hide()

$('#boton').click(function () {
    loading.show()
    $.get(rutaGet, (amigos) => {

        const lista = $('#lista')
        lista.empty()
        amigos.forEach((amigo) => {
            lista.append(`<li> ${amigo.name} </li>`)

        });
        loading.hide()
    })
})

$('#search').click(function () {
    let id = $('#input').val();
    clearinput();
    if (id) {
        $.get(rutaGet + id, function (friend) {
            $('#amigo').text(friend.name)
        });
    } else {
        $('#error').text('Debes ingresar un id de un amigo.')
    }
})

$('#delete').click(function () {
    let id = $('#inputDelete').val();
    clearinput()
    if (id) {
        $.ajax({
            url: rutaGet + id,
            type: 'DELETE',
            success: function (result) {
                showFriends(result);
                $('#success').text('Tu amigo ha sido borrado.')
            },
        });
    }
    else {
        alert('ALERTA! Debes ingresar un ID.')
    }
});