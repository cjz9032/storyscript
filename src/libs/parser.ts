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
import * as _ from 'lodash';
import * as ohm from 'ohm-js';
import * as actions from '../actions';
import contents from '../ohm/bks.ohm';
import myGrammar, { BKSActionDict } from '../ohm/bks-template.ohm-bundle';
// var myGrammar = ohm.grammar(contents);

const actionsFlattened = _.reduce(
  actions,
  (prev, curr) => {
    return Object.assign(prev, curr);
  },
  {}
);

var mySemantics = myGrammar.createSemantics();
mySemantics.addOperation<any>('parse', {
  ...actions.Exp,
  ...actions.base,
  ...actions.Comment,
  ...actions.Declare,
  ...actions.LogicBlock,
  // asd(_) {
  //   return parseFloat(this.sourceString);
  // },
});

export default {
  parse(string) {
    var matchResult = myGrammar.match(string);
    if (matchResult.succeeded()) {
      var aa = mySemantics(matchResult);
      return aa.parse();
    } else {
      throw new Error(matchResult.message);
    }
  },
};
