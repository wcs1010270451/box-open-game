import { _decorator, Component, Node, Button, Label } from "cc";
import { Equipment, EquipmentData } from "./Equipment";
const { ccclass, property } = _decorator;

type Reward = {
  name: string;
  price: number;
};
/**
 * 打开宝箱
 */
@ccclass("OpenBox")
export class OpenBox extends Component {
  // 箱子节点
  @property(Node)
  boxNode: Node = null!;

  // 奖励面板节点
  @property(Node)
  rewardDisplay: Node = null!;

  // 奖励结果标签
  @property(Node)
  rewardResult: Node = null!;

  // 关闭按钮
  @property(Node)
  closeBtn: Node = null!;

  // 出售按钮
  @property(Node)
  saleBtn: Node = null!;

  // 出售价格
  @property(Label)
  salePriceLabel: Label = null!;

  // 金币总量
  @property(Label)
  goldTotalLabel: Label = null!;

  // 出售价格
  private goldTotal: number = 0;
  private salePrice: number = 0;

  strart() {
    // 点击箱子触发开箱
    this.boxNode.on(Node.EventType.TOUCH_END, this.onOpenBox, this);
    //关闭奖励面板
    this.closeBtn.on(Node.EventType.TOUCH_END, this.onCloseReward, this);
    //默认隐藏奖励面板
    this.rewardDisplay.active = false;
  }

  // 打开箱子
  onOpenBox() {
    const reward = generateRandomEquipment();
    const equipmentComponent = this.rewardResult.getComponent(Equipment);
    if (equipmentComponent) {
      equipmentComponent.updateInfo(reward);
    }
    this.salePrice = reward.price;
    // this.rewardResult.string = `恭喜获得：${reward.name}`;
    this.salePriceLabel.string = `出售价格：${reward.price} 金币`;
    this.rewardDisplay.active = true;
  }

  // 关闭奖励面板
  onCloseReward() {
    this.rewardDisplay.active = false;
  }

  //出售装备
  saleEquipment() {
    // 出售装备的逻辑

    console.log(this.goldTotal, this.salePrice);
    this.goldTotal = this.goldTotal + this.salePrice;
    //更新金币总量
    this.goldTotalLabel.string = `金币：${this.goldTotal}`;
    this.onCloseReward();
  }
}

export const EQUIPMENT_QUALITIES = [
  "粗糙",
  "普通",
  "优秀",
  "精良",
  "史诗",
  "传说",
];
const QUALITY_PROBABILITIES = [35, 30, 20, 10, 4, 1]; // 对应上面顺序，总和应为100
const EQUIPMENT_TYPES = [
  "武器",
  "副手",
  "头盔",
  "肩膀",
  "手臂",
  "手套",
  "上衣",
  "裤子",
  "鞋子",
];

// 生成随机装备
function generateRandomEquipment(): EquipmentData {
  const quality = getRandomQuality();
  const qualityIndex = EQUIPMENT_QUALITIES.indexOf(quality);

  const typeIndex = Math.floor(Math.random() * EQUIPMENT_TYPES.length);
  const type = EQUIPMENT_TYPES[typeIndex];

  const baseStat = (qualityIndex + 1) * 10; // 品质影响属性值
  const randomFactor = () => Math.floor(Math.random() * 10);

  return {
    name: `${quality}${type}`,
    description: `${quality}品质的${type}，性能稳定。`,
    image: "", // 可填入对应路径或 sprite 名
    attack: baseStat + randomFactor(),
    defense: baseStat + randomFactor(),
    hp: baseStat * 5 + randomFactor() * 2,
    speed: Math.floor(baseStat / 2) + randomFactor(),
    price: (qualityIndex + 1) * 10 + randomFactor(),
    level: qualityIndex + 1,
    type: type,
  };

  function getRandomQuality(): string {
    const total = QUALITY_PROBABILITIES.reduce((a, b) => a + b, 0);
    const rand = Math.random() * total;
    let sum = 0;

    for (let i = 0; i < QUALITY_PROBABILITIES.length; i++) {
      sum += QUALITY_PROBABILITIES[i];
      if (rand < sum) {
        return EQUIPMENT_QUALITIES[i];
      }
    }

    return EQUIPMENT_QUALITIES[0]; // 保险返回
  }
}
