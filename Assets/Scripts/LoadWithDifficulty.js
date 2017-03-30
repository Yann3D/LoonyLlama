#pragma strict

import UnityEngine.SceneManagement;

var levelOfDifficulty : int;

function Start () {

}

function Update () {

}

function OnMouseOver () {
	if (Input.GetMouseButton(0)){
		PlayerPrefs.SetInt("Difficulty", levelOfDifficulty);
		SceneManager.LoadScene("Lukum_Tare");
	}
}