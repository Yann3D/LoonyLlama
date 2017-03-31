#pragma strict

import UnityEngine.UI;

@script CreateAssetMenu (fileName ="Success_", menuName = "New Success")

class SuccessObject extends ScriptableObject {

	@Header ("Success")
	var successName : String;
	var missionDescription : String;
	var successSteps : SuccessStep[];
	var running : boolean = false;
	var ended : boolean = false;
}