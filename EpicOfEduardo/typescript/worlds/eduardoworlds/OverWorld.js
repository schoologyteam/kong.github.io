/* global World MyGame TiledImage Entity Point LevelNode EduardoMap HitBox*/
class OverWorld extends World {
    constructor() {
        super();
        MyGame.saveGame();
        let t = new TiledImage(MyGame.imgs["TearOfTheStar"], 80, 60, 16);
        let d = MyGame.maps["over_map"].responseXML;
        let s = d.getElementsByTagName("terrain")[0].innerHTML;
        t.loadFromString(s);
        this.addEntity(new Entity(0, 0, t));
        let f = new TiledImage(MyGame.imgs["TearOfTheStar"], 80, 60, 16);
        s = d.getElementsByTagName("features")[0].innerHTML;
        f.loadFromString(s);
        this.addEntity(new Entity(0, 0, f));
        let p = new TiledImage(MyGame.imgs["TearOfTheStar"], 80, 60, 16);
        s = d.getElementsByTagName("paths")[0].innerHTML;
        p.loadFromString(s);
        this.addEntity(new Entity(0, 0, p));
        this.setSize(1280, 960);
        let elem = d.getElementsByTagName("levelNode");
        for (let i = 0; i < elem.length; i++) {
            this.addEntity(new LevelNode(parseInt(elem[i].getAttribute("x"), 10) * 2, parseInt(elem[i].getAttribute("y"), 10) * 2, elem[i].getAttribute("levelName")));
        }
        elem = d.getElementsByTagName("blocker");
        for (let i = 0; i < elem.length; i++) {
            let _x = parseInt(elem[i].getAttribute("x"), 10) * 2;
            let _y = parseInt(elem[i].getAttribute("y"), 10) * 2;
            let b = new Entity(_x, _y, null, new HitBox(_x, _y, 16, 16));
            b.setType("block");
            this.addEntity(b);
        }
        this.addEntity(new EduardoMap(OverWorld.playerPoint.x, OverWorld.playerPoint.y));
        Coin.collected = new Array(false, false, false, false, false);
    }
}
OverWorld.playerPoint = new Point(68 * 2, 244 * 2);
//OverWorld.playerPoint = new Point(68 * 2, 244 * 2); 
