/* global Entity GameSprite GameImage */
class HUD extends Entity {
    constructor(_x, _y) {
        super(_x, _y);
        this.powerUpIcon = new GameSprite(MyGame.imgs["icons"], 48, 48);
        this.coinIcon = new GameSprite(MyGame.imgs["silver"], 28, 28);
        this.powerUpIcon.currentFrame = Eduardo.power;
        this.hearts = new Array(Eduardo.maxHearts / 2);
        for (let i = 0; i < this.hearts.length; i++) {
            this.hearts[i] = new GameSprite(MyGame.imgs["heart"], 48, 48);
        }
    }
    update(_dt) {
        this.powerUpIcon.currentFrame = Eduardo.power;
        for (let i = 0; i < this.hearts.length; i++) {
            if ((1 + i) * 2 <= Eduardo.hearts) {
                this.hearts[i].currentFrame = 0;
            }
            else if (i * 2 >= Eduardo.hearts) {
                this.hearts[i].currentFrame = 2;
            }
            else {
                this.hearts[i].currentFrame = 1;
            }
        }
        this.x = MyGame.camera.x;
        this.y = MyGame.camera.y;
        if (!Eduardo.money) {
            Eduardo.money = 0;
        }
    }
    render(g) {
        this.coinIcon.render(g, this.x + 470, this.y + 12);
        this.powerUpIcon.render(g, this.x + 12, this.y + 12);
        for (let i = 0; i < this.hearts.length; i++) {
            this.hearts[i].render(g, this.x + 240 + 24 * i, this.y + 20);
        }
        g.text(Eduardo.money.toString(), 520, 48);
        g.text(Eduardo.currentLevel, 30, 80);
    }
}
