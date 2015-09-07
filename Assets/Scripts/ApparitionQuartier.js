#pragma strict

var nextBlock : GameObject;
var projectile : GameObject;
var panier : GameObject;

function Start () {

}

function Update () {

}

function OnTriggerEnter (collider : Collider) {

	//Fait apparaitre le quartier suivant lorsque le lama entre dans le collider
	if (collider == projectile.GetComponent.<Collider>()){
		nextBlock.SetActive(true);
	}
	
	if (collider == panier.GetComponent.<Collider>()){
		nextBlock.SetActive(true);
	}
}