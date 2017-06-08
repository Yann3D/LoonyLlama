#pragma strict

static var lama : Transform;
static var sergeScript : Serge;

var anim : Animator;
var parentJeune : Transform;
var speed : float = 2;
var lamaSpot : Transform;
var lamanimToPlay : String;
var endSpot : Transform;
static var lamanim : Animator;
private var trackLama : boolean = false;
private var gotLlama : boolean = false;

function Start () {
	if (lama == null){
		lama = GameObject.FindGameObjectWithTag("Lama").transform;
	}
}

function Update () {
	if (trackLama && !gotLlama){
		parentJeune.LookAt(Vector3(lama.position.x, transform.position.y, transform.position.z));
		transform.position = Vector3.MoveTowards (transform.position, 
			Vector3(lama.position.x, transform.position.y, transform.position.z), speed * Time.deltaTime);
	}
	else if (!trackLama && gotLlama){
		parentJeune.LookAt(Vector3(endSpot.position.x, transform.position.y, transform.position.z));
		transform.position = Vector3.MoveTowards (transform.position, 
			Vector3(endSpot.position.x, transform.position.y, transform.position.z), speed * Time.deltaTime);
	}
}

function TriggerJeune (){
	trackLama = true;
	anim.SetTrigger("NextStep");
}

function OnTriggerEnter2D (collider : Collider2D){
	if (collider.CompareTag("Lama") ){
		print ("Lama");
		if (sergeScript == null){
			sergeScript = collider.GetComponent.<Serge>();
			lamanim = sergeScript.GetAnimator();
		}
		SetLamaOnJeune();
	}
	else if (collider.CompareTag("EndSpot")){
		print ("EndSpot");
		anim.SetTrigger("NextStep");
		gotLlama = false;
		sergeScript.transform.SetParent(null);
		lamanim.SetTrigger("Roll");
		sergeScript.EjectLama();
	}
}

function SetLamaOnJeune (){
	sergeScript.GetComponent.<CircleCollider2D>().enabled = false;
	sergeScript.transform.SetParent(lamaSpot);
	sergeScript.transform.position = lamaSpot.position;
	lamanim.SetTrigger(lamanimToPlay);
	anim.SetTrigger("NextStep");
	trackLama = false;
	gotLlama = true;
}