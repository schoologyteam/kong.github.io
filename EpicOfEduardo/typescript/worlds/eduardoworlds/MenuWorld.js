/* global Entity GameSprite World MyGame GameImage KeyManager OverWorld Eduardo config Coin MouseManager */
class MenuWorld extends World {
    constructor() {
        super();
        if (!MyGame.loaded) {
            makeSoundLoop(MyGame.snds["City"]);
            makeSoundLoop(MyGame.snds["Snow"]);
            MyGame.loaded = true;
        }
        this.addEntity(new Entity(0, 0, new GameImage(MyGame.imgs["title_background"])));
        this.title = new Entity(140 * 2, 27 * 2, new GameImage(MyGame.imgs["title_spanish"]));
        this.arrow = new Entity(120 * 2, 80 * 2, new GameSprite(MyGame.imgs["stock_arrows"], 48, 48));
        this.nextArrow = new Entity(314 * 2, 218 * 2, new GameSprite(MyGame.imgs["stock_arrows"], 48, 48));
        this.backArrow = new Entity(50 * 2, 218 * 2, new GameSprite(MyGame.imgs["stock_arrows"], 48, 48));
        this.backArrow.image.currentFrame = 2;
        this.addEntity(this.title);
        this.addEntity(this.arrow);
        this.addEntity(this.nextArrow);
        this.addEntity(this.backArrow);
        this.state = 0;
        MyGame.color = "#000000";
        MyGame.loadGame();
        if (!config.remapper) {
            config.remapper = function() {
                let remapping = false;
                let target = null;
                let rmpr = {};
                rmpr.remap = function(_t) {
                    target = _t;
                    remapping = true;
                };
                window.addEventListener("keyup", function(event) {
                    if (remapping) {
                        if (event.key === "Left" || event.key === "ArrowLeft" || event.key === "Right" || event.key === "ArrowRight"  || event.key === "Up" || event.key === "ArrowUp"  || event.key === "Down" || event.key === "ArrowDown") {
                            remapping = false;
                            return;
                        }
                        else if (event.key === "Escape" || event.key === "Enter") {
                            remapping = false;
                            return;
                        }
                        config[target] = event.key;
                        remapping = false;
                    }
                });
                return rmpr;
            }();
        }
        this.loadLanguageSelector();
    }
    update(_dt) {
        super.update(_dt);
        if (this.state != 0) {
            if (MyGame.nowPlaying != MyGame.snds["Title"]) {
                MyGame.nowPlaying = MyGame.snds["Title"];
                MyGame.nowPlaying.play();
            }
        }
        if (KeyManager.pressed("ArrowLeft") || KeyManager.pressed("ArrowUp") || KeyManager.pressed("Left") || KeyManager.pressed("Up") || KeyManager.pressed(config.keyUp) || KeyManager.pressed(config.keyLeft)) {
            this.choice -= 1;
            if (this.choice < 0) {
                this.choice = this.choiceMax;
            }
        }
        else if (KeyManager.pressed("ArrowRight") || KeyManager.pressed("ArrowDown") || KeyManager.pressed("Right") || KeyManager.pressed("Down") || KeyManager.pressed(config.keyDown) || KeyManager.pressed(config.keyRight))  {
            this.choice += 1;
            if (this.choice > this.choiceMax) {
                this.choice = 0;
            }
        }
        if (KeyManager.pressed(config.actionKey) || KeyManager.pressed("Enter")) {
            if (this.state === 0) {
                if (this.choice === 0) {
                    MyGame.textLanguage = "English";
                }
                else {
                    MyGame.textLanguage = "Spanish";
                }
                this.loadMain();
            }
            else if (this.state === 1) {
                if (this.choice === 0) {
                    if (!Eduardo.levelCleared["Mystic Cave"]) {
                        Coin.collected = new Array(false, false, false, false, false);
                        MyGame.color = "#121218";
                        this.addEntity(new ScreenTransition(MyGame.camera.x, MyGame.camera.y, new CutScene1()));
                        Eduardo.currentLevel = "Mystic Cave";
                        Eduardo.hearts = 6;
                        Eduardo.money = 0;
                        Eduardo.power = 0;
                        return;
                    }
                    else {
                        this.addEntity(new ScreenTransition(MyGame.camera.x, MyGame.camera.y, new OverWorld()));
                    }
                }
                else if (this.choice === 1) {
                    this.loadCredits(1);
                }
                else if (this.choice === 2) {
                    this.loadEraseData();
                }
                else {
                    this.loadControls();
                }
            }
            else if (this.state === 4) {
                if (this.choice === 0) {
                    this.loadMain();
                }
                else {
                    MyGame.reset();
                    this.loadLanguageSelector();
                }
            }
            else {
                this.loadMain();
            }
        }
        if (this.state === 2) {
            if (KeyManager.pressed("ArrowLeft") || KeyManager.pressed("ArrowUp") || KeyManager.pressed("Left") || KeyManager.pressed("Up") || KeyManager.pressed(config.keyUp) || KeyManager.pressed(config.keyLeft)) {
                this.loadCredits(this.creditsPage - 1);
            }
            else if (KeyManager.pressed("ArrowRight") || KeyManager.pressed("ArrowDown") || KeyManager.pressed("Right") || KeyManager.pressed("Down") || KeyManager.pressed(config.keyDown) || KeyManager.pressed(config.keyRight)) {
                this.loadCredits(this.creditsPage + 1);
            }
            else if (KeyManager.pressed("Escape")) {
                this.loadMain();
            }
        }
        else if (this.state === 3) {
            let mPos = MouseManager.getFilteredCoords();
            if (KeyManager.pressed("Escape")) {
                this.loadMain();
            }
            let t = 150;
            let l = 200;
            if (MouseManager.pressed()) {
                if (mPos.x > l - 20 && mPos.x < l + 190) {
                    if (mPos.y > t - 25 && mPos.y < t + 15) {
                        config.remapper.remap("keyUp");
                    }
                    else if (mPos.y > t + 15 && mPos.y < t + 55) {
                        config.remapper.remap("keyDown");
                    }
                    else if (mPos.y > t + 55 && mPos.y < t + 95) {
                        config.remapper.remap("keyLeft");
                    }
                    else if (mPos.y > t + 95 && mPos.y < t + 135) {
                        config.remapper.remap("keyRight");
                    }
                }
                if (mPos.x > l + 190 && mPos.x < l + 400) {
                    if (mPos.y > t - 25 && mPos.y < t + 15) {
                        config.remapper.remap("jumpKey");
                    }
                    else if (mPos.y > t + 15 && mPos.y < t + 55) {
                        config.remapper.remap("actionKey");
                    }
                    else if (mPos.y > t + 55 && mPos.y < t + 95) {
                        config.remapper.remap("pauseKey");
                    }
                    else if (mPos.y > t + 95 && mPos.y < t + 135) {
                        config.remapper.remap("muteKey");
                    }
                }
            }
        }
        else if (this.state === 4) {
                if (KeyManager.pressed("Escape")) {
                this.loadMain();
            }
        }
        this.arrow.y = (67 + 25 * this.choice) * 2;
    }
    render(_g) {
        super.render(_g);
        if (Eduardo.screenTransition) {
            return;
        }
        let mPos = MouseManager.getFilteredCoords();
        if (this.state === 0) {
            for (let i = 0; i < 2; i++) {
                _g.text(this.text[i], 155 * 2, 2 * (85 + 25 * i));
            }
            for (let i = 2; i < this.text.length; i++) {
                _g.text(this.text[i], 28 * 2, 2 * (145 + 20 * i), "#FFFFFF", "18px Verdana");
            }
        }
        else if (this.state === 1) {
            for (let i = 0; i < this.text.length; i++) {
                _g.text(this.text[i], 155 * 2, 2 * (85 + 25 * i));
            }
        }
        else if (this.state === 2) {
            _g.text(this.text[0], 200, 75);
            for (let i = 1; i < this.text.length; i++) {
                _g.text(this.text[i], 148, 88 + 32 * i, "#FFFFFF", "24px Verdana");
            }
        }
        else if (this.state === 3) {
            let t = 150;
            let l = 200;
            for (let i = 0; i < 4; i++) {
                if (mPos.x > l - 20 && mPos.y > t - 25 + 40 * i && mPos.x < l + 190 && mPos.y < t + 15 + 40 * i) {
                    _g.rectangle(l - 20, t - 25 + 40 * i, 210, 40, "#8088A1", "fill");
                }
                if (mPos.x > l + 190 && mPos.y > t - 25 + 40 * i && mPos.x < l + 400 && mPos.y < t + 15 + 40 * i) {
                    _g.rectangle(l + 190, t - 25 + 40 * i, 210, 40, "#8088A1", "fill");
                }
            }
            for (let i = 0; i < 4; i++) {
                _g.rectangle(l - 20, t - 25 + 40 * i, 210, 40, "#8DA3B4", "stroke", 5);
                _g.rectangle(l + 190, t - 25 + 40 * i, 210, 40, "#8DA3B4", "stroke", 5);
            }
            _g.text(this.text[0] + ": " + config.keyUp, l, t, "#FFFFFF", "24px Verdana");
            _g.text(this.text[1] + ": " + config.keyDown, l, t + 40, "#FFFFFF", "24px Verdana");
            _g.text(this.text[2] + ": " + config.keyLeft, l, t + 80, "#FFFFFF", "24px Verdana");
            _g.text(this.text[3] + ": " + config.keyRight, l, t + 120, "#FFFFFF", "24px Verdana");
            _g.text(this.text[4] + ": " + config.jumpKey, l + 210, t, "#FFFFFF", "24px Verdana");
            _g.text(this.text[5] + ": " + config.actionKey, l + 210, t + 40, "#FFFFFF", "24px Verdana");
            _g.text(this.text[6] + ": " + config.pauseKey, l + 210, t + 80, "#FFFFFF", "24px Verdana");
            _g.text(this.text[7] + ": " + config.muteKey, l + 210, t + 120, "#FFFFFF", "24px Verdana");
            _g.text(this.text[8], 100, 400, "#FFFFFF", "18px Verdana", 550);
            _g.text(this.text[9], 180, 430, "#FFFFFF", "18px Verdana");
            _g.text(this.text[10], 100, 460, "#FFFFFF", "18px Verdana", 550);
        }
        else if (this.state === 4) {
            _g.text(this.text[0], 155, 100, "#FFFFFF", "18px Verdana");
            for (let i = 1; i < this.text.length; i++) {
                _g.text(this.text[i], 155 * 2, 2 * (85 + 25 * (i - 1)));
            }
        }
    }
    loadMain() {
        this.text = new Array();
        this.state = 1;
        this.choice = 0;
        this.choiceMax = 3;
        this.arrow.visible = true;
        this.nextArrow.visible = false;
        this.backArrow.visible = false;
        if (MyGame.textLanguage == "English") {
            this.text.push("Play Game");
            this.text.push("Credits");
            this.text.push("Erase Data");
            this.text.push("Controls");
            this.title.image = new GameImage(MyGame.imgs["title_english"]);
        }
        else if (MyGame.textLanguage == "Spanish") {
            this.text.push("Juega el Juego");
            this.text.push("Los Créditos");
            this.text.push("Reiniciar");
            this.text.push("Controlador");
            this.title.image = new GameImage(MyGame.imgs["title_spanish"]);
        }
        this.title.visible = true;
    }
    loadLanguageSelector() {
        this.state = 0;
        this.arrow.visible = true;
        this.title.visible = false;
        this.nextArrow.visible = false;
        this.backArrow.visible = false;
        this.text = new Array();
        this.choice = 0;
        this.choiceMax = 1;
        this.text.push("English");
        this.text.push("Español");
        this.text.push("Press the arrow keys to move the cursor and 'Enter' or 'X' to select.");
        this.text.push("Oprima las teclas de dirección para mover y 'X' o 'Entrada' para eligir.");
    }
    loadCredits(_p) {
        this.creditsPage = _p;
        this.state = 2;
        this.arrow.visible = false;
        this.title.visible = false;
        this.nextArrow.visible = true;
        this.backArrow.visible = true;
        this.text = new Array();
        if (_p === 1) {
            if (MyGame.textLanguage === "English") {
                this.text.push("Programming");
                this.text.push("Chance G.");
                this.text.push("");
                this.text.push("with special thanks to");
                this.text.push("Laurence W.");
                this.text.push("Dean M.");
                this.text.push("Marshall M.");
            }
            else {
                this.text.push("Programación");
                this.text.push("Chance G.");
                this.text.push("");
                this.text.push("y gracias especial por");
                this.text.push("Laurence W.");
                this.text.push("Dean M.");
                this.text.push("Marshall M.");
            }
        }
        else if (_p === 2) {
            if (MyGame.textLanguage === "English") {
                this.text.push("Art");
                this.text.push("Chance G.");
                this.text.push("TearOfTheStar");
            }
            else {
                this.text.push("Arte");
                this.text.push("Chance G.");
                this.text.push("TearOfTheStar");
            }
        }
        else if (_p === 3) {
            if (MyGame.textLanguage === "English") {
                this.text.push("Music");
                this.text.push("Choto The Bright");
            }
            else {
                this.text.push("Música");
                this.text.push("Choto The Bright");
            }
        }
        else {
            this.loadMain();
        }
    }
    loadControls() {
        this.text = new Array();
        this.state = 3;
        this.choice = 0;
        this.choiceMax = 3;
        this.arrow.visible = false;
        this.title.visible = false;
        this.nextArrow.visible = false;
        this.backArrow.visible = false;
        if (MyGame.textLanguage == "English") {
            this.text.push("Up");
            this.text.push("Down");
            this.text.push("Left");
            this.text.push("Right");
            this.text.push("Jump");
            this.text.push("Action");
            this.text.push("Pause");
            this.text.push("Mute");
            this.text.push("Click the item you want to change, then presse the key you want to use.");
            this.text.push("Press Escape to exit this page.");
            this.text.push("Arrow Keys, Escape and Enter are special and cannot be changed.");
        }
        else if (MyGame.textLanguage == "Spanish") {
            this.text.push("Arriba");
            this.text.push("Abajo");
            this.text.push("Izquierda");
            this.text.push("Derecha");
            this.text.push("Saltar");
            this.text.push("Actión");
            this.text.push("Pausa");
            this.text.push("Sordina");
            this.text.push("Haz clic en el actión que queres cambiar, y oprima la tecla que queres usar.");
            this.text.push("Oprima Escapa para salir este pagina.");
            this.text.push("Los direcciónes, Entrada, y Escapa son espcial, y no pueden cambiar.");
        }
    }
    loadEraseData() {
        this.state = 4;
        this.choice = 0;
        this.choiceMax = 1;
        this.arrow.visible = true;
        this.title.visible = false;
        this.nextArrow.visible = false;
        this.backArrow.visible = false;
        this.text = new Array();
        if (MyGame.textLanguage === "English") {
            this.text.push("Are you sure? (this will also reset your custom controls)");
            this.text.push("No");
            this.text.push("Yes");
        }
        else if (MyGame.textLanguage === "Spanish") {
            this.text.push("¿Esta bien? (tambien a reiniciar su controls)");
            this.text.push("No");
            this.text.push("Sí");
        }
    }
}

function makeSoundLoop(_snd) {
    _snd.addEventListener("ended", function() {
        _snd.currentTime = 0;
        _snd.play();
    });
}
