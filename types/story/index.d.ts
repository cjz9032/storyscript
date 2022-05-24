type Gender = 'man';
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

enum DayofWeek {
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
}

type WearPlaceName = 'NECKLACE' | 'RING';

interface CheckWrap {
  RandomIs: {
    type: 'RandomIs';
    value: number;
  };

  Checklevel: {
    type: 'Checklevel';
    value: number;
  };

  CheckGVar: {
    type: 'CheckGVar';
    name: number;
    value: number;
  };

  Checkgold: {
    type: 'Checkgold';
    quantity: number;
  };

  Checkpkpoint: {
    type: 'Checkpkpoint';
    quantity: number;
  };

  Checkgold: {
    type: 'Checkgold';
    quantity: number;
  };

  Checkdura: {
    type: 'Checkdura';
    itemName: string;
    quantity: number;
  };

  Checkitem: {
    type: 'Checkitem';
    itemName: string;
    quantity: number;
  };
  Checkjob: {
    type: 'Checkjob';
    value: JOB;
  };

  Checkunit: {
    type: 'Checkunit';
    name: string;
    value: number;
  };

  CheckDaytime: {
    type: 'CheckDaytime';
    dayTime: DAY_TIME;
  };

  CheckGender: {
    type: 'CheckGender';
    value: Gender;
  };

  Checkitemw_wears: {
    type: 'Checkitemw_wears';
    WearPlaceName: WearPlaceName;
  };

  Checkbaggage: {
    type: 'Checkbaggage';
  };

  CheckDayofweek: {
    type: 'CheckDayofweek';
    day: DayofWeek;
  };

  EqualLVar: {
    type: 'Checkbaggage';
    lVar: string;
    lVarRange: number;
  };

  CheckHour: {
    type: 'CheckHour';
    hour: number;
    hour2: number;
  };
}

type ValueOf<T> = T[keyof T];

type CheckExp = ValueOf<CheckWrap>;

interface AcsWrap {
  Takecheckitem: {
    type: 'Takecheckitem';
  };

  SetGVar: {
    type: 'SetGVar';
    name: string;
    value: number;
  };

  MoveMapPos: {
    type: 'MoveMapPos';
    mapName: string;
    x: number;
    y: number;
  };

  Goto: {
    type: 'Goto';
    fnInfo: FnNameInfo;
  };

  DoBreak: {
    type: 'Break';
  };

  TakeItem: {
    type: 'TakeItem';
    itemName: string;
    quantity: number;
  };

  GiveItem: {
    type: 'GiveItem';
    itemName: string;
    quantity: number;
  };

  ResetGVar: {
    type: 'ResetGVar';
    gVar: number;
    gVarRange: number;
  };

  TakeItemw_normal: {
    type: 'TakeItemw_normal';
    itemName: string;
    quantity: number;
  };

  TakeItemw_wears: {
    type: 'TakeItemw_wears';
    WearPlaceName: WearPlaceName;
  };

  MoveMap: {
    type: 'MoveMap';
    mapName: string;
  };

  CloseWindow: {
    type: 'CloseWindow';
  };

  BreakTimeRecall: {
    type: 'BreakTimeRecall';
  };

  MoveLVar: {
    type: 'MoveLVar';
    lVar: string;
    lVarRange: number;
  };

  MoveLVarRandom: {
    type: 'MoveLVarRandom';
    lVar: string;
    lVarRange: number;
  };

  IncLVar: {
    type: 'IncLVar';
    lVar: string;
    lVarRange: number;
  };

  DecLVar: {
    type: 'DecLVar';
    lVar: string;
    lVarRange: number;
  };

  Playdice: {
    type: 'Playdice';
    number: number;
    fnInfo: FnNameInfo;
  };

  BatchDelay: {
    type: 'BatchDelay';
    number: number;
  };

  Addbatch: {
    type: 'Addbatch';
    mapName: string;
  };

  Batchmove: {
    type: 'Batchmove';
  };
  TimeRecallByMins: {
    type: 'TimeRecallByMins';
    quantity: number;
  };

  SumVar_SumTwoVars: {
    type: 'SumVar_SumTwoVars';
    lVar: string;
    lVar2: string;
  };

  SumVar_SumToTarget: {
    type: 'SumVar_SumToTarget';
    lVar: string;
  };

  ExchangeMap: {
    type: 'ExchangeMap';
    mapName: string;
  };

  Recallmap: {
    type: 'Recallmap';
    mapName: string;
  };

  MonClear: {
    type: 'MonClear';
    mapName: string;
  };

  Param1: {
    type: 'Param1';
    mapName: string;
  };

  Param2: {
    type: 'Param2';
    x: number;
  };

  Param3: {
    type: 'Param3';
    y: number;
  };

  MonGen: {
    type: 'MonGen';
    monsterName: string;
    range: number;
    quantity: number;
  };

  Comment_single: Comment_single;
}

type ActContent = ValueOf<AcsWrap>;

interface ActContentWrap {
  type: 'ActContent';
  content: ActContent[];
}

type LVar = 'p0' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'p7' | 'p8' | 'p9';

interface SayStrBindingLVar {
  type: 'SayStrBindingLVar';
  format: '$STR';
  lVar: LVar;
}

type SayText = {
  type: 'SayText';
  text: string;
};

interface SayBindingBtn {
  type: 'SayBindingBtn';
  fnInfo: FnNameInfo;
  text: SayText;
}
type GAME_CONST = '$LORD' | '$OWNERGUILD' | '$USERNAME' | '$UPGRADEWEAPONFEE' | '$USERWEAPON';

interface sayBindingText {
  type: 'sayBindingText';
  value: GAME_CONST;
}

interface SayBindingWrap {
  type: 'SayBindingWrap';
  content: SayStrBindingLVar | SayBindingBtn | sayBindingText;
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
