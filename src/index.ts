import { BinarySearchTree } from './libs/BinarySearchTree'

const bst = new BinarySearchTree()

bst.insert(3)
bst.insert(2)
bst.insert(1)
bst.insert(4)
bst.insert(5)

bst.print2DArray()

bst.remove(4)

bst.print2DArray()

bst.remove(2)

bst.print2DArray()
