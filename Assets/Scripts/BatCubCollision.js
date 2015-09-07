#pragma strict

var projectile : GameObject;
var scoreManager : ScoreManager;
var bing : GameObject;

function Start () {

}

function Update () {

}

function OnTriggerEnter (collider : Collider){
	if (collider == projectile.GetComponent.<Collider>()){
		bing.GetComponent.<Animation>().Play();
		scoreManager.GenerateBonus(-500, "");
		GetComponent.<AudioSource>().Play();
		yield WaitForSeconds(0.6);
		bing.SetActive(false);
	}
}