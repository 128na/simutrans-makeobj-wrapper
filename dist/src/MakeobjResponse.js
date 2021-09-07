"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MakeobjResult {
    constructor(result) {
        this.status = result.status;
        this.stdout = result.stdout;
        this.stderr = result.stderr;
    }
    get isSuccess() {
        return this.status === 0;
    }
}
exports.default = MakeobjResult;
