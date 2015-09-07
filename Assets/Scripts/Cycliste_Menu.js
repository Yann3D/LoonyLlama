#pragma strict
#pragma downcast

var cycleUn : GameObject;
var cycleDeux : GameObject;
var cycleTrois : GameObject;
var popSpot : GameObject;
var intervalleDePop : int;
private var cycleTab = new Array();
private var popCycle : boolean = true;

function Start () {
cycleTab.Push(cycleUn);
cycleTab.Push(cycleDeux);
cycleTab.Push(cycleTrois);
}

function Update () {
	if (popCycle){
		GenereUnCycliste();
	}
}

function GenereUnCycliste(){
	popCycle = false;
	var rndCycle =  Random.Range(0,3);
	var intervalle = Random.Range(2, intervalleDePop);
	Instantiate (cycleTab[rndCycle], popSpot.transform.position,Quaternion.identity);
	yield WaitForSeconds (intervalle);
	popCycle = true;
}