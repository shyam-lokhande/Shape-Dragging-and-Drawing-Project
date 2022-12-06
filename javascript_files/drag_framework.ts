// class point
class Point{
    public x:number;
    public y:number;
    constructor(x:number,y:number){
        this.x=x;
        this.y=y;
    }
}

//line class
class line{
    public from:Point;
    public to:Point;
    public startdist:number;
    public enddist:number;
    public slope:number;
    private context:CanvasRenderingContext2D;
    
    constructor(from:Point, to:Point,context:CanvasRenderingContext2D){
       this.from=from;
       this.to=to;
       this.context=context;
        
    }
    
    draw(){
        this.context.beginPath();
        this.context.moveTo(this.from.x,this.from.y);
        this.context.lineTo(this.to.x,this.to.y);
        this.context.strokeStyle="blue";
        this.context.lineWidth=3;
        this.context.stroke();
       
    }
}

//class circle
class Circle{
    private path:Path2D;
    public center:Point;
    private radius:number;
    public color:string;
    private context:CanvasRenderingContext2D;

    constructor(center:Point,radius:number,context:CanvasRenderingContext2D,color:string){
        this.center=center;
        this.radius=radius;
        this.context=context;
        this.color=color;
    }

    draw(){
        this.path = new Path2D();
        this.path.arc(this.center.x,this.center.y,this.radius,0,2*Math.PI,false);
        this.context.fillStyle=this.color;
        this.context.strokeStyle="black";
        this.context.fill(this.path);
        this.context.stroke(this.path);
    }

    //checks whether the point is inside circle or not
    isinside(pt:Point){
        //using path2D 
        if(this.context.isPointInPath(this.path,pt.x,pt.y)){
            return true;
        }
        else{
            return false;
        }
    }
}
//ellipse class to draw ellipse
class Ellipse{
    public point:Point;
    private minor:number;
    private major:number;
    private context:CanvasRenderingContext2D;
    private path:Path2D;

    constructor(point:Point,minor:number,major:number,context:CanvasRenderingContext2D){
        this.point=point;
        this.minor=minor;
        this.major=major;
        this.context=context;
    }

    draw(){
        this.path=new Path2D();
        this.path.ellipse(this.point.x,this.point.y,this.minor,this.major,0,0,2*Math.PI,true);
        this.context.fillStyle="red";
        this.context.strokeStyle="black";
        this.context.fill(this.path);
        this.context.stroke(this.path);
    }
    isinside(pt:Point){
        //using path2D 
        if(this.context.isPointInPath(this.path,pt.x,pt.y)){
            return true;
        }
        else{
            return false;
        }
    }
}

//rectangle class to draw rectangle
class Rectangle{
    public point:Point;
    private length:number;
    private height:number;
    private context:CanvasRenderingContext2D;
    private path:Path2D;

    constructor(point:Point,length:number,height:number,context:CanvasRenderingContext2D){
        this.point=point;
        this.length=length;
        this.height=height;
        this.context=context;
    }

    draw(){
        this.path=new Path2D();
        this.path.rect(this.point.x-(this.length/2),this.point.y-(this.height/2),this.length,this.height);
        this.context.fillStyle="green";
        this.context.strokeStyle="black";
        this.context.fill(this.path);
        this.context.stroke(this.path);
    }
    isinside(pt:Point){
        //using path2D 
        if(this.context.isPointInPath(this.path,pt.x,pt.y)){
            return true;
        }
        else{
            return false;
        }
    }
}

