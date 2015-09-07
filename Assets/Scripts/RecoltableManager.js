#pragma strict

var scoreManager : ScoreManager;
var ligneTramManager : LigneTramManager;
var gameModesManager : GameModesManager;
var achManager : AchievementsManager;
var apparitionMrLoyal : ApparitionMrLoyal;
var tutoScript : Tutoriel;
var energyGauge : tk2dUIProgressBar;
var txtCroissants : tk2dTextMesh;
var croissantsParent : Transform;
var txtCaneles : tk2dTextMesh;
var txtMacarons : tk2dTextMesh;
var txtSandwichs : tk2dTextMesh;
var txtRaisins : tk2dTextMesh;
var txtCartes : tk2dTextMesh;

var minSpawnHeight : float;
var maxSpawnHeight : float;

var croissantTuto : GameObject;
var recStMichel : GameObject;
var recJardin : GameObject;
var recMiroir : GameObject;
var recQuinconces : GameObject;
var recPont : GameObject;

static var nbCroissants : int = 0;
static var nbCaneles : int = 0;
static var nbMacarons : int = 0;
static var nbSandwichs : int = 0;
static var nbRaisins : int = 0;
static var nbCartesTBC : int = 0;
static var nbCroissantsGeneres : int = 0;

private var triggeredTuto : boolean = false;
private var audioPlus : int = 1;

function Start () {
	nbCroissantsGeneres = 0;
	nbCroissants = 0;
	nbCaneles = 0;
	nbMacarons = 0;
	nbSandwichs = 0;
	nbRaisins = 0;
	nbCartesTBC = 0;
}

function Update () {

}

//Ajoute un récoltable au score et affiche le nombre récolté sur le nombre total
function AjouteUnRecoltable (aAjouter : String, valeur : int, rec : GameObject) {
	
	scoreManager.GenerateScore(rec, valeur, "1 " + aAjouter + " !");
	if (aAjouter == "Croissant"){
		Sounds();
		energyGauge.Value += 0.3;
		nbCroissants += 1;
		achManager.CheckRecoltables("Reveil Difficile", 100);
		PlayerPrefs.SetInt("Croissants", PlayerPrefs.GetInt("Croissants") + 1);
		txtCroissants.text = nbCroissants + "/10";
		if (nbCroissants == 10){
			AnimRecoltable(txtCroissants.gameObject);
		}
	}
	if (aAjouter == "Canele"){
		Sounds();
		energyGauge.Value += 0.3;
		nbCaneles += 1;
		achManager.CheckRecoltables("Angles Arrondis", 120);
		PlayerPrefs.SetInt("Caneles", PlayerPrefs.GetInt("Caneles") + 1);
		txtCaneles.text = nbCaneles + "/10";
		if (nbCaneles == 10){
			apparitionMrLoyal.MrLoyal();
			AnimRecoltable(txtCaneles.gameObject);
		}
	}
	if (aAjouter == "Macaron"){
		Sounds();
		energyGauge.Value += 0.3;
		nbMacarons += 1;
		achManager.CheckRecoltables("Connaisseur", 150);
		PlayerPrefs.SetInt("Macarons", PlayerPrefs.GetInt("Macarons") + 1);
		txtMacarons.text = nbMacarons + "/10";
		if (nbMacarons == 10){
			AnimRecoltable(txtMacarons.gameObject);
		}
	}
	if (aAjouter == "Sandwich"){
		Sounds();
		energyGauge.Value += 0.3;
		nbSandwichs += 1;
		achManager.CheckRecoltables("Rustique", 170);
		PlayerPrefs.SetInt("Sandwichs", PlayerPrefs.GetInt("Sandwichs") + 1);
		txtSandwichs.text = nbSandwichs + "/10";
		if (nbSandwichs == 10){
			AnimRecoltable(txtSandwichs.gameObject);
		}
	}
	if (aAjouter == "Raisin"){
		Sounds();
		energyGauge.Value += 0.3;
		nbRaisins += 1;
		achManager.CheckRecoltables("Ami de la Vigne", 200);
		PlayerPrefs.SetInt("Raisins", PlayerPrefs.GetInt("Raisins") + 1);
		txtRaisins.text = nbRaisins + "/10";
		if (nbRaisins == 10){
			AnimRecoltable(txtRaisins.gameObject);
			scoreManager.GenerateBonus(0,"SAUTEZ PAR-DESSUS LES BATCUB !");
			yield WaitForSeconds(0.1);
			gameModesManager.JumpOverBoats();
			gameModesManager.JumpAuthorization();
		}
	}
	if (aAjouter == "Ticket"){
		GetComponent.<AudioSource>().clip = Resources.Load("./Sounds/Recoltables/SFX_shape_valid_01");
		nbCartesTBC += 1;
		ligneTramManager.AjouteArret(PlayerPrefs.GetInt("Difficulty"), nbCartesTBC);
		achManager.CheckRecoltables("Controleur", 500);
		PlayerPrefs.SetInt("Tickartes", PlayerPrefs.GetInt("Tickartes") + 1);
		txtCartes.text = nbCartesTBC.ToString();
	}
}

//Génère les croissants du quartier Saint-Michel
function GenereUnRecoltable (aGenerer : GameObject){
	var newCroissant : GameObject;
	if (nbCroissantsGeneres <10){
		var yPosition = Random.Range(minSpawnHeight,maxSpawnHeight);
		if (nbCroissantsGeneres == 0){
			newCroissant = Instantiate (croissantTuto, Vector3(Camera.main.transform.position.x + 5.2, yPosition, 0.7),Quaternion.identity);
			newCroissant.transform.parent = croissantsParent;
			nbCroissantsGeneres += 1;
			tutoScript.TriggerTutoRecoltable(newCroissant);	
		}
		else if (nbCroissantsGeneres >= 1){
			newCroissant = Instantiate (aGenerer, Vector3(Camera.main.transform.position.x + 5.2, yPosition, 0.7),Quaternion.identity);
			newCroissant.transform.parent = croissantsParent;	
			nbCroissantsGeneres += 1;
		}
	}
}

//Cache les récoltables lors d'un échec
function HideRecoltables (parent : GameObject) {
	parent.SetActive(false);
}

function AnimRecoltable(section : GameObject){
	section.GetComponent.<Animation>().Play();
	yield WaitForSeconds (section.GetComponent.<Animation>().clip.length/4);
	scoreManager.GenerateScore(section, 3000, "Bravo !");
}

function Sounds(){
	GetComponent.<AudioSource>().Stop();
	GetComponent.<AudioSource>().clip = Resources.Load("Recoltables/SFX_shape_valid_" + audioPlus.ToString("00"));
	GetComponent.<AudioSource>().Play();
	if (audioPlus == 10){
		audioPlus = 1;
	}
	else{
		audioPlus += 1;
	}
}

function ResetSounds() {
	audioPlus = 1;
}