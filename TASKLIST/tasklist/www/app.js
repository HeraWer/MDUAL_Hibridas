function afegirTasca() {

    var text = prompt("Nova tasca:");

    var nou_elem = $("<li><a \
    class='ui-btn ui-btn-icon-right ui-icon-carat-r' \
    href=''>" + text + "<button>Esborra</button></a>")

    $("button", nou_elem).click( esborra );

    $("#llista").append(nou_elem);
}

function esborra(event) {
    event.target.remove();
}