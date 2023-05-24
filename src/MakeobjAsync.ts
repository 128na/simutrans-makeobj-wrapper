import { spawn, SpawnOptions } from 'child_process';
import path from 'path';
import MakeobjResult from './MakeobjResponse';

export default class MakeobjManagerAsync {
  private makeobjPath: string;
  private abortControler?: AbortController;

  constructor(makeobjPath: string = 'makeobj', abortControler?: AbortController) {
    this.makeobjPath = makeobjPath
    this.abortControler = abortControler;
  }

  public capabilities(): Promise<MakeobjResult> {
    return this.exec({}, 'QUIET', 'CAPABILITIES');
  }

  public pak(size = 64, pakFile: string, ...datFiles: string[]): Promise<MakeobjResult> {
    return this.exec({}, 'QUIET', `PAK${size}`, pakFile, ...datFiles);
  }

  public list(...pakFiles: string[]): Promise<MakeobjResult> {
    return this.exec({}, 'QUIET', 'LIST', ...pakFiles);
  }

  public dump(...pakFiles: string[]): Promise<MakeobjResult> {
    return this.exec({}, 'QUIET', 'DUMP', ...pakFiles);
  }

  public merge(pakFileLib: string, ...pakFiles: string[]): Promise<MakeobjResult> {
    return this.exec({}, 'QUIET', 'MERGE', pakFileLib, ...pakFiles);
  }

  public expand(output: string, ...datFiles: string[]): Promise<MakeobjResult> {
    return this.exec({}, 'QUIET', 'EXPAND', output, ...datFiles);
  }

  public extract(pakFileLib: string): Promise<MakeobjResult> {
    const cwd = path.dirname(pakFileLib);
    const file = path.basename(pakFileLib);
    return this.exec({ cwd }, 'QUIET', 'EXTRACT', file);
  }

  public exec(options: SpawnOptions, ...args: string[]): Promise<MakeobjResult> {
    const child = spawn(this.makeobjPath, args, {
      ...options,
      signal: this.abortControler?.signal,
    });
    return new Promise((resolve, reject) => {
      let stdout = '';
      let stderr = '';
      child.stdout?.on('data', (data) => {
        stdout += data.toString().replace(/\r\n/gi, '\n').replace(/\r/gi, '\n');
      });
      child.stderr?.on('data', (data) => {
        stderr += data.toString().replace(/\r\n/gi, '\n').replace(/\r/gi, '\n');
      });
      child.on('close', (status) => {
        resolve(new MakeobjResult({ status, stdout, stderr }));
      });
      child.on('error', (err) => {
        reject(err);
      });
    });
  }

  public async listNames(...pakFiles: string[]): Promise<{ pak: string; objs: string[]; }[]> {
    const result = await this.list(...pakFiles);
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
