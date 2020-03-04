var input = document.getElementById("pass");
var valid = document.getElementById("validator");
var strength=0;


input.onkeyup = function(){
  strength = 0;

  if (input.value.length>7){
    strength +=1;
  }
  if(input.value.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
    strength +=1;

  }
  if(input.value.match(/([a-zA-Z])/) && input.value.match(/([0-9])/)) {
    strength +=1;
  }
  if(input.value.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
    strength +=1;

  }
  if(input.value.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) {
    strength +=1;

  }
  if (input.value.length<6){
    valid.innerHTML = "Too short";
  }
  else{
    if(strength < 2){
      valid.innerHTML = "weak";
    }
    if(strength == 2){
      valid.innerHTML = "good";
    }
    if(strength > 2){
      valid.innerHTML = "strong";
    }
  }


}
