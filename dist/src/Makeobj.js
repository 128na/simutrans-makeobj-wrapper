"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const MakeobjResponse_1 = __importDefault(require("./MakeobjResponse"));
class MakeobjManager {
    constructor(makeobjPath = 'makeobj') {
        this.makeobjPath = makeobjPath;
    }
    capabilities() {
        return this.exec({}, 'QUIET', 'CAPABILITIES');
    }
    pak(size = 64, pakFile, ...datFiles) {
        return this.exec({}, 'QUIET', `PAK${size}`, pakFile, ...datFiles);
    }
    list(...pakFiles) {
        return this.exec({}, 'QUIET', 'LIST', ...pakFiles);
    }
    dump(...pakFiles) {
        return this.exec({}, 'QUIET', 'DUMP', ...pakFiles);
    }
    merge(pakFileLib, ...pakFiles) {
        return this.exec({}, 'QUIET', 'MERGE', pakFileLib, ...pakFiles);
    }
    expand(output, ...datFiles) {
        return this.exec({}, 'QUIET', 'EXPAND', output, ...datFiles);
    }
    extract(pakFileLib) {
        const cwd = path_1.default.dirname(pakFileLib);
        const file = path_1.default.basename(pakFileLib);
        return this.exec({ cwd }, 'QUIET', 'EXTRACT', file);
    }
    exec(options, ...args) {
        const result = (0, child_process_1.spawnSync)(this.makeobjPath, args, options);
        return new MakeobjResponse_1.default({
            status: result.status,
            stdout: result.stdout.toString().replace(/\r\n/gi, '\n').replace(/\r/gi, '\n'),
            stderr: result.stderr.toString().replace(/\r\n/gi, '\n').replace(/\r/gi, '\n'),
        });
    }
    listNames(...pakFiles) {
        const result = this.list(...pakFiles);
        const res = [];
        let tmp = {
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
exports.default = MakeobjManager;
