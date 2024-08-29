// les boutons du menus principales
let myGalleryBt = document.getElementById('myGalleryBt')
let logoutBt = document.getElementById('logoutBt')
//public gallery
let publicGalleryBt = document.getElementById('publicGallery')

// DELETE ACOUNT
let deleteAccountBt = document.getElementById('deleteAccountBt')
let deleteConfirmationForm = document.getElementById('deleteConfirmationForm')
let submitDeleteBt = document.getElementById('submitDelete')
let cancelDeleteBt = document.getElementById('cancelDelete')

//login
let logintBt = document.getElementById('loginBt')
let loginForm = document.getElementById('loginPopup')
let cancelLoginBt = document.getElementById('cancelLogin')
let submitLogin = document.getElementById('submitLogin')
let loginEmail = document.getElementById('email')
let loginPassword = document.getElementById('password')

// modify acount
const modifyAccountBt = document.getElementById('modifyAccountBt')
let modifyForm = document.getElementById('modifyPopup')
let firstnameModify = document.getElementById('firstnameModify')
let lastnameModify = document.getElementById('lastnameModify')
let emailModify = document.getElementById('emailModify')
let passwordModify = document.getElementById('passwordModify')
let confirmPasswordModify = document.getElementById('confirmPasswordModify')
const modifySubmitBt = document.getElementById('modifySubmitBt')


// subscribe
let subscribeForm = document.getElementById('registerPopup')
let subscribeBt = document.getElementById('subscribeBt')
let cancelSubscribe = document.getElementById('cancelSubscribe')
let submitSubscribe = document.getElementById('submitSubscribeBt')
// textbox du formulaire subscribe
let subscribeFirstname = document.getElementById('firstname')
let subscribeLastname = document.getElementById('lastname')
let subscribePseudo = document.getElementById('pseudo')
let subscribeEmail = document.getElementById('emailSubscribe')
let subscribePassword = document.getElementById('passwordRegister')
let subscribeSecondPassword = document.getElementById('confirmPassword')

// user 
let userData = {
    id: undefined,
    email: undefined,
    firstname: undefined,
    lastname: undefined   
}

// au chargement de la page principale
addEventListener("load", (event) => {
    // mise en page
    sessionStorage.setItem("gallery", "nothing");
    reloadLayout();
});

// met a jour l'affichage des boutons selon si user connecté ou non
function reloadLayout(){ 
    if(sessionStorage.getItem("authentification") !== "true"){
        loginBt.style.display = 'block';
        subscribeBt.style.display = 'block';
        logoutBt.style.display = 'none';
        myGalleryBt.style.display = 'none';
        modifyAccountBt.style.display = 'none';
        deleteAccountBt.style.display = 'none';
    }else if(sessionStorage.getItem("authentification") === "true"){
        loginBt.style.display = 'none';
        subscribeBt.style.display = 'none'
        logoutBt.style.display = 'block';
        myGalleryBt.style.display = 'block';
        modifyAccountBt.style.display = 'block';
        deleteAccountBt.style.display = 'block';
    }
}

// DELETE ACOUNT
deleteAccountBt.addEventListener('click', ()=>{
    deleteConfirmationForm.style.display = 'block';
})
submitDeleteBt.addEventListener('click', async ()=>{
    event.preventDefault()
    const idUser = JSON.parse(sessionStorage.getItem("user")).id
    const request = await fetch(`http://localhost:3000/api/deleteAcount?id=${idUser}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(request.ok){
        // complétement déconnecter l'utilisateur
        deleteConfirmationForm.style.display = 'none';
        userData = {
            id: undefined,
            email: undefined,
            firstname: undefined,
            lastname: undefined   
        }
        sessionStorage.setItem("user", JSON.stringify(userData));
        sessionStorage.setItem("authentification", null);
        reloadLayout();
    }
})
cancelDeleteBt.addEventListener('click', ()=>{
    deleteConfirmationForm.style.display = 'none';
})

// MODIFY ACCOUNT
modifyAccountBt.addEventListener('click', ()=>{
    // ouverture du popup
    modifyForm.style.display = 'block'; 
    const user = JSON.parse(sessionStorage.getItem("user"));
    // insertion des données de l'utilisateur dans le form
    firstnameModify.value = user.firstname
    lastnameModify.value = user.lastname
    emailModify.value = user.email
})
modifySubmitBt.addEventListener('click', (event) => {
    event.preventDefault();
    let password = passwordModify.value
    const confirmPassword = confirmPasswordModify.value
    // verification des mots de passes
    if(password === "" || confirmPassword === ""){
        alert("Veuillez remplir tout les champs de password")
        return;
    }
    if(password !== confirmPassword){
        alert("les passwords ne matchent pas")
        return;
    }
    // si passwords passent les tests, envoi des données au endpoint
    console.log("passwords ok")
    const user = JSON.parse(sessionStorage.getItem("user"));
    const data = {
        id: user.id,
        firstname: firstnameModify.value,
        lastname: lastnameModify.value,
        email: emailModify.value,
        password: password
    }
    SendModification(data)
    modifyForm.style.display = 'none';
})
async function SendModification(data){
    const request = await fetch(`http://localhost:3000/api/modifyAcount`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(request.ok){
            let result = await request.json() // recuperer repobnse du server
            userData.id = result.user.id_user;
            userData.email = result.user.email;
            userData.firstname = result.user.firstname;
            userData.lastname = result.user.lastname;
            // modification des données de l'utilisateurs connecté
            sessionStorage.setItem("user", JSON.stringify(userData));
        }
}

// LOGIN
logintBt.addEventListener('click', (event)=>{
    loginForm.style.display = 'block';
})
cancelLoginBt.addEventListener('click', (event)=>{ 
    console.log("click cancel (loginForm)");
    loginForm.style.display = 'none';
})
submitLogin.addEventListener('click', () =>{
    event.preventDefault();
    console.log("click submit login");
    loginUser(loginEmail.value, loginPassword.value);
})

//LOGOUT
logoutBt.addEventListener('click', ()=>{
    sessionStorage.setItem("authentification", null);
    userData = {
        id: undefined,
        email: undefined,
        firstname: undefined,
        lastname: undefined   
    }
    sessionStorage.setItem("user", JSON.stringify(userData));
    reloadLayout();
})

 // SUBSCRIBE
subscribeBt.addEventListener('click', (event)=>{
    subscribeForm.style.display = 'block';
})
cancelSubscribe.addEventListener('click', (event)=>{
    subscribeForm.style.display = 'none';
})
submitSubscribe.addEventListener('click', (event)=>{
    event.preventDefault();
    let firstname = subscribeFirstname.value
    let lastname =  subscribeLastname.value 
    let email = subscribeEmail.value 
    let password = subscribePassword.value 
    let secondPassword = subscribeSecondPassword.value 
    if(password !== secondPassword)
    {
        alert("Passwords do not match.");
        return;
    } else{ // password match
        console.log(subscribeEmail)
        console.log("email : ", email,"first : ", firstname,"last : ", lastname)
        createUser(firstname, lastname, email, password)    
    }   
})

// PUBLIC GALLERY
publicGalleryBt.addEventListener('click', (event)=>{
    sessionStorage.setItem("gallery", "public_pictures")
    window.location.href='gallery.html'
})
// MY GALLERY
myGalleryBt.addEventListener('click', (event) => {
    sessionStorage.setItem("gallery", "user_pictures");
    window.location.href='gallery.html';
})

async function loginUser(email, password){
    try{
        let data = {
            email: email,
            password: password
        }
        const request = await fetch(`http://localhost:3000/api/loginUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(request.ok){
            console.log("request ok !");
            // recuperation de la reponse : 
            // AUTH ==> true : user connecté
            // USER ==> id, firsname, lastname, email
            let result = await request.json() 
            if(result.auth){
                userData.id = result.user.id_user;
                userData.email = result.user.email;
                userData.firstname = result.user.firstname;
                userData.lastname = result.user.lastname;
                sessionStorage.setItem("authentification", "true");
                sessionStorage.setItem("user", JSON.stringify(userData));
                reloadLayout();
                loginForm.style.display = 'none';
            }else if(result.insert === false){
                // EMAIL DEJA UTILISE
                console.log("email deja utilisé")
            }
        }
    }catch(error){
        console.log(error)
    }
}

// INSERTION USER -- FORMULAIRE SUBSCRIBE
async function createUser(firstname, lastname, email, password){
    try{
        let data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }
        const request = await fetch(`http://localhost:3000/api/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(request.ok){
            // recuperation de la reponse : 
            // AUTH ==> true : user connecté
            // USER ==> id, firsname, lastname, email
            let result = await request.json() 
            if(result.auth){
                userData.id = result.user.id_user;
                userData.email = result.user.email;
                userData.firstname = result.user.firstname;
                userData.lastname = result.user.lastname;
                sessionStorage.setItem("user", JSON.stringify(userData));
                sessionStorage.setItem("authentification", "true");
                reloadLayout();
                subscribeForm.style.display = 'none';
            }
        }else{
            console.log("Un compte est deja lié addresse email ")
        }
    }catch(error){
        console.log(error)
    }
}

/*****************************************************************
 *  VALENTIN
 * ***************************************************************/

// Ajoute un écouteur d'événements pour montrer le sélecteur de couleurs quand la zone de spray est cliquée.
document.getElementById('spray-can-area').addEventListener('click', function() {
    showPopup('colorPickerPopup');
});

// Ajoute un écouteur d'événements pour montrer le contenu du sac à dos quand la zone correspondante est cliquée.
document.getElementById('backpack-area').addEventListener('click', function() {
    showBackpackContents();
    showPopup('backpackPopup');
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

function closeColorPickerPopup() {
    hidePopup('colorPickerPopup');
}
function closeBackpackPopup() {
    hidePopup('backpackPopup');
}

function showPopup(popupId) {
    var popup = document.getElementById(popupId);
    popup.style.display = 'block';
}
function hidePopup(popupId) {
    var popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'none';
    } else {
        console.error('Popup with ID ' + popupId + ' not found.');
    }
}

function adjustMapCoords() {
    var image = document.querySelector('#interactive-image img');
    var areas = document.querySelectorAll('#interactive-image area');

    areas.forEach(function(area) {
        var originalCoords = area.getAttribute('data-original-coords').split(',');
        var adjustedCoords = originalCoords.map(function(coord, index) {
            return index % 2 === 0
                ? coord * image.clientWidth / image.naturalWidth
                : coord * image.clientHeight / image.naturalHeight;
        });
        area.coords = adjustedCoords.join(',');
    });
}

window.addEventListener('load', adjustMapCoords);
window.addEventListener('resize', adjustMapCoords);
