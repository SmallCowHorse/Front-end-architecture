// 犀牛书，例 6.1
function inherit(p) {
  if(p === null) throw TypeError();
  if(Object.create) {
      return Object.create(p)
  };

  if( typeof p !== "object" && typeof p !== "function") throw TypeError();

  function f() {};
  f.prototype = p;
  return new f();
}
