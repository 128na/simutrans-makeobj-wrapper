import { pathExistsSync } from 'fs-extra';
import Makeobj from '../src/Makeobj';

test('list', () => {
  const pakfile = './tests/list/test.pak';
  expect(pathExistsSync(pakfile)).toBeTruthy();

  const makeobj = new Makeobj(process.env.MAKEOBJ_PATH);
  const result = makeobj.list(pakfile);
  expect(result.isSuccess).toBeTruthy();
  expect(result.stdout).toContain('citycar');
});
