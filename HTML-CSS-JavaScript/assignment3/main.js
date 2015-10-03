
var theBody = document.getElementsByTagName("body")[0];
var theLeftSide = document.getElementById('leftSide');
var theRightSide = document.getElementById('rightSide');
var numberOfFaces = 6;

generateFaces(numberOfFaces);

theLeftSide.lastChild.onclick = function nextLevel(event){
    console.log('clicked!');
    event.stopPropagation();
    numberOfFaces += 5;
    remove_faces();
    generateFaces(numberOfFaces);
    theLeftSide.lastChild.addEventListener('click', nextLevel);
    // chech where lastChild from console
    console.log(theLeftSide.lastChild);
};

theBody.onclick = function gameOver(){
    alert("Game Over!");
    theBody.onclick = null;
    theLeftSide.lastChild.onclick = null;
    remove_faces();
};

function generateFaces(numberOfFaces){

    for (var i = 0; i < numberOfFaces; i++){
    
        var img_new = document.createElement('img');
        img_new.src = 'smile.png';

        var rand_x =  Math.floor(Math.random() * 400);
        var rand_y = Math.floor(Math.random() * 400);

        img_new.style.top = rand_x + 'px';
        img_new.style.left = rand_y + 'px';
        theLeftSide.appendChild(img_new.cloneNode());
    }

    leftSideImages = theLeftSide.cloneNode(true);
    leftSideImages.removeChild(leftSideImages.lastChild);
    theRightSide.appendChild(leftSideImages);
}

function remove_faces(){

    while (theLeftSide.hasChildNodes())
        theLeftSide.removeChild(theLeftSide.lastChild);
    while (theRightSide.hasChildNodes())
        theRightSide.removeChild(theRightSide.lastChild);
}