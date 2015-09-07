#pragma strict

var camScript : CamMenu;
var menuTarget : GameObject;
static var colliderEnabled : boolean = true;

function Start () {

}

function Update () {
	if (!colliderEnabled){
		this.GetComponent.<Collider>().enabled = false;
	}
	if (colliderEnabled){
		this.GetComponent.<Collider>().enabled = true;
	}
}

function OnMouseOver (){
	if (Input.GetMouseButtonDown(0)){
		colliderEnabled = false;
		camScript.MoveToMenu(menuTarget);
		yield WaitForSeconds (0.2);
		colliderEnabled = true;
	}
}