class PlayGround {
	constructor(params = {}) {
		this.bodyParts = []; //left hand and right hand
		this.params = params;
		this.topParent = document.createElement('div');
		this.topParent.className = "interface padding";
		//Carga estatica
  }
	iteration(item){
		item.classList.add("hover");
	}
	dismissInteraction(item){
		//remove hover
	}
	validate(listOfItems){
		for (var lastItem of listOfItems){

		}
	}
}
