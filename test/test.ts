import { convertDeclare, convertFnMaps, convertFns, convertGoods } from './other';
import StoryScript from '../src/st2';
import clipboard from 'clipboardy';
import fs from 'fs-extra';
import path from 'path';
import klawSync from 'klaw-sync';

const isTest = false;
// var userInput = fs.readFileSync(path.join(__dirname, '../src/dist/test.txt'), 'utf8');

const story = new StoryScript();
// const res = story.load(userInput);

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
    return isTest ? t.p.path.includes('test.txt') : !t.p.path.includes('test.txt');
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
          // declare
          ${convertDeclare(res.declare, res)}
          // goods
          ${convertGoods(goodsBlock[0], res)}
          // fns 
          ${convertFns(fnBlocks, res)}
          // btns maps
          ${convertFnMaps(fnBlocks, res)}
        }
        `;
    resultMap.push([id, str]);

    // console.log(str);
  });

// write to file
fs.writeFileSync(
  path.join(__dirname, './scBaseNameMap.txt'),
  resultMap
    .map(
      (t) => `{"${t[0]}", new NpcScript_${t[0]}()}
  `
    )
    .join(',')
);

fs.writeFileSync(
  path.join(__dirname, './scAll.txt'),
  `
  #region
  ${resultMap.map((t) => t[1]).join('\n')}
  #endregion
  `
);
// clipboard.writeSync(str);
