#pragma strict

var projectile : GameObject;
var cycliste : Cycliste;
var mrLoyal : GameObject;

function Start () {

}

function Update () {

}

function OnTriggerEnter (collider : Collider){

	//Ejecte le lama et désactive Mr Loyal
	if (collider == projectile.GetComponent.<Collider>()){
		this.GetComponent.<Collider>().enabled = false;
		cycliste.EjectLlama();
		yield WaitForSeconds(1);
		mrLoyal.SetActive(false);
	}
}