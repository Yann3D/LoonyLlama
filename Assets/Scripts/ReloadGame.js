#pragma strict


function Start () {

}

function Update () {

}

function OnMouseOver () {

	//Relance la partie si le joueur clique sur le bouton Rejouer
	if (Input.GetMouseButtonDown(0)){
		Application.LoadLevel(2);
	}
}