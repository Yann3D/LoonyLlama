#pragma strict

import UnityEngine.UI;
import UnityEngine.SceneManagement;

public class UIManager extends MonoBehaviour {

	var lamaRB : Rigidbody2D;
	var lamanim : Animator;

	@Header ("Launch")
	var launchGauge : Image;
	var launchGaugeSpeed : float = 1.0;
	var lamaImpulse : float = 10.0;
	var launchSmokeAnim : Animation;
	private var startingGame : boolean = true;
	private var isLaunching : boolean = false;
	private var launchLama : boolean = false;
	private var launchUp : boolean = false;

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
		if (startingGame){
			if (Input.GetMouseButtonDown(0)){
				isLaunching = true;
			}
			if (Input.GetMouseButtonUp(0) || (!Input.GetMouseButton(0) && isLaunching)){
				isLaunching = false;
				launchLama = true;
			}

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
		}

		if (Input.GetKeyDown("escape")){
			TogglePause();
		}
	}

	function FixedUpdate (){
		if (launchLama){
			lamaRB.simulated = true;
			lamaRB.GetComponent.<CircleCollider2D>().enabled = true;
			lamaRB.GetComponent.<AudioSource>().Play();
			lamaRB.transform.SetParent(null);
			var launchingDirection : Vector3 = lamaRB.transform.TransformDirection(Vector3.up);
			lamaRB.AddForce (launchingDirection * launchGauge.fillAmount * lamaImpulse, ForceMode2D.Impulse);
			lamanim.SetTrigger("Launch");
			launchSmokeAnim.Play();
			launchLama = false;
			startingGame = false;
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

	function IsStartingGame (){
		return startingGame;
	} 
}