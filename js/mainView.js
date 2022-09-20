class MainView {
	constructor(params = {}) {
		this.bodyParts = [9,10]; //left hand and right hand
		this.params = params;
		this.topParent = document.createElement('div');
		//this.topParent.id = "main";
		this.topParent.className = "interface padding";

		var btn1 = document.createElement("BUTTON");
		btn1.id = "btSkeleton";
		btn1.innerHTML = "Esqueleto ON";
		btn1.className = "touchable";
		btn1.addEventListener("click", () => {
			DRAW_SKELETON = !DRAW_SKELETON;
			//interfaz.currentView = new playGround();
			if (DRAW_SKELETON)
				btn1.innerHTML = "Esqueleto ON";
			else
				btn1.innerHTML = "Esqueleto OFF";
		});
		this.topParent.appendChild(btn1);
		
		var btn2 = document.createElement("BUTTON");
		btn2.id = "btCursor";
		btn2.className = "touchable";
		btn2.innerHTML = "Cursor ON";
		btn2.addEventListener("click", () => {
			DRAW_HANDS = !DRAW_HANDS;
			if (DRAW_HANDS)
				btn2.innerHTML = "Cursor ON";
			else
				btn2.innerHTML = "Cursor OFF";
		});
		this.topParent.appendChild(btn2);
		
		var btn3 = document.createElement("BUTTON");
		btn3.id = "btBackground";
		btn3.className = "touchable";
		btn3.innerHTML = "Fondo ON";
		btn3.addEventListener("click", () => {
			if (camera.toggleVideo())
				btn3.innerHTML = "Background ON";
			else
				btn3.innerHTML = "Background OFF";
		});
		this.topParent.appendChild(btn3);
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
					//console.log(lastItem.pose);
					lastItem.dispatchEvent(new Event("click"));
					lastItem.timestamp = dateNow;
			}
		}
	}
}
