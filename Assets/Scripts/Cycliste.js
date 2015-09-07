#pragma strict

var projectile : GameObject;
var lamaRig : GameObject;
var pedales : GameObject;
var lamaSpot : GameObject;
var scoreManager : ScoreManager;
var spotScore : Transform;
var valeurDuClic : int = 250;
private var moveAccel : float;
var maxSpeedMove : float;
var sourisTuto : GameObject;
var mainScript : Main;
private var bLamaOnBoard : boolean;
private var updateSpeedMove : boolean;

function Start () {
	updateSpeedMove = true;
	this.transform.Find("Corps").GetComponent.<Animation>().Play();
	pedales.GetComponent.<Animation>().Play();
	moveAccel = 3.9;
}

function Update () {

	//Déplace le cycliste tant que le lama n'est pas sur le vélo
	if (!bLamaOnBoard){
		if (this.transform.position.x - Camera.main.transform.position.x <= 6){
			transform.Translate(Vector3.right * Time.deltaTime);
		}
	}
	
	//Gère le déplacement et le button smashing lorsque le lama est sur le vélo + apparition de la souris tuto 
	if (bLamaOnBoard){
		scoreManager.GenerateBonus(0,"ECHAPPE A MR LOYAL !");
		if (updateSpeedMove){
			UpdateSpeedMove();
		}
		if (Input.GetMouseButtonDown(0)){
			scoreManager.GenerateScore(spotScore.gameObject, valeurDuClic, "Plus vite !");
			if (moveAccel > maxSpeedMove){
				moveAccel = maxSpeedMove;
			}
			else{
				moveAccel += 0.09;
			}
		}
		sourisTuto.SetActive(true);
		this.transform.Translate(Vector3.left * moveAccel * Time.deltaTime);
	}

}

function OnTriggerEnter (collider : Collider){
	
	//Gère l'arrivée du lama sur le vélo: mise en place + animations
	if (collider == projectile.GetComponent.<Collider>()){
		bLamaOnBoard = true;
		projectile.GetComponent.<Rigidbody>().velocity = Vector3.zero;
		projectile.GetComponent.<Rigidbody>().useGravity = false;
		projectile.GetComponent.<Rigidbody>().isKinematic = true;
		lamaRig.GetComponent.<Animation>().Stop();
		projectile.transform.parent = lamaSpot.transform;
		projectile.transform.position = lamaSpot.transform.position;
		GetComponent.<Animation>().Play();
		lamaRig.GetComponent.<Animation>().Play("OnBike");
		this.transform.Find("Corps").GetComponent.<Animation>().Play("Panique");
		pedales.GetComponent.<Animation>().Stop();
		pedales.GetComponent.<Animation>().Play("Pedales_panique");
	}
	
	//Gère l'échec lorsque Mr Loyal rattrappe le vélo
	if (collider.name == "MrLoyal"){
		mainScript.ApparitionRejouer();
		Time.timeScale = 0;
	}
}

//Ralentit la vitesse du cycliste entre 2 clics lors du button smashing
function UpdateSpeedMove () {
	updateSpeedMove = false;
	moveAccel -= 0.125;
	if (moveAccel < 4.0){
		moveAccel = 4.0;
	}
	yield WaitForSeconds(0.2);
	updateSpeedMove = true;
}

//Ejection du lama
function EjectLlama(){
	scoreManager.GenerateBonus(2000, "FIN DE QUARTIER");
	sourisTuto.SetActive(false);
	bLamaOnBoard = false;
	this.GetComponent.<Collider>().enabled = false;
	projectile.GetComponent.<Rigidbody>().useGravity = true;
	projectile.GetComponent.<Rigidbody>().isKinematic = false;
	projectile.transform.parent = null;
	projectile.GetComponent.<Rigidbody>().AddForce(Vector3(6,4,0),ForceMode.Impulse);
	this.transform.Find("Corps").GetComponent.<Animation>().Stop();
	pedales.GetComponent.<Animation>().Stop();
	yield WaitForSeconds(Time.deltaTime);
	this.transform.Find("Corps").GetComponent.<Animation>().Play("Pedalement");
	pedales.GetComponent.<Animation>().Play();
}