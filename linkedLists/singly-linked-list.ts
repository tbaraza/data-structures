// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript

const anExampleVariable = "Hello World"
console.log(anExampleVariable)

// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.

type Item = {
    value: any;
    next: Item | null;
}

// TO DO - Do complexity analysis

class ListNode {
    public element: any;
    public next: any;

    constructor(element: any) {
        this.element = element;
        this.next = null;
    }
}

class LinkedList {
    private head: ListNode | null;
    private size = 0;

    constructor() {
        this.head = null;
    }

    public addFirst(element: any): void {
        // item -> next = this.head
        // this.head = item
        //O(1)
        const item = new ListNode(element);

        if (this.head === null) {
            this.head = item;
        } else {
            item.next = this.head;
            this.head = item;
        }

        this.size += 1;
    }

    public add(element: any): void {
        // go to end of list
        // traverse until we get next is null
        // O(N)

        const item = new ListNode(element);

        if (this.head === null) {
            this.head = item;
            this.size += 1;
            return;
        }

        let current = this.head;

        while(current.next) {
            current = current.next;
        }

        current.next = item;
        this.size += 1;
    }

    public insertAt(element: any, position: number) {
        // loop of position count
        // edge case position is more than the size throw error
        // if at position before where we want to insert
        // save the next in var
        // item.next = new Node
        // new Node.next = saved next

        // Important Note
        // this is recreating the list i.e we have to traverse the list until we get 
        // to the position then we reattach prev and current btn the new node

        // I made the mistake of thinking I could reattach without recreating the list
        // I got circular json error
        //O(N)

        if (position > this.size || position < 0) {
            throw Error(`invalid index error, ${position}`);
        }

        const item = new ListNode(element);

        if (this.head === null) {
            this.head = item;
            return;
        }

        if (position === 0) {
            this.addFirst(element);
            // item.next = this.head;
            // this.head = item;
            // this.size += 1;
            return;
        }

        let prev = this.head;
        let current = prev.next;
        let index = 0;

        // for (let i = 1; i < position + 1; i++) {
        //         console.log('position', i);
        //         console.log('prev', prev)
        //     if (i === position) {
        //         prev.next = item;
        //         item.next = current;
        //         this.size += 1;
        //         break;
        //     }

        //     prev = current;
        //     current = current.next;
        // }

        while (index < position) {
            prev = current;
            current = current.next;
            index++;
        }

        prev.next = item;
        item.next = current;
        this.size += 1;
    }

    public removeFrom(position: number): void {
        // same as insertAt but with opposite effect
        // loop again
        // prev and curr
        // at position
        // [1, next] [2, next] [3, next]
        // prev = [1, next]
        // current = [2, next]
        // prev.next = curr.next

        // O(N)

        if (this.head === null) {
            throw Error('Empty list error');
        }

        if (position > this.size || position < 0) {
            throw Error('Invalid index');
        }

        if (position === 0) {
            this.head = this.head.next;
            return;
        }

        // let prev = this.head;
        // let current = this.head.next;

        let prev = null;
        let current = this.head;

        let index = 0;

        while (index < position) {
            prev = current;
            current = current.next;

            index++;
        }

        if (prev === null) {
            this.head = current.next;
            this.size -= 1;
            return;
        }

        prev.next = current.next;
        this.size -= 1;
    }

    public remove(element: any): boolean | number {
        // O(N)
        if (this.head === null) {
            throw Error('Empty list error');
        }

        let current = this.head;
        let prev = null;

        while (current !== null) {
        // comparing element with current
        // element if found then remove the
        // and return true
            if (current.element === element) {
                if (prev === null) {
                    this.head = current.next;
                    this.size -= 1;
                    return true;
                }

                prev.next = current.next;
                this.size -= 1;
                return true;

            } else {
                prev = current;
                current = current.next;
            }
        }

        return -1;

        // console.log('------', prev.element, element)
        // while (prev.element !== element) {
        //     const t = prev.element;
        //     prev.next = current.next;
        //     this.size -= 1;

        //     return t;
        // }

        // prev = current;
        // current = current.next;
    }

    public indexOf(element: any): number {
        let current = this.head;
        let index = 0;

        while (current !== null) {
            if (current.element === element) {
                return index
            }

            current = current.next;
            index += 1;
        }

        return -1;
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }

    public get length(): number {
        return this.size;
    }

    public getList(): any[] {
        const arr = [];
        let current = this.head;

        while(current !== null) {
            arr.push(current.element);
            current = current.next;
        }

        return arr;
    }
 }

const list = new LinkedList();
list.addFirst(2)
list.addFirst(3)
list.add(4)
list.insertAt(5, 0)
list.insertAt(6, 2)
list.removeFrom(0);
// list.removeFrom(1);
// list.remove(5);
// console.log('return', list.remove(67));
// console.log('index', list.indexOf(5));
// console.log('index', list.isEmpty());
console.log('my list', list)
// console.log('size', list.length);
// console.log('arr', list.getList())