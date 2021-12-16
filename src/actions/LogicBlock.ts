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
interface FnActionPart {
  type: string;
}

interface FnBlock {
  info: FnNameInfo;
  content: any;
}

interface FnNameInfo {
  isCallback: boolean;
  name: string;
}

enum GAME_CONST {
  $LORD = '$LORD',
  $OWNERGUILD = '$OWNERGUILD',
  $USERNAME = '$USERNAME',
}

const obj = {
  LogicBlock_FnBlocks(a) {
    // transfer
    return a.parse();
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
    const say1 = SayContentWrap1.parse();
    const act = ActContentWrap.parse();
    const say2 = SayContentWrap2.parse();
    const ifs = IfWrapAny.parse();

    // eval directly
    const directs: FnActionPart[] = [say1, act, say2].filter(Boolean);

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
      type: 'act',
      content: action.parse(),
    };
  },
  SayContentWrap(_s, _c, SayContent) {
    return SayContent.parse() as ReturnType<typeof obj.SayContent>;
  },
  sayBindingWrap(_s1, sayStrBindingLVar, sayBindingBtn, sayBindingText, _s2) {
    return {
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
    return SayContent.parse() as ReturnType<
      typeof Comment.Comment_single | typeof obj.sayBindingWrap | typeof obj.sayText
    >;
  },
  lVar(pd, num) {
    return (pd.parse() + num) as string;
  },
  IfWrap_UselessIf(a, ThenDoWrap, ElseDoWrap) {
    return {
      type: 'IfWrap_UselessIf',
      content: ElseDoWrap.parse(),
    };
  },
  IfWrap_IfElse(a, IfExp, ThenDoWrap, ElseDoWrap) {
    return {
      type: 'IfWrap_IfElse',
      content: ThenDoWrap.parse(),
    };
  },
  ThenDoWrap(_t, ThenDoWrap) {
    return ThenDoWrap.parse();
  },
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
