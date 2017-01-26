/* global Entity GameSprite */
class SpringBlock extends Entity {
    constructor(_x, _y) {
        super(_x, _y);
        this.setHitBox(64, 43, 0, 7);
        this.image = new GameSprite(MyGame.imgs["spring"], 64, 50);
        this.image.addAnimation("bounce", [0, 1, 2]);
        this.setType("wall");
    }
    update(_dt) {
        this.image.updateAnimation(_dt);
        let player = this.collideTypes("player", this.x, this.y - 1);
        if (player) {
            player.springJump(KeyManager.held("Up") || KeyManager.held("z") || KeyManager.held("ArrowUp"));
            this.image.playAnimation("bounce", 20, false);
        }
    }
}
