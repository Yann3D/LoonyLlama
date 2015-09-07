#pragma strict

var youngMoves : YoungMoves;
var projectile : GameObject;
var panierPiqueNique : GameObject;

function Start () {

}

function Update () {

}

function OnTriggerEnter (collider : Collider){

	//Gère les éjections du lama en fin de quartier
	if (collider == projectile.GetComponent.<Collider>()){
		this.GetComponent.<Collider>().enabled = false;
		youngMoves.EjectLlama();
	}
	if (collider == panierPiqueNique.GetComponent.<Collider>()){
		this.GetComponent.<Collider>().enabled = false;
		panierPiqueNique.SetActive(false);
		projectile.transform.position = this.GetComponent.<Collider>().transform.position;
		youngMoves.EjectLlama();
	}

}