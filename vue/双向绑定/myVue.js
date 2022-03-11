class myVue {
  constructor(options) {
    this.$el = document.querySelector(options.el);
    this.$data = options.data;
    this.$methods = options.methods;
    this.$watchEvent = {};
    // 应该放在 compile 前面，this.$el = document.querySelector(options.el); 后面。顺序很重要！赋值 -> 劫持 -> 编译
    this.proxyData();
    this.observe();
    this.compile(this.$el);
    // this.proxyData();
  }
  //劫持data中的属性，并且给大对象赋值
  proxyData() {
    for (let key in this.$data) {
      //   console.log(key);
      Object.defineProperty(this, key, {
        get() {
          console.log("正在获取！");
          //   return this.$data.key; 是不行的，想一想，为什么
          return this.$data[key];
        },
        set(val) {
          console.log("正在设置！");
          this.$data[key] = val;
        },
      });
    }
  }
  // 劫持数据变化进行更新视图
  observe() {
    for (let key in this.$data) {
      let value = this.$data[key];
      let that = this;
      Object.defineProperty(this.$data, key, {
        get() {
          return value;
        },
        set(val) {
          value = val;
          if (that.$watchEvent[key]) {
            that.$watchEvent[key].forEach((item, index) => {
              item.update();
            });
          }
        },
      });
    }
  }
  // 编译解析
  compile(node) {
    // console.log(node);
    node.childNodes.forEach((item, index) => {
      //   console.log(item);
      // 这个是文本结点
      if (item.nodeType === 3) {
        // item.textContent = "123";
        // let reg = /\{\{(.*?)\}\}/g;
        let reg = /{{(.*?)}}/g;
        let text = item.textContent;
        item.textContent = text.replace(reg, (match, vmKey) => {
          //   console.log(match, vmKey);
          vmKey = vmKey.trim(); // 处理空格
          if (this.hasOwnProperty(vmKey)) {
            let watcher = new Watch(this, vmKey, item, "textContent");
            if (this.$watchEvent[vmKey]) {
              this.$watchEvent[vmKey].push(watcher);
            } else {
              this.$watchEvent[vmKey] = [];
              this.$watchEvent[vmKey].push(watcher);
            }
          }
          return this.$data[vmKey];
        });
      }
      // 这个是元素结点
      if (item.nodeType === 1) {
        // 判断事件
        if (item.hasAttribute("@click")) {
          let vmKey = item.getAttribute("@click").trim();
          item.addEventListener("click", (event) => {
            // console.log(vmKey);
            // this.$methods[vmKey]();
            // 改变 this 指向
            this.eventFn = this.$methods[vmKey].bind(this);
            this.eventFn(event);
          });
        }
        // 判断 v-model
        if (item.hasAttribute("v-model")) {
          let vmKey = item.getAttribute("v-model").trim();
          //   console.log(`this: ${JSON.stringify(this)}`);
          item.value = this[vmKey];
          console.log(
            `v-model: ${vmKey} item.value：${item.value} ${this[vmKey]}`
          );
          item.addEventListener("input", (event) => {
            // console.log(item.value);
            // console.log(vmKey);
            // this.$methods[vmKey]();
            // 改变 this 指向
            //   this.eventFn = this.$methods[vmKey].bind(this);
            //   this.eventFn(event);
            this[vmKey] = item.value;
          });
        }
        // 递归 先注释掉这个，还不明白要干嘛
        // if (item.childNodes.length) {
        //   this.compile(item);
        // }
        this.compile(item);
      }
    });
  }
}

// 更新视图
class Watch {
  constructor(vm, key, node, attr) {
    // vue 对象
    this.vm = vm;
    // data 的数据
    this.key = key;
    // 结点
    this.node = node;
    // textContent
    this.attr = attr;
  }
  // 数据发生改变，来更新视图
  update() {
    this.node[this.attr] = this.vm[this.key];
  }
}
