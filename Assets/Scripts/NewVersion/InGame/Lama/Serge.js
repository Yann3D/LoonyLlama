#pragma strict

var lamanim : Animator;
var rebondImpulse : float = 15;
private var lamaRB : Rigidbody2D;
private var rebondLama : boolean = false;
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
		myCollider.enabled = false;
		lamaRB.simulated = false;
		lamanim.SetTrigger("Land");
	}
	else if (rebondLama){
		rebondLama = false;
		lamaRB.AddForce (Vector2(0.5,0.5) * rebondImpulse, ForceMode2D.Impulse);
	}
}

function OnCollisionEnter2D (collision : Collision2D){
	if (collision.collider.CompareTag("Ground") && !landing && !rolling){
		lamanim.SetTrigger("Roll");
		rolling = true;
	}
	else if (collision.collider.CompareTag("Rebond") && !rebondLama){
		lamanim.SetTrigger("Roll");
		rolling = true;
		rebondLama = true;
	}
}