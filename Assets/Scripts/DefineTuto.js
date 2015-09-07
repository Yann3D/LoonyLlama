#pragma strict

var checkBox : tk2dUIToggleControl;

function Start () {
	if (checkBox.IsOn){
		PlayerPrefs.SetInt("Tuto On", 1);
	}
	else{
		PlayerPrefs.SetInt("Tuto On", 0);
	}
}

function Update () {

}

function OnMouseOver(){
	if (Input.GetMouseButton(0)){
		if (checkBox.IsOn){
			PlayerPrefs.SetInt("Tuto On", 0);
		}
		if (!checkBox.IsOn){
			PlayerPrefs.SetInt("Tuto On", 1);
		}
	}
}