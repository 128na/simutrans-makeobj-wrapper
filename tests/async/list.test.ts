import { pathExistsSync } from 'fs-extra';
import MakeobjAsync from '../../src/MakeobjAsync';

test('list', async () => {
  const pakfile = './tests/__files__/list/test.pak';
  expect(pathExistsSync(pakfile)).toBeTruthy();

  const makeobj = new MakeobjAsync(process.env.MAKEOBJ_PATH);
  const result = await makeobj.list(pakfile);
  expect(result.isSuccess).toBeTruthy();
  expect(result.stdout).toContain('citycar');
});
