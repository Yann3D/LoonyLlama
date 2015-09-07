#pragma strict

var nuageUn : GameObject;
var nuageDeux : GameObject;
var nuageTrois : GameObject;
var intervalleDePop : int;
private var nuageTab = new Array();
private var popNuage : boolean = true;

function Start () {
nuageTab.Push(nuageUn);
nuageTab.Push(nuageDeux);
nuageTab.Push(nuageTrois);

}

function Update () {
	if (popNuage){
		GenereUnNuage();
	}
}

//Génère les croissants du quartier Saint-Michel
function GenereUnNuage (){
	popNuage = false;
	var rndNuage =  Random.Range(0,3);
	var rndSpot = Random.Range (-1.0,3.0);
	Instantiate (nuageTab[rndNuage], Vector3(-7.5, rndSpot, 2.8),Quaternion.identity);
	yield WaitForSeconds (intervalleDePop);
	popNuage = true;
}