class A {
    constructor() {
        // 这里可以放一些父类的初始化逻辑
    }

    // 定义一个空的方法，之后会在子类中给它赋值
    say() {
        console.log('Default method in A');
    }
}

function useHooks() {
    function say() {
        console.log('hello');
    }
    return say;
}

class B extends A {
    constructor() {
        super();
        const say = useHooks();
        A.prototype.say = say; // 将方法添加到父类 A 的原型上
    }
}

class C extends A {
    constructor() {
        super();
    }
}

// const b = new B();
// const c = new C();

// b.say(); // 输出 "hello"
// c.say(); // 输出 "hello"





class Table {
    constructor() {

    }

    getDataList() { }
}

class Dialog extends Table {
    constructor() {
        super()
        this.isOpen = false;
    }
    open() {
        this.isOpen = true;
        console.log(this);
    }

    close() {
        this.isOpen = false;
    }
}

function useTable(state) {
    console.log('state---', state);
    function getList() {
        console.log('getList');
    }
    return {
        getList
    }
}

class CrudTable extends Table {
    constructor() {
        super()

        this.mainDialog = new MainDialog()
        this.scriptDialog = new ScriptDialog()

        this.state = {
            queryForm: {},
            pageList: () => { },
        }

        const { getList } = useTable(this.state)
        // 将方法绑定到类的实例上
        Table.prototype.getList = getList

    }


    scriptSet(row) {
        this.scriptDialog.open(row)
    }


    add() {
        this.mainDialog.title = '添加';
        this.mainDialog.reset()
        this.mainDialog.open()
    }

}

class MainDialog extends Dialog {
    constructor() {
        super()


    }

    reset() {

    }

    // open() {
    //     // this.isOpen = true
    //     console.log(this);
    // }
}

class ScriptDialog extends Dialog {
    constructor() {
        super()
    }
}


const crud = new CrudTable()
crud.add()
const script = crud.scriptDialog
const dialog = crud.mainDialog

script.getList()
dialog.getList()