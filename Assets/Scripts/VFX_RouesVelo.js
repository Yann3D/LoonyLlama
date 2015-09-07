#pragma strict

var vitesse : int;

function Start () {

}

function Update () {
	transform.Rotate(Vector3.forward * Time.deltaTime * vitesse);
}