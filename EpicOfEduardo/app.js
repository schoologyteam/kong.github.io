/* global KeyManager Graphics TiledImage World Eduardo localStorage Image MenuWorld MouseManager navigator */
class MyGame {
    constructor(width = 768, height = 576, scale = 1) {
        MyGame.WIDTH = width;
        MyGame.HEIGHT = height;
        MyGame.SCALE = scale;
        this.camera = new Point(0, 0);
        MyGame.camera = this.camera; // default camera
        config.keyUp = "i";
        config.keyDown = "k";
        config.keyLeft = "j";
        config.keyRight = "l";
        config.actionKey = "x";
        config.jumpKey = "z";
        config.pauseKey = "p";
        config.muteKey = "m";
        config.keyMapper = null;
        this.keyManager = new KeyManager();
        navigator.sayswho= (function(){
            var N= navigator.appName, ua= navigator.userAgent, tem;
            var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
            if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
            M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
            return M;
        })();
        let browser = "f";
        if (navigator.sayswho[0] == "Firefox") {
	        browser="f";
        }
        else if (navigator.sayswho[0] == "Chrome") {
	        browser="c";
        }
        else if (navigator.sayswho[0] == "Safari") {
	        browser="s";
        }
        else  if (navigator.sayswho[0] == "Microsoft") {
	        browser="m";
        }
        this.keyManager = new KeyManager();
        this.mouseManager = new MouseManager(browser);
        this.g = new Graphics(width, height, scale);
        this.state = 1;
        this.imgCount = 0;
        this.imgsToLoad = 0;
        this.lvlCount = 0;
        this.lvlsToLoad = 0;
        this.gameLoop = () => {
            if (this.running) {
                this.now = Date.now();
                this.delta = this.now - this.lastTime;
                this.timer += this.delta;
                this.lastTime = this.now;
                while (this.timer >= this.timePerTick) {
                    this.update(this.timePerTick / 1000);
                    this.timer -= this.timePerTick;
                    if (this.timer < this.timePerTick) {
                        this.render();
                    }
                }
            }
            requestAnimationFrame((this.gameLoop));
        };
    }
    start() {
        this.onInit();
        this.timePerTick = 1000 / 60;
        this.running = true;
        this.now = Date.now();
        this.delta = 0;
        this.timer = 0;
        this.lastTime = this.now;
        this.gameLoop();
    }
    /**
     * Override this to set your own world and other variables.
     */
    onInit() {
        MyGame.world = new MenuWorld();
    }
    update(_dt) {
        this.keyManager.preUpdate(config.keyUp);
        this.keyManager.preUpdate(config.keyDown);
        this.keyManager.preUpdate(config.keyLeft);
        this.keyManager.preUpdate(config.keyRight);
        this.keyManager.preUpdate(config.actionKey);
        this.keyManager.preUpdate(config.jumpKey);
        this.keyManager.preUpdate(config.pauseKey);
        this.keyManager.preUpdate(config.muteKey);
        KeyManager.preUpdate("ArrowUp");
        KeyManager.preUpdate("ArrowDown");
        KeyManager.preUpdate("ArrowLeft");
        KeyManager.preUpdate("ArrowRight");
        KeyManager.preUpdate("Up");
        KeyManager.preUpdate("Down");
        KeyManager.preUpdate("Left");
        KeyManager.preUpdate("Right");
        KeyManager.preUpdate("Enter");
        KeyManager.preUpdate("Escape");
        MouseManager.preUpdate();
        if (MyGame.world) {
            if (KeyManager.pressed(config.muteKey)) {
                if (this.muted) {
                    this.unmute();
                }
                else {
                    this.mute();
                }
            }
            MyGame.world.update(_dt);
            MyGame.world.cleanup();
        }
        this.keyManager.postUpdate(config.keyUp);
        this.keyManager.postUpdate(config.keyDown);
        this.keyManager.postUpdate(config.keyLeft);
        this.keyManager.postUpdate(config.keyRight);
        this.keyManager.postUpdate(config.actionKey);
        this.keyManager.postUpdate(config.jumpKey);
        this.keyManager.postUpdate(config.pauseKey);
        this.keyManager.postUpdate(config.muteKey);
        KeyManager.postUpdate("ArrowUp");
        KeyManager.postUpdate("ArrowDown");
        KeyManager.postUpdate("ArrowLeft");
        KeyManager.postUpdate("ArrowRight");
        KeyManager.postUpdate("Up");
        KeyManager.postUpdate("Down");
        KeyManager.postUpdate("Left");
        KeyManager.postUpdate("Right");
        KeyManager.postUpdate("Enter");
        KeyManager.postUpdate("Escape");
        MouseManager.postUpdate();
    }
    render() {
        this.g.setCamera(MyGame.camera);
        this.g.clear();
        this.g.rectangle(MyGame.camera.x, MyGame.camera.y, MyGame.WIDTH, MyGame.HEIGHT, MyGame.color);
        if (MyGame.world) {
            MyGame.world.render(this.g);
        }
    }
    /**
     * Adds an image to the game and stores it as an html Image element
     * @param _key  The name of the image to reference in game
     * @param _path The relative filepath of the image.
     */
    addImage(_key, _path) {
        MyGame.imgs[_key] = new Image();
        MyGame.imgs[_key].onload = () => this.imageLoaded();
        MyGame.imgs[_key].src = _path;
        this.imgsToLoad++;
    }
    addSound(_key, _path) {
        MyGame.snds[_key] = new Audio();
        MyGame.snds[_key].src = _path;
    }
    /**
     * Adds a level to the game and stores as an xml request
     * @param _key
     * @param _path
     */
    addLevelXML(_key, _path) {
        MyGame.maps[_key] = new XMLHttpRequest();
        MyGame.maps[_key].onreadystatechange = () => this.levelLoaded(_key);
        MyGame.maps[_key].open("GET", _path);
        MyGame.maps[_key].responseType = "document";
        MyGame.maps[_key].send();
        this.lvlsToLoad++;
    }
    /**
     * Override This: Loads in images and levels.
     */
    loadImages() {
        this.addSound("City", "./assets/snds/Night_Streets.ogg");
        this.addSound("Snow", "./assets/snds/On_Your_Feet_Soldier.ogg");
        this.addSound("Title", "./assets/snds/The_Onset.ogg");
        //images
        this.addImage("alligator", "./assets/gfx/alligator_72x18x12.png");
        this.addImage("amethyst", "./assets/gfx/amethyst_16x16x3.png");
        this.addImage("base_tiles", "./assets/gfx/base_tiles_24x24.png");
        this.addImage("ball", "./assets/gfx/ball_16x16.png");
        this.addImage("bat", "./assets/gfx/bat_24x15x4.png");
        this.addImage("block_blue", "./assets/gfx/blue_toggle_block_24x24x2.png");
        this.addImage("block_green", "./assets/gfx/green_toggle_block_24x24x2.png");
        this.addImage("block_red", "./assets/gfx/red_toggle_block_24x24x2.png");
        this.addImage("block_yellow", "./assets/gfx/yellow_toggle_block_24x24x2.png");
        this.addImage("bubble_blue", "./assets/gfx/blue_button_16x8x2.png");
        this.addImage("bubble_green", "./assets/gfx/green_button_16x8x2.png");
        this.addImage("bubble_red", "./assets/gfx/red_button_16x8x2.png");
        this.addImage("bubble_yellow", "./assets/gfx/yellow_button_16x8x2.png");
        this.addImage("buzzbot", "./assets/gfx/buzzbot_30x18x4.png");
        this.addImage("buzzbot_chaser", "./assets/gfx/buzzbot_chaser_30x18x4.png");
        this.addImage("buzzbot_shooter", "./assets/gfx/buzzbot_shooter_30x18x4.png");
        this.addImage("chest", "./assets/gfx/red_chest_24x24x2.png");
        this.addImage("clock_bot", "./assets/gfx/clock_bot_37x33x11.png");
        this.addImage("copper", "./assets/gfx/copper_coin_10x10x4.png");
        this.addImage("crumble_block", "./assets/gfx/crumbling_sandstone_24x24x5.png");
        this.addImage("dark_fairy", "./assets/gfx/dark_fairy_24x22x4.png");
        this.addImage("diamond", "./assets/gfx/diamond_24x24x3.png");
        this.addImage("decorations", "./assets/gfx/decorative_tiles_24x24.png");
        this.addImage("eddy", "./assets/gfx/eddy_31x35x28.png");
        this.addImage("eddy_boots", "./assets/gfx/eddy_boots_31x35x28.png");
        this.addImage("eddy_fire", "./assets/gfx/eddy_fire_31x35x28.png");
        this.addImage("eddy_hammer", "./assets/gfx/eddy_hammer_31x35x28.png");
        this.addImage("eddy_powder", "./assets/gfx/eddy_powder_31x35x28.png");
        this.addImage("eddy_wings", "./assets/gfx/eddy_wings_31x35x28.png");
        this.addImage("eddy_map", "./assets/gfx/eddy_overmap_16x16x2.png");
        this.addImage("emerald", "./assets/gfx/emerald_24x24x3.png");
        this.addImage("fire", "./assets/gfx/fire_particle_image_16x16x5.png");
        this.addImage("fire_2", "./assets/gfx/fire_particle_8x8.png");
        this.addImage("fire_hat", "./assets/gfx/red_hat_18x21x10.png");
        this.addImage("gem_ruby", "./assets/gfx/gemstone_16x16x3.png");
        this.addImage("gem_saphire", "./assets/gfx/saphire_24x24x3.png");
        this.addImage("gem_topaz", "./assets/gfx/topaz_24x24x3.png");
        this.addImage("glide_wings", "./assets/gfx/glide_wings_24x24.png");
        this.addImage("goal_post", "./assets/gfx/goal_post_30x120.png");
        this.addImage("gold", "./assets/gfx/gold_coin_24x24x3.png");
        this.addImage("hammer", "./assets/gfx/hammer_24x24.png");
        this.addImage("hammer_swing", "./assets/gfx/hammer_swing_20x17x6.png");
        this.addImage("heart", "./assets/gfx/heart_24x24x3.png");
        this.addImage("icons", "./assets/gfx/icons_24x24x13.png");
        this.addImage("jumpbot", "./assets/gfx/jumper_bot_20x32x8.png");
        this.addImage("lasher", "./assets/gfx/lasher_plant_32x48x13.png");
        this.addImage("lasher_vine", "./assets/gfx/lasher_vine_48x48x10.png");
        this.addImage("level_icons", "./assets/gfx/level_icons_8x8x8.png");
        this.addImage("lizard", "./assets/gfx/cave_lizard_24x9x13.png");
        this.addImage("lock", "./assets/gfx/lock_8x8x4.png");
        this.addImage("matchbox", "./assets/gfx/matchbox_24x24.png");
        this.addImage("magic_cage", "./assets/gfx/magic_cage_32x32.png");
        this.addImage("mk_turtle", "./assets/gfx/mk2_turtle_72x96x4.png");
        this.addImage("platform_blue", "./assets/gfx/blue_toggle_block_thin_24x8x2.png");
        this.addImage("platform_green", "./assets/gfx/green_toggle_block_thin_24x8x2.png");
        this.addImage("platform_red", "./assets/gfx/red_toggle_block_thin_24x8x2.png");
        this.addImage("platform_yellow", "./assets/gfx/yellow_toggle_block_thin_24x8x2.png");
        this.addImage("powder_can", "./assets/gfx/talcum_powder_can_24x24.png");
        this.addImage("projectiles", "./assets/gfx/projectiles_8x8x8.png");
        this.addImage("rock_wall", "./assets/gfx/breakable_rock_wall_24x24x3.png");
        this.addImage("shooter_plant", "./assets/gfx/shooter_plant_40x40x16.png");
        this.addImage("silver", "./assets/gfx/silver_coin_14x14x4.png");
        this.addImage("sign", "./assets/gfx/sign_24x24.png");
        this.addImage("slime", "./assets/gfx/slime_32x24x4.png");
        this.addImage("sparkles", "./assets/gfx/sparkle_particle_9x9.png");
        this.addImage("spring", "./assets/gfx/purple_spring_32x25x3.png");
        this.addImage("stone_spikes", "./assets/gfx/stone_spikes_24x16x2.png");
        this.addImage("TearOfTheStar", "./assets/gfx/tiles_by_TearOfTheStar_8x8.png");
        this.addImage("thorn_plant", "./assets/gfx/thorn_plant_27x18.png");
        this.addImage("timer_blue", "./assets/gfx/blue_timer_switch_24x16x9.png");
        this.addImage("timer_green", "./assets/gfx/green_timer_switch_24x16x9.png");
        this.addImage("timer_red", "./assets/gfx/red_timer_switch_24x16x9.png");
        this.addImage("timer_yellow", "./assets/gfx/yellow_timer_switch_24x16x9.png");
        this.addImage("title_background", "./assets/gfx/temp_title_background.png");
        this.addImage("title_english", "./assets/gfx/titlebanner_97x35.png");
        this.addImage("title_spanish", "./assets/gfx/titlespanish_97x35.png");
        this.addImage("stock_arrows", "./assets/gfx/stock_arrows_24x24x4.png");
        this.addImage("vibrant_crystal", "./assets/gfx/vibrant_crystal_24x24x8.png");
        this.addImage("wing_boots", "./assets/gfx/wing_boots_24x24.png");
        this.addImage("witch", "./assets/gfx/ruzicka_32x48x12.png");
        this.addImage("yeti", "./assets/gfx/yeti_48x48x12.png");
    }
    loadLevels() {
        this.addLevelXML("abandoned_shop", "./assets/levels/abandoned_shop.xml");
        this.addLevelXML("abandoned_town", "./assets/levels/abandoned_town.xml");
        this.addLevelXML("above_stonehenge", "./assets/levels/above_stonehenge.xml");
        this.addLevelXML("bridge_warehouse", "./assets/levels/bridge_warehouse.xml");
        this.addLevelXML("birch_cliffs", "./assets/levels/birch_cliffs.xml");
        this.addLevelXML("bitter_beach", "./assets/levels/bitter_beach_1.xml");
        this.addLevelXML("butter_beach", "./assets/levels/butter_beach_1.xml");
        this.addLevelXML("butter_beach_2", "./assets/levels/butter_beach_2.xml");
        this.addLevelXML("castle_1", "./assets/levels/castle_1.xml");
        this.addLevelXML("castle_2", "./assets/levels/castle_2.xml");
        this.addLevelXML("castle_abr", "./assets/levels/castle_abr.xml");
        this.addLevelXML("castle_entrance", "./assets/levels/castle_entrance.xml");
        this.addLevelXML("castle_jbr", "./assets/levels/castle_jbr.xml");
        this.addLevelXML("cave", "./assets/levels/cave.xml");
        this.addLevelXML("cave_2", "./assets/levels/cave_2.xml");
        this.addLevelXML("celler", "./assets/levels/celler.xml");
        this.addLevelXML("chapel_interior", "./assets/levels/chapel_interior.xml");
        this.addLevelXML("chapel_outside", "./assets/levels/chapel_outside.xml");
		this.addLevelXML("cold_lake", "./assets/levels/cold_lake.xml");
        this.addLevelXML("city_bridge", "./assets/levels/city_bridge.xml");
        this.addLevelXML("city_secret", "./assets/levels/city_secret.xml");
        this.addLevelXML("city_tower", "./assets/levels/city_tower.xml");
        this.addLevelXML("cursed_mountain", "./assets/levels/cursed_mountain.xml");
        this.addLevelXML("cursed_cave", "./assets/levels/cursed_cave.xml");
        this.addLevelXML("cutscene_1", "./assets/levels/cutscene_stage_1.xml");
        this.addLevelXML("cutscene_2", "./assets/levels/cutscene_stage_2.xml");
        this.addLevelXML("deep_woods", "./assets/levels/deep_woods.xml");
        this.addLevelXML("forest_view", "./assets/levels/forest_view.xml");
        this.addLevelXML("hidden_house", "./assets/levels/hidden_house.xml");
        this.addLevelXML("ice_cavern", "./assets/levels/ice_cavern.xml");
        this.addLevelXML("ice_path", "./assets/levels/ice_path.xml");
        this.addLevelXML("lakes_view", "./assets/levels/lakes_view.xml");
        this.addLevelXML("loggers_way", "./assets/levels/loggers_way.xml");
        this.addLevelXML("lost_woods_1", "./assets/levels/lost_woods_1.xml");
        this.addLevelXML("lost_woods_2", "./assets/levels/lost_woods_2.xml");
        this.addLevelXML("lost_woods_3", "./assets/levels/lost_woods_3.xml");
        this.addLevelXML("lost_woods_4", "./assets/levels/lost_woods_4.xml");
        this.addLevelXML("lost_woods_5", "./assets/levels/lost_woods_5.xml");
        this.addLevelXML("mansion_fire", "./assets/levels/mansion_fire_wing.xml");
        this.addLevelXML("mansion_foyer", "./assets/levels/mansion_foyer.xml");
        this.addLevelXML("mansion_glide", "./assets/levels/mansion_glide_wing.xml");
        this.addLevelXML("mansion_hammer", "./assets/levels/mansion_hammer_wing.xml");
        this.addLevelXML("mansion_jump", "./assets/levels/mansion_jump_wing.xml");
        this.addLevelXML("mansion_normal", "./assets/levels/mansion_normal_wing.xml");
        this.addLevelXML("maze_cave_1", "./assets/levels/maze_cave.xml");
        this.addLevelXML("maze_cave_2", "./assets/levels/maze_cave_2.xml");
        this.addLevelXML("maze_cave_3", "./assets/levels/maze_cave_3.xml");
        this.addLevelXML("maze_cave_4", "./assets/levels/maze_cave_4.xml");
        this.addLevelXML("maze_cave_two_1", "./assets/levels/maze_cave_two_1.xml");
        this.addLevelXML("maze_cave_two_2", "./assets/levels/maze_cave_two_2.xml");
        this.addLevelXML("mudboots_path_1", "./assets/levels/mudboots_path_1.xml");
        this.addLevelXML("mudboots_path_2", "./assets/levels/mudboots_path_2.xml");
        this.addLevelXML("mudboots_secret", "./assets/levels/mudboots_secret.xml");
        this.addLevelXML("outskirts", "./assets/levels/city_outskirts.xml");
        this.addLevelXML("outskirts_warehouse", "./assets/levels/outskirts_warehouse.xml");
        this.addLevelXML("over_map", "./assets/levels/over_map.xml");
        this.addLevelXML("passage_way", "./assets/levels/passage_way.xml");
        this.addLevelXML("pretty_plains_1", "./assets/levels/pretty_plains_1.xml");
        this.addLevelXML("pretty_plains_2", "./assets/levels/pretty_plains_2.xml");
        this.addLevelXML("river_bridge", "./assets/levels/river_bridge.xml");
        this.addLevelXML("rocky_river_s1", "./assets/levels/rocky_river_s1.xml");
        this.addLevelXML("rocky_river_s2", "./assets/levels/rocky_river_s2.xml");
        this.addLevelXML("shop", "./assets/levels/shop.xml");
        this.addLevelXML("simons_swamp", "./assets/levels/simons_swamp.xml");
        this.addLevelXML("simons_secret", "./assets/levels/simons_secret.xml");
        this.addLevelXML("snowdrift_forest", "./assets/levels/snowdrift_forest.xml");
        this.addLevelXML("sugar_meadows", "./assets/levels/sugar_meadows.xml");
        this.addLevelXML("swamps_end", "./assets/levels/swamps_end.xml");
        this.addLevelXML("turtle_arena", "./assets/levels/turtle_arena.xml");
        this.addLevelXML("whimsy_woodlands", "./assets/levels/whimsy_woodlands.xml");
        this.addLevelXML("witch_arena", "./assets/levels/witch_arena.xml");
        this.addLevelXML("yeti_arena", "./assets/levels/yeti_arena.xml");
    }
    imageLoaded() {
        this.imgCount += 1;
        console.log(this.imgCount, this.imgsToLoad);
        if (this.imgCount >= this.imgsToLoad && !this.running) {
            this.loadLevels();
        }
    }
    levelLoaded(s) {
        if (MyGame.maps[s].status == 200) {
            this.lvlCount += 1;
            if (this.lvlCount >= this.lvlsToLoad && !this.running) {
                this.start();
            }
        }
        else {
        }
    }
    static setWorld(_w) {
        MyGame.world = _w;
        _w.begin();
    }
    /* Saves game data to local storage, override to manage own data */
    static saveGame() {
        localStorage.setItem("Mystic Cave", Eduardo.levelCleared["Mystic Cave"].toString());
        localStorage.setItem("Pretty Plains", Eduardo.levelCleared["Pretty Plains"].toString());
        localStorage.setItem("Butter Beach", Eduardo.levelCleared["Butter Beach"].toString());
        localStorage.setItem("Bitter Beach", Eduardo.levelCleared["Bitter Beach"].toString());
        localStorage.setItem("Outskirts", Eduardo.levelCleared["Outskirts"].toString());
        localStorage.setItem("Coastown Bridge", Eduardo.levelCleared["Coastown Bridge"].toString());
        localStorage.setItem("City's Secret", Eduardo.levelCleared["City's Secret"].toString());
        localStorage.setItem("Whimsy Woodlands", Eduardo.levelCleared["Whimsy Woodlands"].toString());
        localStorage.setItem("Lost Manor", Eduardo.levelCleared["Lost Manor"].toString());
        localStorage.setItem("Deep Forest", Eduardo.levelCleared["Deep Forest"].toString());
        localStorage.setItem("Mazey Cave 1", Eduardo.levelCleared["Mazey Cave 1"].toString());
        localStorage.setItem("Sugar Meadows", Eduardo.levelCleared["Sugar Meadows"].toString());
        localStorage.setItem("Belle's Bridge", Eduardo.levelCleared["Belle's Bridge"].toString());
        localStorage.setItem("Lost Woods", Eduardo.levelCleared["Lost Woods"].toString());
        localStorage.setItem("Forest View", Eduardo.levelCleared["Forest View"].toString());
        localStorage.setItem("Mazey Cave 2", Eduardo.levelCleared["Mazey Cave 2"].toString());
        localStorage.setItem("Ice Peak Cavern", Eduardo.levelCleared["Ice Peak Cavern"].toString());
        localStorage.setItem("Ice Peak Path", Eduardo.levelCleared["Ice Peak Path"].toString());
        localStorage.setItem("Snowdrift Forest", Eduardo.levelCleared["Snowdrift Forest"].toString());
        localStorage.setItem("Logger's Way", Eduardo.levelCleared["Logger's Way"].toString());
        localStorage.setItem("Cold Lake", Eduardo.levelCleared["Cold Lake"].toString());
        localStorage.setItem("Rocky River", Eduardo.levelCleared["Rocky River"].toString());
        localStorage.setItem("Mudboot's Path", Eduardo.levelCleared["Mudboot's Path"].toString());
        localStorage.setItem("Mudboot's Secret", Eduardo.levelCleared["Mudboot's Secret"].toString());
        localStorage.setItem("Simon's Nase", Eduardo.levelCleared["Simon's Nase"].toString());
        localStorage.setItem("Simon's Swamp", Eduardo.levelCleared["Simon's Swamp"].toString());
        localStorage.setItem("Cursed Mountain", Eduardo.levelCleared["Cursed Mountain"].toString());
        localStorage.setItem("Fake Queen's Castle", Eduardo.levelCleared["Fake Queen's Castle"].toString());
        localStorage.setItem("Abandoned Town", Eduardo.levelCleared["Abandoned Town"].toString());
        Eduardo.levelCleared["Joel's Convenience"] = true;
        Eduardo.levelCleared["Riverside"] = true;
        Eduardo.levelCleared["Outpost"] = true;
        Eduardo.levelCleared["Snow Cabin"] = true;
        localStorage.setItem("power", Eduardo.power.toString());
        localStorage.setItem("money", Eduardo.money.toString());
        localStorage.setItem("keyUp", config.keyUp);
        localStorage.setItem("keyDown", config.keyDown);
        localStorage.setItem("keyLeft", config.keyLeft);
        localStorage.setItem("keyRight", config.keyRight);
        localStorage.setItem("actionKey", config.actionKey);
        localStorage.setItem("jumpKey", config.jumpKey);
        localStorage.setItem("pauseKey", config.pauseKey);
        localStorage.setItem("muteKey", config.muteKey);
        localStorage.setItem("owx", OverWorld.playerPoint.x);
        localStorage.setItem("owy", OverWorld.playerPoint.y);
        localStorage.setItem("owf", OverWorld.playerPoint.cameFrom);
    }
    /* loads game from local storage if availible */
    static loadGame() {
        if (localStorage.getItem("Mystic Cave")) {
            Eduardo.levelCleared["Mystic Cave"] = (localStorage.getItem("Mystic Cave") === "true");
            Eduardo.levelCleared["Pretty Plains"] = (localStorage.getItem("Pretty Plains") === "true");
            Eduardo.levelCleared["Butter Beach"] = (localStorage.getItem("Butter Beach") === "true");
            Eduardo.levelCleared["Bitter Beach"] = (localStorage.getItem("Bitter Beach") === "true");
            Eduardo.levelCleared["Outskirts"] = (localStorage.getItem("Outskirts") === "true");
            Eduardo.levelCleared["Coastown Bridge"] = (localStorage.getItem("Coastown Bridge") === "true");
            Eduardo.levelCleared["City's Secret"] = (localStorage.getItem("City's Secret") === "true");
            Eduardo.levelCleared["Whimsy Woodlands"] = (localStorage.getItem("") === "true");
            Eduardo.levelCleared["Lost Manor"] = (localStorage.getItem("Lost Manor") === "true");
            Eduardo.levelCleared["Deep Forest"] = (localStorage.getItem("Deep Forest") === "true");
            Eduardo.levelCleared["Mazey Cave 1"] = (localStorage.getItem("Mazey Cave 1") === "true");
            Eduardo.levelCleared["Sugar Meadows"] = (localStorage.getItem("Sugar Meadows") === "true");
            Eduardo.levelCleared["Birch Cliffs"] = (localStorage.getItem("Birch Cliffs") === "true");
            Eduardo.levelCleared["Belle's Bridge"] = (localStorage.getItem("Belle's Bridge") === "true");
            Eduardo.levelCleared["Lost Woods"] = (localStorage.getItem("Lost Woods") === "true");
            Eduardo.levelCleared["Forest View"] = (localStorage.getItem("Lost Manor") === "true");
            Eduardo.levelCleared["Mazey Cave 2"] = (localStorage.getItem("Mazey Cave 2") === "true");
            Eduardo.levelCleared["Ice Peak Cavern"] = (localStorage.getItem("Ice Peak Cavern") === "true");
            Eduardo.levelCleared["Ice Peak Path"] = (localStorage.getItem("Ice Peak Path") === "true");
            Eduardo.levelCleared["Snowdrift Forest"] = (localStorage.getItem("SnowDrift Forest") === "true");
            Eduardo.levelCleared["Logger's Way"] = (localStorage.getItem("Logger's Way") === "true");
            Eduardo.levelCleared["Cold Lake"] = (localStorage.getItem("Cold Lake") === "true");
            Eduardo.levelCleared["Rocky River"] = (localStorage.getItem("Rocky River") === "true");
            Eduardo.levelCleared["Mudboot's Path"] = (localStorage.getItem("Modboot's Path") === "true");
            Eduardo.levelCleared["Mudboot's Secret"] = (localStorage.getItem("Mudboot's Secret") === "true");
            Eduardo.levelCleared["Simon's Nase"] = (localStorage.getItem("Simon's Nase") === "true");
            Eduardo.levelCleared["Simon's Swamp"] = (localStorage.getItem("Simon's Swamp") === "true");
            Eduardo.levelCleared["Swamp's End"] = (localStorage.getItem("Swamp's End") === "true");
            Eduardo.levelCleared["Cursed Mountain"] = (localStorage.getItem("Cursed Mountain") === "true");
            Eduardo.levelCleared["Fake Queen's Castle"] = (localStorage.getItem("Fake Queen's Castle") === "true");
            Eduardo.levelCleared["Abandoned Town"] = (localStorage.getItem("Abandoned Town") === "true");
            Eduardo.levelCleared["Joel's Convenience"] = true;
            Eduardo.levelCleared["Riverside"] = true;
            Eduardo.levelCleared["Outpost"] = true;
            Eduardo.levelCleared["Snow Cabin"] = true;
            Eduardo.maxHearts = 6;
            if (Eduardo.levelCleared["City's Secret"]) {
                Eduardo.maxHearts += 2;
            }
            if (Eduardo.levelCleared["Ice Peak Cavern"]) {
                Eduardo.maxHearts += 2;
            }
            if (Eduardo.levelCleared["Fake Queen's Castle"]) {
                Eduardo.maxHearts += 2;
            }
            Eduardo.hearts = Eduardo.maxHearts;
            Eduardo.power = parseInt(localStorage.getItem("power"), 10);
            Eduardo.money = parseInt(localStorage.getItem("money"), 10);
            config.keyUp = localStorage.getItem("keyUp");
            config.keyDown = localStorage.getItem("keyDown");
            config.keyLeft = localStorage.getItem("keyLeft");
            config.keyRight = localStorage.getItem("keyRight");
            config.actionKey = localStorage.getItem("actionKey");
            config.jumpKey = localStorage.getItem("jumpKey");
            config.muteKey = localStorage.getItem("muteKey");
            config.pauseKey = localStorage.getItem("pauseKey");
            OverWorld.playerPoint.setP(parseInt(localStorage.getItem("owx"), 10), parseInt(localStorage.getItem("owy"), 10));
            OverWorld.cameFrom = localStorage.getItem("owf");
        }
        else {
            MyGame.reset();
        }
    }
    static reset() {
        Eduardo.levelCleared["Mystic Cave"] = false;
        Eduardo.levelCleared["Pretty Plains"] = false;
        Eduardo.levelCleared["Butter Beach"] = false;
        Eduardo.levelCleared["Bitter Beach"] = false;
        Eduardo.levelCleared["Outskirts"] = false;
        Eduardo.levelCleared["Coastown Bridge"] = false;
        Eduardo.levelCleared["City's Secret"] = false;
        Eduardo.levelCleared["Whimsy Woodlands"] = false;
        Eduardo.levelCleared["Lost Manor"] = false;
        Eduardo.levelCleared["Deep Forest"] = false;
        Eduardo.levelCleared["Mazey Cave 1"] = false;
        Eduardo.levelCleared["Sugar Meadows"] = false;
        Eduardo.levelCleared["Birch Cliffs"] = false;
        Eduardo.levelCleared["Belle's Bridge"] = false;
        Eduardo.levelCleared["Lost Woods"] = false;
        Eduardo.levelCleared["Forest View"] = false;
        Eduardo.levelCleared["Mazey Cave 2"] = false;
        Eduardo.levelCleared["Ice Peak Cavern"] = false;
        Eduardo.levelCleared["Ice Peak Path"] = false;
        Eduardo.levelCleared["Snowdrift Forest"] = false;
        Eduardo.levelCleared["Logger's Way"] = false;
        Eduardo.levelCleared["Cold Lake"] = false;
        Eduardo.levelCleared["Rocky River"] = false;
        Eduardo.levelCleared["Mudboot's Path"] = false;
        Eduardo.levelCleared["Mudboot's Secret"] = false;
        Eduardo.levelCleared["Simon's Nase"] = false;
        Eduardo.levelCleared["Simon's Swamp"] = false;
        Eduardo.levelCleared["Swamp's End"] = false;
        Eduardo.levelCleared["Cursed Mountain"] = false;
        Eduardo.levelCleared["Fake Queen's Castle"] = false;
        Eduardo.levelCleared["Abandoned Town"] = false;
        Eduardo.levelCleared["Joel's Convenience"] = true;
        Eduardo.levelCleared["Riverside"] = true;
        Eduardo.levelCleared["Outpost"] = true;
        Eduardo.levelCleared["Snow Cabin"] = true;
        Eduardo.maxHearts = 6;
        Eduardo.money = 0;
        Eduardo.power = 0;
        config.keyUp = "i";
        config.keyDown = "k";
        config.keyLeft = "j";
        config.keyRight = "l";
        config.actionKey = "x";
        config.jumpKey = "z";
        config.pauseKey = "p";
        config.muteKey = "m";
        OverWorld.playerPoint = new Point(68 * 2, 244 * 2);
    }
    mute() {
        for (let sound in MyGame.snds) {
            MyGame.snds[sound].volume = 0;
            MyGame.snds[sound].pause();
            MyGame.snds[sound].currentTime = 0;
        }
        this.muted = true;
    }
    unmute() {
        for (let sound in MyGame.snds) {
            MyGame.snds[sound].volume = 1;
        }
        MyGame.nowPlaying.play();
        this.muted = false;
    }
}
MyGame.loaded = false;
MyGame.WIDTH = 768;
MyGame.HEIGHT = 576;
MyGame.SCALE = 1;
MyGame.world = null;
MyGame.color = "#000000";
MyGame.imgs = [];
MyGame.maps = [];
MyGame.snds = [];
MyGame.nowPlaying = null;
MyGame.textLanguage = "English";
let config = {};
window.onload = () => {
    var myGame = new MyGame();
    myGame.imgCount = 0;
    myGame.loadImages();
};
//provided for convenience
class Point {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    setP(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
}
