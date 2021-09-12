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
      stdout: result.stdout.toString().replace(/\r\n/gi, '\n').replace(/\r/gi, '\n'),
      stderr: result.stderr.toString().replace(/\r\n/gi, '\n').replace(/\r/gi, '\n'),
    });
  }

  public listNames(...pakFiles: string[]): { pak: string; objs: string[]; }[] {
    const result = this.list(...pakFiles);
    const res = [];
    let tmp: { pak: string, objs: string[] } = {
      pak: '',
      objs: []
    };
    const regPak = /^Contents of file ([^\s]+\.pak)/i;
    const regLine = /^([^\s]+)\s+([^\s]+)\s+(\d+)\s+(\d+)$/;

    for (const line of result.stdout.split('\n')) {
      if (line.startsWith('Contents of file')) {
        if (tmp.pak) {
          res.push(tmp);
        }
        const t = line.match(regPak);
        console.log({ t })
        tmp = {
          pak: t && t[1] ? t[1] : '',
          objs: []
        };
      }

      if (regLine.test(line)) {
        const data = line.match(regLine);
        if (data && data[2]) {
          tmp.objs.push(data[2]);
        }
      }
    }
    res.push(tmp);
    return res;
  }
}
