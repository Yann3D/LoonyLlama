#pragma strict

var projectile : GameObject;
var lamaRig : GameObject;
var gameModesManager : GameModesManager;
var tutoScript : Tutoriel;
private var tutoTriggered : boolean = false;
private var authorizationGiven : boolean = false;

function Start () {

}

function Update () {

}

function OnTriggerEnter(collider : Collider) {
	//Déclenche le JumpMode au-dessus des BatCub
	if (collider == projectile.GetComponent.<Collider>()){
		if (PlayerPrefs.GetInt("Tuto On") == 0){
			gameModesManager.JumpOverBoats();
			gameModesManager.JumpAuthorization();
		}
		else{
			if (!tutoTriggered){
				tutoScript.TriggerTutoJump();
				tutoTriggered = true;
			}
		}
	}
}