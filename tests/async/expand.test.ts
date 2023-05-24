import { readFileSync } from 'fs';
import { pathExistsSync, removeSync } from 'fs-extra';
import MakeobjAsync from '../../src/MakeobjAsync';

// makeobj for linux version is 60.2, required 60.5 or higher!
test.skip('expand', async () => {
  const datfiles = ['./tests/__files__/expand/test1.dat', './tests/__files__/expand/test2.dat',];
  datfiles.map(pakfile => expect(pathExistsSync(pakfile)).toBeTruthy());

  const output = './tests/expand/expand.dat';
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
