/* global World MyGame GridMask TiledImage Entity Eduardo DoorWay HitBox SpringBlock ToggleBlock CrumblingBlock TogglePlatform BubbleSwitch TimerSwitch ShopItem */
class LevelWorld extends World {
    constructor(_l, _x, _y) {
        super();
        this.level = _l;
        let mapXML = MyGame.maps[_l].responseXML;
        let elem = mapXML.getElementsByTagName("level");
        this.setSize(parseInt(elem[0].getAttribute("width"), 10) * 2, parseInt(elem[0].getAttribute("height"), 10) * 2);
        elem = mapXML.getElementsByTagName("walls");
        let wm = new GridMask(0, 0, 48, Math.ceil(this.width / 48), Math.ceil(this.height / 48));
        wm.loadFromString(elem[0].innerHTML);
        elem = mapXML.getElementsByTagName("walls_render");
        let wr = new TiledImage(MyGame.imgs["base_tiles"], Math.ceil(this.width / 48), Math.ceil(this.height / 48), 48);
        wr.loadFromString(elem[0].innerHTML);
        let walls = new Entity(0, 0, wr, wm);
        walls.setType("wall");
        this.addEntity(walls);
        elem = mapXML.getElementsByTagName("decoration");
        wr = new TiledImage(MyGame.imgs["decorations"], Math.ceil(this.width / 48), Math.ceil(this.height / 48), 48);
        wr.loadFromString(elem[0].innerHTML);
        this.addEntity(new Entity(0, 0, wr));
        elem = mapXML.getElementsByTagName("platform");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            let p = new Entity(x, y, null, new HitBox(x, y, parseInt(elem[i].getAttribute("width"), 10) * 2, 16));
            p.setType("platform");
            this.addEntity(p);
        }
        elem = mapXML.getElementsByTagName("ice");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            let p = new Entity(x, y, null, new HitBox(x, y, parseInt(elem[i].getAttribute("width"), 10) * 2, 32));
            p.setType("ice");
            this.addEntity(p);
        }
        elem = mapXML.getElementsByTagName("spring");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new SpringBlock(x, y));
        }
        elem = mapXML.getElementsByTagName("sandstone");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new CrumblingBlock(x, y, "crumble_block"));
        }
        elem = mapXML.getElementsByTagName("toggleblockblue");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new ToggleBlock(x, y, "blue"));
        }
        elem = mapXML.getElementsByTagName("toggleblockgreen");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new ToggleBlock(x, y, "green"));
        }
        elem = mapXML.getElementsByTagName("toggleblockred");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new ToggleBlock(x, y, "red"));
        }
        elem = mapXML.getElementsByTagName("toggleblockyellow");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new ToggleBlock(x, y, "yellow"));
        }
        elem = mapXML.getElementsByTagName("toggleplatformblue");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new TogglePlatform(x, y, "blue"));
        }
        elem = mapXML.getElementsByTagName("toggleplatformgreen");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new TogglePlatform(x, y, "green"));
        }
        elem = mapXML.getElementsByTagName("toggleplatformred");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new TogglePlatform(x, y, "red"));
        }
        elem = mapXML.getElementsByTagName("toggleplatformyellow");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new TogglePlatform(x, y, "yellow"));
        }
        elem = mapXML.getElementsByTagName("buttonblue");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new BubbleSwitch(x, y, "blue"));
        }
        elem = mapXML.getElementsByTagName("buttongreen");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new BubbleSwitch(x, y, "green"));
        }
        elem = mapXML.getElementsByTagName("buttonred");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new BubbleSwitch(x, y, "red"));
        }
        elem = mapXML.getElementsByTagName("buttonyellow");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new BubbleSwitch(x, y, "yellow"));
        }
        elem = mapXML.getElementsByTagName("timerblue");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new TimerSwitch(x, y, "blue"));
        }
        elem = mapXML.getElementsByTagName("timergreen");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new TimerSwitch(x, y, "green"));
        }
        elem = mapXML.getElementsByTagName("timerred");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new TimerSwitch(x, y, "red"));
        }
        elem = mapXML.getElementsByTagName("timeryellow");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new TimerSwitch(x, y, "yellow"));
        }
        elem = mapXML.getElementsByTagName("particlefx");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            let name = elem[i].getAttribute("type");
            if (name == "sparkles") {
                this.addEntity(new SparkleSquare(x, y, 48, 48));
            }
        }
        elem = mapXML.getElementsByTagName("hazards");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new Spike(x, y, elem[i].getAttribute("side")));
        }
        elem = mapXML.getElementsByTagName("thornplant");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new ThornPlant(x, y));
        }
        elem = mapXML.getElementsByTagName("chest");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new Chest(x, y, parseInt(elem[i].getAttribute("item"), 10)));
        }
        elem = mapXML.getElementsByTagName("coppercoin");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new Coin(x, y, "copper"));
        }
        elem = mapXML.getElementsByTagName("silvercoin");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new Coin(x, y, "silver"));
        }
        elem = mapXML.getElementsByTagName("goldcoin");
        for (let i = 0; i < elem.length; i++) {
            let index = parseInt(elem[i].getAttribute("index"), 10);
            if (!Coin.collected[index]) {
                let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
                let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
                this.addEntity(new Coin(x, y, "gold", index));
            }
        }
        elem = mapXML.getElementsByTagName("vibrantcrystal");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new Crystal(x, y));
        }
        elem = mapXML.getElementsByTagName("Goal");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new GoalPost(x, y));
        }
        elem = mapXML.getElementsByTagName("shopitem");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new ShopItem(x, y, parseInt(elem[i].getAttribute("item"), 10)));
        }
        elem = mapXML.getElementsByTagName("rockwall");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new Breakable(x, y, "rocks"));
        }
        elem = mapXML.getElementsByTagName("mk_turtle");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new MKTurtle(x, y));
        }
        elem = mapXML.getElementsByTagName("yeti");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new Yeti(x, y));
        }
        elem = mapXML.getElementsByTagName("shooterplant");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new ShooterPlant(x, y));
        }
        elem = mapXML.getElementsByTagName("lasher");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new Lasher(x, y));
        }
        elem = mapXML.getElementsByTagName("jumprobot");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new JumpBot(x, y, parseInt(elem[i].getAttribute("drops"), 10)));
        }
        elem = mapXML.getElementsByTagName("clockbot");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new ClockBot(x, y, parseInt(elem[i].getAttribute("drops"), 10)));
        }
        elem = mapXML.getElementsByTagName("buzzbot");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new Buzzbot(x, y, elem[i].getAttribute("behavior"), parseFloat(elem[i].getAttribute("speed")) * 2, parseInt(elem[i].getAttribute("size"), 10), parseInt(elem[i].getAttribute("drops"), 10)));
        }
        elem = mapXML.getElementsByTagName("slime");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new Slime(x, y));
        }
        elem = mapXML.getElementsByTagName("alligator");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new Alligator(x, y));
        }
        elem = mapXML.getElementsByTagName("firehat");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new FireHat(x, y, elem[i].getAttribute("drops")));
        }
        elem = mapXML.getElementsByTagName("lizard");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new Lizard(x, y));
        }
        elem = mapXML.getElementsByTagName("bat");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new Bat(x, y, elem[i].getAttribute("pattern"), parseFloat(elem[i].getAttribute("preferredSpeed")) * 2, parseInt(elem[i].getAttribute("size"), 10)));
        }
        elem = mapXML.getElementsByTagName("doorway");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new DoorWay(elem[i].getAttribute("stage"), x, y, parseInt(elem[i].getAttribute("targetX"), 10) * 2, parseInt(elem[i].getAttribute("targetY"), 10) * 2));
        }
        elem = mapXML.getElementsByTagName("walkway");
        for (let i = 0; i < elem.length; i++) {
            let x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            this.addEntity(new WalkWay(elem[i].getAttribute("stage"), x, y, parseInt(elem[i].getAttribute("targetX"), 10) * 2, parseInt(elem[i].getAttribute("targetY"), 10) * 2, parseInt(elem[i].getAttribute("width"), 10) * 2, parseInt(elem[i].getAttribute("height"), 10) * 2));
        }
        this.addEntity(new Eduardo(_x, _y));
        this.addEntity(new HUD(_x - 300, _y - 200));
    }
}
