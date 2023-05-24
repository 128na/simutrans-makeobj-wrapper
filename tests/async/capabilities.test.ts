import MakeobjAsync from '../../src/MakeobjAsync';

test('capabilities', async () => {
  const makeobj = new MakeobjAsync(process.env.MAKEOBJ_PATH);
  const result = await makeobj.capabilities();
  expect(result.isSuccess).toBeTruthy();
  expect(result.stdout).toContain('way');
});
