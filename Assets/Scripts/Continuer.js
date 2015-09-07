#pragma strict

var mainScript : Main;

function Start () {

}

function Update () {
	
}

function OnMouseOver () {
	if (Input.GetMouseButtonDown(0)){
		mainScript.UnPause();
	}
}