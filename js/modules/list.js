Application.addModule('list',function(context){
  var todoser;
  var mod;
  var lis;

  // function getCorrespondingli(element) {
  //
  // 		var matcher =  element.webkitMatchesSelector || element.mozMatchesSelector
  // 		while (element) {
  // 			if (matcher.bind(element)('li')) {
  // 				return element;
  // 			} else {
  // 				element = element.parentNode;
  // 			}
  // 		}
  // 		return false;
  // 	}

  return {

    messages:['taskadded'],

    init :function(){
      todoser=context.getService('todoservice');
      mod= context.getElement();
      list=mod.querySelector('#todolist');
      this.render();

    },
    destroy : function(){
      todoser=null;
      mod=null;
      list=null;
    },

    onmessage: function(name,data){
      if(name === "taskadded" || name==="taskremoved"){

        this.render();
      }
    },

    createItem:function(Item){
      id=Item.id;
      title=Item.title;
      complete=Item.complete;

      var item = mod.querySelector('.todo-template li').cloneNode(true);
      item.querySelector('label').textContent=title;
      item.setAttribute('task-id',id);
      return item;
    },

    clearList: function() {
       var list=mod.querySelector('#todolist');
			while (list.hasChildNodes()) {
				list.removeChild(list.lastChild);
			}
		},

    render :function(){

      this.clearList();
      var tasklist= todoser.getlist();
        if(tasklist.length >0){
        for (var i = 0; i < tasklist.length; i++) {
          list.appendChild(this.createItem(tasklist[i]));
        }
      }
    },



    onclick: function(event, element, elementType) {

			if (elementType === 'delete-btn') {
				var taskDelete= element.parentNode.parentNode;
        var liId = taskDelete.getAttribute("task-id");

				mod.querySelector('#todolist').removeChild(taskDelete);
				todoser.remove(liId);

				context.broadcast('todoremoved', {
					id: liId
				});

			}

		}

  }
});
