var img="";
var Status = "";
var objects = [];
var object_Detector = "";

function preload()
{
   img = loadImage('dog_cat.jpg');
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    object_Detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML  = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded");
    Status = true;
    object_Detector.detect(video, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video,0,0,380,380);
    if(Status != "")
    {
        r = Math.random(255);
        g = Math.random(255);
        b = Math.random(255);
        object_Detector.detect(video, gotResult);
        for(i=0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "status : object detected";

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" + objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }

        for(i=0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "status : object detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects that are detected are " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" + objects[i].x,objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}