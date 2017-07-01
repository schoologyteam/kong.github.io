/* global Entity GameSprite MyGame Eduardo */
class BubbleSwitch extends Entity {
    constructor(_x, _y, _c) {
        super(_x, _y);
        this.name = _c;
        this.pressed = false;
        this.image = new GameSprite(MyGame.imgs["bubble_" + _c], 32, 16);
        this.mask = new HitBox(_x, _y, 32, 16);
        this.setType("switch");
    }
    update(_dt) {
        if (!this.pressed) {
            if (this.collideTypes("player", this.x, this.y)) {
                this.pressed = true;
                this.image.currentFrame = 1;
            }
        }
    }
    getSwitched() {
        return this.pressed;
    }
}
/** BossGate */
class BossGate extends BubbleSwitch {
    constructor(_x, _y) {
        super(_x, _y, "red");
        this.pressed = true;
        this.frame = new GameSprite(MyGame.imgs["icons"], 48, 48);
        this.ruby = new GameSprite(MyGame.imgs["gem_ruby"], 32, 32);
        this.ruby.addAnimation("glow", [0, 1, 2, 1, 0]);
        this.ruby.playAnimation("glow", 18);
        this.amethyst = new GameSprite(MyGame.imgs["amethyst"], 32, 32);
        this.amethyst.addAnimation("glow", [0, 1, 2, 1, 0]);
        this.amethyst.playAnimation("glow", 18);
        this.topaz = new GameSprite(MyGame.imgs["gem_topaz"], 48, 48);
        this.topaz.addAnimation("glow", [0, 1, 2, 1, 0]);
        this.topaz.playAnimation("glow", 18);
        this.emerald = new GameSprite(MyGame.imgs["emerald"], 48, 48);
        this.emerald.addAnimation("glow", [0, 1, 2, 1, 0]);
        this.emerald.playAnimation("glow", 18);
        this.saphire = new GameSprite(MyGame.imgs["gem_saphire"], 48, 48);
        this.saphire.addAnimation("glow", [0, 1, 2, 1, 0]);
        this.saphire.playAnimation("glow", 18);
    }
    update(_dt) {
        this.ruby.updateAnimation(_dt);
        this.amethyst.updateAnimation(_dt);
        this.emerald.updateAnimation(_dt);
        this.topaz.updateAnimation(_dt);
        this.saphire.updateAnimation(_dt);
        if (!this.player) {
            this.player = this.world.findByName("Eduardo");
        }
        if (Eduardo.levelCleared["City's Secret"] && Eduardo.levelCleared["Simon's Nase"] && Eduardo.levelCleared["Ice Peak Cavern"] && Eduardo.levelCleared["Mazey Cave 1"] && Eduardo.levelCleared["Mazey Cave 2"]) {
            if (this.pressed && this.player.x > this.x) {
                this.pressed = false;
            }
        }
    }
    render(_g) {
        this.frame.render(_g, this.x, this.y);
        this.frame.render(_g, this.x+48, this.y);
        this.frame.render(_g, this.x+96, this.y);
        this.frame.render(_g, this.x+144, this.y);
        this.frame.render(_g, this.x+192, this.y);
        if (Eduardo.levelCleared["Mazey Cave 1"]) {
            this.topaz.render(_g, this.x, this.y);
        }
        if (Eduardo.levelCleared["City's Secret"]) {
            this.ruby.render(_g, this.x + 48 + 8, this.y + 8);
        }
        if (Eduardo.levelCleared["Mazey Cave 2"]) {
            this.emerald.render(_g, this.x + 96, this.y);
        }
        if (Eduardo.levelCleared["Ice Peak Cavern"]) {
            this.amethyst.render(_g, this.x + 144 + 8, this.y + 8);
        }
        if (Eduardo.levelCleared["Simon's Nase"]) {
            this.saphire.render(_g, this.x + 192, this.y);
        }
    }
}