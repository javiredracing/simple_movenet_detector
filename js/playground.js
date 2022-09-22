/*0: nose
1: left_eye
2: right_eye
3: left_ear
4: right_ear
5: left_shoulder
6: right_shoulder
7: left_elbow
8: right_elbow
9: left_wrist
10: right_wrist
11: left_hip
12: right_hip
13: left_knee
14: right_knee
15: left_ankle
16: right_ankle*/

class PlayGround {
	constructor(params = {}) {
		this.bodyParts = [9,10]; //left hand and right hand
		this.params = params;
		this.page = document.createElement('div');
		//*****//
		this.page.className = "interface padding bkColor";
		var btn1 = document.createElement("BUTTON");
		btn1.id = "btBack";
		btn1.innerHTML = "VOLVER";
		btn1.className = "touchable";
		btn1.addEventListener("click", () => {
			interfaz.popView(true);
			//interfaz.pushView("",true);
		});
		this.page.appendChild(btn1);

  }
	iteration(item){
		item.classList.add("hover");
	}
	dismissInteraction(item){
		item.classList.remove("hover");
	}
	validate(listOfItems){
		for (var lastItem of listOfItems){
			let dateNow = Date.now();
			if ((dateNow - lastItem.timestamp) > CLICK_TIME){
					console.log(lastItem.pose);
					lastItem.dispatchEvent(new Event("click"));
					lastItem.timestamp = dateNow;
			}
		}
	}
}
