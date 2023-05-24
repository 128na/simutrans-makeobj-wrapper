import { pathExistsSync } from 'fs-extra';
import Makeobj from '../../src/Makeobj';

test('dump', () => {
  const pakfile = './tests/__files__/list/test.pak';
  expect(pathExistsSync(pakfile)).toBeTruthy();

  const makeobj = new Makeobj(process.env.MAKEOBJ_PATH);
  const result = makeobj.dump(pakfile);
  expect(result.isSuccess).toBeTruthy();
  // name=test1
  expect(result.stdout).toContain("000 TEXT-node (text)     6 bytes 'test1'");
});
