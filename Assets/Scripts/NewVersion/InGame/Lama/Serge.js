#pragma strict

var lamanim : Animator;
var rebondImpulse : float = 15;
private var lamaRB : Rigidbody2D;
private var ejectLama : boolean = false;
private var myCollider : CircleCollider2D;
private var rolling : boolean = false;
private var landing : boolean = false;

function Start () {
	lamaRB = GetComponent.<Rigidbody2D>();
	myCollider = GetComponent.<CircleCollider2D>();
}

function Update () {
	
}

function FixedUpdate (){
	if (lamaRB.velocity.x < 1.0 && !landing && rolling){
		landing = true;
		transform.rotation = Quaternion.identity;
		// myCollider.enabled = false;
		lamaRB.simulated = false;
		lamanim.SetTrigger("Land");
	}
	else if (ejectLama){
		ejectLama = false;
		lamaRB.AddForce (Vector2(0.5,0.5) * rebondImpulse, ForceMode2D.Impulse);
	}
}

function OnCollisionEnter2D (collision : Collision2D){
	if (collision.collider.CompareTag("Ground") && !landing && !rolling){
		lamanim.SetTrigger("Roll");
		rolling = true;
	}
	else if (collision.collider.CompareTag("Rebond") && !ejectLama){
		lamanim.SetTrigger("Roll");
		rolling = true;
		ejectLama = true;
	}
}

function EjectLama (){
	ejectLama = true;
}

function GetAnimator (){
	return lamanim;
}

function SetOnJeune (spot : Transform, animToPlay : String){
	lamaRB.simulated = false;
	myCollider.enabled = false;
	transform.SetParent(spot);
	transform.position = spot.position;
	lamanim.SetTrigger(animToPlay);
}