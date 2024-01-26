let template:any = {
  title: "[Title Here]",
  genre: "[Genre Here]",
  story: {
    branch_1: {
      story_segment: "[story segment here]",
      branch_3: "[option 3]",
      branch_4: "[option 4]",
    },
    branch_2: {
      story_segment: "[story segment here]",
      branch_5: "[option 5]",
      branch_6: "[option 6]",
    },
    branch_3: {
      story_segment: "[story segment here]",
      end_1: "[unique ending 1]",
      end_2: "[unique ending 2]",
    },
    branch_4: {
      story_segment: "[story segment here]",
      end_3: "[unique ending 3]",
      end_4: "[unique ending 4]",
    },
    branch_5: {
      story_segment: "[story segment here]",
      end_5: "[unique ending 5]",
      end_6: "[unique ending 6]",
    },
    branch_6: {
      story_segment: "[story segment here]",
      end_7: "[unique ending 7]",
      end_8: "[unique ending 8]",
    },
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
        template.story.start = {
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
        template.story = {
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

// Function to create a balanced BST with a given number of nodes
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

// Example: Create a balanced BST with 8 nodes
function CreateTree() {
  const nodeCount = 14;
  const root = createBalancedBST(1, nodeCount);

  // Print the pre-order traversal of the created BST
  const fullBST = new BST();
  fullBST.root = root;
  fullBST.printPreOrder(fullBST.root);
  console.log("Root Node:", fullBST.root);
}

export default CreateTree;
