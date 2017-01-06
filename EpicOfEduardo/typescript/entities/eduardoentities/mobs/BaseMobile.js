/* global Entity */
class BaseMobile extends Entity {
    constructor(_x, _y) {
        super(_x, _y);
        this.alive = true;
        this.gravity = 0;
        this.drag = 0;
        this.friction = 0;
        this.invFrames = 0;
        this.hitStun = 0;
        this.maxSpeed = 4;
        this.health = 1;
        this.faceRight = false;
    }
    /**
     * Override this: Called when the entity needs to take collision damage
     * @param dmg   the amount of damage
     * @param _type the type of damage
     */
    onCollision(dmg, _type) {
    }
    checkOnGround() {
        this.onGround = false;
        if (this.getYSpeed() >= 0) {
            if (this.collideTypes("wall", this.x, this.y + 1)) {
                this.onGround = true;
            }
            else if (this.collideTypes("platform", this.x, this.y + 1) && !this.collideTypes("platform", this.x, this.y)) {
                this.onGround = true;
            }
        }
        return this.onGround;
    }
    mobileMove() {
        if (this.hitStun > 0) {
            this.hitStun--;
            return;
        }
        this.moveBy(this.getXSpeed(), 0, "wall");
        if (this.getYSpeed() < 0) {
            this.moveBy(0, this.getYSpeed(), "wall");
        }
        else {
            if (!this.collideTypes("platform", this.x, this.y)) {
                this.moveBy(0, this.getYSpeed(), ["wall", "platform"]);
            }
            else {
                this.moveBy(0, this.getYSpeed(), "wall");
            }
        }
        if (this.mask) {
            this.mask.update(this.x + this.offsetX, this.y + this.offsetY);
        }
    }
}
