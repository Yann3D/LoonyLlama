#pragma strict

var cam : Camera;
var cadre : GameObject;
var cadreText : tk2dTextMesh;
var infoText : String;
var origin : boolean = false;
private var newCadre : GameObject;
private var bulle : boolean = true;

function Start () {

}

function Update () {

}

function OnMouseOver () {
	if (bulle){
		var mousePos : Vector3 = cam.ScreenToWorldPoint(Input.mousePosition);
		cadreText.text = infoText;
		if (origin){
			newCadre = Instantiate(cadre, Vector3(mousePos.x,mousePos.y,-5.3), Quaternion.identity);
		}
		else{
			newCadre = Instantiate(cadre, Vector3(mousePos.x + 3,mousePos.y,-5.3), Quaternion.identity);
		}
		bulle = false;
	}
}

function OnMouseExit () {
	bulle = true;
	Destroy (newCadre);
}