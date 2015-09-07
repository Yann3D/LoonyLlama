#pragma strict

var mainScript : Main;
var projectile : GameObject;
var youngOne : GameObject;
private var bReplay : boolean = false;

function Start () {
youngOne.SetActive(true);
}

function Update () {

}

function OnTriggerEnter (collider : Collider){

	//Fait apparaitre le bouton Rejouer lorsque le lama tombe sur le sol dans le quartier Saint-Michel
	if (!bReplay){
		if (collider == projectile.GetComponent.<Collider>()){
			youngOne.SetActive(false);
			bReplay = true;
			mainScript.ApparitionRejouer();
		}
	}
}