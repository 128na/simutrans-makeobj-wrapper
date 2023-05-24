import Makeobj from '../../src/Makeobj';

test('capabilities', () => {
  const makeobj = new Makeobj(process.env.MAKEOBJ_PATH);
  const result = makeobj.capabilities();
  expect(result.isSuccess).toBeTruthy();
  expect(result.stdout).toContain('way');
});
