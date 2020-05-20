
interface ItemType {
  description: string;
  done: boolean;
}

export class Discussion {
  private heading: string;
  private items: ItemType[];
  private itemDescription: string;
  private count: number;

  constructor() {
    this.heading = "ToDos";
    this.items = [];
    this.itemDescription = "";
    this.count = 0;
  }

  activate() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 3000)
    })
  }

  addTodo() {
    if (this.itemDescription) {
      this.items.push({
        description: this.itemDescription,
        done: false
      });
      this.itemDescription = "";
      this.countTodos();
    }
  }

  resetTodo() {
    this.items = [];
    this.countTodos();
  }

  removeTodo(todo: ItemType) {
    let index = this.items.indexOf(todo);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
    this.countTodos();
  }

  countTodos() {
    this.count = this.items.filter(todo => !todo.done).length;
  }

  sortTodo() {
    this.items.sort((a: ItemType, b: ItemType) => {
      if (a.description > b.description) {
        return 1;
      }
      if (a.description < b.description) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }

}
