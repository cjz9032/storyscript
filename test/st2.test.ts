import StoryScript from '../src/st2';
import variable from '../src/libs/variable';
import fs from 'fs-extra';
import path from 'path';
import klawSync from 'klaw-sync';
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
    txts.forEach(({ txt, p }) => {
      const story = new StoryScript();
      try {
        story.load(txt);
      } catch (e) {
        console.log(p.path, e);
        throw e;
      }
      const aa = story.iters();

      // console.log(variable.dump());
    });

    expect(true).toBeTruthy();
  });

  // it('DummyClass is instantiable', () => {
  //   expect(new DummyClass()).toBeInstanceOf(DummyClass);
  // });
});
