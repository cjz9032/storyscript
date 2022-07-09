// AUTOGENERATED FILE
// This file was generated from bks-template.ohm by `ohm generateBundles`.

import { ActionDict, Grammar, IterationNode, Node, NonterminalNode, Semantics, TerminalNode } from 'ohm-js';

export interface BKSActionDict<T> extends ActionDict<T> {
  Scripts?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode) => T;
  LogicBlock_GoodsBlock?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  LogicBlock_FnBlocks?: (this: NonterminalNode, arg0: IterationNode) => T;
  LogicBlock?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  FnBlocks?: (
    this: NonterminalNode,
    arg0: TerminalNode,
    arg1: NonterminalNode,
    arg2: TerminalNode,
    arg3: NonterminalNode
  ) => T;
  GoodsBlock?: (
    this: NonterminalNode,
    arg0: TerminalNode,
    arg1: NonterminalNode,
    arg2: TerminalNode,
    arg3: IterationNode
  ) => T;
  noLineSpace?: (this: NonterminalNode, arg0: IterationNode) => T;
  goodsItem?: (
    this: NonterminalNode,
    arg0: NonterminalNode,
    arg1: NonterminalNode,
    arg2: NonterminalNode,
    arg3: NonterminalNode,
    arg4: NonterminalNode,
    arg5: NonterminalNode,
    arg6: NonterminalNode,
    arg7: NonterminalNode
  ) => T;
  newLine?: (this: NonterminalNode, arg0: TerminalNode) => T;
  fnBkName_NormalCall?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  fnBkName_Callback?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode) => T;
  fnBkName?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  FnContent?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  FnContentDetail?: (
    this: NonterminalNode,
    arg0: IterationNode,
    arg1: IterationNode,
    arg2: IterationNode,
    arg3: IterationNode
  ) => T;
  ActContentWrap?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  SayContentWrap?: (this: NonterminalNode, arg0: IterationNode, arg1: IterationNode, arg2: NonterminalNode) => T;
  IF?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode) => T;
  IfWrap_UselessIf?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  IfWrap_IfElse?: (
    this: NonterminalNode,
    arg0: NonterminalNode,
    arg1: NonterminalNode,
    arg2: NonterminalNode,
    arg3: NonterminalNode
  ) => T;
  IfWrap?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  ActionBlocks?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  ThenDoWrap?: (this: NonterminalNode, arg0: IterationNode, arg1: IterationNode) => T;
  ElseDoWrap?: (this: NonterminalNode, arg0: IterationNode, arg1: IterationNode) => T;
  DoBreak?: (this: NonterminalNode, arg0: TerminalNode) => T;
  ThenDo?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode) => T;
  ElseDo?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode) => T;
  ActHeader?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode) => T;
  SayHeader?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode) => T;
  SayWrap?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  ActWrap?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  SayContent?: (this: NonterminalNode, arg0: IterationNode) => T;
  sayBindingWrap?: (
    this: NonterminalNode,
    arg0: TerminalNode,
    arg1: NonterminalNode,
    arg2: NonterminalNode,
    arg3: NonterminalNode,
    arg4: TerminalNode
  ) => T;
  sayBindingBtn?: (this: NonterminalNode, arg0: IterationNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  sayBindingText?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode) => T;
  sayStrBindingLVar?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode) => T;
  sayText?: (this: NonterminalNode, arg0: IterationNode) => T;
  sayNewLine?: (this: NonterminalNode, arg0: TerminalNode) => T;
  sayTextChars?: (this: NonterminalNode, arg0: NonterminalNode | TerminalNode) => T;
  ActContent?: (this: NonterminalNode, arg0: IterationNode) => T;
  IfExp?: (this: NonterminalNode, arg0: IterationNode) => T;
  CheckExp?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  CheckDaytime?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  CheckHour?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: IterationNode) => T;
  CheckDayofweek?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  dayEnum?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  Checkluckypoint?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  dayTimeEnum?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  RandomIs?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  CheckGender?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode) => T;
  CheckGVar?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  CheckLVar?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  Checkunit?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  Checkgold?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  Checkdura?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  Checkitem?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  Checkpkpoint?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  Checkbaggage?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  Checklevel?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  Checkjob?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  Checkhum?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  BatchDelay?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  Checkmonmap?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  Addbatch?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  Batchmove?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  Istakeitem?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  TimeRecallByMins?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  Checkitemw_normal?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  Checkitemw_wears?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  Checkitemw?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  TakeItemw_normal?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  TakeItemw_wears?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  TakeItemw?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  Playdice?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  Param1?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  Param2?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  Param3?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  MonGen?: (
    this: NonterminalNode,
    arg0: NonterminalNode,
    arg1: NonterminalNode,
    arg2: NonterminalNode,
    arg3: NonterminalNode
  ) => T;
  CloseWindow?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  ExchangeMap?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  Recallmap?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  EqualLVar?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  LargeLVar?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  SmallLVar?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  MoveLVar?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  IncLVar?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  DecLVar?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  ResetGVar?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  SumVar_SumTwoVars?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  SumVar_SumToTarget?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  SumVar?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  MoveLVarRandom?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  SetGVar?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode) => T;
  TakeItem?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: IterationNode) => T;
  Takecheckitem?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  GiveItem?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: IterationNode) => T;
  itemName?: (this: NonterminalNode, arg0: IterationNode) => T;
  monsterName?: (this: NonterminalNode, arg0: IterationNode) => T;
  WearPlaceName?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode, arg2: TerminalNode) => T;
  quantity?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  MoveMapPos?: (
    this: NonterminalNode,
    arg0: NonterminalNode,
    arg1: NonterminalNode,
    arg2: NonterminalNode,
    arg3: NonterminalNode
  ) => T;
  MonClear?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  Goto?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  BreakTimeRecall?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  MoveMap?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  mapName?: (this: NonterminalNode, arg0: IterationNode) => T;
  gVar?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode) => T;
  lVar?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  lVarRange?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  gVarRange?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  jobsEnum?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  Declare?: (
    this: NonterminalNode,
    arg0: IterationNode,
    arg1: IterationNode,
    arg2: IterationNode,
    arg3: IterationNode,
    arg4: IterationNode,
    arg5: NonterminalNode
  ) => T;
  DeclareDetails?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode) => T;
  number?: (this: NonterminalNode, arg0: IterationNode, arg1: IterationNode) => T;
  DDPercent?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode) => T;
  decItems?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  functionNameGoto?: (this: NonterminalNode, arg0: IterationNode, arg1: IterationNode) => T;
  functionName?: (this: NonterminalNode, arg0: TerminalNode, arg1: IterationNode) => T;
  functionNameSPNO?: (this: NonterminalNode, arg0: IterationNode, arg1: IterationNode) => T;
  Comment_single?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode) => T;
  Comment?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  comment_single?: (this: NonterminalNode, arg0: IterationNode) => T;
}

export interface BKSSemantics extends Semantics {
  addOperation<T>(name: string, actionDict: BKSActionDict<T>): this;
  extendOperation<T>(name: string, actionDict: BKSActionDict<T>): this;
  addAttribute<T>(name: string, actionDict: BKSActionDict<T>): this;
  extendAttribute<T>(name: string, actionDict: BKSActionDict<T>): this;
}

export interface BKSGrammar extends Grammar {
  createSemantics(): BKSSemantics;
  extendSemantics(superSemantics: BKSSemantics): BKSSemantics;
}

declare const grammar: BKSGrammar;
export default grammar;
