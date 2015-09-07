#pragma strict

var associatedEchoppe : GameObject;
var projectile : GameObject;
private var scoreManager : ScoreManager;
private var rebondHorizontal : float = 4;
private var rebondVertical : float = 5;

function Start () {
	scoreManager = GameObject.Find("Main").GetComponent(ScoreManager);
}

function Update () {
}

function OnCollisionEnter (collision : Collision){

	//Relance le lama et ajoute du score
	if (collision.collider == projectile.GetComponent.<Collider>()){
		associatedEchoppe.GetComponent.<Animation>().Play();
		projectile.GetComponent.<Rigidbody>().AddForce(Vector3(rebondHorizontal, rebondVertical, 0), ForceMode.Impulse);
		scoreManager.GenerateScore(this.gameObject, 200, "BOING !");
		scoreManager.ActiveRoue();
	}
}