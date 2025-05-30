import {
  _decorator,
  Component,
  Node,
  Label,
  Sprite,
  SpriteFrame,
  EventTouch,
} from "cc";
import { EquipInfoPanel } from "./EquipInfoPanel"; // 引入脚本

const { ccclass, property } = _decorator;

export interface EquipmentData {
  name: string;
  description: string;
  image: string;
  attack: number;
  defense: number;
  hp: number;
  speed: number;
  price: number;
  level: number;
  type: string;
}

@ccclass("Equipment")
export class Equipment extends Component {
  @property(Label)
  nameLabel: Label = null!;

  @property(Label)
  descriptionLabel: Label = null!;

  @property(Sprite)
  imageSprite: Sprite = null!;

  @property(Label)
  attackLabel: Label = null!;

  @property(Label)
  defenseLabel: Label = null!;

  @property(Label)
  hpLabel: Label = null!;

  @property(Label)
  speedLabel: Label = null!;

  @property(Label)
  priceLabel: Label = null!;

  @property(Label)
  levelLabel: Label = null!;

  equipment: EquipmentData | null = null;

  public updateInfo(info: EquipmentData) {
    this.equipment = info;
    this.nameLabel.string = info.name;
    // this.descriptionLabel.string = info.description;
    // this.attackLabel.string = `攻击：${info.attack}`;
    // this.defenseLabel.string = `防御：${info.defense}`;
    // this.hpLabel.string = `生命：${info.hp}`;
    // this.speedLabel.string = `速度：${info.speed}`;
    // this.priceLabel.string = `售价：${info.price}`;
    // this.levelLabel.string = `等级：${info.level}`;
  }

  onClick(event: EventTouch) {
    // 这里可以添加点击事件的逻辑
    console.log("显示装备详情：", this.equipment);
    // 获取面板节点（根据你的层级结构调整）
    const panelNode = this.node.scene
      .getChildByName("Canvas")
      ?.getChildByName("EquipInfoPanel");
    if (!panelNode) return;

    // 激活面板
    panelNode.active = true;

    // 传递数据
    const panel = panelNode.getComponent(EquipInfoPanel);
    if (panel) {
      panel.updateInfo(this.equipment);
    }
  }
  onLoad() {
    this.node.on(Node.EventType.TOUCH_END, this.onClick, this);
  }
  onDestroy() {
    this.node.off(Node.EventType.TOUCH_END, this.onClick, this);
  }
}
