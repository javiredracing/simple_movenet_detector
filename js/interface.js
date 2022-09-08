const CLICK_TIME = 1500;

class Interface {
	constructor() {
		this.iface = document.getElementById('iface');
		this.lastItem = "";
		this.timestamp = 0;
		this.label = document.getElementById("coords");
		this.label2 = document.getElementById("pos");
		this.button1 = document.getElementById("btSkeleton");
		this.button1.addEventListener("click", () => {
		  DRAW_SKELETON = !DRAW_SKELETON;
		});
		this.button2 = document.getElementById("btCursor");
		this.button2.addEventListener("click", () => {
		  DRAW_RIGHT_HAND = !DRAW_RIGHT_HAND;
		});
		this.button3 = document.getElementById("btBackground");
		this.button3.addEventListener("click", () => {
		  DRAW_BACKGROUND = !DRAW_BACKGROUND;
		});	
	}
	
	manageCoords(coords){
		let elems = document.elementsFromPoint(coords.x, coords.y);
		this.setLabel(this.label2, coords);
		if (elems != null){
			var finded = false;
			for (const elem of elems){
				if (elem.classList.contains("touchable")){
					finded = true;
					//console.log(elem.tagName);
					this.manageHover(elem);
					break;
				}
			}
			if (!finded && (this.lastItem !== "")){
				this.lastItem.classList.remove("hover");
				this.lastItem = "";
			}
		}
	}
	
	setLabel(label, coords){
		label.innerHTML = "x:" + coords.x.toFixed() + " y:" + coords.y.toFixed();
	}
	
	manageHover(item){
		if (this.lastItem === ""){
			this.lastItem = item;
			this.lastItem.classList.add("hover");
			this.timestamp = Date.now();
		}else{
			if (this.lastItem.id == item.id){
				let dateNow = Date.now();
				if ((dateNow - this.timestamp) > CLICK_TIME){
					item.dispatchEvent(new Event("click"));
					this.timestamp = Date.now();
					this.lastItem.classList.remove("hover");
					this.lastItem = "";
				}
			}else{
				this.lastItem.classList.remove("hover");
				this.lastItem = item;
				this.lastItem.classList.add("hover");
				this.timestamp = Date.now();
			}
		}
	}
	
	noCoords(){
		if (this.lastItem !== ""){
			this.lastItem.classList.remove("hover");
			this.lastItem = "";
		}
		this.label.innerHTML = "x: -  y: -";
		this.label2.innerHTML = "x: -  y: -";
	}
}