export default class MakeobjResult {
    status: number | null;
    stdout: string;
    stderr: string;
    constructor(result: {
        status: number | null;
        stdout: string;
        stderr: string;
    });
    get isSuccess(): boolean;
}
