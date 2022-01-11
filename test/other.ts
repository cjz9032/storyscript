export const convertDeclare = (declare: any, res: any) => {
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
