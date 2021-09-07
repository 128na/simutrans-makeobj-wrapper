/// <reference types="node" />
import { SpawnSyncOptions } from 'child_process';
import MakeobjResult from './MakeobjResponse';
export default class MakeobjManager {
    private makeobjPath;
    constructor(makeobjPath?: string);
    capabilities(): MakeobjResult;
    pak(size: number | undefined, pakFile: string, ...datFiles: string[]): MakeobjResult;
    list(...pakFiles: string[]): MakeobjResult;
    dump(...pakFiles: string[]): MakeobjResult;
    merge(pakFileLib: string, ...pakFiles: string[]): MakeobjResult;
    expand(output: string, ...datFiles: string[]): MakeobjResult;
    extract(pakFileLib: string): MakeobjResult;
    exec(options: SpawnSyncOptions, ...args: string[]): MakeobjResult;
}
