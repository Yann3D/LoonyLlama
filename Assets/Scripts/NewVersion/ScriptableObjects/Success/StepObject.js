#pragma strict

import UnityEngine.UI;

@script CreateAssetMenu (fileName ="StepObject_", menuName = "New Step Object")

class StepObject extends ScriptableObject {
	
	@Header ("Step Object")
	var objectName : String;
	var objectPrefab : GameObject;
}