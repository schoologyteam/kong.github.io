/* global Entity GameSprite World MyGame GameImage KeyManager OverWorld*/
class MenuWorld extends World {
    constructor() {
        super();
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
        this.loadLanguageSelector();
    }
    update(_dt) {
        super.update(_dt);
        if (KeyManager.pressed("ArrowUp") || KeyManager.pressed("ArrowLeft") || KeyManager.pressed("Up")) {
            this.choice -= 1;
            if (this.choice < 0) {
                this.choice = this.choiceMax;
            }
        }
        if (KeyManager.pressed("ArrowDown") || KeyManager.pressed("ArrowRight") || KeyManager.pressed("Down")) {
            this.choice += 1;
            if (this.choice > this.choiceMax) {
                this.choice = 0;
            }
        }
        if (KeyManager.pressed("x") || KeyManager.pressed("Enter")) {
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
                        MyGame.setWorld(new LevelWorld("cave", 64, 409));
                        MyGame.color = "#121218";
                        Eduardo.currentLevel = "Mystic Cave";
                        Eduardo.money = 0;
                        Eduardo.power = 0;
                        return;
                    }
                    MyGame.setWorld(new OverWorld());
                }
                else if (this.choice === 1) {
                    this.loadCredits(1);
                }
                else {
                    this.loadLanguageSelector();
                }
            }
            else {
                this.loadMain();
            }
        }
        if ((this.state === 2)) {
            if (KeyManager.pressed("ArrowLeft") || KeyManager.pressed("ArrowUp") || KeyManager.pressed("Left")) {
                this.loadCredits(this.creditsPage - 1);
            }
            else if (KeyManager.pressed("ArrowRight") || KeyManager.pressed("ArrowDown") || KeyManager.pressed("Right")) {
                this.loadCredits(this.creditsPage + 1);
            }
        }
        this.arrow.y = (67 + 25 * this.choice) * 2;
    }
    render(_g) {
        super.render(_g);
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
        }
    }
    loadMain() {
        this.text = new Array();
        this.state = 1;
        this.choice = 0;
        this.choiceMax = 2;
        this.arrow.visible = true;
        this.nextArrow.visible = false;
        this.backArrow.visible = false;
        if (MyGame.textLanguage == "English") {
            this.text.push("Play Game");
            this.text.push("Credits");
            this.text.push("Erase Data");
            this.title.image = new GameImage(MyGame.imgs["title_english"]);
        }
        else if (MyGame.textLanguage == "Spanish") {
            this.text.push("Juega el Juego");
            this.text.push("Los Créditos");
            this.text.push("Reiniciar");
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
            }
            else {
                this.text.push("Programación");
            }
        }
        else if (_p === 2) {
            if (MyGame.textLanguage === "English") {
                this.text.push("Art");
            }
            else {
                this.text.push("Arte");
            }
        }
        else if (_p === 3) {
            if (MyGame.textLanguage === "English") {
                this.text.push("Music");
            }
            else {
                this.text.push("Música");
            }
        }
        else {
            this.loadMain();
        }
    }
}
