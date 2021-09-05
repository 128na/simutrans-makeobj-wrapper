import Makeobj from '../src/Makeobj';

test('makeobj pak', async () => {
  const makeobj = new Makeobj();
  const result = makeobj.pak('output.pak', ['example.dat'], 128);
  expect(result.isSuccess).toBeTruthy();
  expect(result.stdout).toContain('output.pak');
});

