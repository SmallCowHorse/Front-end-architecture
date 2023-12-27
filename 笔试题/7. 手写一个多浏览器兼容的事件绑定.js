    // attchEvent vs addEventListener
    // 区别：
    // a. 传参，attachEvent对于事件名需要加上一个‘on’
    // b. 执行顺序， attachEvent - 后绑定先执行；addEventListener - 先绑定先执行
    // c. 解绑 detachEvent vs removeEventListener
    // d. 阻断 e.cancelBubble = true vs e.stopPropagation()
    // e. 阻断默认事件 e.returnValue vs e.preventDefault

    class bindEvent {
      constructor(element) {
          this.element = element;
      }
      addEventListener = (type, handler) => {
          if (this.element.addEventListener) {
              this.element.addEventListener(type, handler, false);
          } else if (this.element.attachEvent) {
              const element = this.element;
              this.element.attachEvent('on' + type, () => {
                  handler.call(element);
              })
          } else {
              this.element['on' + type] = handler;
          }
      }
      removeEventListener = (type, handler) => {
          if (this.element.removeEventListener) {
              this.element.removeEventListener(type, handler, false);
          } else if (this.element.detachEvent) {
              this.element.detachEvent('on' + type, handler)
          } else {
              this.element['on' + type] = null;
          }
      }
      static stopPropagation(e) {
          if (e.stopPropagation) {
              e.stopPropagation();
          } else {
              e.cancelBubble = true;
          }
      }
      static preventDefault(e) {
          if (e.preventDefault) {
              e.preventDefault();
          } else {
              e.returnValue = false;
          }
      }
  }