import { spawnSync } from 'child_process';
import MakeobjResult from './MakeobjResponse';

export default class MakeobjManager {
  private makeobjPath: string;

  constructor(makeobjPath: string = 'makeobj') {
    this.makeobjPath = makeobjPath
  }

  public pak(pakFile: string, datFiles: string[], size = 128): MakeobjResult {
    return this.exec('QUIET', `PAK${size}`, pakFile, ...datFiles);
  }

  public merge(pakFileLib: string, pakFiles: string[]): MakeobjResult {
    return this.exec('QUIET', 'MERGE', pakFileLib, ...pakFiles);
  }

  private exec(...args: string[]): MakeobjResult {
    const result = spawnSync(this.makeobjPath, args);
    return new MakeobjResult({
      status: result.status,
      stdout: result.stdout.toString(),
      stderr: result.stderr.toString(),
    });
  }
}
