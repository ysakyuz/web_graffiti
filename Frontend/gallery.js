let picturesPlace = document.getElementById('picturesPlace');
let categoryContainer = document.getElementById('category-container');
let selectedCategory = [];
let allPictures = [];
let indexGallery = 0;
let idPicture;

addEventListener("load", (event) => {
    allPictures = [];
    indexGallery = 0;
    if(sessionStorage.getItem("gallery") == 'public_pictures'){
        document.getElementById('delete-picture-button').style.display = 'none';
    }
    getPictures();
});

async function getPictures(){
    try{
        let url;
        let userId = JSON.parse(sessionStorage.getItem("user")).id; 
        let galleryPage = sessionStorage.getItem("gallery");
        if(galleryPage == "public_pictures"){
            url = `http://localhost:3000/api/getPublicPictures`; 
        }else if(galleryPage == "user_pictures"){
            if(!userId){
                return;
            }
            url = `http://localhost:3000/api/getAllPicturesOfUser?userId=${userId}`;           
        }else{
            return res.json({msg: "probleme dans le coltar"})
        }
        // requête vers la base de donnée
        const request = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(request.ok){
            let result = await request.json() // DONNEES DE RESULTAT
            let data;
            if(galleryPage == "public_pictures"){
                data = result.data[0]
            }else if(galleryPage == "user_pictures"){
                data = result.data
            }
            let picturesHexa = data // reception images en format buffer
            picturesHexa.forEach(pic => {
                // transformation data en hexadecimal en objet image jpg
                const idPicture = pic.idPicture;
                const bufferArray = new Uint8Array(pic.picture.data); 
                const blob = new Blob([bufferArray], {type: 'image/jpeg;'});
                const url = URL.createObjectURL(blob);
                // création de l'élément html de l'image
                const img = document.createElement("img"); 
                img.src = url;
                img.id = "actualPicture";
                allPictures.push(
                    {
                        idPicture: idPicture,
                        picture: img,
                        category: pic.category
                    }                
                );
            });
            // affichage de la première image faite
            showPictures(indexGallery);
        }
    }catch(error){
        alert("aucunes images n'est disponible");
    }
}
// affichage de l'image selon l'index
function showPictures(index){
    // affichage de l'image
    picturesPlace.innerHTML = "";
    picturesPlace.appendChild(allPictures[index].picture);
    idPicture = allPictures;
    // affichage de toutes les catégories liées à l'image
    const allCategories = allPictures[index].category;
    categoryContainer.innerHTML = "";
    allCategories.forEach(cat => {
        const tag = document.createElement("h2");
        tag.textContent  = `#${cat}`;   
        categoryContainer.appendChild(tag);         
    });
}
const deleteBt = document.getElementById('delete-picture-button')
deleteBt.addEventListener('click', function() {
    deleteBt.disabled = true; // eviter click trop sensible
    setTimeout(() => {
        deleteBt.disabled = false;
    }, 5000);
    allPictures.splice(indexGallery, 1); // suppression de l'image du tableau des images dispos
    deletePicture(allPictures[indexGallery-1].idPicture); // suppression de l img dans la db et le fichier
    if(indexGallery > 0){
        indexGallery--;
    }
    showPictures(indexGallery);
});
async function deletePicture(idPicture){
    const deleteURL = `http://localhost:3000/api/deletePicture?id=${idPicture}`;
    const delPic = await fetch(deleteURL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// Önceki resme git butonu işlevi
// decremente de 1 l'index d'image puis affiche image correspondante
document.getElementById('prev-button').addEventListener('click', function() {
    if(indexGallery > 0){
        indexGallery--;
        showPictures(indexGallery);
    }    
});

// incremente de 1 l'index d'image puis affiche image correspondante
document.getElementById('next-button').addEventListener('click', function() {
    if(indexGallery < allPictures.length-1){
        indexGallery++;
        showPictures(indexGallery);
    }
});