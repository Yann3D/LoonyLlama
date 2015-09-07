#pragma strict

var valeurRecoltable : int = 0;
static var nbTicketsRecoltes : int = 0;
var clickable : boolean;
var pigeon : boolean = false;
var HUDCanele : Transform;

private var projectile : GameObject;
private var recoltableManager : RecoltableManager;
private var cardsAway : Transform;
private var reduit : boolean;
private var reduitCarte : boolean;


function Start () {

	reduit = false;
	reduitCarte = false;
	recoltableManager = GameObject.Find("Main").GetComponent(RecoltableManager);
	if (this.tag == "Croissant"){
		HUDCanele = GameObject.Find("HUD_Energie").transform;
	}
	cardsAway = GameObject.Find("06_Carte").transform;
	projectile = GameObject.Find("Projectile");
}

function Update () {

	//Gère le déplacement des récoltables et des cartes lorsque le joueur clique dessus
	if (reduit){
		transform.position = Vector3.Lerp(this.transform.position, HUDCanele.position, Time.deltaTime * 5);
		transform.localScale.x -= 0.2 * Time.deltaTime;
		transform.localScale.y -= 0.2 * Time.deltaTime;
		Destroy(this.gameObject, 0.4);
	}
	if (reduitCarte){
		transform.position = Vector3.Lerp(this.transform.position, Vector3(cardsAway.position.x+1.5,cardsAway.position.y+0.5,cardsAway.position.z), Time.deltaTime * 5);
		transform.localScale.x -= 0.2 * Time.deltaTime;
		transform.localScale.y -= 0.2 * Time.deltaTime;
		Destroy(this.gameObject, 0.4);
	}
}

function OnMouseOver () {
	
	//Collecte un récoltable
	if (clickable){
		if (Input.GetMouseButtonDown(0)){
			clickable = false;
			VFXRecoltable();
			Recolte();
		}
	}
}

//Fait la différence entre un récoltable et une carte TBC pour indiquer à chacun la direction qu'il prend après un clic
function VFXRecoltable(){
	if (this.tag == "Ticket"){
		reduitCarte = true;
	}
	else{
		reduit = true;
	}
}

//Ajoute le récoltable après un clic dessus
function Recolte (){
	recoltableManager.AjouteUnRecoltable(this.gameObject.tag, valeurRecoltable, this.gameObject);
}