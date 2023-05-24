import { pathExistsSync } from 'fs-extra';
import Makeobj from '../../src/Makeobj';

test('listNames', () => {
  const pakfile = './tests/__files__/list/test.pak';
  expect(pathExistsSync(pakfile)).toBeTruthy();

  const makeobj = new Makeobj(process.env.MAKEOBJ_PATH);
  const result = makeobj.listNames(pakfile);
  expect(result).toHaveLength(1);
  expect(result[0].pak).toEqual('./tests/__files__/list/test.pak');
  expect(result[0].objs[0]).toEqual('test1');
});
