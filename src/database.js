let id = 1;
const DB = [{ id: 1, name: 'Juan', age: 30 ,created_at: '2021-05-10',updated_at:''}];

module.exports = {
  DB,

  add(user) {
    id++;
    user.id = id;
    DB.push(user);
  },
  
};
