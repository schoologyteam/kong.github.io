/* global Entity HitBox KeyManager MyGame LevelWorld */
class DoorWay extends Entity {
    constructor(_s, _x, _y, _tx, _ty) {
        super(_x, _y);
        this.mask = new HitBox(_x, _y, 48, 48);
        this.targetX = _tx;
        this.targetY = _ty;
        if (_s == "0") {
            this.stage = "cave";
        }
        else if (_s == "1") {
            this.stage = "cave_2";
        }
        else if (_s == 2) {
            this.stage = "pretty_plains_1";
        }
        else if (_s == 3) {
            this.stage = "pretty_plains_2";
        }
        else if (_s == 4) {
            this.stage = "city_bridge";
        }
        else if (_s == 5) {
            this.stage = "bridge_warehouse";
        }
        else if (_s == 6) {
            this.stage = "butter_beach";
        }
        else if (_s == 7) {
            this.stage = "butter_beach_2";
        }
        else if (_s == 8) {
            this.stage = "outskirts";
        }
        else if (_s == 9) {
            this.stage = "outskirts_warehouse";
        }
        else if (_s == 10) {
            this.stage = "sugar_meadows";
        }
        else if (_s == 11) {
            this.stage = "above_stonehenge";
        }
        else if (_s == 12) {
            this.stage = "cursed_mountain";
        }
        else if (_s == 13) {
            this.stage = "cursed_cave";
        }
        else if (_s == 14) {
            this.stage = "rocky_river_s1";
        }
        else if (_s == 15) {
            this.stage = "rocky_river_s2";
        }
        else if (_s == 16) {
            this.stage = "mudboots_path_1";
        }
        else if (_s == 17) {
            this.stage = "mudboots_path_2";
        }
        else if (_s == 18) {
            this.stage = "mansion_foyer";
        }
        else if (_s == 19) {
            this.stage = "mansion_normal";
        }
        else if (_s == 20) {
            this.stage = "mansion_glide";
        }
        else if (_s == 21) {
            this.stage = "mansion_fire";
        }
        else if (_s == 22) {
            this.stage = "mansion_jump";
        }
        else if (_s == 23) {
            this.stage = "mansion_hammer";
        }
        else if (_s == 24) {
            this.stage = "simons_swamp";
        }
        else if (_s == 25) {
            this.stage = "simons_secret";
        }
    }
    update() {
        if (this.collideTypes("player", this.x, this.y)) {
            if (KeyManager.pressed("x") || KeyManager.pressed("ArrowUp")) {
                if (this.stage === "cursed_mountain") {
                    MyGame.color = "#87CEFA";
                }
                if (this.stage === "cursed_cave") {
                    MyGame.color = "#191213";
                }
                MyGame.setWorld(new LevelWorld(this.stage, this.targetX, this.targetY));
            }
        }
    }
}
