// Création d'objet Sprite = élément graphique
    // je vais donner 3 paramètres à la fonction :
    // 1) le chemin d'accès au fichier
    // 2) la position par rapport à la gauche de l'écran => left
    // 3) la position par rapport au haut de l'écran => top
function Sprite(filename, left, top) {
    // je créer une image
    this._node = document.createElement("img");
    // j'attribue à src le chemin d'accès
    this._node.src = filename;
    // j'applique la position absolue à l'élément
    this._node.style.position = "absolute";
    // je fabrique l'élément dans l'HTML
    document.body.appendChild(this._node);

    // on cherche à contrôler le position de l'élément en cours .this
    Object.defineProperty(this, "left", {
        // je recupère la valeur du positionnement left (ça c'est de la lecture)
        get: function() {
            // je retourne la valeur left
            return this._left;
        },
        // j'attribue une valeur à left (ça c'est du déplacement)
        set: function(value) {
            // j'applique à left la valeur reçue en paramètre
            this._left = value;
            // j'applique au style de l'img (_node = image) le positionnement en pixel
            this._node.style.left = this._left + "px";
        }
    });
}