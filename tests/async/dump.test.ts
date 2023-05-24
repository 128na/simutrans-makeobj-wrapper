import { pathExistsSync } from 'fs-extra';
import MakeobjAsync from '../../src/MakeobjAsync';


test('dump', async () => {
  const pakfile = './tests/__files__/list/test.pak';
  expect(pathExistsSync(pakfile)).toBeTruthy();

  const makeobj = new MakeobjAsync(process.env.MAKEOBJ_PATH);
  const result = await makeobj.dump(pakfile);
  expect(result.isSuccess).toBeTruthy();
  // name=test1
  expect(result.stdout).toContain("000 TEXT-node (text)     6 bytes 'test1'");
});
