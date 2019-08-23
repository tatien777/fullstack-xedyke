const _ = require('lodash')


//  isEmplty ()
//  check xem object/mang rong ? 
//  [],{} => true
//  [1,2,3] => false 
console.log(_.isEmpty([1,2,3]))
console.log(_.isEmpty([]));
if([]){
    console.log('mang rong tra ve ');
}
// _.get()
// nested object
console.log("=================");

const user = {
    credenticals: {
        email: 'nguyenvana@gmail.com',
        password: 'xxxyyy'
    },
    profile:{
        name: 'Nguyen Van A',
        age: 23,
        address : {
            number: 10,
            street: 'Nguyen Hue',
            province: 'TP HCM'
        }
    }
}
console.log(user.profile.address.province)
console.log(_.get(user,'profile.address.street'));
console.log(_.get(user,'profile.data.province',"no object"));
console.log("==========");
// _.set 
_.set(user,'profile.address.street','Le thi Rieng')
console.log(_.get(user,'profile.address.street'));

user2 = {
    ...user,
    profile:{
        address: {
            street: ' cach binh thuong'
        }
    }
}
