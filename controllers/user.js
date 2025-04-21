const { Op } = require("sequelize");
const User = require("../models/user");

async function createUser() {
    const user = await User.create({name:"firstname"});
    console.log(user.toJSON());
}

async function getAllUser(){
    const users = await User.findAll({ 
        attributes : [ 'firstname', 'lastname', 'email', 'profile_image'],
        order : [['firstname', 'DESC']],
    });

    console.log('All users:', JSON.stringify(users, null, 2));
    console.log("User", 
        users.every((user) => console.log(`User name: ${user.firstname} ${user.lastname}`))
    )
}

async function getUser( id_ ) {
    // let user = await User.findOne({
    //     where: { id : id_ },
    //     attributes : [ 'firstname', 'lastname', 'email', 'profile_image'],
        
    // });

    const user = await User.findByPk(id_);
    if(user === null){
        console.log("user not found");
    }else{
        user.firstname = "updatedname";
        user.update();
    }

}
async function updateUser( id_ ) {
    let user = await User.update({
        where : {
            id : id_
        },
    });
}

async function deleteUser( id_ ){
    let user = await User.destroy({
        where: {
            id : id_
        },
    });
}