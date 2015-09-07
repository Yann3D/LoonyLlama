#pragma strict
import UnityEngine.UI;

var menu : GameObject; 
var nameInput : GameObject;
var welcomeText : Text;
private var nameEntered : boolean = false;

function Start () {
	
	//PlayerPrefs.DeleteAll();
	
	//Propose au joueur d'entrer son nom si son nom est vide dans le profil
	if (PlayerPrefs.GetString("Name") == ""){
		nameInput.SetActive(true);
	}
	else{
		NomValide();
	}
}

function Update () {
	
	if (PlayerPrefs.GetString("Name") != ""){
		if (nameEntered){
			welcomeText.text = welcomeText.text + PlayerPrefs.GetString("Name") + " !";
			nameInput.SetActive(false);
			nameEntered = false;
		}
	}
}

//Cache le TextInput du nom et affiche le menu
function NomValide () {
	nameEntered = true;
	menu.SetActive(true);
}