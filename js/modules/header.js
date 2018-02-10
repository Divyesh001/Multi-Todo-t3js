
Application.addModule('header',function(context){
  var todoser;
  return {

    init: function(){
      todoser = context.getService('todoservice');
    },
    destroy: function(){
      todoser=null;
    },

    onkeydown : function(event,element, elementType){

      if(elementType==="input-task" && event.keyCode === 13){
          var task= element.value;

          if(task.length>0){

            todoser.add(task);
            console.log("hello "+ taskid);
            context.broadcast('taskadded',{
              });
          }

          element.value='';
          event.preventDefault();
					event.stopPropagation();
      }
    }
  }
});
