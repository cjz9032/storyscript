/**
 * Copyright 2016 Icemic Jia <bingfeng.web@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Comment from './Comment';

enum JOB {
  warrior = 'warrior',
  wizard = 'wizard',
  taoist = 'taoist',
}

enum DAY_TIME {
  sunraise = 'sunraise',
  sunset = 'sunset',
  day = 'day',
  sunrise = 'sunrise',
  night = 'night',
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

const obj = {
  LogicBlock_FnBlocks(FnBlocks) {
    return {
      type: 'FnBlocks',
      fnBlocks: FnBlocks.parse(),
    };
  },
  FnBlocks(leftBracket, fnBkName, rightBracket, fnContent): FnBlock {
    const info = fnBkName.parse() as FnNameInfo;
    const content = fnContent.parse();
    return {
      info,
      content,
    };
  },
  fnBkName_NormalCall(name): FnNameInfo {
    return {
      isCallback: false,
      name: name.parse() as string,
    };
  },
  fnBkName_Callback(a, name): FnNameInfo {
    return {
      isCallback: true,
      name: name.parse() as string,
    };
  },
  // FnContent is wrap
  FnContentDetail(SayContentWrap1, ActContentWrap, SayContentWrap2, IfWrapAny) {
    const say1 = SayContentWrap1.parse()[0];
    const act = ActContentWrap.parse()[0];
    const say2 = SayContentWrap2.parse()[0];
    const ifs = IfWrapAny.parse();

    // eval directly
    const directs: ActionBlock[] = [say1, act, say2].filter(Boolean);

    return {
      directs,
      ifs,
    };
  },
  ActContentWrap(_s, _c, ActContent) {
    return ActContent;
  },
  ActContent(action) {
    return {
      type: 'ActContent',
      content: action.parse(),
    };
  },
  SayContentWrap(_s, _c, SayContent) {
    return SayContent.parse() as ReturnType<typeof obj.SayContent>;
  },
  sayBindingWrap(_s1, sayStrBindingLVar, sayBindingBtn, sayBindingText, _s2) {
    return {
      type: 'SayBindingWrap',
      sayStrBindingLVar: sayStrBindingLVar.parse() as ReturnType<typeof obj.sayStrBindingLVar>,
      sayBindingBtn: sayBindingBtn.parse() as ReturnType<typeof obj.sayBindingBtn>,
      sayBindingText: sayBindingText.parse() as ReturnType<typeof obj.sayBindingText>,
    };
  },
  sayBindingText($, gconst): GAME_CONST {
    return gconst.parse();
  },
  sayText(a) {
    return {
      type: 'SayText',
      text: a.parse() as string,
    };
  },
  sayNewLine(a) {
    return '\n';
  },
  sayStrBindingLVar(_$str, lVar, _r) {
    return {
      format: '$STR',
      lVar: lVar.parse() as ReturnType<typeof obj.lVar>,
    };
  },
  sayBindingBtn(sayTextChars, _A, fnBkName) {
    return {
      fnInfo: fnBkName.parse() as FnNameInfo, // supposes must not callback
      text: sayTextChars.parse() as string,
    };
  },
  SayContent(SayContent) {
    return {
      type: 'sayContent',
      content: SayContent.parse() as ReturnType<
        typeof Comment.Comment_single | typeof obj.sayBindingWrap | typeof obj.sayText
      >,
    };
  },
  lVar(pd, num) {
    return ((pd.parse() as string).toLocaleLowerCase() + num) as string;
  },
  IfWrap_UselessIf(_header, ThenDoWrap, ElseDoWrap) {
    return {
      type: 'IfWrap_UselessIf',
      exp: true,
      then: ThenDoWrap.parse(),
      else: ElseDoWrap.parse(),
    };
  },
  IfWrap_IfElse(_IF, IfExp, ThenDoWrap, ElseDoWrap) {
    return {
      type: 'IfWrap_IfElse',
      exp: IfExp.parse(),
      then: ThenDoWrap.parse(),
      else: ElseDoWrap.parse(),
    };
  },
  // IfExp
  // CheckExp
  Checkpkpoint(_t, quantity) {
    return {
      type: 'Checkpkpoint',
      quantity: quantity.parse(),
    };
  },
  Checkdura(_t, itemName, quantity) {
    return {
      type: 'Checkdura',
      itemName: itemName.parse(),
      quantity: quantity.parse(),
    };
  },
  CheckDaytime(_t, dayTime) {
    return {
      type: 'CheckDaytime',
      dayTime: dayTime.parse().toLowerCase() as DAY_TIME,
    };
  },

  EqualLVar(_t, lVar, lVarRange) {
    return {
      type: 'EqualLVar',
      lVar: lVar.parse(),
      lVarRange: lVarRange.parse(),
    };
  },
  MoveLVar(_t, lVar, lVarRange) {
    return {
      type: 'MoveLVar',
      lVar: lVar.parse(),
      lVarRange: lVarRange.parse(),
    };
  },
  LargeLVar(_t, lVar, lVarRange) {
    return {
      type: 'LargeLVar',
      lVar: lVar.parse(),
      lVarRange: lVarRange.parse(),
    };
  },
  SmallLVar(_t, lVar, lVarRange) {
    return {
      type: 'SmallLVar',
      lVar: lVar.parse(),
      lVarRange: lVarRange.parse(),
    };
  },
  SumVar_SumTwoVars(_t, lVar, lVar2) {
    return {
      type: 'SumVar_SumTwoVars',
      lVar: lVar.parse(),
      lVar2: lVar2.parse(),
    };
  },
  SumVar_SumToTarget(_t, lVar) {
    return {
      type: 'SumVar_SumToTarget',
      lVar: lVar.parse(),
    };
  },
  MoveLVarRandom(_t, lVar, lVarRange) {
    return {
      type: 'MoveLVarRandom',
      lVar: lVar.parse(),
      lVarRange: lVarRange.parse(),
    };
  },
  ExchangeMap(_t, mapName) {
    return {
      type: 'ExchangeMap',
      mapName: mapName.parse(),
    };
  },
  Recallmap(_t, mapName) {
    return {
      type: 'Recallmap',
      mapName: mapName.parse(),
    };
  },
  Checkhum(_t, mapName, quantity) {
    return {
      type: 'Checkhum',
      mapName: mapName.parse(),
      quantity: quantity.parse(),
    };
  },
  IncLVar(_t, lVar, lVarRange) {
    return {
      type: 'IncLVar',
      lVar: lVar.parse(),
      lVarRange: lVarRange.parse(),
    };
  },
  DecLVar(_t, lVar, lVarRange) {
    return {
      type: 'DecLVar',
      lVar: lVar.parse(),
      lVarRange: lVarRange.parse(),
    };
  },
  MonClear(_t, mapName) {
    return {
      type: 'MonClear',
      mapName: mapName.parse(),
    };
  },
  Checkmonmap(_t, mapName, quantity) {
    return {
      type: 'Checkmonmap',
      mapName: mapName.parse(),
      quantity: quantity.parse(),
    };
  },
  MonGen(_t, monsterName, range, quantity) {
    return {
      type: 'MonGen',
      monsterName: monsterName.parse(),
      range: range.parse(),
      quantity: quantity.parse(),
    };
  },
  Param1(_t, mapName) {
    return {
      mapName: mapName.parse(),
    };
  },
  Param2(_t, x) {
    return {
      x: x.parse(),
    };
  },
  Param3(_t, y) {
    return {
      y: y.parse(),
    };
  },
  GiveItem(_t, itemName, quantity) {
    return {
      type: 'GiveItem',
      itemName: itemName.parse(),
      quantity: quantity.parse(),
    };
  },
  Playdice(_t, number, fnInfo) {
    return {
      type: 'Playdice',
      number: number.parse(),
      fnInfo: fnInfo.parse(),
    };
  },
  BatchDelay(_t, number) {
    return {
      type: 'BatchDelay',
      number: number.parse(),
    };
  },
  Addbatch(_t, mapName) {
    return {
      type: 'Addbatch',
      mapName: mapName.parse(),
    };
  },
  Checkluckypoint(_t, number) {
    return {
      type: 'Checkluckypoint',
      mapName: number.parse(),
    };
  },
  CheckDayofweek(_t, day) {
    return {
      type: 'CheckDayofweek',
      day: day.parse() as DayofWeek,
    };
  },
  CheckHour(_t, hour, hour2) {
    return {
      type: 'CheckHour',
      hour: hour.parse(),
      hour2: hour2.parse(),
    };
  },
  Checklevel(_t, quantity) {
    return {
      type: 'Checklevel',
      level: quantity.parse(),
    };
  },
  ResetGVar(_t, gVar, gVarRange) {
    return {
      type: 'ResetGVar',
      gVar: gVar.parse(),
      gVarRange: gVarRange.parse(),
    };
  },
  Checkitem(_t, itemName, quantity) {
    return {
      type: 'Checkitem',
      itemName: itemName.parse(),
      quantity: quantity.parse(),
    };
  },
  Checkjob(_t, jobsEnum) {
    return {
      type: 'Checkitem',
      jobsEnum: jobsEnum.parse(),
    };
  },
  jobsEnum(job) {
    return job.parse().toLowerCase() as JOB;
  },
  Checkunit(_t, gVar, gVarRange) {
    return {
      type: 'Checkunit',
      gVar: gVar.parse(),
      gVarRange: gVarRange.parse(),
    };
  },
  TakeItemw_normal(_t, itemName, quantity) {
    return {
      type: 'TakeItemw_normal',
      itemName: itemName.parse(),
      quantity: quantity.parse(),
    };
  },
  TakeItemw_wears(_t, WearPlaceName) {
    return {
      type: 'TakeItemw_normal',
      WearPlaceName: WearPlaceName.parse(),
    };
  },
  CheckGender(_t, gender) {
    return {
      type: 'CheckGender',
      gender: gender.parse(),
    };
  },
  Istakeitem(_t, itemName) {
    return {
      type: 'Istakeitem',
      itemName: itemName.parse(),
    };
  },
  Checkitemw_normal(_t, itemName, quantity) {
    return {
      type: 'Checkitemw_normal',
      itemName: itemName.parse(),
      quantity: quantity.parse(),
    };
  },
  Checkitemw_wears(_t, WearPlaceName) {
    return {
      type: 'Checkitemw_wears',
      WearPlaceName: WearPlaceName.parse(),
    };
  },
  WearPlaceName(_t, name, _w) {
    return name.parse();
  },
  MoveMapPos(_t, mapName, x, y) {
    return {
      type: 'MoveMapPos',
      mapName: mapName.parse(),
      x: x.parse(),
      y: y.parse(),
    };
  },
  MoveMap(_t, mapName) {
    return {
      type: 'MoveMap',
      mapName: mapName.parse(),
    };
  },
  TimeRecallByMins(_t, quantity) {
    return {
      type: 'TimeRecallByMins',
      quantity: quantity.parse(),
    };
  },
  ThenDoWrap(_t, ThenDoWrap) {
    return ThenDoWrap.parse();
  },
  ElseDoWrap(_t, ElseDoWrap) {
    return ElseDoWrap.parse();
  },
  CheckGVar(_header, gVar, gVarRange) {
    return {
      type: 'CheckGVar',
      name: gVar.parse() as ReturnType<typeof obj.gVar>,
      value: gVarRange.parse() as ReturnType<typeof obj.gVarRange>,
    };
  },
  RandomIs(_Header, num) {
    return {
      type: 'RandomIs',
      // range: [0, 100],
      detect: num.parse(),
    };
  },
  Goto(_Header, fn) {
    return {
      type: 'Goto',
      fnInfo: fn.parse(),
    };
  },
  Checkgold(_Header, quantity) {
    return {
      type: 'Checkgold',
      quantity: quantity.parse(),
    };
  },
  TakeItem(_Header, itemName, quantity) {
    return {
      type: 'TakeItem',
      itemName: itemName.parse(),
      quantity: quantity.parse(),
    };
  },
  GoodsBlock(_a, _b, _c, goodsItemList) {
    return {
      type: 'GoodsBlock',
      goodsItemList: goodsItemList.parse(),
    };
  },
  goodsItem(_noLineSpace, itemName, _noLineSpace2, price, _noLineSpace3, quantity, _noLineSpace4, _newLine) {
    return {
      type: 'goodsItem',
      price: price.parse(),
      quantity: quantity.parse(),
    };
  },
  // ActionBlocks
  ActWrap(_Header, ActContent) {
    return ActContent.parse();
  },
  SayWrap(_Header, SayContent) {
    return SayContent.parse() as ReturnType<typeof obj.SayContent>;
  },
  SetGVar(_set, gVar, gVarRange) {
    return {
      type: 'SetGlobalVar',
      name: gVar.parse() as ReturnType<typeof obj.gVar>,
      value: gVarRange.parse() as ReturnType<typeof obj.gVarRange>,
    };
  },
  gVarRange(t) {
    return parseInt(t.parse());
  },
  lVarRange(t) {
    return parseInt(t.parse());
  },
  gVar(leftBracket, name, rightBracket) {
    return name.parse() as string;
  },

  // LogicBlock_IF(IF, LogicBlock1, ELSEIFs, LogicBlock2s, ELSE, LogicBlock3, END) {
  //   // get conditions
  //   var conditions = [IF.parse()];
  //   for (var ELSEIF of ELSEIFs.children) {
  //     conditions.push(ELSEIF.parse());
  //   }
  //   // get stroy block
  //   var blocks: any[] = [];
  //   var block1: any[] = [];
  //   for (var LogicBlock of LogicBlock1.children) {
  //     block1.push(LogicBlock.parse());
  //   }
  //   blocks.push(block1);
  //   for (var LogicBlock2 of LogicBlock2s.children) {
  //     var block2: any[] = [];
  //     for (var LogicBlock of LogicBlock2.children) {
  //       block2.push(LogicBlock.parse());
  //     }
  //     blocks.push(block2);
  //   }
  //   var block3: any[] = [];
  //   if (LogicBlock3.child(0)) {
  //     for (var LogicBlock of LogicBlock3.child(0).children) {
  //       block3.push(LogicBlock.parse());
  //     }
  //   }
  //   blocks.push(block3);
  //   return {
  //     type: 'logic',
  //     name: 'if',
  //     conditions: conditions,
  //     blocks: blocks,
  //   };
  // },
  // LogicBlock_WHILE(WHILE, LogicBlocks, END) {
  //   var condition = WHILE.parse();
  //   var block: any[] = [];
  //   for (var LogicBlock of LogicBlocks.children) {
  //     block.push(LogicBlock.parse());
  //   }
  //   return {
  //     type: 'logic',
  //     name: 'while',
  //     condition: condition,
  //     block: block,
  //   };
  // },
  // LogicBlock_FOREACH(FOREACH, LogicBlocks, END) {
  //   var condition = FOREACH.parse();
  //   var block: any[] = [];
  //   for (var LogicBlock of LogicBlocks.children) {
  //     block.push(LogicBlock.parse());
  //   }
  //   return {
  //     type: 'logic',
  //     name: 'foreach',
  //     child: condition.child,
  //     children: condition.children,
  //     block: block,
  //   };
  // },
  // IF(head, Expression) {
  //   // condtion Object
  //   return Expression.parse();
  // },
  // ELSEIF(head, Expression) {
  //   // condtion Object
  //   return Expression.parse();
  // },
  // WHILE(head, Expression) {
  //   // condtion Object
  //   return Expression.parse();
  // },
  // FOREACH(head, childVar, _in, childrenVar) {
  //   return {
  //     child: childVar.parse(),
  //     children: childrenVar.parse(),
  //   };
  // },
  // LET_assign(head, variable, operator, Exp) {
  //   var explicit = head.parse().length > 1;
  //   return {
  //     type: 'logic',
  //     name: 'let',
  //     explicit: explicit,
  //     left: variable.parse(),
  //     right: Exp.parse(),
  //   };
  // },
  // LET_nonAssign(head, variable) {
  //   return {
  //     type: 'logic',
  //     name: 'let',
  //     explicit: true,
  //     left: variable.parse(),
  //     right: { type: 'value', value: null },
  //   };
  // },
};
export default obj;
