#pragma strict

var lamaRB : Rigidbody2D;
var canonImpulse : float = 17;
var launchSmokeAnim : Animation;
private var worldMousePos : Vector3;
private var canShoot : boolean = true;
private var ejectLama : boolean = false;
private var defImpulse : boolean = false;

function Start () {
	
}

function Update () {
	worldMousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	if (worldMousePos.x < -3){
		worldMousePos.x = -3;
	}
	if (worldMousePos.y < -0.3){
		worldMousePos.y = -0.3;
	}
	transform.LookAt(Vector3(worldMousePos.x, worldMousePos.y, transform.position.z));

	if (canShoot){
		if (Input.GetMouseButtonUp(0) || (!Input.GetMouseButton(0) && defImpulse)){
			ejectLama = true;
			return;
		}
		if (Input.GetMouseButtonDown(0)){
			defImpulse = true;
			UIManager.Instance().AnimateCanonGauge(defImpulse);
		}
	}
}

function FixedUpdate (){
	if (ejectLama){
		ejectLama = false;
		canShoot = false;
		defImpulse = false;
		GameManager.Instance().LamaGone();
		launchSmokeAnim.Play();
		var lamaUp : Vector3 = lamaRB.transform.TransformDirection(Vector3.up);
		var gImp : float = UIManager.Instance().GetGaugeImpulse();
		lamaRB.AddForce (lamaUp * canonImpulse * gImp, ForceMode2D.Impulse);
		Serge.Instance().SetFree();
	}
}