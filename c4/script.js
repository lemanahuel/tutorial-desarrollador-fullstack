$('document').ready(function() {
    $('#formulario').on('submit', function(e) {
        e.preventDefault();
        crearTarea({
            title: $('#nueva-tarea').val()
        });
    });

    function dibujarTareas(items) {
        items.forEach(function(item) {
            var tarea = $('<li/>');

            tarea.attr('id', item._id);

            tarea.html('<span>' + item.title + '</span>');

            tarea.addClass('list-group-item');

            tarea.on('click', function() {
                $(this).append('<b style="float:right">✓</b>').appendTo($('#mi-lista-de-tareas-completadas')).off('click');
            });

            $('#mi-lista-de-tareas').append(tarea);
        });
    }

    function traerTareas() {
        $.ajax({
            url: 'http://localhost:3000/tareas',
            method: 'get'
        }).then(function(items) {
            dibujarTareas(items);
        });
    }

    traerTareas();

    function crearTarea(item) {
        $.ajax({
            url: 'http://localhost:3000/tareas',
            method: 'post',
            data: item
        }).then(function(item) {
            var tarea = $('<li/>');

            tarea.attr('id', item._id);

            tarea.html('<span>' + item.title + '</span>');

            tarea.addClass('list-group-item');

            tarea.on('click', function() {
                $(this).append('<b style="float:right">✓</b>').appendTo($('#mi-lista-de-tareas-completadas')).off('click');
            });

            $('#mi-lista-de-tareas').append(tarea);
        });
    }
});