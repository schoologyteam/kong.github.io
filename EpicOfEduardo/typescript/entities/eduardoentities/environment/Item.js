/* global Entity */
class Item extends Entity {
    constructor(_x, _y) {
        super(_x, _y);
        this.setType("item");
    }
    /**
     * Override this:
     * Called when the item is collected.
     */
    collect() {
        this.destroy();
    }
}
