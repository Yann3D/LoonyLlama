#pragma strict

import UnityEngine.UI;

@script CreateAssetMenu (fileName ="WinStep_", menuName = "New Win Step Conditions")

class WinStepConditions extends ScriptableObject {
	
	@Header ("Step Condition")
	var possessedItem : StepObject;
	var itemNumber : int;
	var itemsOK : boolean = false;
	var successDone : SuccessObject[];
	var terminated : boolean = false;
}