/* global BubbleSwitch GameSprite */
class TimerSwitch extends BubbleSwitch {
    constructor(_x, _y, _c) {
        super(_x, _y, _c);
        this.image = new GameSprite(MyGame.imgs["timer_" + _c], 48, 32);
        if (_c === "red") {
            this.index = 0;
        }
        else if (_c === "blue") {
            this.index = 1;
        }
        else if (_c === "green") {
            this.index = 2;
        }
        else {
            this.index = 3;
        }
        if (!TimerSwitch.turnedOn) {
            TimerSwitch.turnedOn = new Array(false, false, false, false);
        }
        TimerSwitch.turnedOn[this.index] = false;
        this.image.addAnimation("time", [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 8]);
        this.image.addAnimation("rest", [8]);
        this.ticking = false;
        this.timer = 0;
        this.image.playAnimation("rest");
        this.setHitBox(48, 32);
    }
    update(_dt) {
        this.image.updateAnimation(_dt);
        if (this.ticking) {
            this.timer--;
            if (this.timer <= 0) {
                this.ticking = false;
                TimerSwitch.turnedOn[this.index] = false;
                this.image.playAnimation("rest");
                MyGame.snds["switch_off"].pause();
                MyGame.snds["switch_off"].currentTime = 0;
                MyGame.snds["switch_off"].play();
            }
        }
        if (this.collideTypes("player", this.x, this.y)) {
            this.image.stopAnimation();
            this.image.playAnimation("time", 1.95, false);
            if (!this.ticking) {
                MyGame.snds["switch_on"].pause();
                MyGame.snds["switch_on"].currentTime = 0;
                MyGame.snds["switch_on"].play();
            }
            this.ticking = true;
            this.timer = 300;
            TimerSwitch.turnedOn[this.index] = true;
        }
    }
    getSwitched() {
        return TimerSwitch.turnedOn[this.index];
    }
}
