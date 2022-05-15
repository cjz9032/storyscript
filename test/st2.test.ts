import StoryScript from '../src/st2';
// import variable from '../src/libs/variable';
import fs from 'fs-extra';
import path from 'path';
import klawSync from 'klaw-sync';
import { convertDeclare, convertFns } from './other';
/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    const paths = klawSync(path.join(__dirname, '../src/dist'));
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
        let res: any = null;
        try {
          res = story.load(txt);
        } catch (e) {
          console.log(p.path, e);
          throw e;
        }
        // const aa = story.iters();
        const id = path.basename(p.path, path.extname(p.path)).replace('-', '_');

        // todo id map to name or not?

        var str = `
        public class NPC_SCT_${id}: MonoBehaviour
        {
          // props
          ${convertDeclare(res.declare, res)}
          // fns
          ${convertFns(res.declare, res)}
        }
        `;

        console.log(str);

        // console.log(variable.dump());
      });

    expect(true).toBeTruthy();
  });

  // it('DummyClass is instantiable', () => {
  //   expect(new DummyClass()).toBeInstanceOf(DummyClass);
  // });
});
