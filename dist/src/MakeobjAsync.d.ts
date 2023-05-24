/// <reference types="node" />
import { SpawnOptions } from 'child_process';
import MakeobjResult from './MakeobjResponse';
export default class MakeobjManagerAsync {
    private makeobjPath;
    private abortControler?;
    constructor(makeobjPath?: string, abortControler?: AbortController);
    capabilities(): Promise<MakeobjResult>;
    pak(size: number | undefined, pakFile: string, ...datFiles: string[]): Promise<MakeobjResult>;
    list(...pakFiles: string[]): Promise<MakeobjResult>;
    dump(...pakFiles: string[]): Promise<MakeobjResult>;
    merge(pakFileLib: string, ...pakFiles: string[]): Promise<MakeobjResult>;
    expand(output: string, ...datFiles: string[]): Promise<MakeobjResult>;
    extract(pakFileLib: string): Promise<MakeobjResult>;
    exec(options: SpawnOptions, ...args: string[]): Promise<MakeobjResult>;
    listNames(...pakFiles: string[]): Promise<{
        pak: string;
        objs: string[];
    }[]>;
}
