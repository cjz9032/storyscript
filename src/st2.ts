/*!
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

import variable from './libs/variable';
import parser from './libs/parser';
import { IfBlock, WhileBlock, ForeachBlock } from './libs/block';

export default class StoryScript {
  private BLOCKSTACK: any[];
  private CURRENTBLOCK: IfBlock | WhileBlock | ForeachBlock | null;
  constructor(private onGlobalChanged: (() => void) | null = null) {
    this.BLOCKSTACK = [];
    this.CURRENTBLOCK = null;
  }
  load(string: string) {
    const result = parser.parse(string);
    const system = new IfBlock(result);
    this.CURRENTBLOCK = system;
    this.BLOCKSTACK = [];
    // variable.reset();
  }
  [Symbol.iterator]() {
    return this;
  }
  next(): any {
    if (!this.CURRENTBLOCK) {
      throw new Error('CURRENTBLOCK null');
    }
    let { value, done } = this.CURRENTBLOCK.next();
    if (done) {
      var CURRENTBLOCK = this.BLOCKSTACK.pop();
      if (CURRENTBLOCK) {
        this.CURRENTBLOCK = CURRENTBLOCK;
        variable.popScope();
        return this.next();
      } else {
        return { done: true };
      }
    } else {
      const retValue = this.handleScript(value);
      if (retValue) {
        return { value: retValue, done: false };
      } else {
        // handleLogic will return undefined, so should exec next line
        return this.next();
      }
    }
  }
  handleScript(argLine: any) {
    // deep copy
    const line = Object.assign({}, argLine);

    if (line.type === 'content') {
      return this.handleContent(line);
    } else if (line.type === 'logic') {
      return this.handleLogic(line);
    } else if (line.type === 'comment') {
      return null;
    } else {
      throw `Unrecognized type ${line.type}`;
    }
  }

  handleContent(line: any) {
    const params = line.params;
    const keys = Object.keys(params);
    for (const key of keys) {
      params[key] = params[key].value;
    }
    return line;
  }

  handleLogic(line: any) {
    switch (line.name) {
      case 'if':
        return this.handleLogic_IF(line);
        break;
      case 'while':
        return this.handleLogic_WHILE(line);
        break;
      case 'foreach':
        return this.handleLogic_FOREACH(line);
        break;
      case 'let':
        return this.handleLogic_LET(line);
        break;
      default:
        throw `Unrecognized name ${line.name}`;
    }
  }

  handleLogic_IF(line: any) {
    let blockIndex = 0;
    for (const condition of line.conditions) {
      if (variable.calc(condition)) {
        break;
      } else {
        blockIndex++;
      }
    }
    this.BLOCKSTACK.push(this.CURRENTBLOCK);
    const blockData = line.blocks[blockIndex];
    const block = new IfBlock(blockData, blockIndex);
    this.CURRENTBLOCK = block;
    // variable.pushScope();
  }

  handleLogic_WHILE(line: any) {
    const result = variable.calc(line.condition);
    if (result) {
      this.BLOCKSTACK.push(this.CURRENTBLOCK);
      const blockData = line.block;
      const block = new WhileBlock(blockData, line.condition);
      this.CURRENTBLOCK = block;
    }
    // variable.pushScope();
  }

  handleLogic_FOREACH(line: any) {
    const children = variable.calc(line.children);
    if (children instanceof Array) {
      this.BLOCKSTACK.push(this.CURRENTBLOCK);
      const blockData = line.block;
      const block = new ForeachBlock(blockData, line.child, line.children);
      this.CURRENTBLOCK = block;
    } else {
      throw '[Foreach] Children must be a array';
    }
    // variable.pushScope();
  }

  handleLogic_LET(line: any) {
    if (line.left.prefix === '$') {
      this.onGlobalChanged && this.onGlobalChanged();
    }
    variable.assign(line.left.value, line.left.prefix, line.right, line.explicit);
  }
}

// var userInput = `
// [bg file="kodoyuri/data.xp3/bgimage/white.png" trans]
// [flow wait time=200]
// #if x>1 && ((x < 10 && z >= 100) || z) || n == 'xxx'
// [text set bgfile="kodoyuri/data.xp3/image/massage_bg2.png" color=0xffffff]
// [text set speed=50]
// #elseif y <= 0x11
// [bg file="kodoyuri/data.xp3/bgimage/h01.png" trans]
// #elseif y == (x + (1 - 1) * -2) / +4
// [bg file="kodoyuri/data.xp3/bgimage/white.png" trans]
// #else
// #end
// #while x < 0
// [flow wait time=200]
// #end
//
// #foreach child in children
// [text set speed=50]
// #end
//
// [text show trans]`;
//
var userInput = `
#let x = 1
#$open = false
#let xxx = "sdfdsf"
#if x > 0 && xxx == 'sdfdsf'
  #let x = 2
  #let $open = 123
  [name flagA]
  #x = 3
#else
  [name flagB]
#end

#let i = 0
#while i < 5
  [name flagX]
  #i = i + 1
#end
测试 一下 sdjsdfj /c  /* 注释 */
// [wb]545第二行
#let y = false
/*
 * 其他测试
 123
 */
#let aaaa = 11
[name flagC]
#aaaa = aaaa ^ 2
`;

const story = new StoryScript();
story.load(userInput);

let i = 0;
// @ts-ignore
for (var value of story) {
  console.log(value);
}

console.log(variable.dump());
