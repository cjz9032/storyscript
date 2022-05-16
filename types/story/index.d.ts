interface StoryDeclare {
  declareDetails: number[];
  declareFns: string[];
  dPercent: string;
}

interface GoodsBlock {}

interface StoryModel {
  declare: StoryDeclare;
  scripts: Comment_single | FnBlocks[] | GoodsBlock;
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

interface CheckExp {}

type Goto = {
  type: 'Goto';
  fnInfo: FnNameInfo;
};

type XXACT = {
  type: 'XXACT';
};

type ActContent = Goto | XXACT;

interface ActContentWrap {
  type: 'ActContent';
  content: ActContent;
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
