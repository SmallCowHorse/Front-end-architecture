(
  // 目标：一次去定位区分CJS和AMD
  // 1. CJS factory
  // 2. module module.exports
  // 3. define
  typeof module === 'Object'
      && module.exports
      && typeof define !== 'function'
          ? // 是CJS
              factory => module.exports = factory(require, exports, module)
          : // 是AMD
              define
)