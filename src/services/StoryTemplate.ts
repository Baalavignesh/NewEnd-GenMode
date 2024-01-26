let final_template:any = {
  title: "[Title Here]",
  genre: "[Genre Here]",
  story: {
  },
};

class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  root: TreeNode | null;
  branch_number: number;
  my_stack: any;
  constructor() {
    this.root = null;
    this.branch_number = 0;
    this.my_stack = [];
}

  insert(value: number): void {
    this.root = this._insert(this.root, value);
  }

  private _insert(root: TreeNode | null, value: number): TreeNode {
    if (root === null) {
      return new TreeNode(value);
    }

    if (value < root.value) {
      root.left = this._insert(root.left, value);
    } else {
      root.right = this._insert(root.right, value);
    }

    return root;
  }

  printPreOrder(root: TreeNode | null): void {
    // 
    if(this.branch_number == 0) {
        let new_branch_1 = `branch_${this.branch_number}`
        this.branch_number = this.branch_number + 1
        let new_branch_2 = `branch_${this.branch_number}`
        this.my_stack.push(new_branch_2);
        this.my_stack.push(new_branch_1);
        final_template.story.start = {
            story_segment: "[story segment here]",
            [new_branch_1]: "[option 1]",
            [new_branch_2]: "[option 2]",
          }
    }

    if (root !== null) {
      console.log(root.value);
      if (root.left === null && root.right === null) {
        console.log("Reached a leaf node:", root.value);
        console.log("add ending");
      } else {
        console.log("add branch");
        if(this.my_stack) {
            let branch = this.my_stack
        }
        let new_branch_1 = `branch_${this.branch_number}`
        this.branch_number = this.branch_number + 1
        let new_branch_2 = `branch_${this.branch_number}`
        final_template.story = {
            story_segment: "[story segment here]",
            [new_branch_1]: "[option 1]",
            [new_branch_2]: "[option 2]",
          }
      }
      this.printPreOrder(root.left);
      this.printPreOrder(root.right);
    }
  }
}

function createBalancedBST(start: number, end: number): TreeNode | null {
  if (start > end) {
    return null;
  }

  const mid = Math.floor((start + end) / 2);
  const root = new TreeNode(mid);
  root.left = createBalancedBST(start, mid - 1);
  root.right = createBalancedBST(mid + 1, end);

  return root;
}

function CreateTree(twist:number) {
  let nodeCount:number;
  if(twist) {
    nodeCount = Math.pow(2, twist+1) - 1
  } 
  else {
    nodeCount = 14
  }
  
  const root = createBalancedBST(1, nodeCount);

  const fullBST = new BST();
  fullBST.root = root;
  fullBST.printPreOrder(fullBST.root);
  console.log("Root Node:", fullBST.root);

  return final_template;
}

export default CreateTree;
