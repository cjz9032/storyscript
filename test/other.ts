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
  return `${fnName}(${args.map((arg, idx) => `${typeof arg === 'number' ? arg : `"${arg}"`}`).join(',')})`;
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
        if (content.sayBindingBtn) {
          return _sayCbFnCall('Say2Content', [
            'sayBindingBtn',
            content.sayBindingBtn.text,
            content.sayBindingBtn.fnInfo.name,
          ]);
        } else if (content.sayStrBindingLVar) {
          return _sayCbFnCall('Say2Content', ['sayStrBindingLVar', content.sayStrBindingLVar.lVar]);
        } else if (content.sayBindingText) {
          return _sayCbFnCall('Say2Content', ['sayBindingText', content.sayBindingText]);
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
  return content
    .map((t) => {
      if (t.type === 'Goto') {
        return `
      // goto
      ${t.fnInfo.name}();
      `;
      } else if (t.type === 'Break') {
        return `
      // break
      return;`;
      } else if (t.type === 'TakeItem') {
        return _commonCbFnCallWithEnd('SuperSc.TakeItem', [t.itemName, t.quantity]);
      } else if (t.type === 'SetGVar') {
        return _commonCbFnCallWithEnd('SuperSc.SetGVar', [t.name, t.value]);
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
        if (t.type === 'RandomIs') {
          return _commonCbFnCall('SuperSc.RandomIs', [t.detect]);
        } else if (t.type === 'CheckGVar') {
          return _commonCbFnCall('SuperSc.CheckGVar', [t.name, t.value]);
        } else if (t.type === 'Checkgold') {
          return _commonCbFnCall('SuperSc.Checkgold', [t.quantity]);
        } else {
          console.error(t);
          throw new Error('no convertExp');
        }
      })
      .join(' && ');
  }
};

export const convertFns = (fnBlocks: FnBlocks[], res: StoryModel) => {
  return fnBlocks.map((fnBlock) => {
    return fnBlock.fnBlocks
      .map((fnBlock) => {
        return `
      public ${fnBlock.info.name === '@main' ? 'override' : ''} void ${fnBlock.info.name}()
      {
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
      }`;
      })
      .join('\r\n');
  });
  // return declare
  //   ? `
  //     public int[] declareFns = new string[] {
  //       ${declare.declareFns ? declare.declareFns.map((d, idx) => `"${d}"`).join(',') : ''}
  //     };
  //   `
  //   : '';
};

export const convertGoods = (goodsBlock: GoodsBlock, res: StoryModel) => {
  return goodsBlock.goodsItemList.map((b) => {
    return `${b.itemName} ${b.price}`;
  });
};
