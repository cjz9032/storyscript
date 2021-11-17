import StoryScript from '../src/st2';
import variable from '../src/libs/variable';

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    var userInput = `
    #let x = 1
    #$open = false
    #let xxx = "sdfdsf"
    #if x > 0 && xxx == 'sdfdsf'
      #let x = 2
      #let $open = 123
      [name flagA]
      #x = 3
    #else
      [name flagB]
    #end
  
    #let i = 0
    #while i < 5
      [name flagX]
      #i = i + 1
    #end
    测试 一下 sdjsdfj /c  /* 注释 */
    // [wb]545第二行
    #let y = false
    /*
    * 其他测试
    123
    */
    #let aaaa = 11
    [name flagC]
    #aaaa = aaaa ^ 2
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
