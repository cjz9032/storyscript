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

export default {
  Scripts(a, b) {
    const tmp = a.parse();
    const scripts = b.parse();
    return {
      declare: tmp[0],
      scripts,
    };
  },
  // Scripts_Declare(n) {
  //   // var ret: any[] = [];
  //   // for (var child of n.children) {
  //   //   ret.push(child.parse());
  //   // }
  //   const tmp = n.parse();
  //   return {
  //     Declare: tmp[0],
  //   };
  // },
  // Scripts_LogicBlock(n) {
  //   var ret: any[] = [];
  //   for (var child of n.children) {
  //     ret.push(child.parse());
  //   }
  //   return ret;
  // },
  // string_doubleQuote(quoteA, stringContent, quoteB) {
  //   return stringContent.parse();
  // },
};
