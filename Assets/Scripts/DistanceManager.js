#pragma strict

var projectile : GameObject;
var lamaRig : GameObject;
var distanceText : tk2dTextMesh;
private var distance : int;
var spotLamaCanon : Transform;
var scoreManager : ScoreManager;
var achManager : AchievementsManager;

function Start () {
	distanceText.text = "0 M";
}

function OnEnable(){

	//Active le texte qui affiche la distance de tir du lama
	distanceText.gameObject.SetActive(true);
}

function Update () {

	//Désactive le texte de distance de tir dès que le lama touche le sol ou une échoppe
	if (lamaRig.GetComponent.<Animation>().IsPlaying("Rollama")){
		Disable();
	}
	
	//Affiche la distance parcourue en l'air par le lama après le tir, et met à jour le score en fonction
	if (lamaRig.GetComponent.<Animation>().IsPlaying("Ejection") || lamaRig.GetComponent.<Animation>().IsPlaying("PanicInTheAir")){
		distance = ((projectile.transform.position.x - spotLamaCanon.position.x)*10);
		distanceText.text = distance.ToString() + " M";
	}
}

//Joue l'animation du texte de la distance et le fait disparaitre ensuite
function Disable(){
	if (distance >= 150 && distance < 250){
		if (PlayerPrefs.GetInt("Attention a lama'rche") != 1){
			PlayerPrefs.SetInt("Attention a lama'rche", 1);
			achManager.DisplayUnlockedAchievement("Attention a lama'rche");
		}
	}
	if (distance >= 250 && distance < 300){
		if (PlayerPrefs.GetInt("Va voir lama si j'y suis !") != 1){
			PlayerPrefs.SetInt("Va voir lama si j'y suis !", 1);
			PlayerPrefs.SetInt("Attention a lama'rche", 1);
			achManager.DisplayUnlockedAchievement("Va voir lama si j'y suis !");
		}
	}
	if (distance >= 300){
		if (PlayerPrefs.GetInt("Vers l'infini et au-delama !") != 1){
			PlayerPrefs.SetInt("Vers l'infini et au-delama !", 1);
			PlayerPrefs.SetInt("Attention a lama'rche", 1);
			PlayerPrefs.SetInt("Va voir lama si j'y suis !", 1);
			achManager.DisplayUnlockedAchievement("Vers l'infini et au-delama !");
		}
	}
	scoreManager.ScoreUp(distance);
	PlayerPrefs.SetInt("LaunchDistance", distance);
	distanceText.gameObject.GetComponent.<Animation>().Play();
	yield WaitForSeconds(distanceText.gameObject.GetComponent.<Animation>().clip.length);
	distanceText.gameObject.SetActive(false);
	this.enabled = false;
}