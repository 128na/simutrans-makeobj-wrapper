export default class MakeobjResult {
  public status;
  public stdout;
  public stderr;

  constructor(result: { status: number | null, stdout: string, stderr: string }) {
    this.status = result.status;
    this.stdout = result.stdout;
    this.stderr = result.stderr;
  }

  get isSuccess(): boolean {
    return this.status === 0;
  }
}
