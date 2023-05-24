"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const MakeobjResponse_1 = __importDefault(require("./MakeobjResponse"));
class MakeobjManagerAsync {
    constructor(makeobjPath = 'makeobj', abortControler) {
        this.makeobjPath = makeobjPath;
        this.abortControler = abortControler;
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
        var _a;
        const child = (0, child_process_1.spawn)(this.makeobjPath, args, Object.assign(Object.assign({}, options), { signal: (_a = this.abortControler) === null || _a === void 0 ? void 0 : _a.signal }));
        return new Promise((resolve, reject) => {
            var _a, _b;
            let stdout = '';
            let stderr = '';
            (_a = child.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
                stdout += data.toString().replace(/\r\n/gi, '\n').replace(/\r/gi, '\n');
            });
            (_b = child.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (data) => {
                stderr += data.toString().replace(/\r\n/gi, '\n').replace(/\r/gi, '\n');
            });
            child.on('close', (status) => {
                resolve(new MakeobjResponse_1.default({ status, stdout, stderr }));
            });
            child.on('error', (err) => {
                reject(err);
            });
        });
    }
    listNames(...pakFiles) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.list(...pakFiles);
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
        });
    }
}
exports.default = MakeobjManagerAsync;
