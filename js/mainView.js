class MainView {
	constructor() {
		this.bodyParts = [9,10]; //left hand and right hand
		this.topParent = document.getElementById("main");
		
		this.label = document.getElementById("coords");
		this.label2 = document.getElementById("pos");
		this.button1 = document.getElementById("btSkeleton");
		this.button1.addEventListener("click", () => {
			DRAW_SKELETON = !DRAW_SKELETON;
			//interfaz.currentView = new playGround();
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
