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

const _cbFnCall = (fnName, args) => {
  // more detail opt
  return `${fnName}(${args.map((arg, idx) => `"${arg.replaceAll('\n', '')}"`).join(',')});`;
};

const convertSay = (say: SayContentWrap, res: StoryModel) => {
  const { content: act } = say;
  return act
    .map((content) => {
      if (content.type === 'SayText') {
        return _cbFnCall('Say2Content', ['text', content.text]);
      } else if (content.type === 'SayBindingWrap') {
        if (content.sayBindingBtn) {
          return _cbFnCall('Say2Content', [
            'sayBindingBtn',
            content.sayBindingBtn.text,
            content.sayBindingBtn.fnInfo.name,
          ]);
        } else if (content.sayStrBindingLVar) {
          return _cbFnCall('Say2Content', ['sayStrBindingLVar', content.sayStrBindingLVar.lVar]);
        } else if (content.sayBindingText) {
          return _cbFnCall('Say2Content', ['sayBindingText', content.sayBindingText]);
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
  const { content, type } = act;
  if (content.type === 'Goto') {
    return `
      Goto(${content.fnInfo.name});
    `;
  } else if (content.type === 'XXACT') {
    // todo action more
  } else {
    console.error('no convertAct', content);
  }
};

export const convertFns = (fnBlocks: FnBlocks[], res: StoryModel) => {
  return fnBlocks.map((fnBlock) => {
    return fnBlock.fnBlocks
      .map((fnBlock) => {
        return `
      public void ${fnBlock.info.name}()
      {
        ${fnBlock.content.directs.map((direct) => {
          if (direct.type === 'ActContent') {
            return convertAct(direct, res);
          } else if (direct.type === 'SayContent') {
            return convertSay(direct, res);
          } else {
            console.error('no convertFns', direct);
          }
        })}
      }`;
      })
      .join('\n\n');
  });
  // return declare
  //   ? `
  //     public int[] declareFns = new string[] {
  //       ${declare.declareFns ? declare.declareFns.map((d, idx) => `"${d}"`).join(',') : ''}
  //     };
  //   `
  //   : '';
};
