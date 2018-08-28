
var asyncAdd = (a,b) =>{

    return new Promise((resolve,reject)=>{
        setTimeout(()=>{ if(typeof a ==='number' && typeof b === 'number')
        {
            resolve(a+b);
        }
        else{
            reject('Argument is not a number');
        }},1500)
    })
}

asyncAdd(5,'7').then((message)=>{
    console.log(message);
    return asyncAdd(message,33);
}).then((message)=>{
    console.log("45",message);
}).catch((error)=>{
    console.log(error)
})


// var somePromis = new Promise( (resolve,reject)=>{
//     resolve('it is done');
//     resolve();
//     reject('it is rejected')
// })

// somePromis.then((message) =>{
//     console.log("sucess:",message);
// },(errorMessage)=>{
//     console.log('fails:',errorMessage);
// })