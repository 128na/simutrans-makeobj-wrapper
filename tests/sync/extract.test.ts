import { pathExistsSync, removeSync } from 'fs-extra';
import Makeobj from '../../src/Makeobj';

test('extract', () => {
  const pakfile = './tests/__files__/extract/merged.pak';
  expect(pathExistsSync(pakfile)).toBeTruthy();

  const makeobj = new Makeobj(process.env.MAKEOBJ_PATH);
  const result = makeobj.extract(pakfile);
  expect(result.isSuccess).toBeTruthy();

  const shouldExtractFiles = [
    './tests/__files__/extract/citycar.test1.pak',
    './tests/__files__/extract/vehicle.test2.pak',
  ];

  shouldExtractFiles.map(file => {
    expect(pathExistsSync(file)).toBeTruthy();
    removeSync(file);
  });
});
