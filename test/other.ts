export const convertDeclare = (declare: StoryDeclare, res: StoryModel) => {
  return declare
    ? `
    public int dPercent = ${res.declare.dPercent || 100};

    public int[] declareDetails = new int[] { 
        ${declare.declareDetails ? declare.declareDetails.map((d, idx) => d).join(',') : ''}
      };  

      public int[] declareFns = new string[] { 
        ${declare.declareFns ? declare.declareFns.map((d, idx) => `"${d}"`).join(',') : ''}
      }; 
    `
    : '';
};

const convertSayStrBindingLVar = (say: SayStrBindingLVar, res: StoryModel) => {
  return `
    Say2Content(${say.lVar});
  `;
};

const convertSay = (say: SayContentWrap, res: StoryModel) => {
  const { content } = say;
  if (content.type === 'SayText') {
    return `
      Say2Content(${content.text});
    `;
  } else if (content.type === 'SayBindingWrap') {
    return `
    Say2Content(${content.sayBindingBtn});
    `;
  } else if (content.type === 'comment') {
    return `// ${content.value}`;
  }
};

export const convertFns = (fnBlocks: FnBlocks[], res: StoryModel) => {
  return fnBlocks.map((fnBlock) => {
    return fnBlock.fnBlocks.map((fnBlock) => {
      return `
      public void ${fnBlock.info.name}(int[] args)
      {
        ${fnBlock.content.directs.map((direct) => {
          if (direct.type === 'ActContent') {
          } else if (direct.type === 'SayContent') {
            return convertSay(direct, res);
          } else {
            console.error('no ');
          }
        })}
      `;
    });
  });
  // return declare
  //   ? `
  //     public int[] declareFns = new string[] {
  //       ${declare.declareFns ? declare.declareFns.map((d, idx) => `"${d}"`).join(',') : ''}
  //     };
  //   `
  //   : '';
};
