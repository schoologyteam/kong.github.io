/* global Entity */
class Hazard extends Entity {
    constructor(_x, _y) {
        super(_x, _y);
        this.setType("hazard");
    }
    smash(_s) {
        if (_s == this.weakness) {
            this.destroy();
        }
    }
}
