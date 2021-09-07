import { pathExistsSync, removeSync } from 'fs-extra';
import Makeobj from '../src/Makeobj';

test('merge', () => {
  const pakfiles = ['./tests/merge/citycar.test1.pak', './tests/merge/vehicle.test2.pak',];
  pakfiles.map(pakfile => expect(pathExistsSync(pakfile)).toBeTruthy());

  const output = './tests/merge/merged.pak';
  expect(pathExistsSync(output)).toBeFalsy();

  const makeobj = new Makeobj(process.env.MAKEOBJ_PATH);
  const result = makeobj.merge(output, ...pakfiles);
  expect(result.isSuccess).toBeTruthy();
  expect(result.stdout).toContain("merged.pak");

  removeSync(output);
});
