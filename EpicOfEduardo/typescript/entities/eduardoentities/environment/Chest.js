/* global Entity KeyManager */
class Chest extends Entity {
    constructor(_x, _y, _c) {
        super(_x, _y);
        this.setType("platform");
        this.width = 44;
        this.offsetX = 2;
        this.offsetY = 2;
        this.contents = _c;
        this.opened = 0;
        this.mask = new HitBox(_x, _y, this.width, 16);
        this.image = new GameSprite(MyGame.imgs["chest"], 48, 48);
    }
    update(_dt) {
        this.image.currentFrame = this.opened;
        if (this.opened === 1) {
            return;
        }
        let player = this.collideTypes("player", this.x, this.y);
        if (player && this.opened === 0) {
            let dir = -1;
            if (player.faceRight) {
                dir = 1;
            }
            if (KeyManager.pressed(config.actionKey)) {
                this.opened = 1;
                if (this.contents === 0) {
                    this.world.addEntity(new Heart(player.x + 60 * dir, this.y));
                }
                else if (this.contents <= 12) {
                    this.world.addEntity(new PowerUp(player.x + 60 * dir, this.y, this.contents));
                }
            }
        }
    }
}
