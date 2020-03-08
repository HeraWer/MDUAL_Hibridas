$(document).ready(function () {
    $(".tabs").tabs()

    $(".sidenav").sidenav()

    $(".collapsible").collapsible()

    $(".agregarItem").click(agregarItem)
    $(".eliminarItem").click(eliminarItem)
    $("#getArtist").click(getArtist)
});

function agregarItem() {
    var nuevoItem = cogerNombre('Introduce el nombre del item');
    var lista = document.getElementById('listaCompra');

    for (let i = 0; i < lista.childNodes.length; i++) {
        if (lista.childNodes[i].nodeName == '#text') {
            lista.removeChild(lista.childNodes[i]); // eliminar los #text
        }
    }

    if (nuevoItem === '' || nuevoItem === null) {
        alert('No se puede introducir un elemento vacio.');
    } else {
        var id = lista.childNodes.length;
    
        nuevoItem = uppercaseFirstLetter(nuevoItem);
    
        nuevoItem = (id + 1) + ". " + nuevoItem;

        var li = document.createElement("li");
        var h5 = document.createElement("h5");
        h5.appendChild(document.createTextNode(nuevoItem));
        li.appendChild(h5);
        document.getElementById("listaCompra").appendChild(li);
    }
}

function eliminarItem() {
    var numeroItem = cogerNombre('Introduce el numero del item quieres eliminar');
    var lista = document.getElementById('listaCompra');

    for (let i = 0; i < lista.childNodes.length; i++) {
        if (lista.childNodes[i].nodeName == '#text') {
            lista.removeChild(lista.childNodes[i]); // eliminar los #text
        }
    }

    lista.removeChild(lista.childNodes[parseInt(numeroItem) - 1]); // eliminar etiqueta li

    for (let i = 0; i < lista.childNodes.length; i++) {
        var item = lista.childNodes[i].firstChild.firstChild.nodeValue;
        var letras = item.split(".");
        letras[0] = i + 1;
        var itemActulizado = '';
        for (let j = 0; j < letras.length; j++) {
            if (j === 1) {
                itemActulizado += '.';
            }
            itemActulizado += letras[j];
        }
        lista.childNodes[i].firstChild.firstChild.nodeValue = itemActulizado;
    }
}

function cogerNombre(mensaje) {
    var item = prompt(mensaje);
    return item;
}

function uppercaseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getArtist() {
    // var query = document.getElementById();
    // console.log(query.nodeName);

    $.ajax({
        method: "GET",
        url: "https://musicbrainz.org/ws/2/artist?query=queen",
        dataType: "json", // necessitem això pq ens retorni un objecte JSON
    }).done(function (msg) {
        for (var item in msg.artists) {
            // if (msg.artists[item].area.name !== 'undefined') {
            //     console.log('Artista: ' + msg.artists[item].name + ', City: '+ msg.artists[item].area.name);
            // } else {
            // }

            // var list = document.getElementById('listaArtistas');

            var li = document.createElement("li");
            var div = document.createElement("div");
            var a = document.createElement("a");
            var i = document.createElement("i");
            i.appendChild(document.createTextNode('send'));
            i.className = 'material-icons';
            a.appendChild(i);
            a.className='secondary-content';
            a.href='#!';
            div.appendChild(a);
            div.appendChild(document.createTextNode(msg.artists[item].name));
            li.appendChild(div);
            // li.appendChild(document.createTextNode('Artista: ' + msg.artists[item].name));
            li.className = 'collection-item';
            document.getElementById("listaArtistas").appendChild(li);
        };
    }).fail(function () {
        alert("ERROR");
    });
}
// function asdf() {
//     var lista = document.getElementById('listaCompra');
//     for (let i = 0; i < lista.childNodes.length; i++) {
//         console.log(lista.childNodes[i]);
//     }
//     console.log('-------------')
// }