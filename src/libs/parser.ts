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
import ohm from 'ohm-js';
import * as actions from '../actions';
import contents from '../ohm/bks.ohm';

var myGrammar = ohm.grammar(contents);
var mySemantics = myGrammar.createSemantics();
mySemantics.addOperation<any>('parse', {
  // AddExp_plus(x, _, y) {
  //   return x.eval() + y.eval();
  // },
  ...actions,
} as any);

export default {
  parse(string) {
    var m = myGrammar.match(string);
    if (m.succeeded()) {
      return mySemantics(m).parse();
    } else {
      throw m.message;
    }
  },
};
