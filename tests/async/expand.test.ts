import { readFileSync } from 'fs';
import { pathExistsSync, removeSync } from 'fs-extra';
import MakeobjAsync from '../../src/MakeobjAsync';

test('expand', async () => {
  const datfiles = ['./tests/__files__/expand/test1.dat', './tests/__files__/expand/test2.dat',];
  datfiles.map(pakfile => expect(pathExistsSync(pakfile)).toBeTruthy());

  const output = './tests/__files__/expand/expand.dat';
  expect(pathExistsSync(output)).toBeFalsy();

  const makeobj = new MakeobjAsync(process.env.MAKEOBJ_PATH);
  const result = await makeobj.expand(output, ...datfiles);
  expect(result.isSuccess).toBeTruthy();
  expect(result.stdout).toContain("expand.dat");

  const file = readFileSync(output).toString();
  expect(file).toContain('obj=way');
  expect(file).toContain('obj=building');

  removeSync(output);
});
