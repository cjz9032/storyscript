interface StoryDeclare {
  declareDetails: number[];
  declareFns: string[];
  dPercent: string;
}

interface GoodsItem {
  type: 'goodsItem';
  price: number;
  itemName: string;
  time: number;
}
interface GoodsBlock {
  type: 'GoodsBlock';
  goodsItemList: GoodsItem[];
}

interface StoryModel {
  declare: StoryDeclare;
  scripts: (Comment_single | FnBlocks | GoodsBlock)[];
}

interface FnBlocks {
  type: 'FnBlocks';
  fnBlocks: FnBlock[];
}

// interface FnActionPart {
//   type: string;
// }

interface FnBlock {
  info: FnNameInfo;
  content: {
    directs: ActionBlock[];
    ifs: IF[];
  };
}

interface FnNameInfo {
  isCallback: boolean;
  name: string;
}
type ExpRandomIs = {
  type: 'RandomIs';
  detect: number;
};

type ExpCheckGVar = {
  type: 'CheckGVar';
  name: number;
  value: number;
};

type ExpCheckgold = {
  type: 'Checkgold';
  quantity: number;
};

type ExpCheckgold = {
  type: 'Checkgold';
  quantity: number;
};

type CheckExp = ExpRandomIs | ExpCheckGVar | ExpCheckgold | ExpCheckgold;

type SetGVar = {
  type: 'SetGVar';
  name: string;
  value: number;
};

type Goto = {
  type: 'Goto';
  fnInfo: FnNameInfo;
};

type DoBreak = {
  type: 'Break';
};

type TakeItem = {
  type: 'TakeItem';
  itemName: string;
  quantity: number;
};

type ActContent = Goto | DoBreak | SetGVar | TakeItem;

interface ActContentWrap {
  type: 'ActContent';
  content: ActContent[];
}

type LVar = 'p0' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'p7' | 'p8' | 'p9';

interface SayStrBindingLVar {
  format: '$STR';
  lVar: LVar;
}

type SayText = {
  type: 'SayText';
  text: string;
};

interface SayBindingBtn {
  fnInfo: FnNameInfo;
  text: SayText;
}

type GAME_CONST = '$LORD' | '$OWNERGUILD' | '$USERNAME' | '$UPGRADEWEAPONFEE' | '$USERWEAPON';

interface SayBindingWrap {
  type: 'SayBindingWrap';
  sayStrBindingLVar: SayStrBindingLVar;
  sayBindingBtn: SayBindingBtn;
  sayBindingText: GAME_CONST;
}

interface Comment_single {
  type: 'comment';
  value: string;
}

interface SayContentWrap {
  type: 'SayContent';
  content: (Comment_single | SayBindingWrap | SayText)[];
}

type ActionBlock = ActContentWrap | SayContentWrap;

interface IF {
  type: 'IfWrap_IfElse' | 'IfWrap_UselessIf';
  exp: boolean | CheckExp[];
  then: ActionBlock[];
  else: ActionBlock[];
}
