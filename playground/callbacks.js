var getUser = (id,callback) =>{

   var user={
        id,
        name:'parth'
    };

    setTimeout(()=>{
        callback(user);
    },3000);
};

getUser(25,(userObject)=>{
    console.log(userObject);
})