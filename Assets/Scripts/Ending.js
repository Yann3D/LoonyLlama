#pragma strict

var projectile : GameObject;
var tramway : GameObject;
var tramDoor : GameObject;
var lamaSpot : GameObject;
var lumiere : GameObject;
var mainScript : Main;
var soundManager : SoundMusicManager;
var scoreManager : ScoreManager;
var ui : GameObject;
var bouteille : GameObject;
var pigeonManager : PigeonManager;
var achManager : AchievementsManager;

function Start () {

}

function Update () {

}

function OnTriggerEnter (collider : Collider){

	//Lorsque le lama entre dans le tram, joue les anims du tram et fait apparaitre l'écran de récap
	if (collider == projectile.GetComponent.<Collider>()){
		scoreManager.StoreScore();
		achManager.CheckEntreeTram();
		achManager.CheckPhotos();
		achManager.CheckBordelais();
		achManager.CheckLigne();
		pigeonManager.KillPigeons();
		pigeonManager.enabled = false;
		projectile.transform.position = lamaSpot.transform.position;
		soundManager.PlayApplause();
		tramDoor.GetComponent.<Animation>().Play();
		lumiere.SetActive(false);
		yield WaitForSeconds(tramDoor.GetComponent.<Animation>().clip.length);
		tramway.GetComponent.<Animation>().Play();
		yield WaitForSeconds(tramway.GetComponent.<Animation>().clip.length);
		ui.SetActive(false);
		mainScript.ApparitionRecap();
		yield WaitForSeconds(0.5);
		bouteille.SetActive(false);
	} 
}