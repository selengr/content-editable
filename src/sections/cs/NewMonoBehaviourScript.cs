using UnityEngine;

public class NewMonoBehaviourScript : MonoBehaviour
{
    Transform myTransForm;
    void Start()
    {
         myTransForm = GetComponent<Transform>();
    }

    // Update is called once per frame
    void Update()
    {
        float x = myTransForm.position.x + 1;
         debug.log(x);
    }
}

