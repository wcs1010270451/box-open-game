import { _decorator, Component, Node, Label } from "cc";
import { EquipmentData } from "./Equipment";
import { EQUIPMENT_QUALITIES } from "./OpenBox";
const { ccclass, property } = _decorator;

@ccclass("EquipInfoPanel")
export class EquipInfoPanel extends Component {
  @property(Node)
  imgNode: Node = null!;

  @property(Label)
  nameLabel: Label = null!;

  @property(Label)
  descriptionLabel: Label = null!;

  @property(Label)
  attackLabel: Label = null!;

  @property(Label)
  defenseLabel: Label = null!;

  @property(Label)
  hpLabel: Label = null!;

  @property(Label)
  speedLabel: Label = null!;

  // 更新数据
  public updateInfo(data: EquipmentData) {
    // this.imgNode.getComponent(Sprite).spriteFrame = data.image;
    this.nameLabel.string = `${data.name} (${
      EQUIPMENT_QUALITIES[data.level]
    }级)`;
    this.descriptionLabel.string = data.description;
    this.attackLabel.string = `攻击：${data.attack}`;
    this.defenseLabel.string = `防御：${data.defense}`;
    this.hpLabel.string = `生命：${data.hp}`;
    this.speedLabel.string = `速度：${data.speed}`;
  }

  // 关闭方法
  closePanel() {
    this.node.active = false;
  }
  // 挂在按钮点击事件上
  onCloseButtonClick() {
    this.closePanel();
  }
}
