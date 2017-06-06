#pragma strict

import UnityEngine.UI;

@script CreateAssetMenu (fileName ="SuccessStep_", menuName = "New Success Step")

class SuccessStep extends ScriptableObject {
	
	@Header ("Success Step")
	var stepDescription : String;
	var winStepConditions : WinStepConditions[];
	var stepAccomplished : boolean = false;
	var endsSuccess : SuccessObject;
}