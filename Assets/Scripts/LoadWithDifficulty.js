#pragma strict

var levelOfDifficulty : int;

function Start () {

}

function Update () {

}

function OnMouseOver () {
	if (Input.GetMouseButton(0)){
		PlayerPrefs.SetInt("Difficulty", levelOfDifficulty);
		Application.LoadLevel(2);
	}
}