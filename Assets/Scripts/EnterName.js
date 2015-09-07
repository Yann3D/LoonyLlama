﻿#pragma strict
import UnityEngine.UI;

var textInput : GameObject;
var nameInput : Text;
var mainScript : MainMenu;
private var validateName : boolean = false;

function Start () {

}

function Update () {

	//Valide le nom s'il n'est pas vide 
	if (textInput.activeSelf){
		if (nameInput.text != ""){
			if (Input.GetKey("return")){
				if (!validateName){
					validateName = true;
					PlayerPrefs.SetString("Name",nameInput.text);
					mainScript.NomValide();
				}
			}
		}
	}
}