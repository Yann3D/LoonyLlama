#pragma strict

var projectile : GameObject;
var mrLoyal : GameObject;
var sourisTuto : GameObject;
var spawnPoint : GameObject;
var associatedYoung : YoungMoves;
var isYoung : boolean = true;
var scoreManager : ScoreManager;
var gameModesManager : GameModesManager;

static var isJardin : boolean;
static var isMiroir : boolean;

function Start () {
	isJardin = true;
	isMiroir = true;
}

function Update () {

}

function MrLoyal () {
	//Spawn Mr Loyal au spawn point indiqué si 10/10 canelés
	mrLoyal.transform.position = spawnPoint.transform.position;
	mrLoyal.SetActive(true);
	sourisTuto.SetActive(true);
	gameModesManager.SetupButtonMashing();
	if (isYoung){
		GetComponent.<Collider>().enabled = false;
	}
	isJardin = false;
}

function OnTriggerEnter(collider : Collider){

	//Spawn Mr Loyal au spawn point indiqué si canelés != 10/10
	if (isJardin){
		if (collider == projectile.GetComponent.<Collider>()){
			mrLoyal.transform.position = spawnPoint.transform.position;
			mrLoyal.SetActive(true);
			sourisTuto.SetActive(true);
			gameModesManager.SetupButtonMashing();
			isJardin = false;
		}
	}
	else if (isMiroir){
		if (collider == projectile.GetComponent.<Collider>()){
			mrLoyal.transform.position = spawnPoint.transform.position;
			mrLoyal.SetActive(true);
			//gameModesManager.SetupButtonMashing();
			isMiroir = false;
		}
	}
}