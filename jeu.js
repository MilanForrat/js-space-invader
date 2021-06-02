// TODO : 
// game over si les monstres dépassent une ligne en bas de l'écran
// rePop des monstres régulièrement
// animation des game over

let startTitle = document.getElementById('startTitle');
let score = 1;
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
    // je renvoie l'inverse, donc je renvoie le fait que je soit en collision
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


     
let vaisseau = new Sprite("./images/ready/vaisseau.png", document.body.clientWidth/2, 500);

// missile
let missile = new Sprite("./images/ready/missile-deplacement.gif", 0, 0);
missile.display = "none";

// tant que je n'ai pas appuyé sur entrer
let refreshStart = setInterval(playStartAnimation, 500);
// je lance une fonction qui change la couleur du texte html
function playStartAnimation() {
    startTitle.style.color = startTitle.style.color == "white" ? "red" : "white";
}
    
// ------------------------------------- gestion des touches -------------------------------------
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
            // top
            if(event.keyCode == 38){
                vaisseau.top -= 15;
                vaisseau._node.src = "./images/ready/vaisseau-deplacement.gif";
                setTimeout(function(){
                    vaisseau._node.src = "./images/ready/vaisseau.png";
                }, 300);
            }
            // left
            if(event.keyCode == 37){
                vaisseau.left -= 15;
                vaisseau._node.src = "./images/ready/vaisseau-deplacement.gif";
                setTimeout(function(){
                    vaisseau._node.src = "./images/ready/vaisseau.png";
                }, 300);
            }
            //right
            if(event.keyCode == 39){
                vaisseau.left +=  15;
                vaisseau._node.src = "./images/ready/vaisseau-deplacement.gif";
                setTimeout(function(){
                    vaisseau._node.src = "./images/ready/vaisseau.png";
                }, 300);
            }
            //down
            if(event.keyCode == 40){
                vaisseau.top +=  15;
                vaisseau._node.src = "./images/ready/vaisseau-deplacement.gif";
                setTimeout(function(){
                    vaisseau._node.src = "./images/ready/vaisseau.png";
                }, 300);
            }
            // si collision entre vaisseau et alien
            for(i=1; i <= 10; i++){
                if(vaisseau.checkCollision(tableauMonstre[i])){
                    gameOver();
                }   
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
                    missile.startAnimation(moveMissile, 10);
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
        }
        // tableau de monstre (10 monstres et 5 images)        
        let tableauMonstre = [];
        let randomNumber = 0;
        for(let i=1; i <= 10; i++){
            randomNumber = Math.floor(Math.random()*10 +1);
            if(i <= 5){
                tableauMonstre[i] = new Sprite("./images/ready/m"+i+".png", Math.floor(Math.random() *1000), Math.floor(Math.random() *150));
            }
            else if(i <= 10){
                tableauMonstre[i] = new Sprite("./images/ready/m"+ (i-5) +".png", Math.floor(Math.random() *1000), Math.floor(Math.random() *150));
            }
            if(randomNumber < 5){
                tableauMonstre[i].startAnimation(moveMonsterToRight, 10);
            }
           else{
                tableauMonstre[i].startAnimation(moveMonsterToLeft, 10);
           }        
        }

        // ---------------------- Création du déplacement du missile et des monstres ---------------------------------
        function moveMissile(missile){
            // je fais monter le missile (la valeur correspond à la vitesse du missile)
            missile.top -= 8;

                // arrête le missile lorsqu'il sort de sa fenêtre
            if(missile.top < 0) {
                missile.stopAnimation();
                missile.display = "none";
            }
            for(let i=1; i <=10;i++){
                if(tableauMonstre[i].display == "none") continue;
                // on regarde s'il y a collision entre un monstre et un missile
                
                if(missile.checkCollision(tableauMonstre[i])){
                    missile.stopAnimation();
                    missile.display = "none";
                    tableauMonstre[i].stopAnimation();
                    // animation gif explosion monstre
                    
                    tableauMonstre[i]._node.src = "./images/ready/explosion.gif";
                    // si je tire de nouveau j'annule l'animation
                    setTimeout(function(){
                        tableauMonstre[i].display = "none";
                    }, 500);
                    score++;
                }
            }
            function checkScore(score){
                for(let i = 1; i < score;i++){
                    startTitle.innerText= i+"kills !";
                    startTitle.style.display ="block";
                }
            }
            checkScore(score);
        }
       
        function gameOver(){
            document.body.className ="start";
            startTitle.style.display ="block";
            startTitle.style.zIndex = "1000";
            startTitle.innerText ="🛑 Game Over 🛑";
            startTitle.innerHTML += `<br>
            <button id="reload" onClick="window.location.reload();">Rejouer !</button>`
            tableauMonstre[i].stopAnimation();
            setTimeout(function(){
                vaisseau.display ="none";
            }, 100);
        }

        function moveMonsterToRight(monster){
            // la valeur est la vitesse de déplacement vers la droite
            monster.left += Math.floor(Math.random() *2);
            monster.top += Math.floor(Math.random() *1.2);
            // si le monstre arrive au bord de map
            // je déduis la largeur de l'image du monstre pour ne pas soritr du cadre
            if(monster.left > document.body.clientWidth - monster._node.width){
                // je vais descendre mon monstre quand il arrive en bout de ligne
                monster.top += Math.floor(Math.random() *10);
                // j'empêche mon monstre de sortir du cadre
                monster.left = document.body.clientWidth - monster._node.width;
                // je déclenche l'animation du monstre avec la fonction toRight, rafraichie à 20ms
                monster.startAnimation(moveMonsterToLeft, 15);
            }
            // si le monstre dépasse j'arrête son animation 
            if(monster.top > document.body.clientHeight + monster._node.height) {
                monster.stopAnimation();
            }
        }

        function moveMonsterToLeft(monster){
            // la valeur est la vitesse de déplacement vers la droite
            monster.left -= Math.floor(Math.random() *2);
            monster.top += Math.floor(Math.random() *1.2);
            // si le monstre arrive au bord de map
            // je déduis la largeur de l'image du monstre pour ne pas soritr du cadre
            if(monster.left <= 0){
                // je vais descendre mon monstre quand il arrive en bout de ligne
                monster.top += Math.floor(Math.random() *10);
                // je déclenche l'animation du monstre avec la fonction toRight, rafraichie à 20ms
                monster.startAnimation(moveMonsterToRight, 15);
            }
            // si le monstre dépasse j'arrête son animation
            if(monster.top > document.body.clientHeight + monster._node.height) {
                monster.stopAnimation();
            }
        }
    }
}