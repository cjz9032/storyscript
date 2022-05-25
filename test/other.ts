import { sortBy, flattenDeep } from 'lodash';
export const convertDeclare = (declare: StoryDeclare, res: StoryModel) => {
  return declare
    ? `
    public int dPercent = ${res.declare.dPercent || 100};

    public int[] declareDetails = new int[] { 
        ${declare.declareDetails ? declare.declareDetails.map((d, idx) => d).join(',') : ''}
      };  

    public string[] declareFns = new string[] { 
      ${declare.declareFns ? declare.declareFns.map((d, idx) => `"${d}"`).join(',') : ''}
    }; 
    `
    : '';
};

const _sayCbFnCall = (fnName, args) => {
  // more detail opt
  return `${fnName}(t, ${args
    .map((arg, idx) => `"${arg.replaceAll(/\\r\\n\s+/g, '\\r\\n').replaceAll('\n', '')}"`)
    .join(',')});`;
};

const _commonCbFnCall = (fnName, args) => {
  // more detail opt
  return `${fnName}(${args
    .map((arg, idx) => `${arg === null ? 'null' : typeof arg === 'number' ? arg : `"${arg}"`}`)
    .join(',')})`;
};
const _commonCbFnCallWithEnd = (a, b) => {
  return _commonCbFnCall(a, b) + ';';
};

const convertSay = (say: SayContentWrap, res: StoryModel) => {
  const { content: act } = say;
  return act
    .map((content) => {
      if (content.type === 'SayText') {
        return _sayCbFnCall('Say2Content', ['text', content.text]);
      } else if (content.type === 'SayBindingWrap') {
        const cc = content.content;
        if (cc.type === 'SayBindingBtn') {
          return _sayCbFnCall('Say2Content', ['sayBindingBtn', cc.text, cc.fnInfo.name]);
        } else if (cc.type === 'SayStrBindingLVar') {
          return _sayCbFnCall('Say2Content', ['sayStrBindingLVar', cc.lVar]);
        } else if (cc.type === 'sayBindingText') {
          return _sayCbFnCall('Say2Content', ['sayBindingText', cc.value]);
        }
      } else if (content.type === 'comment') {
        return `// ${content.value}`;
      } else {
        console.error('no convertSay', content);
      }
    })
    .join('\r\n');
};

const convertAct = (act: ActContentWrap, res: StoryModel) => {
  const { content } = act;
  return (content || [])
    .map((t) => {
      if (t.type === 'CloseWindow') {
        return `
        SuperSc.CloseWindow();
        `;
      } else if (t.type === 'Goto') {
        return `
      // goto
      ${t.fnInfo.name}();
      `;
      } else if (t.type === 'Break') {
        return `
      // break
      return;`;
      } else if (t.type === 'BreakTimeRecall') {
        return `
        SuperSc.BreakTimeRecall();
        `;
      } else if (t.type === 'TakeItem') {
        return _commonCbFnCallWithEnd('SuperSc.TakeItem', [t.itemName, t.quantity]);
      } else if (t.type === 'SetGVar') {
        return _commonCbFnCallWithEnd('SuperSc.SetGVar', [t.name, t.value]);
      } else if (t.type === 'MoveMapPos') {
        return _commonCbFnCallWithEnd('SuperSc.MoveMapPos', [t.mapName, t.x, t.y]);
      } else if (t.type === 'Takecheckitem') {
        return _commonCbFnCallWithEnd('SuperSc.Takecheckitem', []);
      } else if (t.type === 'GiveItem') {
        return _commonCbFnCallWithEnd('SuperSc.GiveItem', [t.itemName, t.quantity]);
      } else if (t.type === 'ResetGVar') {
        return _commonCbFnCallWithEnd('SuperSc.ResetGVar', [t.gVar, t.gVarRange]);
      } else if (t.type === 'TakeItemw_normal') {
        return _commonCbFnCallWithEnd('SuperSc.TakeItemw_normal', [t.itemName, t.quantity]);
      } else if (t.type === 'TakeItemw_wears') {
        return _commonCbFnCallWithEnd('SuperSc.TakeItemw_wears', [t.WearPlaceName]);
      } else if (t.type === 'MoveMap') {
        return _commonCbFnCallWithEnd('SuperSc.MoveMap', [t.mapName]);
      } else if (t.type === 'comment') {
        return `// ${t.value}`;
      } else if (t.type === 'MoveLVar') {
        return _commonCbFnCallWithEnd('SuperSc.MoveLVar', [t.lVar, t.lVarRange]);
      } else if (t.type === 'MoveLVarRandom') {
        return _commonCbFnCallWithEnd('SuperSc.MoveLVarRandom', [t.lVar, t.lVarRange]);
      } else if (t.type === 'IncLVar') {
        return _commonCbFnCallWithEnd('SuperSc.IncLVar', [t.lVar, t.lVarRange]);
      } else if (t.type === 'DecLVar') {
        return _commonCbFnCallWithEnd('SuperSc.DecLVar', [t.lVar, t.lVarRange]);
      } else if (t.type === 'Playdice') {
        return _commonCbFnCallWithEnd('SuperSc.Playdice', [t.number, t.fnInfo.name]);
      } else if (t.type === 'BatchDelay') {
        return _commonCbFnCallWithEnd('SuperSc.BatchDelay', [t.number]);
      } else if (t.type === 'Addbatch') {
        return _commonCbFnCallWithEnd('SuperSc.Addbatch', [t.mapName]);
      } else if (t.type === 'Batchmove') {
        return _commonCbFnCallWithEnd('SuperSc.Batchmove', []);
      } else if (t.type === 'TimeRecallByMins') {
        return _commonCbFnCallWithEnd('SuperSc.TimeRecallByMins', [t.quantity]);
      } else if (t.type === 'SumVar_SumTwoVars') {
        return _commonCbFnCallWithEnd('SuperSc.SumVar_SumTwoVars', [t.lVar, t.lVar2]);
      } else if (t.type === 'SumVar_SumToTarget') {
        return _commonCbFnCallWithEnd('SuperSc.SumVar_SumToTarget', [t.lVar]);
      } else if (t.type === 'ExchangeMap') {
        return _commonCbFnCallWithEnd('SuperSc.ExchangeMap', [t.mapName]);
      } else if (t.type === 'Recallmap') {
        return _commonCbFnCallWithEnd('SuperSc.Recallmap', [t.mapName]);
      } else if (t.type === 'MonClear') {
        return _commonCbFnCallWithEnd('SuperSc.MonClear', [t.mapName]);
      } else if (t.type === 'Param1') {
        return _commonCbFnCallWithEnd('SuperSc.Param1', [t.mapName]);
      } else if (t.type === 'Param2') {
        return _commonCbFnCallWithEnd('SuperSc.Param2', [t.x]);
      } else if (t.type === 'Param3') {
        return _commonCbFnCallWithEnd('SuperSc.Param3', [t.y]);
      } else if (t.type === 'MonGen') {
        return _commonCbFnCallWithEnd('SuperSc.MonGen', [t.monsterName, t.range, t.quantity]);
      } else {
        console.error(content);
        throw new Error('no convertAct');
      }
    })
    .join('\r\n');
};

const convertAll = (acs: ActionBlock[], res: StoryModel) => {
  return acs
    ? acs
        .map((direct) => {
          if (direct.type === 'ActContent') {
            return convertAct(direct, res);
          } else if (direct.type === 'SayContent') {
            return convertSay(direct, res);
          } else {
            console.error(direct);
            throw new Error('no convertFns');
          }
        })
        .join('\r\n')
    : '';
};

const convertExp = (exp: IF['exp'], res: StoryModel) => {
  if (typeof exp === 'boolean') {
    return exp.toString();
  } else {
    return exp
      .map((t) => {
        if (t.type) {
          const sort = [
            'mapName',
            'name',
            'itemName',
            'value',
            'quantity',
            'dayTime',
            'WearPlaceName',
            'lVar',
            'lVarRange',
            'day',
            'hour',
            'hour2',
          ];

          if (t.type) {
            let args: any[] = [];
            for (const s in t) {
              if (s === 'type') continue;
              if (!sort.includes(s)) {
                console.error(s);
                throw new Error('no args');
              }
              args.push([s, t[s]]);
            }
            // sort
            args = sortBy(args, [
              function (o) {
                return sort.indexOf(o[0]);
              },
            ]);
            if (sort)
              return `
                // ${args.map((t) => [0]).join(',')}
                ${_commonCbFnCall(
                  `SuperSc.${t.type}`,
                  args.map((t) => t[1])
                )}
              `;
          }
        } else {
          console.error(t);
          throw new Error('no convertExp');
        }
      })
      .join(' && ');
  }
};

export const convertFns = (fnBlocks: FnBlocks[], res: StoryModel) => {
  return fnBlocks
    .map((fnBlock) => {
      return fnBlock.fnBlocks
        .map((fnBlock) => {
          return `
      public ${fnBlock.info.name === '@main' ? 'override' : ''} void ${fnBlock.info.name}()
      {
        onFnStart();
        // directs
        ${convertAll(fnBlock.content.directs, res)}
        // ifs
        ${(fnBlock.content.ifs || [])
          .map((tif) => {
            if (tif.type === 'IfWrap_UselessIf') {
              return `
            // IfWrap_UselessIf
            ${convertAll(tif.then, res)}`;
            } else if (tif.type === 'IfWrap_IfElse') {
              return `
            // IfWrap_IfElse
            if(${convertExp(tif.exp, res)})
            {
              ${convertAll(tif.then, res)}
            }
            else {
              ${convertAll(tif.else, res)}
            }
            `;
            }
          })
          .join('\r\n')}
          onFnEnd();
      }`;
        })
        .join('\r\n');
    })
    .join('\r\n');
  // return declare
  //   ? `
  //     public int[] declareFns = new string[] {
  //       ${declare.declareFns ? declare.declareFns.map((d, idx) => `"${d}"`).join(',') : ''}
  //     };
  //   `
  //   : '';
};

export const convertFnMaps = (fnBlocks: FnBlocks[], res: StoryModel) => {
  const all = flattenDeep(
    fnBlocks.map((fnBlock) => {
      return fnBlock.fnBlocks.map((fnBlock) => {
        return fnBlock.info.name;
      });
    })
  );
  return `
  public override void callFnMaps(string fnName){
    switch(fnName){
      ${all.map((fnName) => `case "${fnName}": ${fnName}(); break;`).join('\r\n')}
      default:
        base.@quit();
        break;
    }
  }
  `;
};

export const convertGoods = (goodsBlock: GoodsBlock, res: StoryModel) => {
  return `
  public static List<GoodsItem> goodsItems = new List<GoodsItem>(new GoodsItem[]
    {
      ${(goodsBlock?.goodsItemList || [])
        .map((b) => {
          return `new ${_commonCbFnCall('GoodsItem', [b.itemName, b.price, b.time])},`;
        })
        .join('\r\n')}
    }
  );
  `;
};
