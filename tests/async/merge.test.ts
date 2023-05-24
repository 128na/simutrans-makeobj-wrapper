import { pathExistsSync, removeSync } from 'fs-extra';
import MakeobjAsync from '../../src/MakeobjAsync';

test('merge', async () => {
  const pakfiles = ['./tests/__files__/merge/citycar.test1.pak', './tests/__files__/merge/vehicle.test2.pak',];
  pakfiles.map(pakfile => expect(pathExistsSync(pakfile)).toBeTruthy());

  const output = './tests/__files__/merge/merged.pak';
  expect(pathExistsSync(output)).toBeFalsy();

  const makeobj = new MakeobjAsync(process.env.MAKEOBJ_PATH);
  const result = await makeobj.merge(output, ...pakfiles);
  expect(result.isSuccess).toBeTruthy();
  expect(result.stdout).toContain("merged.pak");

  removeSync(output);
});
