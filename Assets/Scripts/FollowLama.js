#pragma strict

var projectile : GameObject;
var tramStop : GameObject;
var couLama : GameObject;
var targetCamera : GameObject;
var cameraSpeed : float;
var youngPiqueNique : GameObject;

function Start () {

}

function LateUpdate () {

	//Fonction en LateUpdate pour ne pas créer de glitchs à l'écran
	//Gère le déplacement de la caméra 2D qui suit le lama + le cou du lama dans le cadre des Quinconces
	if (projectile.transform.position.x >= this.transform.position.x && projectile.transform.position.x < tramStop.transform.position.x - 2.5){
		transform.position = Vector3.MoveTowards(transform.position,targetCamera.transform.position,cameraSpeed*Time.deltaTime);
	}
	if (projectile.transform.position.y >= 0){
		this.transform.position.y = projectile.transform.position.y;
	}
	else{
		this.transform.position.y = 0;
	}
	if (couLama.activeSelf){
		projectile.transform.parent = youngPiqueNique.transform;
		projectile.transform.localPosition = Vector3.zero;
	}
}