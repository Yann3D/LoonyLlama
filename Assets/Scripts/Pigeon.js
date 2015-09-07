#pragma strict

static var nbPigeonsKilled : int = 0;
var associatedCard : Recoltable;
var clicJoueur : int = 0;
static var speed : int = 5;
private var bFlying : boolean;
private var rangeX : float;
private var rangeY : float;
private var up : boolean;
private var recoltableManager : RecoltableManager;

function Start () {
	recoltableManager = GameObject.Find("Main").GetComponent(RecoltableManager);
	bFlying = true;
	up = true;
}

function Update () {

	//Joue les animations et les déplacements en fonction du vol ou de la chute
	if (bFlying){
		GetComponent.<Animation>().Play("Vol");
		if (up){
			Fly();
			transform.Translate(Vector3(speed * Time.deltaTime,Time.deltaTime,0));
		}
		else{
			transform.Translate(Vector3(speed * Time.deltaTime,-Time.deltaTime,0));
		}
	}
	else{
		GetComponent.<Animation>().Play("Chute");
		GetComponent.<Rigidbody>().isKinematic = false;
		GetComponent.<Rigidbody>().useGravity = true;
	}
}

function OnMouseOver (){

	//Gère le score et les FX en fonction du clic du joueur
	if (Input.GetMouseButtonDown(clicJoueur)){
		GetComponent.<AudioSource>().Play();
		PlayerPrefs.SetInt("I believe I can fly !", PlayerPrefs.GetInt("I believe I can fly !") + 1);
		bFlying = false;
		GetComponent.<Collider>().enabled = false;
		associatedCard.VFXRecoltable();
		recoltableManager.AjouteUnRecoltable("Ticket", 1000, this.gameObject);
		Destroy(this.gameObject,3);
	}
}

//Gère le mouvement bas/haut dans le déplacement du pigeon
function Fly(){
	yield WaitForSeconds(0.5);
	up = false;
	yield WaitForSeconds(0.5);
	up = true;
}