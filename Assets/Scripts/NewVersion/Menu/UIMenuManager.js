#pragma strict

import UnityEngine.UI;
import UnityEngine.EventSystems;

class UIMenuManager extends MonoBehaviour {

	var nameInput : GameObject;
	var gameParameters : GameParameters;

	var mainMenu : GameObject;
	var difficultyMenu : GameObject;
	var albumMenu : GameObject;
	var succesMenu : GameObject;
	var creditsScreen : GameObject;
	var photoBigPicture : GameObject;
	var photoBigPictureImage : Image;
	var photoText : Text;
	var screenCollider : GameObject;
	private var currentMenu : GameObject;

	private static var instance : UIMenuManager;
	public static function Instance () : UIMenuManager {
		return instance;
	}

	function Awake (){
		if (instance != null){
			Destroy (gameObject);
		}
		else {
			instance = this;
		}
	}

	function Start () {
		currentMenu = mainMenu;
		PlayCurrentMenuEnter();
		currentMenu.SetActive(true);
	}

	function Update () {
		
	}

	function OnClickPlay (){
		PlayCurrentMenuLeave();
		currentMenu = difficultyMenu;
		PlayCurrentMenuEnter();
		currentMenu.SetActive(true);
	}

	function OnPickDifficulty (diff : int){
		gameParameters.difficulty = diff;
	}

	function OnClickAlbum (){
		PlayCurrentMenuLeave();
		currentMenu = albumMenu;
		PlayCurrentMenuEnter();
		currentMenu.SetActive(true);
	}

	function OnClickSucces (){
		PlayCurrentMenuLeave();
		currentMenu = succesMenu;
		PlayCurrentMenuEnter();
		currentMenu.SetActive(true);
	}

	function OnClickCredits (){
		PlayCurrentMenuLeave();
		currentMenu = creditsScreen;
		PlayCurrentMenuEnter();
		currentMenu.SetActive(true);
	}

	function OnClickQuitter (){
		Application.Quit();
	}

	function OnClickBack (){
		PlayCurrentMenuLeave();
		currentMenu = mainMenu;
		PlayCurrentMenuEnter();
		currentMenu.SetActive(true);
	}

	function PlayCurrentMenuEnter (){
		currentMenu.GetComponent.<Animation>().Play("AnyMenuAnimEnter");
	}

	function PlayCurrentMenuLeave (){
		currentMenu.GetComponent.<Animation>().Play("AnyMenuAnimLeave");
	}

	function OnClickMiniature (){
		photoBigPictureImage.sprite = EventSystem.current.currentSelectedGameObject.GetComponent.<Image>().sprite;
		photoText.text = EventSystem.current.currentSelectedGameObject.name;
		photoBigPicture.SetActive(true);
		screenCollider.SetActive(true);
	}

	function OnClickScreenCollider (){
		photoBigPicture.SetActive(false);
		screenCollider.SetActive(false);
	}
}