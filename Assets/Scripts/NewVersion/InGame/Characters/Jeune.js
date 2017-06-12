#pragma strict

var anim : Animator;
var parentJeune : Transform;
var speed : float = 2;
var lamaSpot : Transform;
var lamanimToPlay : String;
var endSpot : Transform;
var impulseAmount : Vector3 = Vector3(4,4,0);
var nextJeune : Jeune;
var isLamaTracker : boolean = true;
var isCycliste : boolean = false;
var isJeune04 : boolean = false;
static var lamanim : Animator;
private var trackLama : boolean = false;
private var gotLlama : boolean = false;
private var ejectLama : boolean = false;

function Start () {
	
}

function Update () {
	if (trackLama && !gotLlama){
		if (isLamaTracker || (!isLamaTracker && Serge.Instance().transform.position.x > transform.position.x)){
			parentJeune.LookAt(Vector3(Serge.Instance().transform.position.x, transform.position.y, transform.position.z));
			transform.position = Vector3.MoveTowards (transform.position, 
				Vector3(Serge.Instance().transform.position.x, transform.position.y, transform.position.z), speed * Time.deltaTime);
		}
	}
	else if (!trackLama && gotLlama){
		parentJeune.LookAt(Vector3(endSpot.position.x, transform.position.y, transform.position.z));
		transform.position = Vector3.MoveTowards (transform.position, 
			Vector3(endSpot.position.x, transform.position.y, transform.position.z), speed * Time.deltaTime);
	}
}

function FixedUpdate (){
	if (ejectLama){
		ejectLama = false;
		Serge.Instance().SetFree();
		var lamaRB : Rigidbody2D = Serge.Instance().GetComponent.<Rigidbody2D>();
		lamaRB.AddForce (impulseAmount, ForceMode2D.Impulse);
	}
}

function TriggerJeune (){
	trackLama = true;
	anim.SetTrigger("NextStep");
}

function OnTriggerEnter2D (collider : Collider2D){
	if (collider.CompareTag("Lama") ){
		if (!isCycliste){
			GameManager.Instance().HideZone();
		}
		trackLama = false;
		gotLlama = true;
		if (isLamaTracker){
			anim.SetTrigger("NextStep");
		}
		gameObject.tag = "Untagged";
		Serge.Instance().SetOnJeune(lamaSpot, lamanimToPlay, isJeune04);
	}
	else if (collider.CompareTag("EndSpot")){
		if (!isCycliste){
			GameManager.Instance().ShowZone();
		}
		anim.SetTrigger("NextStep");
		GetComponent.<BoxCollider2D>().enabled = false;
		gotLlama = false;
		ejectLama = true;
		nextJeune.TriggerJeune();
	}
}