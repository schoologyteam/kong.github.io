/* global Item GameImage Eduardo MyGame */
class GoalPost extends Item {
    constructor(_x, _y) {
        super(_x, _y);
        this.image = new GameImage(MyGame.imgs["goal_post"]);
        this.setHitBox(60, 300, 0, -60);
    }
    collect() {
        Eduardo.levelCleared[Eduardo.currentLevel] = true;
        Eduardo.hearts += 2;
        this.world.addEntity(new ScreenTransition(MyGame.camera.x, MyGame.camera.y, new OverWorld()));
    }
}
