import StoryScript from '../src/st2';
import variable from '../src/libs/variable';

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    var userInput = `
    (@buy  @sell)
    %123
    +1 +2
    [@a]
    123
    456
    [~@a]
    123
    456
  `;

    const story = new StoryScript();
    story.load(userInput);

    const aa = story.iters();

    console.log(variable.dump());

    expect(true).toBeTruthy();
  });

  // it('DummyClass is instantiable', () => {
  //   expect(new DummyClass()).toBeInstanceOf(DummyClass);
  // });
});
