#pragma strict

var projectile : GameObject;
var scoreManager : ScoreManager;

function Start () {

}

function Update () {

}

function OnTriggerEnter (collider : Collider) {
	if (collider == projectile.GetComponent.<Collider>()){
		scoreManager.GenerateScore(this.gameObject,2000, "JOLI SAUT !");
	}
}