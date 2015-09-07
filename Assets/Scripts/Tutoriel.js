#pragma strict
#pragma downcast

var clickToContinue : GameObject;
var tutoLaunch : GameObject;
var tutoFailEnergy : GameObject;
var tutoBatcub : GameObject;
var soundManager : SoundMusicManager;
var gameModesManager : GameModesManager;
var scoreManager : ScoreManager;
var canon : GameObject;
private var thrower : MonoBehaviour;
private var pigeonTuto : GameObject;
private var croissantTuto : GameObject;
private var tutoPartPigeon : GameObject;
private var tutoPartCroissant : GameObject;
private var triggerTuto : boolean = false;
private var tutoJump : boolean = false;
private var pigeonSpawned : boolean = false;
private var croissantSpawned : boolean = false;
private var displayed : boolean = false;


function Start () {
	
	//Vérifie si le joueur a activé le tutoriel ou non
	if (PlayerPrefs.GetInt("Tuto On") == 1){
		thrower = canon.GetComponent("Thrower");
		triggerTuto = true;
	}
	else{
		this.enabled = false;
	}
}

function Update () {
	
	if (triggerTuto){
		if (!displayed){
			TutoLaunch();
		}
		if (Input.GetMouseButtonDown(0)){
			UnTriggerTutoLaunch();
		}
	}
	
	if (croissantSpawned){
		if (croissantTuto.transform.position.x < Camera.main.transform.position.x + 3){
			if (!displayed){
				TutoRecoltable();
			}
			if (displayed){
				if (Input.GetMouseButtonDown(0)){
					UnTriggerTutoRecoltable();
				}		
			}
		}
	}
	
	if (pigeonSpawned){
		if (pigeonTuto.transform.position.x > Camera.main.transform.position.x - 3){
			if (!displayed){
				TutoTickarte();
			}
		}
		if (displayed){
			if (Input.GetMouseButtonDown(0)){
				UnTriggerTutoTickarte();
			}
		}
	}
	
	if (tutoJump){
		if (!displayed){
			TutoJump();
		}
		else{
			if (Input.GetMouseButtonDown(0)){
				UnTriggerTutoJump();
			}
		}
	}
}

//Fait apparaitre le tuto de lancer
function TutoLaunch(){
	Time.timeScale = 0;
	thrower.enabled = false;
	tutoLaunch.SetActive(true);
	clickToContinue.SetActive(true);
	displayed = true;
}

//Fait apparaitre le tuto des récoltables
function TutoRecoltable(){
	Time.timeScale = 0;
	tutoPartCroissant = croissantTuto.transform.Find("Souris_Recoltables").gameObject;
	clickToContinue.SetActive(true);
	tutoPartCroissant.SetActive(true);
	displayed = true;
}

//Fait apparaitre le tuto des cartes TBC
function TutoTickarte(){
	Time.timeScale = 0;
	pigeonTuto.GetComponent.<Collider>().enabled = true;
	tutoPartPigeon = pigeonTuto.transform.Find("Tickarte").gameObject;
	clickToContinue.SetActive(true);
	tutoPartPigeon.SetActive(true);
	displayed = true;
}

//Fait apparaitre le tuto du saut des BatCub
function TutoJump(){
	Time.timeScale = 0;
	clickToContinue.SetActive(true);
	tutoBatcub.SetActive(true);
	displayed = true;
}

//Fait disparaitre le tuto du lancer
function UnTriggerTutoLaunch(){
	Time.timeScale = 1;
	thrower.enabled = true;
	tutoLaunch.SetActive(false);
	clickToContinue.SetActive(false);
	scoreManager.TirReady();
	triggerTuto = false;
	displayed = false;
}

//Fait disparaitre le tuto des récoltables
function UnTriggerTutoRecoltable(){
	Time.timeScale = 1;
	clickToContinue.SetActive(false);
	tutoPartCroissant.SetActive(false);
	croissantSpawned = false;
	displayed = false;
}

//Fait disparaitre le tuto des cartes TBC
function UnTriggerTutoTickarte(){
	Time.timeScale = 1;
	clickToContinue.SetActive(false);
	tutoPartPigeon.SetActive(false);
	pigeonSpawned = false;
	displayed = false;
}

//Fait disparaitre le tuto du saut des BatCub
function UnTriggerTutoJump(){
	Time.timeScale = 1;
	clickToContinue.SetActive(false);
	tutoBatcub.SetActive(false);
	gameModesManager.JumpOverBoats();
	gameModesManager.JumpAuthorization();
	tutoJump = false;
	displayed = false;
}

//Récupère le GO du premier croissant poppé
function TriggerTutoRecoltable(croissant : GameObject){
	croissantTuto = croissant;
	croissantSpawned = true;
}

//Récupère le GO du premier pigeon poppé
function DefinePigeon(pigeon : GameObject){
	pigeonTuto = pigeon;
	pigeonSpawned = true;
	pigeonTuto.GetComponent.<Collider>().enabled = false;
}

//Déclenche le tuto jump
function TriggerTutoJump(){
	PlayerPrefs.SetInt("Tuto On", 0);
	tutoJump = true;
}