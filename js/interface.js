const CLICK_TIME = 1500;

class Interface {
	constructor() {
	  this.lastItems = [/*{"label":"","timestamp":0, userTouch=[]}*/];
		this.currentView = new MainView();
	}

	manageCoords(poses){
		var itemsTouched = [];
		for (var cont = 0; cont < poses.length; cont++){
        for (const coord of poses[cont]){
            var elem = document.elementFromPoint(coord.x, coord.y);
            if (elem != null && elem.tagName != "HTML"){
                var finded = false;
                for (var item of itemsTouched){
                    if (item.id == elem.id){
                        finded = true;
												if (!item.bodyname.includes(coord.name))
													item.bodyname.push(coord.name);
												if (!item.pose.includes(cont)){
													elem.pose = [cont];
												}
                        break;
                    }
                }
                if (!finded){
										elem.bodyname = [coord.name];
										elem.pose = [cont];
                    itemsTouched.push(elem);
								}
            }
        }
		}

      if (itemsTouched.length > 0){
          this.manageOldItems(itemsTouched);
          this.setCurrentItems(itemsTouched);
      }else{
          this.noCoords();
      }
			this.currentView.validate(this.lastItems);
	}

	setLabel(label, coords){
		label.innerHTML = "x:" + coords.x.toFixed() + " y:" + coords.y.toFixed();
	}

	manageOldItems(listItems){
		for (var lastItem of this.lastItems){
          var found = false;
          for (var itemTouched of listItems){
              if (lastItem.label.id == itemTouched.id){
                  found = true;
                  break;
              }
          }
          if (!found){
							this.currentView.dismissInteraction(lastItem.label);
          }
      }
	}

    setCurrentItems(itemTouched){
			var newItems = [];
        for (var item of itemTouched){
            var found = false;
            for (var lastItem of this.lastItems){
                if (lastItem.label.id == item.id){
                    found = true;
                    newItems.push(lastItem);
                    break;
                }
            }
            if (!found){
                newItems.push({"label":item, timestamp:Date.now()})
								this.currentView.iteration(item);
            }
        }
        this.lastItems = newItems;
    }


checkIfItemInList(item, list){
	var finded = false;
	for (const itemList of list) {
		if (itemList.id == item.id) {
			finded = true;
			break;
		}
	}
	return finded;
}

	noCoords(){
      for (var item of this.lastItems){
					this.currentView.dismissInteraction(item.label);
		  }
      this.lastItems = [];
		/*this.label.innerHTML = "x: -  y: -";
		this.label2.innerHTML = "x: -  y: -";*/
	}
}
