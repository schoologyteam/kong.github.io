/*global BaseMobile HitBox */
class BossWeakSpot extends BaseMobile {
    constructor(_x, _y, _w, _h, _cbs, _wkns, _p) {
        super(_x, _y);
        this.setHitBox(_w, _h);
        this.canBeStomped = _cbs;
        this.weakness = _wkns;
        this.owner = _p;
        this.setType("enemy");
    }
    onCollision(dmg, _type) {
        if (_type === "stomp" && !this.canBeStomped) {
            return;
        }
        else {
            this.owner.forwardDamage(_type, (_type === this.weakness));
        }
    }
}