class MainView {
	constructor(params = {}) {
		this.bodyParts = [9,10]; //left hand and right hand
		this.params = params;
		this.page = document.createElement('div');
		this.page.className = "interface padding";

		var btn1 = document.createElement("BUTTON");
		btn1.id = "btSkeleton";
		btn1.innerHTML = "Esqueleto ON";
		btn1.className = "touchable";
		btn1.addEventListener("click", () => {
			DRAW_SKELETON = !DRAW_SKELETON;
			if (DRAW_SKELETON)
				btn1.innerHTML = "Esqueleto ON";
			else
				btn1.innerHTML = "Esqueleto OFF";
		});
		this.page.appendChild(btn1);
		
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
		this.page.appendChild(btn2);
		
		var btn3 = document.createElement("BUTTON");
		btn3.id = "btBackground";
		btn3.className = "touchable";
		btn3.innerHTML = "Fondo ON";
		btn3.addEventListener("click", () => {
			if (camera.toggleVideo())
				btn3.innerHTML = "Fondo ON";
			else
				btn3.innerHTML = "Fondo OFF";
		});
		this.page.appendChild(btn3);
		var btn4 = document.createElement("BUTTON");
		btn4.id = "btNEXT";
		btn4.className = "touchable";
		btn4.innerHTML = "NEXT";
		btn4.addEventListener("click", () => {
			interfaz.pushView("PlayGround", true);
		});
		this.page.appendChild(btn4);
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
