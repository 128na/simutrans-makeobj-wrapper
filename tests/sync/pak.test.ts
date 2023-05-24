import { pathExistsSync, removeSync } from 'fs-extra';
import Makeobj from '../../src/Makeobj';

test('pak', () => {
  const output = './tests/__files__/pak/test.pak';
  expect(pathExistsSync(output)).toBeFalsy();

  const makeobj = new Makeobj(process.env.MAKEOBJ_PATH);
  const result = makeobj.pak(128, output, './tests/__files__/pak/test.dat');
  expect(result.isSuccess).toBeTruthy();
  expect(result.stdout).toContain('test.pak');
  expect(pathExistsSync(output)).toBeTruthy();

  removeSync(output);
});
