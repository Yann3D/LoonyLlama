#pragma strict

import UnityEngine.UI;
import UnityEngine.SceneManagement;

public class UIManager extends MonoBehaviour {

	@Header ("Launch")
	var launchGauge : Image;
	var launchGaugeSpeed : float = 1.0;
	
	private var isLaunching : boolean = false;
	private var launchUp : boolean = false;

	@Header ("Game")
	private var canBeRescued : boolean = false;

	var pauseMenu : GameObject;
	private var pauseActive : boolean = false;

	private static var instance : UIManager;
	public static function Instance () : UIManager {
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
		
	}

	function Update () {
		if (isLaunching){
			if (launchGauge.fillAmount >= 1 && launchUp){
				launchUp = false;
			}
			else if (launchGauge.fillAmount <= 0 && !launchUp){
				launchUp = true;
			}
			if (launchUp){
				launchGauge.fillAmount += launchGaugeSpeed * Time.deltaTime;
			}
			else if (!launchUp){
				launchGauge.fillAmount -= launchGaugeSpeed * Time.deltaTime;
			}
		}

		if (Input.GetKeyDown("escape")){
			TogglePause();
		}
	}

	function TogglePause (){
		if (!pauseMenu.activeSelf){
			pauseMenu.SetActive(true);
		}
		else if (pauseMenu.activeSelf){
			pauseMenu.SetActive(false);
		}
	}

	function BackToMenu (){
		SceneManager.LoadScene("Menu");
	}

	function Replay (){
		SceneManager.LoadScene("Lukum_Tare");
	}

	function AnimateCanonGauge (state : boolean){
		isLaunching = state;
	}

	function GetGaugeImpulse (){
		return launchGauge.fillAmount;
	}

	function SetRescuable (){
		canBeRescued = true;
	}

	function SetNotRescuable (){
		canBeRescued = false;
	}

	function CanBeRescued (){
		return canBeRescued;
	}
}