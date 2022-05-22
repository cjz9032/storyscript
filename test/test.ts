import { convertDeclare, convertFns } from './other';
import StoryScript from '../src/st2';
import clipboard from 'clipboardy';
import fs from 'fs-extra';
import path from 'path';
import klawSync from 'klaw-sync';

var userInput = fs.readFileSync(path.join(__dirname, '../src/dist/test.txt'), 'utf8');

const story = new StoryScript();
const res = story.load(userInput);

const paths = klawSync(path.join(__dirname, '../src/dist'));

const resultMap: any[] = [];
const txts = paths.map((p) => {
  return {
    txt: fs.readFileSync(p.path, 'utf8'),
    p,
  };
});
txts
  .filter((t) => {
    return t.p.path.includes('test.txt');
  })
  .forEach(({ txt, p }) => {
    const story = new StoryScript();
    let res: StoryModel | null = null;
    try {
      res = story.load(txt);
    } catch (e) {
      console.log(p.path, e);
      throw e;
    }
    if (!res) return;
    // const aa = story.iters();
    const id = path.basename(p.path, path.extname(p.path)).replace('-', '_');
    // todo id map to name or not?
    const fnBlocks = res.scripts.filter((t) => t.type === 'FnBlocks') as FnBlocks[];
    const goodsBlock = res.scripts.filter((t) => t.type === 'GoodsBlock') as GoodsBlock[];
    var str = `
        public class NpcScript_${id}: NpcScriptBase
        {
          // props
          ${convertDeclare(res.declare, res)}
          // fns that 
          ${convertFns(fnBlocks, res)}
          // todo goods
          ${convertGoods(goodsBlock[0], res)}
        }
        `;
    resultMap.push([id, str]);

    // console.log(str);

    // console.log(variable.dump());
  });

// clipboard.writeSync(str);
