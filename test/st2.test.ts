import StoryScript from '../src/st2';
import variable from '../src/libs/variable';

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    var userInput = `

    [@a]
    #SAy
    你对那种技能书感兴趣？\ \
战士可以学习的<技能/@help1>\
欢迎<$USERNAME>光临赌场。\

道士可以学习的<技能/@help2>\
术士可以学习的<技能/@help3>\ 123
    asdsdfsd
    #IF
    check [315] 0
    #ACT
    SET [315] 1
    #SAY
    asdsa
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
