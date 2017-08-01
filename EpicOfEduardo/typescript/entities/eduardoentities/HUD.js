/* global Entity GameSprite GameImage Eduardo MyGame */
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
        this.coinIcon.render(g, this.x + 510, this.y + 18);
        this.powerUpIcon.render(g, this.x + 12, this.y + 12);
        for (let i = 0; i < this.hearts.length; i++) {
            this.hearts[i].render(g, this.x + 240 + 24 * i, this.y + 20);
        }
        g.text(Eduardo.money.toString(), 539, 41, "#000000");
        g.text(Eduardo.money.toString(), 540, 42);
    }
}

/* ScreenTransition.js */
/**
 * Handles visual effect associated with going from one screen to antother.
 */
class ScreenTransition extends Entity {
    /**
     * Takes a coordinate and a world to transition to.
     */
    constructor(_x, _y, _world) {
        super(_x, _y);
        this.transition = () => {
            MyGame.setWorld(_world);
        };
        this.timer = 20;
        Eduardo.screenTransition = true;
    }
    update(_dt) {
        this.timer -= 1;
        if (this.timer <= 0) {
            this.transition();
            Eduardo.screenTransition = false;
        }
    }
    render(_g) {
        let relY = this.timer * MyGame.HEIGHT / 20;
        let relX = this.timer * MyGame.WIDTH / 20;
        _g.rectangle(this.x, this.y - relY, MyGame.WIDTH, MyGame.HEIGHT);
        _g.rectangle(this.x - relX, this.y, MyGame.WIDTH, MyGame.HEIGHT);
        _g.rectangle(this.x, this.y + relY, MyGame.WIDTH, MyGame.HEIGHT);
        _g.rectangle(this.x + relX, this.y, MyGame.WIDTH, MyGame.HEIGHT);
    }
}
Eduardo.screenTransition = false;
/* SoundIcon.js */
class SoundIcon extends Entity {
    constructor() {
        super(0, 0);
        this.x = MyGame.camera.x + MyGame.WIDTH - 30;
        this.y = MyGame.camera.y + 15;
        this.image = new GameSprite(MyGame.imgs["sound_icons"], 20, 20);
    }
    update(_dt) {
        if (!MyGame.nowPlaying.volume) {
            this.image.currentFrame = 1;
        }
        else {
            this.image.currentFrame = 0;
        }
        this.x = MyGame.camera.x + MyGame.WIDTH - 30;
        this.y = MyGame.camera.y + 15;
        let coords = MouseManager.getFilteredCoords();
        if (coords.x > this.x && coords.y > this.y && coords.x < this.x + 20 && coords.y < this.y + 20) {
            if (MouseManager.pressed()) {
                if (MyGame.nowPlaying.volume) {
                    for (let sound in MyGame.snds) {
                        MyGame.snds[sound].volume = 0;
                        MyGame.snds[sound].pause();
                        MyGame.snds[sound].currentTime = 0;
                    }
                }
                else {
                    for (let sound in MyGame.snds) {
                        MyGame.snds[sound].volume = 1;
                    }
                    if (MyGame.nowPlaying) {
                        MyGame.nowPlaying.play();
                    }
                }
            }
        }
    }
}