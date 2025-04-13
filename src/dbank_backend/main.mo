import Float "mo:base/Float";
import Time "mo:base/Time";
import Debug "mo:base/Debug";

actor DBank{
  var currentValue : Float = 300;
  currentValue := 100;

  var startTime  = Time.now();
  startTime := Time.now();
  Debug.print(debug_show(startTime));

  public func  topUp(amount : Float) : () {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withDraw(amount: Float)
  {
    let tempvalue : Float = currentValue - amount;
    if(tempvalue >= 0)
    {
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    }else{
    Debug.print("Invalid withdrawl amount")
  }
  };

  public query func checkBalance (): async Float{
    return currentValue;
  };

  public func compound(){
    let currentTime = Time.now();
    let timeElaspeNS = currentTime - startTime;
    let timeElaspeS = timeElaspeNS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElaspeS));
  };
}