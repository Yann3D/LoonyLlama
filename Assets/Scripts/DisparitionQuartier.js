#pragma strict

var previousBlock : GameObject;
var projectile : GameObject;
var panier : GameObject;

function Start () {

}

function Update () {

}

function OnTriggerEnter (collider : Collider) {

	//Fait disparaitre un quartier précédent lorsque le lama passe dans le collider
	if (collider == projectile.GetComponent.<Collider>()){
		previousBlock.SetActive(false);
	}
	
	if (collider == panier.GetComponent.<Collider>()){
		previousBlock.SetActive(false);
	}
}