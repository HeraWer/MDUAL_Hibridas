$(document).ready(function () {
    $(".tabs").tabs()

    $(".sidenav").sidenav()

    $(".collapsible").collapsible()

    $(".addItem").click(addItem)
    $(".removeItem").click(removeItem)
    $("#getArtist").click(getArtist)
});

function addItem() {
    var newItem = getName('Enter the name item');
    var list = document.getElementById('shoppingList');
    var boolean = false;

    for (let i = 0; i < list.childNodes.length; i++) {
        if (list.childNodes[i].nodeName === '#text') {
            list.removeChild(list.childNodes[i]);
        }
    }

    if (newItem === '' || newItem === null) {
        alert('You cannot enter an empty item.');
    } else {
        boolean = false;
        var id = list.childNodes.length;

        newItem = uppercaseFirstLetter(newItem);

        newItem = (id + 1) + ". " + newItem;

        var li = document.createElement("li");
        var h5 = document.createElement("h5");
        h5.appendChild(document.createTextNode(newItem));
        li.appendChild(h5);
        document.getElementById("shoppingList").appendChild(li);
    }
}

function removeItem() {
    var numItem = getName('Enter the number of the item you want to delete');
    var list = document.getElementById('shoppingList');

    for (let i = 0; i < list.childNodes.length; i++) {
        if (list.childNodes[i].nodeName == '#text') {
            list.removeChild(list.childNodes[i]); 
    }

    list.removeChild(list.childNodes[parseInt(numItem) - 1]);

    for (let i = 0; i < list.childNodes.length; i++) {
        var item = list.childNodes[i].firstChild.firstChild.nodeValue;
        var letters = item.split(".");
        letters[0] = i + 1;
        var itemUpdated = '';
        for (let j = 0; j < letters.length; j++) {
            if (j === 1) {
                itemUpdated += '.';
            }
            itemUpdated += letters[j];
        }
        list.childNodes[i].firstChild.firstChild.nodeValue = itemUpdated;
    }
}
}

function getName(message) {
    var item = prompt(message);
    return item;
}

function uppercaseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getArtist() {
    var remove = document.getElementById('findAllArtist');
    remove.innerHTML = '';

    var query = document.getElementById('last_name').value;

    $.ajax({
        method: "GET",
        url: "https://musicbrainz.org/ws/2/artist?query=" + query,
        dataType: "json",
    }).done(function (msg) {
        for (var item in msg.artists) {
            var li = document.createElement("li");
            var div = document.createElement("div");
            var a = document.createElement("a");
            var i = document.createElement("i");
            i.appendChild(document.createTextNode('send'));
            i.className = 'material-icons';
            a.appendChild(i);
            a.className = 'secondary-content';
            a.href = '#!';
            div.appendChild(a);
            div.appendChild(document.createTextNode(msg.artists[item].name));
            li.appendChild(div);
            // li.appendChild(document.createTextNode('Artista: ' + msg.artists[item].name));
            li.className = 'collection-item';
            document.getElementById("findAllArtist").appendChild(li);
        };
    }).fail(function () {
        alert("ERROR");
    });
}
