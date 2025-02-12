export class Node<T> {
  constructor(
    public value: T,
    public left: Node<T> | null = null,
    public right: Node<T> | null = null,
    public parent: Node<T> | null = null,
  ) {}

  public isLeaf(): boolean {
    return this.left === null && this.right === null
  }

  public isRoot(): boolean {
    return this.parent === null
  }

  public toString(): string {
    return String(this.value)
  }
}
