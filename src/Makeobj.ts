import { spawnSync, SpawnSyncOptions } from 'child_process';
import path from 'path';
import MakeobjResult from './MakeobjResponse';

export default class MakeobjManager {
  private makeobjPath: string;

  constructor(makeobjPath: string = 'makeobj') {
    this.makeobjPath = makeobjPath
  }

  public capabilities(): MakeobjResult {
    return this.exec({}, 'QUIET', 'CAPABILITIES');
  }

  public pak(size = 64, pakFile: string, ...datFiles: string[]): MakeobjResult {
    return this.exec({}, 'QUIET', `PAK${size}`, pakFile, ...datFiles);
  }

  public list(...pakFiles: string[]): MakeobjResult {
    return this.exec({}, 'QUIET', 'LIST', ...pakFiles);
  }

  public dump(...pakFiles: string[]): MakeobjResult {
    return this.exec({}, 'QUIET', 'DUMP', ...pakFiles);
  }

  public merge(pakFileLib: string, ...pakFiles: string[]): MakeobjResult {
    return this.exec({}, 'QUIET', 'MERGE', pakFileLib, ...pakFiles);
  }

  public expand(output: string, ...datFiles: string[]): MakeobjResult {
    return this.exec({}, 'QUIET', 'EXPAND', output, ...datFiles);
  }

  public extract(pakFileLib: string): MakeobjResult {
    const cwd = path.dirname(pakFileLib);
    const file = path.basename(pakFileLib);
    return this.exec({ cwd }, 'QUIET', 'EXTRACT', file);
  }

  public exec(options: SpawnSyncOptions, ...args: string[]): MakeobjResult {
    const result = spawnSync(this.makeobjPath, args, options);
    return new MakeobjResult({
      status: result.status,
      stdout: result.stdout.toString(),
      stderr: result.stderr.toString(),
    });
  }
}
