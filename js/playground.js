class PlayGround {
	constructor(params = {}) {
		this.bodyParts = [9,10]; //left hand and right hand
		this.params = params;
		this.page = document.createElement('div');
		this.page.className = "interface padding bkColor";
		var btn1 = document.createElement("BUTTON");
		btn1.id = "btBack";
		btn1.innerHTML = "VOLVER";
		btn1.className = "touchable";
		btn1.addEventListener("click", () => {
			interfaz.popView(true);
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
					//console.log(lastItem.pose);
					lastItem.dispatchEvent(new Event("click"));
					lastItem.timestamp = dateNow;
			}
		}
	}
}
