import { pathExistsSync, removeSync } from 'fs-extra';
import MakeobjAsync from '../../src/MakeobjAsync';

test('pak', async () => {
  const output = './tests/__files__/pak/test.pak';
  expect(pathExistsSync(output)).toBeFalsy();

  const makeobj = new MakeobjAsync(process.env.MAKEOBJ_PATH);
  const result = await makeobj.pak(128, output, './tests/__files__/pak/test.dat');
  expect(result.isSuccess).toBeTruthy();
  expect(result.stdout).toContain('test.pak');
  expect(pathExistsSync(output)).toBeTruthy();

  removeSync(output);
});
