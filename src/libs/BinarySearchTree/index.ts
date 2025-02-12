/* eslint-disable no-console */
import { Node } from './Node'

function defaultCompare<T = number>(a: T, b: T) {
  if (a === b) {
    return 0
  }

  return a < b ? -1 : 1
}

export class BinarySearchTree<T = number> {
  public root: Node<T> | null = null
  public size = 0

  constructor(private compare = defaultCompare) {}

  public find(value: T): Node<T> | null {
    let current = this.root

    while (current) {
      const compare = this.compare(value, current.value)

      if (compare === 0) {
        return current
      }

      if (compare < 0) {
        current = current.left
      } else {
        current = current.right
      }
    }

    return null
  }

  public findHeight(root: Node<T> | null): number {
    if (!root) {
      return -1
    }

    return Math.max(this.findHeight(root.left), this.findHeight(root.right)) + 1
  }

  public getInorderPrintArray(root: Node<T> | null, row: number, col: number, height: number, ans: Array<Array<string>>): void {
    if (!root) {
      return
    }

    const offset = 2 ** (height - row - 1)

    if (root.left) {
      this.getInorderPrintArray(root.left, row + 1, col - offset, height, ans)
    }

    ans[row][col] = root.toString()

    if (root.right) {
      this.getInorderPrintArray(root.right, row + 1, col + offset, height, ans)
    }
  }

  public has(value: T): boolean {
    return this.find(value) !== null
  }

  public insert(value: T): this {
    const newNode = new Node(value)

    if (!this.root) {
      this.root = newNode
      this.size++

      return this
    }

    const queue = [this.root]

    while (queue.length) {
      const current = queue.shift()

      if (!current) {
        continue
      }

      const compare = this.compare(newNode.value, current.value)

      if (compare < 0) {
        if (!current.left) {
          current.left = newNode
          newNode.parent = current
          this.size++

          break
        }

        queue.push(current.left)
      } else if (compare > 0) {
        if (!current.right) {
          current.right = newNode
          newNode.parent = current
          this.size++

          break
        }

        queue.push(current.right)
      } else {
        break
      }
    }

    return this
  }

  // Function to print a 2D matrix
  public print2DArray(): void {
    this.treeToMatrix().forEach((row) => {
      console.log(row.map(cell => cell === '' ? ' ' : cell).join(''))
    })
  }

  public remove(value: T): boolean {
    const node = this.find(value)

    if (!node) {
      return false
    }

    this.removeNode(node)

    return true
  }

  public removeNode(node: Node<T>): void {
    if (node.isLeaf()) {
      if (node.isRoot()) {
        this.root = null
      } else {
        const parent = node.parent as Node<T>

        if (parent.left === node) {
          parent.left = null
        } else {
          parent.right = null
        }
      }
    } else if (node.left && node.right) {
      let current = node.right

      while (current.left) {
        current = current.left
      }

      node.value = current.value
      this.removeNode(current)
    } else {
      const child = node.left || node.right

      if (node.isRoot()) {
        this.root = child
      } else {
        const parent = node.parent as Node<T>

        if (parent.left === node) {
          parent.left = child
        } else {
          parent.right = child
        }
      }
    }
  }

  private treeToMatrix(): Array<Array<string>> {
    const height = this.findHeight(this.root)
    const rows = height + 1
    const cols = 2 ** (height + 1) - 1
    const ans = Array.from({ length: rows }, () =>
      Array.from({ length: cols }).fill('')) as Array<Array<string>>

    this.getInorderPrintArray(this.root, 0, Math.floor((cols - 1) / 2), height, ans)

    return ans
  }
}
