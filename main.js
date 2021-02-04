sound = "";
sound2 = "";
rightX = 0;
rightY = 0;
leftX = 0;
leftY = 0;
leftConfidence = 0;
rightConfidence = 0;

function preload(){
    sound = loadSound("music.mp3");
    sound2 = loadSound("music2.mp3");
    sound.setVolume(1);
    sound.rate(1);
    sound2.setVolume(1);
    sound2.rate(1);
}
function setup(){
    canvas = createCanvas(350,350);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,loaded);
    posenet.on('pose',getValue);
}
function loaded(){
    console.log("model has successfully been loaded");
}
function getValue(result){
    if(result.length>0){
        //console.log(result);
        rightX = result[0].pose.rightWrist.x;
        rightY = result[0].pose.rightWrist.y;
        leftX = result[0].pose.leftWrist.x;
        leftY = result[0].pose.leftWrist.y;

        leftConfidence = result[0].pose.leftWrist.confidence;
        rightConfidence = result[0].pose.rightWrist.confidence;
    }
}
function draw(){
    image(video,0,0,350,350);

    fill("blue");
    stroke("blue");

    soundisplaying = sound.isPlaying();
    sound1isplaying = sound2.isPlaying();

    if(leftConfidence>rightConfidence&&leftConfidence>0.2){
        circle(leftX,leftY,20);
        if(soundisplaying == false){
            sound2.stop();
            sound.play();
            document.getElementById("play").innerHTML = "The Song is :- Harry Potter";
        }
    }else if(rightConfidence>leftConfidence&&rightConfidence>0.2){
        circle(rightX,rightY,20);
        if(sound1isplaying == false){
            sound.stop();
            sound2.play();
            document.getElementById("play").innerHTML = "The Song is :- Peter Pan";
        }
    }
}
