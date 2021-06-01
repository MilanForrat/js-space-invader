let startTitle = document.getElementById('startTitle');
// console.log(startTitle);
let vaisseau = new Sprite("./images/ready/vaisseau.png", document.body.clientWidth/2, 700);

// je recupère les enfants du body
let imgElement = document.body.childNodes;
console.log(imgElement)

// m pour monstre
let m1 = new Sprite("./images/ready/m1.png",Math.floor(Math.random() * 300)
, Math.floor(Math.random() *150));
let m2 = new Sprite("./images/ready/m2.png", Math.floor(Math.random() *1000), Math.floor(Math.random() *150));
let m3 = new Sprite("./images/ready/m3.png", Math.floor(Math.random() *1000), Math.floor(Math.random() *150));
let m4 = new Sprite("./images/ready/m4.png", Math.floor(Math.random() *1000), Math.floor(Math.random() *150));
let m5 = new Sprite("./images/ready/m5.png", Math.floor(Math.random() *1000), Math.floor(Math.random() *150));



// missile
let missile = new Sprite("./images/ready/missile.png", 0, 0);
missile.display = "none";

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

    // on cherche à contrôler le positionnement de l'élément en cours this
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

     // on cherche à contrôler le positionnement de l'élément en cours this
     Object.defineProperty(this, "top", {
        // je recupère la valeur du positionnement top (ça c'est de la lecture)
        get: function() {
            // je retourne la valeur left
            return this._top;
        },
        // j'attribue une valeur à top (ça c'est du déplacement)
        set: function(value) {
            // j'applique à left la valeur reçue en paramètre
            this._top = value;
            // j'applique au style de l'img (_node = image) le positionnement en pixel
            this._node.style.top = this._top + "px";
        }
    });

         // on cherche à contrôler l'affichage de l'élément
         Object.defineProperty(this, "display", {
            // je recupère la valeur de l'affichage (ça c'est de la lecture)
            get: function() {
                // je retourne la valeur left
                return this._node.style.display;
            },
            // j'attribue une valeur à l'affichage (ça c'est du paramètrage)
            set: function(value) {
                // j'applique au style de l'img (_node = image) le positionnement en pixel
                this._node.style.display = value;
            }
        });

        this.left = left;
        this.top = top;
}
// ------------------------------------- gestion des touches -------------------------------------
    // tant que je n'ai pas appuyé sur entrer
    let refreshStart = setInterval(playStartAnimation, 500);
    // je lance une fonction qui change la couleur du texte html
    function playStartAnimation() {
      startTitle.style.color = startTitle.style.color == "white" ? "red" : "white";
    }
     
// j'écoute le clavier pour recupérer un keycode (clé de la touche appuyée)
document.onkeydown = function play(enter){

    // si j'appuie sur "entrer"
    if(enter.keyCode == 13){
        clearInterval(refreshStart);
        document.body.className ="";
        startTitle.style.display ="none";
        document.onkeydown = function (event){

            // permet de voir quelle touche est appuyée
            // console.log(event.keyCode);
            // touche fleche du haut
            if(event.keyCode == 38){
                vaisseau.top -= 10;
            }
            // left
            if(event.keyCode == 37){
                vaisseau.left -= 10;
            }
            //right
            if(event.keyCode == 39){
                vaisseau.left +=  10;
            }
            //down
            if(event.keyCode == 40){
                vaisseau.top +=  10;
            }
            // espace = tir
            if(event.keyCode == 32){
                // on ne peut tirer qu'un missile à la fois
                if(missile.display == "none"){
                    // affichage du missile
                    missile.display="block";
                    // je centre le missile au milieu du vaisseau
                    missile.left = vaisseau.left + (vaisseau._node.width - missile._node.width) /2
                    // je mets le missile au dessus du vaisseau
                    missile.top = vaisseau.top;
                    // j'invoque la fonction d'envoie du missile 
                    // param 1 = le nom de la fonction 
                    // param 2 = la fréquence de rafraichissement
                    missile.startAnimation(moveMissile, 20);
                }
            }  
        }

        // -------------------------------- vérifications qu'on ne sort pas du cadre  ------------
        if(vaisseau.left < 0){
            // si je sors du cadre alors je suis redéplacer à la valeur 0 (bord de map)
            vaisseau.left = 0;
        }
        // je vérifie que je ne sors pas à droite, donc je prends en compte la largeur du client - la largeur de l'image
        if(vaisseau.left > document.body.clientWidth - vaisseau._node.width){
            vaisseau.left = document.body.clientWidth - vaisseau._node.width;
        }
        if(vaisseau.top < 0){
            // si je sors du cadre alors je suis redéplacer à la valeur 0 (bord de map)
            vaisseau.top =0;
        }
        if(vaisseau.top > document.body.clientHeight - vaisseau._node.height){
            vaisseau.top = document.body.clientHeight - vaisseau._node.height;
        }
        if(window.onresize){
            if(vaisseau.left < 0){
                // si je sors du cadre alors je suis redéplacer à la valeur 0 (bord de map)
                vaisseau.left = 0;
            }
            // je vérifie que je ne sors pas à droite, donc je prends en compte la largeur du client - la largeur de l'image
            if(vaisseau.left > document.body.clientWidth - vaisseau._node.width){
                vaisseau.left = document.body.clientWidth - vaisseau._node.width;
            }
            if(vaisseau.top < 0){
                // si je sors du cadre alors je suis redéplacer à la valeur 0 (bord de map)
                vaisseau.top = 0;
            }
            if(vaisseau.top > document.body.clientHeight - vaisseau._node.height){
                vaisseau.top = document.body.clientHeight - vaisseau._node.height;
            }
        }
        // ----------------------      création de l'interval de déplacement du missile et des monstres    ---------------------------------
        
        // on ajoute une animation de départ
        // paramètre 1 = le nom de la fonction à rafraichir/rééxécuter (ex: startAnimation(missile, 20))
        // paramètre 2 = l'interval (le délais de rééxécution de l'action)
        Sprite.prototype.startAnimation = function (fct, interval) {
            // s'il existe déjà un interval (ex: un missile tiré), alors je l'annule
            if(this._clock) {
                window.clearInterval(this._clock);
            }
            // on associe à _this la valeur actuelle de l'objet
            let _this = this;
            // je déclenche à interval régulier et je stock cette action dans une variable _clock
            this._clock = window.setInterval(function() {
                // le _this correspond à l'élément et non pas à la fonction grâce à la ligne 140
                fct (_this);
            }, interval);
        };
        // on arrête l'animation de départ stockée dans la variable _clock
        Sprite.prototype.stopAnimation = function () {
            window.clearInterval(this._clock);
        };

        // ----------------------- gestion de la colision -------------
        //check collision doit me retourner s'il y a une collision
        Sprite.prototype.checkCollision = function (other) {
            // je souhaite l'inverse du test ci dessous, donc je regarde s'il y a collision
            return ! 
                // je test qu'il n'y ait pas de collision
            (

                // si je me trouve en dessous de l'élement = pas de collision
                (this.top + this._node.height < other.top) 
                                    ||
                // si je me trouve au dessus de l'élément = pas de collision
                this.top > (other.top + other._node.height)
                                    ||
                // si je ne touche pas à droite = pas de collision
                (this.left + this._node.width < other.left)
                                    ||
                // si je bne touche pas à gauche = pas de collision
                this.left > (other.left + other._node.width)
            );
        }

        // ---------------------- Création du déplacement du missile et des monstres ---------------------------------

        function moveMissile(missile){
            // je fais monter le missile (la valeur correspond à la vitesse du missile)
            missile.top -= 15;
            // arrête le missile lorsqu'il sort de sa fenêtre
            if(missile.top < -100) {
                missile.stopAnimation();
                missile.display = "none";
            }
            // si je tire sur un élément invisible alors je continue
            if(m1.display == "none" || m2.display == "none" || m3.display == "none" || m4.display == "none" || m5.display == "none" ){
                
            }
            if(missile.checkCollision(m1)){
                missile.stopAnimation();
                m1.stopAnimation();
                // si je touche un monstre alors je cache le missile
                missile.display ="none";
                // je cache le monstre
                m1.startAnimation(moveMonsterToTop, 10);
            }
            if(missile.checkCollision(m2)){
                missile.stopAnimation();
                m2.stopAnimation();
                // si je touche un monstre alors je cache le missile
                missile.display ="none";
                // je cache le monstre
                m2.startAnimation(moveMonsterToTop, 10);
            }
            if(missile.checkCollision(m3)){
                missile.stopAnimation();
                m3.stopAnimation();
                // si je touche un monstre alors je cache le missile
                missile.display ="none";
                // je cache le monstre
                m3.startAnimation(moveMonsterToTop, 10);
            }
            if(missile.checkCollision(m4)){
                missile.stopAnimation();
                m4.stopAnimation();
                // si je touche un monstre alors je cache le missile
                missile.display ="none";
                // je cache le monstre
                m4.startAnimation(moveMonsterToTop, 10);
            }
            if(missile.checkCollision(m5)){
                missile.stopAnimation();
                m5.stopAnimation();
                // si je touche un monstre alors je cache le missile
                missile.display ="none";
                // je cache le monstre
                m5.startAnimation(moveMonsterToTop, 10);
            }
        }

        function moveMonsterToTop(monster){
            // la valeur est la vitesse de déplacement vers la droite
            monster.left += Math.floor(Math.random() *20);
            if(monster.left > document.body.clientWidth - monster._node.width){
                // je vais descendre mon monstre quand il arrive en bout de ligne
                monster.top = 0;
                // j'empêche mon monstre de sortir du cadre
                monster.left = document.body.clientWidth - monster._node.width;
                // je déclenche l'animation du monstre avec la fonction toRight, rafraichie à 20ms
                monster.startAnimation(moveMonsterToRight, 10);
            }
            // si le monstre dépasse j'arrête son animation 
            if(monster.top > document.body.clientHeight + monster._node.height) {
                monster.stopAnimation();
            }
        }

        function moveMonsterToRight(monster){
            // la valeur est la vitesse de déplacement vers la droite
            monster.left += Math.floor(Math.random() *20);
            // si le monstre arrive au bord de map
            // je déduis la largeur de l'image du monstre pour ne pas soritr du cadre
            if(monster.left > document.body.clientWidth - monster._node.width){
                // je vais descendre mon monstre quand il arrive en bout de ligne
                monster.top += Math.floor(Math.random() *40);
                // j'empêche mon monstre de sortir du cadre
                monster.left = document.body.clientWidth - monster._node.width;
                // je déclenche l'animation du monstre avec la fonction toRight, rafraichie à 20ms
                monster.startAnimation(moveMonsterToLeft, 10);
            }
            // si le monstre dépasse j'arrête son animation 
            if(monster.top > document.body.clientHeight + monster._node.height) {
                monster.stopAnimation();
            }
        }

        function moveMonsterToLeft(monster){
            // la valeur est la vitesse de déplacement vers la droite
            monster.left -= Math.floor(Math.random() *20);
            // si le monstre arrive au bord de map
            // je déduis la largeur de l'image du monstre pour ne pas soritr du cadre
            if(monster.left <= 0){
                // je vais descendre mon monstre quand il arrive en bout de ligne
                monster.top += Math.floor(Math.random() *40);
                // je déclenche l'animation du monstre avec la fonction toRight, rafraichie à 20ms
                monster.startAnimation(moveMonsterToRight, 10);
            }
            // si le monstre dépasse j'arrête son animation
            if(monster.top > document.body.clientHeight + monster._node.height) {
                monster.stopAnimation();
            }
        }
  
        // il faudrait gérer la défaite + un score

        m1.startAnimation(moveMonsterToRight, 10);
        m2.startAnimation(moveMonsterToRight, 10);
        m3.startAnimation(moveMonsterToRight, 10);
        m4.startAnimation(moveMonsterToRight, 10);
        m5.startAnimation(moveMonsterToRight, 10);


    //fin du if 
    }
// fin de la fonction    
}