#pragma strict

function Start () {
	
}

function Update () {
	
}

function GameOverLost (){
	if (!UIManager.Instance().CanBeRescued()){
		UIManager.Instance().TogglePause();
	}
}

function ResetRot (){
	if (transform.rotation != Quaternion.Euler(0,0,0)){
		transform.rotation = Quaternion.Euler(0,0,0);
	}
}