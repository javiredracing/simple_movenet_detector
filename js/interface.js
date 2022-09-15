const CLICK_TIME = 1500;

class Interface {
	constructor() {
	  this.lastItems = [/*{"label":"","timestamp":0}, {"label":"","timestamp":0}*/];
		this.currentView = new MainView();
	}

	manageCoords(coords){
        var itemTouched = [];
        for (const coord of coords){
            let elem = document.elementFromPoint(coord.x, coord.y);
            if (elem != null){
                var finded = false;
                for (const item of itemTouched){
                    if (item.id == elem.id){
                        finded = true;
                        break;
                    }
                }
                if (!finded){
										elem.name= coord.name;
                    itemTouched.push(elem);
								}
            }
        }
        if (itemTouched.length > 0){
            this.manageHover(itemTouched);
            this.updateLastItemsList(itemTouched);
        }else{
            this.noCoords();
        }
				this.currentView.validate(this.lastItems);
	}

	setLabel(label, coords){
		label.innerHTML = "x:" + coords.x.toFixed() + " y:" + coords.y.toFixed();
	}


	manageHover(items){
        for (var lastItem of this.lastItems){
            var found = false;
            for (var itemTouched of items){
                if (lastItem.label.id == itemTouched.id){
                    found = true;
                    break;
                }
            }
            if (!found){
                //lastItem.label.classList.remove("hover");
								this.currentView.dismissInteraction(lastItem.label);

            }
        }
	}

    updateLastItemsList(itemTouched){
        var newItems = [];
        for (var item of itemTouched){
            var found = false;
            for (var lastItem of this.lastItems){
                if (lastItem.label.id == item.id){
                    found = true;
                    newItems.push(lastItem);
                    //this.validateItem(lastItem);
                    break;
                }
            }
            if (!found){
                newItems.push({"label":item, timestamp:Date.now(),name:"hola"})
                //item.classList.add("hover");
								this.currentView.iteration(item);
            }
        }
        this.lastItems = newItems;
    }

    /*validateItem(lastItem){
        let dateNow = Date.now();
        if ((dateNow - lastItem.timestamp) > CLICK_TIME){
            lastItem.label.dispatchEvent(new Event("click"));
            lastItem.timestamp = dateNow;
        }
				document.dispatchEvent(resultOK);
    }*/

	noCoords(){
      for (var item of this.lastItems){
					this.currentView.dismissInteraction(item.label);
		}
        this.lastItems = [];
		/*this.label.innerHTML = "x: -  y: -";
		this.label2.innerHTML = "x: -  y: -";*/
	}
}
