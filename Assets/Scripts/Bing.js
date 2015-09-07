#pragma strict

var projectile : GameObject;
var youngBrouette : GameObject;
var chapeau : GameObject;
var youngMoves : YoungMoves;
var mrLoyal : GameObject;
var bing : GameObject;

function Start () {

}

function Update () {

}

function OnTriggerExit (collider : Collider){

	//Gère la collision du jeune avec le lampadaire dans le jardin des lumières + désactive Mr Loyal
	if (collider == projectile.GetComponent.<Collider>()){
		bing.GetComponent.<Animation>().Play();
		youngMoves.EjectLlama();
		chapeau.GetComponent.<Collider>().enabled = true;
		chapeau.GetComponent.<Rigidbody>().isKinematic = false;
		chapeau.GetComponent.<Rigidbody>().useGravity = true;
		chapeau.GetComponent.<Rigidbody>().AddForce(Vector3(-2,5,0),ForceMode.Impulse);
		chapeau.GetComponent.<Rigidbody>().AddTorque(Vector3(0,5,0),ForceMode.Impulse);
		yield WaitForSeconds(1);
		mrLoyal.SetActive(false);
	}
}