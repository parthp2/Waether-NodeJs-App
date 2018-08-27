console.log("starting application");

setTimeout(()=>{
    console.log("inside call function works")
},2000)

setTimeout(()=>{
    console.log('second callback function works')
},0)

console.log("finishing application");