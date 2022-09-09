const CLICK_TIME = 1500;

class Interface {
	constructor() {
		this.iface = document.getElementById('iface');
		this.lastItem = "";
		this.timestamp = 0;
        this.lastItems = [/*{"label":"","timestamp":0}, {"label":"","timestamp":0}*/];
		this.label = document.getElementById("coords");
		this.label2 = document.getElementById("pos");
		this.button1 = document.getElementById("btSkeleton");
		this.button1.addEventListener("click", () => {
		  DRAW_SKELETON = !DRAW_SKELETON;
		});
		this.button2 = document.getElementById("btCursor");
		this.button2.addEventListener("click", () => {
		  DRAW_HANDS = !DRAW_HANDS;
		});
		this.button3 = document.getElementById("btBackground");
		this.button3.addEventListener("click", () => {
            camera.toggleVideo();
		});	
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
                if (!finded)
                    itemTouched.push(elem);
            }
        }
        if (itemTouched.length > 0){
            this.manageHover(itemTouched);
            this.updateLastItemsList(itemTouched);
        }else{
            this.noCoords();
        }
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
                lastItem.label.classList.remove("hover");
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
                    this.validateItem(lastItem);
                    break;
                }
            }
            if (!found){
                newItems.push({"label":item, timestamp:Date.now()})
                item.classList.add("hover");
            }
        }
        this.lastItems = newItems;
    }
    
    validateItem(lastItem){
        let dateNow = Date.now();
        if ((dateNow - lastItem.timestamp) > CLICK_TIME){
            lastItem.label.dispatchEvent(new Event("click"));
            lastItem.timestamp = dateNow;
        }
    }
	
	noCoords(){
        for (var item of this.lastItems){
			item.label.classList.remove("hover");
		}
        this.lastItems = [];
		/*this.label.innerHTML = "x: -  y: -";
		this.label2.innerHTML = "x: -  y: -";*/
	}
}
