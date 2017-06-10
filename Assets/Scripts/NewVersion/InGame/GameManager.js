#pragma strict

import UnityEngine.UI;
import UnityEngine.SceneManagement;

public class GameManager extends MonoBehaviour {

	var zones : GameObject[];
	private var zoneIdx : int = 0;
	private var mainCam : CameraLama;
	private var isLamaGone : boolean = false;	
	
	private static var instance : GameManager;
	public static function Instance () : GameManager {
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
		mainCam = Camera.main.GetComponent.<CameraLama>();
	}

	function Update () {
		
	}

	function LamaGone (){
		isLamaGone = true;
		UIManager.Instance().AnimateCanonGauge(!isLamaGone);
	}

	function IsLamaGone (){
		return isLamaGone;
	}

	function ShowZone (){
		if (zoneIdx < 4){
			zoneIdx++;
			zones[zoneIdx].SetActive(true);
		}
	}

	function HideZone (){
		if (zoneIdx > 0){
			zones[zoneIdx-1].SetActive(false);
		}
	}
}