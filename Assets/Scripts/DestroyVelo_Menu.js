#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter (collider : Collider){
	Destroy(collider.gameObject);
}