
// Esssayer de changer login popup pour voir si ça marche 
// Attend que tout le contenu du DOM soit chargé avant d'exécuter le script.
document.addEventListener('DOMContentLoaded', function() {
    // Ajoute un écouteur d'événements pour montrer le sélecteur de couleurs quand la zone de spray est cliquée.
    document.getElementById('spray-can-area').addEventListener('click', function() {
        showPopup('colorPickerPopup');
    });

    // Ajoute un écouteur d'événements pour montrer le contenu du sac à dos quand la zone correspondante est cliquée.
    document.getElementById('backpack-area').addEventListener('click', function() {
        showBackpackContents();
        showPopup('backpackPopup');
    });

    // Get the buttons that open the pop-ups
    var loginBtn = document.getElementById('loginBtn');
    var registerBtn = document.getElementById('registerBtn');
    var galleryBtn = document.getElementById('galleryBtn');

    // Get the pop-up elements
    var loginPopup = document.getElementById('loginPopup');
    var registerPopup = document.getElementById('registerPopup');
    var galleryPopup = document.getElementById('galleryPopup');

    // Get the <span> elements that close the pop-ups
    var closeBtns = document.getElementsByClassName('close');

    // Function to open a popup
    function openPopup(popup) {
        popup.style.display = 'block';
    }

    // Function to close a popup
    function closePopup(popup) {
        popup.style.display = 'none';
    }

    // Event listeners for opening pop-ups
    loginBtn.addEventListener('click', function() { openPopup(loginPopup); });
    registerBtn.addEventListener('click', function() { openPopup(registerPopup); });
    galleryBtn.addEventListener('click', function() { openPopup(galleryPopup); });

    // Event listeners for closing pop-ups
    for (var i = 0; i < closeBtns.length; i++) {
        closeBtns[i].addEventListener('click', function() {
            closePopup(this.parentElement.parentElement);
        });
    }        
    });

// Affiche les couleurs sélectionnées dans le sac à dos.
function showBackpackContents() {
    var selectedColorsDiv = document.getElementById('selectedColors');
    selectedColorsDiv.innerHTML = '';
    var colorSquares = document.querySelectorAll('#colorPickerPopup .color-swatch');
    colorSquares.forEach(function(colorSquare) {
        selectedColorsDiv.appendChild(colorSquare.cloneNode(true));
    });
}

// Confirme la sélection des couleurs et les enregistre dans localStorage.
function confirmSelection() {
    var colors = [];
    document.querySelectorAll('#colorPickerPopup .color-swatch').forEach(function(colorDiv) {
        colors.push(colorDiv.style.backgroundColor);
    });
    localStorage.setItem('selectedColors', JSON.stringify(colors));
    window.location.href = 'canvas.html';
}

// Ajoute une couleur sélectionnée dans la liste des carrés de couleur.
function addColor() {
    var color = document.getElementById('colorWheel').value;
    var colorListPopup = document.querySelector('#colorPickerPopup .color-list-popup');
    var colorSquare = createColorSquare(color);
    colorListPopup.appendChild(colorSquare);
}

// Crée un carré de couleur et l'ajoute au DOM.
function createColorSquare(color) {
    var colorDiv = document.createElement('div');
    colorDiv.className = 'color-swatch';
    colorDiv.style.backgroundColor = color;

    // Ajoute un bouton pour supprimer la couleur sélectionnée.
    var removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.onclick = function() {
        colorDiv.remove();
    };
    colorDiv.appendChild(removeBtn);

    return colorDiv;
}
