#pragma strict

function Start () {
	//PlayerPrefs.SetString("Name","");
}

function Update () {

	//Fait apparaitre le menu
	if (Input.GetMouseButton(0)){
		Application.LoadLevel(1);
	}
}