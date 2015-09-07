#pragma strict

var projectile : GameObject;

function Start () {

}

function Update () {

}

function OnTriggerEnter (collider : Collider){

	//Déclenche le son lorsque le lama entre dans le collider
	if (collider == projectile.GetComponent.<Collider>()){
		GetComponent.<AudioSource>().Play();
	}
}