#pragma strict
import UnityEngine.UI;

var scoreText : Text;
var scoreGO : GameObject;
var roueDesTentes : GameObject;
var nbTentes : Text;
//var energyGauge : tk2dUIScrollbar;
var bonusLancerTxt : Text;
var achManager : AchievementsManager;
var bonusTxt : Text;

private var score : int;
private var intTentes : int = 0;
private var generateScore : boolean = true;
private var generateBonus : boolean = true;
private var aTire : boolean = true;


function Start () {
	
	if (PlayerPrefs.GetInt("Tuto On") == 0){
		aTire = false;
	}
	
	//réinitialise le score à 0 et l'affiche en début de partie
	if (Application.loadedLevel == 2){
		score = 0;
		scoreText.text = score.ToString();
	}
}

function Update () {

	if (!aTire){
		if (Input.GetMouseButtonDown(0)){
			aTire = true;
			BonusGauge();
		}
	}
}

//Ajoute simplement du score
function ScoreUp (valeur : int){
	score += valeur;
	scoreText.text = score.ToString();
}

//Lors d'une phase de button smashing, génère le texte flottant du score, au-dessus du GameObject en popSpot
function GenerateScore (popSpot : GameObject, valeurScore : int, caption : String){
	if (generateScore){
		generateScore = false;
		var scoreTxt : GameObject = Instantiate(scoreGO, popSpot.transform.position, Quaternion.identity);
		scoreTxt.GetComponent.<Animation>().Play();
		if (popSpot.tag == "Croissant" || popSpot.tag == "Canele" || popSpot.tag == "Macaron" || popSpot.tag == "Sandwich" || popSpot.tag == "Raisin"){
		}
		else{
			scoreTxt.transform.parent = popSpot.transform;
		}
		Destroy(scoreTxt,0.4);
		if (valeurScore < 0){
			scoreTxt.transform.Find("ScoreVelo").GetComponent(Text).text = caption + "\r\n" + valeurScore.ToString();
		}
		else{
			scoreTxt.transform.Find("ScoreVelo").GetComponent(Text).text = caption + "\r\n + " + valeurScore.ToString();
		}
		ScoreUp(valeurScore);
		//valeurScore += valeurScore;
		yield WaitForSeconds(Time.deltaTime);
		generateScore = true;
	}
}

//Lors de l'affichage d'un bonus, affiche le texte au centre de l'écran
function GenerateBonus (valeurScore : int, caption : String){
	if (generateBonus){
		generateBonus = false;
		ScoreUp(valeurScore);
		if (valeurScore < 0){
			bonusTxt.text = caption + "\r\n " + valeurScore.ToString();
		}
		if (valeurScore > 0){
			bonusTxt.text = caption + "\r\n + " + valeurScore.ToString();
		}
		if (valeurScore == 0){
			bonusTxt.text = caption;
		}
		bonusTxt.gameObject.SetActive(true);
		yield WaitForSeconds(1.3);
		bonusTxt.gameObject.SetActive(false);
		generateBonus = true;
	}
}

//Active l'animation de la roue des tentes à chaque rebond
function ActiveRoue(){
	intTentes += 1;
	if (intTentes == 8){
		PlayerPrefs.SetInt("Pas mal !",1);
		achManager.DisplayUnlockedAchievement("Pas mal !");
	}
	if (intTentes == 9){
		PlayerPrefs.SetInt("Aussi bon que les developpeurs !",1);
		achManager.DisplayUnlockedAchievement("Aussi bon que les developpeurs !");
	}
	if (intTentes == 10){
		PlayerPrefs.SetInt("Mieux que les developpeurs !",1);
		achManager.DisplayUnlockedAchievement("Mieux que les developpeurs !");
	}
	nbTentes.text = intTentes.ToString() + " Rebonds !";
	roueDesTentes.GetComponent.<Animation>().Play("Roue");
}

//Fait disparaitre la roue et inscrit le nombre de tentes dans le PlayerPrefs
function StopRoue(){
	PlayerPrefs.SetInt("RebondsTentes",intTentes);
	roueDesTentes.SetActive(false);
}

//Gère le bonus de lancer du lama et affiche le score supplémentaire
function BonusGauge(){
	bonusLancerTxt.gameObject.transform.parent.gameObject.SetActive(true);
//	if (energyGauge.Value == 1){
//		PlayerPrefs.SetInt("LancerParfait",1);
//		bonusLancerTxt.text = "Lancer Parfait !! \r\n + 10 000 !";
//		ScoreUp(10000);
//	}
//	else{
//		PlayerPrefs.SetInt("LancerParfait",0);
//		bonusLancerTxt.text = bonusLancerTxt.text + " " + Mathf.RoundToInt(//energyGauge.Value * 10000).ToString() + " !";
//		ScoreUp(Mathf.RoundToInt(//energyGauge.Value * 10000));
//	}
	yield WaitForSeconds (1.5);
	bonusLancerTxt.gameObject.transform.parent.gameObject.SetActive(false);
}

//Le joueur peut-il tirer ?
function TirReady(){
	aTire = false;
}

//Enregistre le score du joueur dans son profil
function StoreScore(){
	if (!PlayerPrefs.HasKey("Score") || score > PlayerPrefs.GetInt("Score")){
		PlayerPrefs.SetInt("Score", score);
	}
}