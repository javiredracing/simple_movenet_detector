const CLICK_TIME = 1500;
//https://gist.github.com/tomhodgins/7da3271bd770614e5f1e  simple swipe detector
class Interface {
	constructor() {
	  this.interfaceDiv = document.getElementById("iface");
	  this.lastItems = [];
	  this.currentView = new MainView();
	}

	manageCoords(poses){
		var itemsTouched = [];
		var cont = 0;
		for (const pose of poses) {
            if (pose.keypoints != null) {
				//for (const keypoint of pose.keypoints){
				//for (var index = 5; index < pose.keypoints.length; index++){
				for (const index of this.currentView.bodyParts){
					//console.log(pose.keypoints[index].name);
					var coord = this.validateKeyPoint(pose.keypoints[index]);
					if (coord !== ""){
						var elem = document.elementFromPoint(coord.x, coord.y);
						if (elem != null && elem.tagName != "HTML"){
							var finded = false;
							for (var item of itemsTouched){
								if (item.id == elem.id){
									finded = true;
									item.pose.push({"bodyPart":coord.name, "user":cont});
									break;
								}
							}
							if (!finded){
								elem.pose = [{"bodyPart":coord.name, "user":cont}];
								itemsTouched.push(elem);
							}
						}
					}
				}
			}
			cont++;
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
	
	changeView(newView){
		//if (typeof this.lastView === "undefined"){}
		if (this.currentView.constructor.name != newView.constructor.name){
			
		}
	}
	
	validateKeyPoint(keypoint){
		if (typeof keypoint !== 'undefined'){
			const score = keypoint.score != null ? keypoint.score : 1;
			const scoreThreshold = STATE.modelConfig.scoreThreshold || 0;
			if (score >= scoreThreshold) {
				var screenCoord = this.toScreenCoords(keypoint);
				screenCoord.name = keypoint.name;
				return screenCoord;
			}
		}
		return "";
	}
	
	
	toScreenCoords(coord) {
		let rect = camera.canvas.getBoundingClientRect();
		let traslationX = rect.width / camera.canvas.width;
		let traslationY = rect.height / camera.canvas.height;
		let wx = (camera.canvas.width - coord.x) * traslationX;  //Cambiar coordenadas x,y mirror
		let wy = coord.y * traslationY;

		return this.toPoint(wx, wy);
	}
	
	toPoint(x, y) {
		return { x: x, y: y }
	}

	manageOldItems(listItems){
		for (var lastItem of this.lastItems){
          var found = false;
          for (var itemTouched of listItems){
              if (lastItem.id == itemTouched.id){
                  found = true;
                  break;
              }
          }
          if (!found){
			this.currentView.dismissInteraction(lastItem);
          }
      }
	}

    setCurrentItems(itemTouched){
		var newItems = [];
        for (var item of itemTouched){
            var found = false;
            for (var lastItem of this.lastItems){
                if (lastItem.id == item.id){
                    found = true;
                    newItems.push(lastItem);
                    break;
                }
            }
            if (!found){
				item.timestamp = Date.now();
				newItems.push(item);
				this.currentView.iteration(item);
            }
        }
        this.lastItems = newItems;
    }


/*checkIfItemInList(item, list){
	var finded = false;
	for (const itemList of list) {
		if (itemList.id == item.id) {
			finded = true;
			break;
		}
	}
	return finded;
}*/

	noCoords(){
      for (var item of this.lastItems){
			this.currentView.dismissInteraction(item);
		  }
      this.lastItems = [];
		/*this.label.innerHTML = "x: -  y: -";
		this.label2.innerHTML = "x: -  y: -";*/
	}
}
