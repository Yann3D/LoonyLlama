#pragma strict
import UnityEngine.UI;

var pigeonManager : PigeonManager;
var lamanager : Lamanager;
var lamaRig : GameObject;
var distanceManager : DistanceManager;
var achManager : AchievementsManager;
var menuPause : GameObject;
var boutonRejouer : GameObject;
var spotRejouer : Transform;
var ecranFinA : GameObject;
var ecranFinB : GameObject;
var ecranFinC : GameObject;
var energyTxt : GameObject;
var ecranRecap : GameObject;
var spotRecap : GameObject;
var score : Text;
var scoreRecap : Text;

var tickartes : Text;
var croissants : Text;
var caneles : Text;
var macarons : Text;
var sandwichs : Text;
var raisins : Text;
var distance : Text;

private var recap : boolean = false;
private var goPigeon : boolean = true;
private var isPaused : boolean = false;
private var storeVelocity : Vector3;

function Start () {
	
	Time.timeScale = 1;
	//PlayerPrefs.DeleteAll();
}

function Update () {
	
	if (Input.GetKeyDown("escape") && !isPaused){
		Pause();
	}
	else if (Input.GetKeyDown("escape") && isPaused){
		UnPause();
	}
	
	//Lance la génération des pigeons après le lancement du lama
	if (goPigeon){
		if (lamaRig.GetComponent.<Animation>().IsPlaying("Ejection")){
			distanceManager.enabled = true;
			pigeonManager.enabled = true;
			goPigeon = false;
		}	
	}
	
	//Fait glisser l'écran de récap devant la caméra
	if (recap){
		ecranRecap.transform.position = Vector3.MoveTowards(ecranRecap.transform.position,spotRecap.transform.position,Time.deltaTime * 40);
	}
}

//Fait apparaitre le bouton Rejouer
function ApparitionRejouer(){
	pigeonManager.KillPigeons();
	var replayButton : GameObject = Instantiate(boutonRejouer, spotRejouer.position,Quaternion.identity);
	replayButton.transform.parent = spotRejouer.transform;
}

//Fait apparaitre le texte "Plus d'énergie"
function ApparitionPlusDEnergie(){
	pigeonManager.KillPigeons();
	ApparitionRejouer();
	energyTxt.SetActive(true);
}

//Déclenche l'apparition de l'écran récap
function ApparitionRecap(){
	if (PlayerPrefs.GetInt("Difficulty") == 0){
		ecranFinC.SetActive(true);
		if (PlayerPrefs.GetInt("Swag !") != 1){
			PlayerPrefs.SetInt("Swag !",1);
			achManager.DisplayUnlockedAchievement("Swag !");
		}
	}
	if (PlayerPrefs.GetInt("Difficulty") == 1){
		ecranFinB.SetActive(true);
		if (PlayerPrefs.GetInt("Mega-Swag !") != 1){
			PlayerPrefs.SetInt("Mega-Swag !",1);
			achManager.DisplayUnlockedAchievement("Mega-Swag !");
		}
	}
	if (PlayerPrefs.GetInt("Difficulty") == 2){
		ecranFinA.SetActive(true);
		if (PlayerPrefs.GetInt("Ultra-Swag !") != 1){
			PlayerPrefs.SetInt("Ultra-Swag !",1);
			achManager.DisplayUnlockedAchievement("Ultra-Swag !");
		}
	}
	UpdateResults();
	recap = true;
}

//Met le jeu en pause
function Pause(){
	Time.timeScale = 0;
	menuPause.SetActive(true);
	isPaused = true;
}

//Sort le jeu de la pause
function UnPause() {
	Time.timeScale = 1;
	menuPause.SetActive(false);
	isPaused = false;
}

//Met à jour les différentes valeurs de l'écran de récap avant de l'afficher
function UpdateResults(){
	tickartes.text = PlayerPrefs.GetInt("Tickartes").ToString();
	croissants.text = PlayerPrefs.GetInt("Croissants").ToString();
	caneles.text = PlayerPrefs.GetInt("Caneles").ToString();
	macarons.text = PlayerPrefs.GetInt("Macarons").ToString();
	sandwichs.text = PlayerPrefs.GetInt("Sandwichs").ToString();
	raisins.text = PlayerPrefs.GetInt("Raisins").ToString();
	distance.text = PlayerPrefs.GetInt("LaunchDistance").ToString() + " M";
	scoreRecap.text = score.text;
}