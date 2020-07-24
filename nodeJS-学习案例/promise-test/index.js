const fs = require('fs'); //路径
const path = require('path')

//callback方式获取一个文件的内容
// function  getFileContent(fileName, callback) {
//     const fullFileName = path.resolve(__dirname,'files',fileName) //找到files下哪个文件
//     fs.readFile(fullFileName, (err,data) => {
//         if(err) {
//             console.error(err)
//             return
//         }
//
//         callback(
//             JSON.parse(data.toString()) //返回JSON格式
//         )
//     })
// }
//
// //测试 回调地狱
// getFileContent('a.json', aData =>{
//     console.log('a data', aData)
//     getFileContent(aData.next, bData=>{
//         console.log("b data", bData)
//         getFileContent(bData.next, cData => {
//             console.log("c data",cData)
//         })
//     })
// })

// 用 promise 获取文件内容
function getFileContent(fileName) {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'files', fileName) //找到files下哪个文件
        fs.readFile(fullFileName, (err, data) => {
            //返回报错，不存在格式
            if (err) {
                reject(err)
                return
            }

            //res 返回格式
            resolve(
                JSON.parse(data.toString()) //返回JSON格式
            )
        })
    })
    return promise;
}

//解决地狱回调问题
getFileContent('a.json')
    .then(aData => {
        console.log('a data', aData)
        return getFileContent(aData.next)
    }) // a.json
    .then(bData => {
        console.log('b data', bData);
        return getFileContent(bData.next)
    }) // b.json
    .then(cData =>{
        console.log('c data', cData);
    }) //c.json