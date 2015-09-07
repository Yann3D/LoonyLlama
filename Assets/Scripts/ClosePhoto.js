#pragma strict

var photos : Material;

function Start () {
	
}

function Update () {
	if (photos.mainTexture != null){
		GetComponent.<Collider>().enabled = true;
		GetComponent.<Renderer>().enabled = true;
		transform.Find("PlanBlanc").gameObject.SetActive(true);
	}
	else{
		transform.Find("PlanBlanc").gameObject.SetActive(false);
	}
}

function OnMouseOver() {
	if (Input.GetMouseButtonDown(0)){
		photos.mainTexture = null;
		GetComponent.<Collider>().enabled = false;
		GetComponent.<Renderer>().enabled = false;
	}
}