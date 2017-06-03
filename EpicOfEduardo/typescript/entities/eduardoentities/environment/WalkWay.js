/* global DoorWay MyGame LevelWorld */
class WalkWay extends DoorWay {
    constructor(_s, _x, _y, _tx, _ty, _w, _h) {
        super(_s, _x, _y, _tx, _ty);
        this.setHitBox(_w, _h);
    }
    update() {
        if (this.collideTypes("player", this.x, this.y)) {
            if (this.stage === "cursed_mountain" || this.stage === "abandoned_town") {
                MyGame.color = "#87CEFA";
            }
            this.world.addEntity(new ScreenTransition(MyGame.camera.x, MyGame.camera.y, new LevelWorld(this.stage, this.targetX, this.targetY)));
        }
    }
}
