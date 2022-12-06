var canvas : HTMLCanvasElement=<HTMLCanvasElement>document.getElementById("canvas");
var context:CanvasRenderingContext2D=canvas.getContext('2d');

//adding function on click on canvas
canvas.addEventListener("click",mouseclick);
canvas.addEventListener("mousedown",mousedown);
canvas.addEventListener("mouseup",mouseup);
canvas.addEventListener("mousemove",mousemove);

var rect:Point=canvas.getBoundingClientRect();

//taking element and setting a string
var t1:HTMLInputElement=<HTMLInputElement>document.getElementById("t1");
var tox:HTMLInputElement=<HTMLInputElement>document.getElementById("tox");
var fromx:HTMLInputElement=<HTMLInputElement>document.getElementById("fromx");
var toy:HTMLInputElement=<HTMLInputElement>document.getElementById("toy");
var fromy:HTMLInputElement=<HTMLInputElement>document.getElementById("fromy");
var width_rect:HTMLInputElement=<HTMLInputElement>document.getElementById("width");
var height_rect:HTMLInputElement=<HTMLInputElement>document.getElementById("height");
var minor_axis:HTMLInputElement=<HTMLInputElement>document.getElementById("minoraxis");
var major_axis:HTMLInputElement=<HTMLInputElement>document.getElementById("majoraxis");
var drawing :string="none"



//counter setting
var draggable:boolean=false;

//initializing an array to store all circles
var circlecontainer1:{circle:Circle}[]=[];
var circlecontainer2:{circle:Circle}[]=[];
var circlecontainer3:{circle:Circle}[]=[];
var rectangle_container:{rectangle:Rectangle}[]=[];
var ellipse_container:{ellipse:Ellipse}[]=[];
var linecontainer:{line:line}[]=[];

//function to draw the circle as well as change its colour and also handling the errors
function mouseclick(e:MouseEvent){
    //getting all the padding distances
    var rect = canvas.getBoundingClientRect();

    if(isNaN(+t1.value)||isNaN(+tox.value)||isNaN(+toy.value)||isNaN(+fromx.value)||isNaN(+fromy.value)||isNaN(+width_rect.value)||isNaN(+height_rect.value)||isNaN(+minor_axis.value)||isNaN(+major_axis.value)){
        alert("Please give positive numerical value for radius");
    }
    // drawing circle
    if (drawing=="circle"){
        let c1= new Point(e.clientX-rect.x,e.clientY-rect.y);
        let cir1= new Circle(c1,+t1.value,context,"blue");
        circlecontainer1.push({circle: cir1})
        cir1.draw();
    }
    //drawing rectangle
    if (drawing=="rectangle"){
        let c1= new Point(e.clientX-rect.x,e.clientY-rect.y);
        let rectangle_= new Rectangle(c1,+width_rect.value,+height_rect.value,context);
        rectangle_container.push({rectangle:rectangle_})
        rectangle_.draw();
    }
    //drawing ellipse
    if (drawing=="ellipse"){
        let c1= new Point(e.clientX-rect.x,e.clientY-rect.y);
        let ellipse_= new Ellipse(c1,+minor_axis.value,+major_axis.value,context);
        ellipse_container.push({ellipse:ellipse_})
        ellipse_.draw();
    }
}

//onclick functions
function DrawCircle(){
    drawing="circle";
}
//drawing line function
function drawline(){
    let line1= new line(new Point(+fromx.value,+fromy.value),new Point(+tox.value,+toy.value),context)
    linecontainer.push({line:line1});
    let c1= new Point(+fromx.value,+fromy.value);
    let c2= new Point(+tox.value,+toy.value);
    let cir2= new Circle(c1,5,context,"yellow");
    let cir3= new Circle(c2,5,context,"yellow");
    circlecontainer2.push({circle: cir2});
    circlecontainer3.push({circle: cir3})
    line1.draw();
    cir2.draw();
    cir3.draw();
}
//onclick button function for rectangle
function drawrectangle(){
    drawing="rectangle"
}
//onclick button function for ellipse
function drawellipse(){
    drawing="ellipse"
}
//dragging button onclick function
function dragging()
{
    drawing="drag";
}
//mousedown function
function mousedown(e:MouseEvent){
    if(drawing=="drag"){
    draggable=true;
    }
}
//mouseup function
function mouseup(e:MouseEvent){
    if(drawing=="drag"){
        draggable=false;
    }
}
//mousemove function
function mousemove(e:MouseEvent){
    if(draggable){
        //for separate circle container
        for(let i=0;i<circlecontainer1.length;i++){
            if(circlecontainer1[i].circle.isinside(new Point(e.clientX-rect.x,e.clientY-rect.y))){
                circlecontainer1[i].circle.center= new Point(e.clientX-rect.x,e.clientY-rect.y);
                break;
            }
        }
        //from circle container
        for(let i=0;i<circlecontainer2.length;i++){
            if(circlecontainer2[i].circle.isinside(new Point(e.clientX-rect.x,e.clientY-rect.y))){
                circlecontainer2[i].circle.center= new Point(e.clientX-rect.x,e.clientY-rect.y);
                linecontainer[i].line.from= new Point(e.clientX-rect.x,e.clientY-rect.y);
                break;
            }
        }
        //to circle container
        for(let i=0;i<circlecontainer3.length;i++){
            if(circlecontainer3[i].circle.isinside(new Point(e.clientX-rect.x,e.clientY-rect.y))){
                circlecontainer3[i].circle.center= new Point(e.clientX-rect.x,e.clientY-rect.y);
                linecontainer[i].line.to= new Point(e.clientX-rect.x,e.clientY-rect.y);
                break;
            }
        }
        //for rectangle
        for(let i=0;i<rectangle_container.length;i++){
            if(rectangle_container[i].rectangle.isinside(new Point(e.clientX-rect.x,e.clientY-rect.y))){
                rectangle_container[i].rectangle.point= new Point(e.clientX-rect.x,e.clientY-rect.y);
                break;
            }
        }
        //for ellipse
        for(let i=0;i<ellipse_container.length;i++){
            if(ellipse_container[i].ellipse.isinside(new Point(e.clientX-rect.x,e.clientY-rect.y))){
                ellipse_container[i].ellipse.point= new Point(e.clientX-rect.x,e.clientY-rect.y);
                break;
            }
        }
        //drawing all rectangles
        context.clearRect(0,0,canvas.width,canvas.height);
        for(let i=0;i<rectangle_container.length;i++){
            rectangle_container[i].rectangle.draw();
        }
        //drawing all ellipses
        for(let i=0;i<ellipse_container.length;i++){
            ellipse_container[i].ellipse.draw();
        }
        //drawing all separate circles
        for(let i=0;i<circlecontainer1.length;i++){
            circlecontainer1[i].circle.draw();
        }
        // drawing all the lines
        for(let i=0;i<linecontainer.length;i++){
            linecontainer[i].line.draw();
        }
        //drawing all from circles
        for(let i=0;i<circlecontainer2.length;i++){
            circlecontainer2[i].circle.draw();
        }
        //drawing all to circles
        for(let i=0;i<circlecontainer3.length;i++){
            circlecontainer3[i].circle.draw();
        }
    }
}

