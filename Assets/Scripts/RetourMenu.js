#pragma strict

function Start () {

}

function Update () {
	
}

function OnMouseOver () {
	if (Input.GetMouseButtonDown(0)){
		Time.timeScale = 1;
		PlayerPrefs.Save();
		Application.LoadLevel(1);
	}
}