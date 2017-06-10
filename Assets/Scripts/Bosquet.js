#pragma strict

private var playAnim : boolean = true;
private var anim : Animation;

function Start () {
	anim = GetComponent.<Animation>();
}

function Update () {

	//Lorsque le lama passe à proximité du bosquet, joue l'animation une seule fois
	// if (transform.position.x - Serge.Instance().transform.position.x < 0.6 && transform.position.x - Serge.Instance().transform.position.x > 0){
	// 	if (playAnim){
			
	// 		playAnim = false;
	// 	}
	// }
}

function OnColliderEnter2D (collider : Collider2D){
	if (collider.CompareTag("Jeune")){
		anim.Play();
	}
}