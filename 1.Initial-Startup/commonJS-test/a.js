function add(a,b) {
    return a + b
}

function mul(a,b){
    return a * b;
}
//输出
//module只能返回一个对象或者一个函数
module.exports = {
    add,
    mul
};