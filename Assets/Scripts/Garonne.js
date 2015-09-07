#pragma strict

var lamaRig : GameObject;
var projectile : GameObject;

function Start () {

}

function Update () {

}

function OnTriggerEnter (collider : Collider) {

	//Joue l'anim de noyade du lama dans la Garonne
	if (collider == projectile.GetComponent.<Collider>()){
		projectile.GetComponent.<Rigidbody>().useGravity = false;
		projectile.GetComponent.<Rigidbody>().isKinematic = true;
		collider.isTrigger = true;
		lamaRig.GetComponent.<Animation>().Play("Noyade");
	}
}