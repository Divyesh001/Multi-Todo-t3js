/// managing all the interaction with todo task object here

Application.addService('todoservice',function(){

  var task;
  var taskid;
  if(!sessionStorage.getItem('task')) {
    task={};
    taskid=0;
  } else {
    task=JSON.parse(sessionStorage.getItem('task'));
    taskid=parseInt(sessionStorage.getItem('taskid'));
  }


return{
  add: function(title){
    var index=taskid;
    console.log("sjhdjshdjs "+ index);
    task[index]={
      id:index,
      title:title,
      complete: false
    };
    taskid++;
    sessionStorage.setItem('task',JSON.stringify(task));
    sessionStorage.setItem('taskid',taskid);
    return index;
  },

  remove : function(id){
    if(task[id]){
      delete task[id];
      sessionStorage.setItem('task',JSON.stringify(task));
    }
  },


  getlist: function(){
    var tasklist=[];
    Object.keys(task).forEach(function(id){
      tasklist.push(task[id]);
    });
    return tasklist;
  }


}

});
