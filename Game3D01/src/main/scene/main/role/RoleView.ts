import { ui } from "../../../../ui/layaMaxUI";
import Session from "../../../Session";
import SysRoleUp from "../../../sys/SysRoleUp";
import { HeroLvType } from "../../../../game/data/HeroData";
import SysRoleBase from "../../../sys/SysRolebase";
import App from "../../../../core/App";
import AdDiamond from "../../../dialog/AdDiamond";
import AutoEvent from "../../../../core/utils/AutoEvent";
import GameEvent from "../../../GameEvent";
import SysSkill from "../../../sys/SysSkill";
import { GoldType } from "../../../../game/data/HomeData";
import FlyUpTips from "../../../FlyUpTips";
export default class RoleView extends ui.test.jueseUI {
    public nowRoleId:number = 1;
    public autoEvent:AutoEvent = new AutoEvent();

    constructor() { 
        super();
        this.autoEvent.setSprite( this );
        this.shengmingniu.clickHandler = new Laya.Handler( this,this.hpFun );
        this.gongjiniu.clickHandler = new Laya.Handler( this,this.atkFun );
        this.updateAll();
        this.on(Laya.Event.DISPLAY,this,this.disFun);
        this.jia.clickHandler = new Laya.Handler( this,this.jiaFun , [GoldType.RED_DIAMONG]  );
        this.jia2.clickHandler = new Laya.Handler( this,this.jiaFun , [GoldType.BLUE_DIAMONG ] );
        this.autoEvent.onEvent( GameEvent.GOLD_CHANGE , this,this.goldChangeFun );
        this.autoEvent.onEvent( GameEvent.HERO_UPDATE , this,this.heroFun );
        
        //let sss = Session.heroData.getHeroData(1);
        //console.log( sss );
    }

    public heroFun():void{
        this.updateAll();
    }

    public goldChangeFun():void{
        this.updateAll();
    }

    public jiaFun( goldType:GoldType ):void{
        let d = new AdDiamond();
        d.setGoldType( goldType );
        d.popup();
    }

    public disFun():void {
        this.updateAll();
    }

    public hpFun():void{
        let res = Session.heroData.lvUp( this.nowRoleId , HeroLvType.HP );
        this.tip(res);
    }

    public atkFun():void{
        let res = Session.heroData.lvUp( this.nowRoleId , HeroLvType.ATK );
        this.tip(res);
    }

    public tip(res:number):void{
        if( res == 2 ){
            FlyUpTips.setTips("钻石不够");
        }else if( res == 3 ){
            FlyUpTips.setTips("升级到头了");
        }else if( res == 4 ){
            FlyUpTips.setTips("金币不够");
        }else if( res == 5 ){
            FlyUpTips.setTips("升级到头了");
        }
    }

    public updateAll():void{
        this.setOne( this.box1 , HeroLvType.HP , this.shengmingniu , this.shengmingjia ,this.xueshu , this.tiao , this.shengmingshu ,this.hpLv , this.hpGold );
        this.setOne( this.box2 , HeroLvType.ATK , this.gongjiniu ,this.gongjijia , this.gongshu , this.tiao2 , this.gongjishu ,this.atkLv  ,this.atkGold ); 
        let sys = SysRoleBase.getSys( this.nowRoleId );
        let sysSkill:SysSkill = App.tableManager.getDataByNameAndId( SysSkill.NAME,sys.baseSkill );
        this.skillLabel.text = sysSkill.skillInfo;
        this.jinengming.text = sysSkill.skillName;
        this.jinengtubiao.skin = null;
        this.jinengtubiao.skin = "icons/skill/" + sysSkill.id + ".png";
    }

    public setOne( box:Laya.Box , type:HeroLvType , btn:Laya.Button , fc:Laya.FontClip  ,fc2:Laya.FontClip , tiao:Laya.Image , allFc:Laya.FontClip , lvFc:Laya.FontClip ,goldFc:Laya.Text ):void{
        let lv = Session.heroData.getHeroLv( this.nowRoleId , type );
        let sys = SysRoleUp.getSysRole( this.nowRoleId , lv );
        fc.value = "+" + sys.getValue( type );
        let cost = sys.getCost( type );
        let costType = sys.getCostType(type);
        let have = Session.homeData.getGoldByType( costType );
        let can = (have >= cost);
        btn.visible = can;
        box.visible = !can;
        let sysRB = SysRoleBase.getSys( this.nowRoleId );
        let v = sysRB.getValue( type );
        allFc.value = ( v + sys.getValue( type ) ) + "";
        lvFc.value = lv + "";
        
        if( box.visible == false ){
            return;
        }
        goldFc.text = sys.costGold + "";
        fc2.value = ( have + "/" + cost);
        let vv = (have / cost);
        tiao.scrollRect = new Laya.Rectangle( 0 , 0,  tiao.width * vv , tiao.height );
        tiao.visible = (vv != 0);
    }
}