song1="";
song2="";
leftX = 0;
leftY = 0;
rightX = 0;
rightY = 0;
scoreLeft=0;
scoreRight=0;
statusLeft = "";
statusRight = "";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
}

function modelLoaded(){
    console.log('PoseNet is Initializing');
    poseNet.on('pose', gotPoses);
}   

function draw(){
    image(video,0,0,600,500);

    

    stroke("#ff0000");
    fill("#ff0000");

    if(scoreLeft > 0.2){
        song1.play();
        circle(leftX,leftY,20);
        song2.stop();
        document.getElementById("name").innerHTML = "Harry Potter";
        
    } else{
        song1.stop();
    }
    if(scoreRight > 0.2){
        song1.stop();
        circle(righttX,rightY,20);
        song2.play();
        document.getElementById("name").innerHTML = "Peter Pan";
        
    } else{
        song2.stop();
    }

}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftX = results[0].pose.leftWrist.x;
        leftY = results[0].pose.leftWrist.y;
        console.log("LeftWirstX = " + leftX + "LeftWirstY = " + leftY)

        rightX = results[0].pose.rightWrist.x;
        rightY = results[0].pose.rightWrist.y;
        console.log("RightWirstX = " + rightX + "RightWirstY = " + rightY)

        scoreLeft = results[0].pose.keypoints[9].score;
        scoreRight = results[0].pose.keypoints[10].score;
    }
}