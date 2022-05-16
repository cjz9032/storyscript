import { convertDeclare, convertFns } from './other';
import StoryScript from '../src/st2';
var userInput = `
(@buy @sell )
%100
+40
+1
[@main]
#IF
random 10
#ACT
goto @QUEST
#ELSEACT
goto @normal
[@QUEST]
#IF
check [350] 1
#ACT
goto @Q350
break
#IF
check [303] 1
#ACT
goto @Q303
#ELSEACT
goto @normal
[@normal]
欢迎光临，有什么事情需要我帮忙吗？\\ \\
 <买/@buy>肉\\ 
 <卖/@sell>肉\\
 <离开/@exit>
`;

const story = new StoryScript();
const res = story.load(userInput);

var str = `
public class NPC_SCT_${'a'}: MonoBehaviour
{
  // props
  ${convertDeclare(res.declare, res)}
  // fns that 
  ${convertFns(
    res.scripts.filter((t) => t.type === 'FnBlocks'),
    res
  )}
  // todo goods
}
`;
console.log(str);
