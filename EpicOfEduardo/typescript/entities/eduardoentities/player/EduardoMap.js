/* global Entity GameSprite MyGame HitBox KeyManager OverWorld */
class EduardoMap extends Entity {
    constructor(_x, _y) {
        super(_x, _y);
        this.sprite = new GameSprite(MyGame.imgs["eddy_map"], 32, 32);
        this.sprite.addAnimation("walk", [0, 1]);
        this.sprite.playAnimation("walk", 8);
        this.setType("player");
        this.image = this.sprite;
        this.mask = new HitBox(this.x, this.y, 24, 24);
        this.cameFrom = "north";
        this.moving = false;
        this.stopping = false;
        this.countDown = 0;
    }
    update(_dt) {
        if (this.x <= 184 * 2) {
            this.world.camera.x = 0;
        }
        else if (this.x >= this.world.width - 200 * 2) {
            this.world.camera.x = this.world.width - 384 * 2;
        }
        else {
            this.world.camera.x = this.x - 184 * 2;
        }
        if (this.y <= 136 * 2) {
            this.world.camera.y = 0;
        }
        else if (this.y >= this.world.height - 152 * 2) {
            this.world.camera.y = this.world.height - 288 * 2;
        }
        else {
            this.world.camera.y = this.y - 136 * 2;
        }
        this.sprite.updateAnimation(_dt);
        if (this.moving) {
            if (this.cameFrom == "north") {
                this.y += 240 * _dt;
            }
            else if (this.cameFrom == "south") {
                this.y -= 240 * _dt;
            }
            else if (this.cameFrom == "west") {
                this.x += 240 * _dt;
            }
            else if (this.cameFrom == "east") {
                this.x -= 240 * _dt;
            }
            this.countDown -= _dt;
            this.mask.update(this.x + 4, this.y + 4);
            let node = this.collideTypes("node", this.x, this.y);
            if (node && this.countDown <= 0) {
                if (this.stopping) {
                    this.x = node.x - 8;
                    this.y = node.y - 8;
                    this.moving = false;
                    node.setReturnPath(this.cameFrom);
                    OverWorld.playerPoint.setP(this.x, this.y);
                    this.stopping = false;
                }
                else {
                    this.countDown = 0.05;
                    this.stopping = true;
                }
            }
        }
        else {
            let node = this.collideTypes("node", this.x, this.y);
            if (KeyManager.held("ArrowUp") || KeyManager.held("Up")) {
                if (node.isValidPath("ArrowUp")) {
                    this.countDown = 0.12;
                    this.cameFrom = "south";
                    this.moving = true;
                }
            }
            if (KeyManager.held("ArrowDown") || KeyManager.held("Down")) {
                if (node.isValidPath("ArrowDown")) {
                    this.countDown = 0.12;
                    this.cameFrom = "north";
                    this.moving = true;
                }
            }
            if (KeyManager.held("ArrowLeft") || KeyManager.held("Left")) {
                if (node.isValidPath("ArrowLeft")) {
                    this.countDown = 0.12;
                    this.cameFrom = "east";
                    this.moving = true;
                }
            }
            if (KeyManager.held("ArrowRight") || KeyManager.held("Right")) {
                if (node.isValidPath("ArrowRight")) {
                    this.countDown = 0.12;
                    this.cameFrom = "west";
                    this.moving = true;
                }
            }
            if (KeyManager.pressed("Enter") || KeyManager.pressed("x")) {
                node.enterLevel();
            }
            if (KeyManager.pressed("Escape")) {
                MyGame.setWorld(new PauseWorld(this.world));
            }
        }
    }
}
