#pragma strict

import UnityEngine.UI;

@script CreateAssetMenu (fileName ="GameParameters", menuName = "New Game Parameters")

class GameParameters extends ScriptableObject {
	
	var difficulty : int;

}