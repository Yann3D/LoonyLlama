#pragma strict

var nomDuSucces : String;
var tickBoxOn : GameObject;
var tickBoxOff : GameObject;

function Start () {

	if (PlayerPrefs.HasKey(nomDuSucces)){
		if (PlayerPrefs.GetInt(nomDuSucces) == 1){
			tickBoxOn.SetActive(true);
			tickBoxOff.SetActive(false);
		}
		else{
			tickBoxOn.SetActive(false);
			tickBoxOff.SetActive(true);
		}
	}
	else{
		PlayerPrefs.SetInt(nomDuSucces, 0);
		tickBoxOn.SetActive(false);
		tickBoxOff.SetActive(true);
	}
}

function Update () {

}