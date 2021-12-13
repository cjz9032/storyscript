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
  Declare(Comment, parenthesesL, decItemsList, parenthesesR, DDPercent, DeclareDetailsWrap) {
    var ret: any[] = [];
    const declareDetails = DeclareDetailsWrap.asIteration().children.map((c) => {
      return c.parse();
    });
    const dPercent = DDPercent.parse();

    const declareFns = decItemsList.parse();

    return {
      declareDetails,
      dPercent,
      declareFns,
    };
  },
  decItems(list) {
    const tmp = list.asIteration().children.map((c) => {
      return c.parse();
    });
    return tmp;
  },
  functionName(atSymbol, chars) {
    const n = chars.parse();
    return '@' + n;
  },
  DDPercent(unit, number) {
    const tmp = number.parse();
    return tmp;
  },
  DeclareDetails(plus, number) {
    const tmp = number.parse();
    return '+' + tmp;
  },
};
