#pragma strict
import UnityEngine.UI;

var jet : Image;

private var emit : boolean = false;
private var cut : boolean = false;
private var jetStart : Rect;

function Start () {
	jetStart = Rect(0,0,1,0);
	//jet.ClipRect = jetStart;
	var startRange = Random.Range(0.0,4.0);
	yield WaitForSeconds (startRange);
	emit = true;
}

function Update () {
	if (emit){
		jetStart.height += 10 * Time.deltaTime;
		//jet.ClipRect.height = jetStart.height;
		if (jetStart.height >= 1){
			UpTime();
		}
	}
	if (cut){
		jetStart.height -= 10 * Time.deltaTime;
		//jet.ClipRect.height = jetStart.height;
		if (jetStart.height <= 0){
			DownTime();
		}
	}
}

function UpTime () {
	emit = false;
	yield WaitForSeconds (1);
	cut = true;
}

function DownTime () {
	cut = false;
	yield WaitForSeconds (2);
	emit = true;
}