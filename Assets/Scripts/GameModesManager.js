#pragma strict

//Classes
var mainScript : Main;
var recoltableManager : RecoltableManager;
var scoreManager : ScoreManager;
var tutoScript : Tutoriel;
var pigeonManager : PigeonManager;

//Lama
var projectile : GameObject;
var lamaRig : GameObject;

//Barre d'énergie
var energyGauge : GameObject;
var energy : tk2dUIProgressBar;

//Jeunes
var youngPeon : YoungMoves;
var youngNageur : GameObject;

//Mode Button Mashing
var sourisTuto : GameObject;

//Mode Jump
private var jumpMode : boolean = false;
private var canJump : boolean = false;
var garonne : GameObject;

//Variables privées
private var vitesseDeVidange : float;
private var consommeEnergy : boolean = false;
private var activeYoung : YoungMoves;
private var playing : boolean = true;

function Start () {
	if (PlayerPrefs.GetInt("Difficulty") == 0){
		vitesseDeVidange = 0.12;
	}
	if (PlayerPrefs.GetInt("Difficulty") == 1){
		vitesseDeVidange = 0.2;
	}
	if (PlayerPrefs.GetInt("Difficulty") == 2){
		vitesseDeVidange = 0.28;
	}
}

function Update () {

	//Si la jauge est à 0, stoppe le jeu
	if (playing){
		if (energy.Value == 0){
			lamaRig.GetComponent.<Animation>().Stop();
			mainScript.ApparitionPlusDEnergie();
			activeYoung.HideAssociatedRecoltables();
			activeYoung.StopYoungMoves();
			activeYoung.ImmobiliseJeune();
			playing = false;
		}
	}

	//Fait descendre la barre d'énergie au-dessus des jeunes
	if (consommeEnergy){
		energy.Value -= vitesseDeVidange * Time.deltaTime;
	}
	
	if (jumpMode){
		if (Input.GetMouseButtonDown(0)){
			if (canJump){
				SetupJumpMode();
				projectile.GetComponent.<Rigidbody>().AddForce(Vector3.up * 7, ForceMode.Impulse);
			}
		}
	}
}


//Mode de jeu avec les récoltables
function RunAndGather(youngTransform : GameObject){
	projectile.GetComponent.<Collider>().isTrigger = false;
	RunAndGatherPhysicsSetup();
	ShowEnergyGauge();
	StartEnergyConsumption();
	energyGauge.transform.parent = youngTransform.transform;
	energyGauge.transform.localPosition = Vector3(0.16,1.4,0.19);
}

//Mode de jeu Saute les Batcubs
function JumpOverBoats () {
	jumpMode = true;
	StopEnergyConsumption();
	HideEnergyGauge();
	if (pigeonManager.enabled == true){
		pigeonManager.KillPigeons();
		pigeonManager.enabled = false;
	}
	if (PlayerPrefs.GetInt("Tuto On") == 1){
		tutoScript.TriggerTutoJump();
	}
}

//Mode de jeu Button Mashing
function SetupButtonMashing () {
	scoreManager.GenerateBonus(0,"ECHAPPE A MR LOYAL !");
	youngPeon.ActiveButtonMashing();
	sourisTuto.SetActive(true);
	StopEnergyConsumption();
	HideEnergyGauge();
}

//Réactive la physique du lama chaque fois que le joueur veut sauter
function SetupJumpMode(){
	canJump = false;
	garonne.GetComponent.<Collider>().enabled = false;
	projectile.GetComponent.<Rigidbody>().isKinematic = false;
	projectile.GetComponent.<Rigidbody>().useGravity = true;
	lamaRig.GetComponent.<Animation>().Play("Rollama");
	yield WaitForSeconds(0.1);
	projectile.GetComponent.<Collider>().isTrigger = true;
	youngNageur.GetComponent.<Collider>().enabled = true;
}

//Inter-mode
function InterMode(){
	InterModePhysicsSetup();
	activeYoung.StopYoungMoves();
	sourisTuto.SetActive(false);
	StopEnergyConsumption();
	HideEnergyGauge();
}

//Prépare le lama pour le mode Run and Gather
function RunAndGatherPhysicsSetup(){
	projectile.GetComponent.<Rigidbody>().useGravity = false;
	projectile.GetComponent.<Rigidbody>().isKinematic = true;
}

//Prépare le lama pour l'entre deux modes
function InterModePhysicsSetup(){
	projectile.GetComponent.<Rigidbody>().useGravity = true;
	projectile.GetComponent.<Rigidbody>().isKinematic = false;
	projectile.GetComponent.<Collider>().enabled = true;
	projectile.transform.parent = null;
	projectile.GetComponent.<Collider>().isTrigger = false;
	projectile.transform.parent = null;
}

//Cache la barre d'énergie
function HideEnergyGauge(){
	energy.Value = 1;
	energyGauge.SetActive(false);
}

//Montre la barre d'énergie
function ShowEnergyGauge(){
	energy.Value = 1;
	energyGauge.SetActive(true);
}

//Arrete la consommation d'énergie
function StopEnergyConsumption(){
	consommeEnergy = false;
}

//Démarre la consommation d'énergie
function StartEnergyConsumption(){
	consommeEnergy = true;
}

//Déclare au script quel jeune est actif
function DefineActiveYoung(young : YoungMoves){
	activeYoung = young;
}

function JumpAuthorization(){
	canJump = true;
}