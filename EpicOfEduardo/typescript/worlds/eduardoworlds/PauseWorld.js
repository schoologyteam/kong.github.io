/* global World MyGame Entity GameSprite KeyManager MenuWorld */
class PauseWorld extends World {
    constructor(_backWorld) {
        super();
        this.backWorld = _backWorld;
        this.menuText = new Array();
        this.selectorIcon = new Entity(190, 0, new GameSprite(MyGame.imgs["stock_arrows"], 48, 48));
        this.addEntity(this.selectorIcon);
        this.choiceMax = 1;
        this.choice = 0;
        if (MyGame.textLanguage == "English") {
            this.menuText.push("Continue");
            this.menuText.push("Main Menu");
        }
        else if (MyGame.textLanguage == "Spanish") {
            this.menuText.push("Continuar");
            this.menuText.push("Salir");
        }
    }
    update(_dt) {
        MyGame.camera.setP(0, 0);
        super.update(_dt);
        if (KeyManager.pressed("ArrowUp") || KeyManager.pressed("ArrowRight")) {
            this.choice -= 1;
            if (this.choice < 0) {
                this.choice = this.choiceMax;
            }
        }
        if (KeyManager.pressed("ArrowDown") || KeyManager.pressed("ArrowLeft")) {
            this.choice += 1;
            if (this.choice > this.choiceMax) {
                this.choice = 0;
            }
        }
        if (KeyManager.pressed("x") || KeyManager.pressed("Enter")) {
            if (this.choice == 0) {
                MyGame.setWorld(this.backWorld);
            }
            else if (this.choice == 1) {
                MyGame.setWorld(new MenuWorld());
            }
        }
        if (KeyManager.pressed("Escape")) {
            MyGame.setWorld(this.backWorld);
        }
        this.selectorIcon.y = 110 + 70 * this.choice;
    }
    render(_g) {
        super.render(_g);
        for (let i = 0; i < 2; i++) {
            _g.text(this.menuText[i], 250, 146 + 70 * i);
        }
    }
}
