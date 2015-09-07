#pragma strict

var projectile : GameObject;
private var joueAnim : boolean = true;

function Start () {

}

function Update () {

	//Lorsque le lama passe à proximité du bosquet, joue l'animation une seule fois
	if (this.transform.position.x - projectile.transform.position.x < 0.6 && this.transform.position.x - projectile.transform.position.x > 0){
		if (joueAnim){
			GetComponent.<Animation>().Play();
			joueAnim = false;
		}
	}
}