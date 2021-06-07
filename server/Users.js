const users = [];

const addUser = ({id,name,room}) => {
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();
    const existinUser = users.find(user => user.name===name && user.room===room)
    if(existinUser){
        return {error:'username is taken'};
    }
    const user= {id,name,room};
    users.push(user);
    return {user};
 }

const removeUser = ({id}) => {
    var index = users.findIndex(user=> user.id===id);
    if(index){
        console.log("inside removeUser");
       return users.splice(index,1)[0];
    }else{
        return
    }
}

const getUser = (id) => users.find(user=>user.id===id);

const getUsersInRoom = (room) => users.filter(user=>user.room===room);

module.exports = {addUser, removeUser, getUsersInRoom, getUser};