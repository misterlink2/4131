var iconImg;
var pictures = ["one.png","two.png"]
var descriptions;
var index = 0;
function showImage(){
  iconImg.setAttribute("src",pictures[index]+".png"),
  iconImg.setAttribute("alt",descriptions[index]),
  index = (index+1)%pictures.length;
}
