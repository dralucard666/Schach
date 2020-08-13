// Chessboard erstellen

var turn = 0;
var currentfiguretomove = null;

var fruits = [['a', 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h'], ['a', 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h'],['a', 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h'],
['a', 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h'],['a', 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h'],['a', 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h'],
['a', 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h'],['a', 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h']];
createTable(fruits);

var run=0;
for (let x=0 ; x<8 ; x++){
  for (let y=0 ; y<8 ; y++){

    document.getElementById(arraynuminid(x,y)).innerText=null;
    if (run%2==0) {
      document.getElementById(arraynuminid(x,y)).style.background="white";

    } else {
      document.getElementById(arraynuminid(x,y)).style.background="black";

    }
    run++;
  }
  run++;
}

  function arraynuminid(x , y) {
    let idname=""+x+y;
   return idname;
  }

  function createTable(tableData) {
    var table = document.createElement('table');
    table.id = "chessboard";
    
    var tableBody = document.createElement('tbody');
    var zeile = 0;
    tableData.forEach(function(rowData) {
        var spalte = 0;
      var row = document.createElement('tr');
  
      rowData.forEach(function(cellData) {
        var nameofcell=""+zeile+spalte;  
        var cell = document.createElement('td');
        cell.id=nameofcell;
        cell.className= "cell";
        cell.style.backgroundColor="white";
        cell.onclick = function () {
          movefigure(cell.id);
        };
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
        spalte++;
      });
        
      zeile++;
      tableBody.appendChild(row);
    });
  
    table.appendChild(tableBody);
    document.body.appendChild(table);
  }

  //

  //Figuren setzen
var whitelist = [["B",6,0],["B",6,1],["B",6,2],["B",6,3],["B",6,4],["B",6,5],["B",6,6],["B",6,7],
["T",7,0],["S",7,1],["L",7,2],["D",7,3],["K",7,4],["L",7,5],["S",7,6],["T",7,7]];
var blacklist = [["B",1,0],["B",1,1],["B",1,2],["B",1,3],["B",1,4],["B",1,5],["B",1,6],["B",1,7],
["T",0,0],["S",0,1],["L",0,2],["D",0,3],["K",0,4],["L",0,5],["S",0,6],["T",0,7]];
refigureboard();

function refigureboard() {



whitelist.forEach(element => {
  document.getElementById(arraynuminid(element[1],element[2])).innerText=element[0];
  document.getElementById(arraynuminid(element[1],element[2])).style.color = "#ff0000";
});

blacklist.forEach(element => {
  document.getElementById(arraynuminid(element[1],element[2])).innerText=element[0];
  document.getElementById(arraynuminid(element[1],element[2])).style.color = "blue";
});
}


//move figures

function movefigure(id){


  if (currentfiguretomove!=null) {
    if (moveispossible(currentfiguretomove[0], currentfiguretomove[1], currentfiguretomove[2], parseInt(id.substring(0,1)),parseInt(id.substring(1,2)))) {

     whitelist.forEach(element => {
        if(element[1]==currentfiguretomove[1] && element[2]==currentfiguretomove[2]) {
          element[1]=parseInt(id.substring(0,1));
           element[2]=parseInt(id.substring(1,2));
           if (element[0]==="B" && parseInt(id.substring(0,1))==0) {
              element[0]="D";
           }
        }
      });
      document.getElementById(""+currentfiguretomove[1]+currentfiguretomove[2]).innerText=null;
      
     let figurekilled=-1;
     let figurekilledcounter=0;



     blacklist.forEach(element => {

        if(element[1]==parseInt(id.substring(0,1)) && element[2]==parseInt(id.substring(1,2))) {
          figurekilled=figurekilledcounter;

        }
        figurekilledcounter++;
        });
        if (figurekilled>-1) {
          blacklist.splice(figurekilled,1)
        }

        figurekilled=-1;


      currentfiguretomove=null;
turn+=1;

refigureboard();
computermove(3);

    } else {
      if (turn%2==0) {
        document.getElementById(""+currentfiguretomove[1]+currentfiguretomove[2]).style.color="#ff0000";
      } else {
        document.getElementById(""+currentfiguretomove[1]+currentfiguretomove[2]).style.color="blue";
      }
      currentfiguretomove=null;
    }

} else {
  if ((document.getElementById(id).style.color=="rgb(255, 0, 0)" && turn%2==0) || (document.getElementById(id).style.color=="blue" && turn%2==1)) {
  document.getElementById(id).style.color="green";
currentfiguretomove=[document.getElementById(id).innerText, parseInt(id.substring(0,1)) ,parseInt(id.substring(1,2))];
  }
}

}


function evaluatemove(x,y,lookahead) {

  if (turn%2==0) {
    lista=whitelist;
    listb=blacklist;
    } else {
    lista=blacklist;
    listb=whitelist;
    }

  let figurekilled=-1;
  let figurekilledcounter=0;
  let killedfiguretype= null;
  let killedfigurex= null;
  let killedfigurey= null;

   
  listb.forEach(element => {
  
    if(element[1]==x && element[2]==y) {
      figurekilled=figurekilledcounter;
    }
    figurekilledcounter++;
    });
    if (figurekilled>-1) {
      killedfiguretype=listb[figurekilled][0];
      killedfigurex=listb[figurekilled][1];
      killedfigurey=listb[figurekilled][2];
      listb.splice(figurekilled,1)
    }
  
    figurekilled=-1;  




let whitevalue=0;
let blackvalue=0;

  listb.forEach(element => {
    if(element[0]=="B") {  whitevalue+=1  } 
    else if (element[0]=="T") {  whitevalue+=5  }
    else if (element[0]=="S") {   whitevalue+=3 }
    else if (element[0]=="L") {  whitevalue+=3  }
    else if (element[0]=="K") {  whitevalue+=39  }
    else {whitevalue+=8}
  });

  lista.forEach(element => {
    if(element[0]=="B") {  blackvalue++  } 
    else if (element[0]=="T") {  blackvalue+=5  }
    else if (element[0]=="S") {   blackvalue+=3 }
    else if (element[0]=="L") {  blackvalue+=3  }
    else if (element[0]=="K") {  blackvalue+=39  }
    else {blackvalue+=8}
  });

  if(killedfiguretype!=null) {
listb.push([killedfiguretype,killedfigurex,killedfigurey])
  }

return blackvalue-whitevalue;
}


function computermove(lookahead)  {

  let lista= null;
  let listb= null;

if (turn%2==0) {
lista=whitelist;
listb=blacklist;
} else {
lista=blacklist;
listb=whitelist;
}


  var bestcomputermoveval=-80;
var currentbestfigure = null;
var waspawn = false;

  lista.forEach(element => {
    for (let x=0 ; x<8 ; x++) {
      for (let y=0 ; y<8 ; y++) {


        if (moveispossible(element[0],element[1],element[2],x,y)){  
          
          let currentpositionx=element[1];
          let currentpositiony=element[2];
          element[1]=x;
          element[2]=y;

          if (element[0]==="B" && x==7) {
            element[0]="D";
            waspawn=true;
         }
     
          if(evaluatemove(x,y,lookahead)>bestcomputermoveval){
        //    console.log("derzeit bester move"+bestcomputermoveval);
        //    console.log("neuer bester move"+evaluatemove(x,y));
            bestcomputermoveval=evaluatemove(x,y);
            currentbestfigure = [currentpositionx,currentpositiony,x,y];
          }
          if (waspawn==true) {
            waspawn=false;
            element[0]="B";
          }
          element[1]=currentpositionx;
          element[2]=currentpositiony;
        }
      }
    }
})




lista.forEach(element => {
  if(element[1]==currentbestfigure[0] && element[2]==currentbestfigure[1]) {
    element[1]=currentbestfigure[2];
     element[2]=currentbestfigure[3];
     if (element[0]==="B" && currentbestfigure[2]==7) {
      element[0]="D";
   }
  }
});
document.getElementById(""+currentbestfigure[0]+currentbestfigure[1]).innerText=null;


let figurekilled=-1;
let figurekilledcounter=0;



listb.forEach(element => {

  if(element[1]==currentbestfigure[2] && element[2]==currentbestfigure[3]) {
    figurekilled=figurekilledcounter;

  }
  figurekilledcounter++;
  });
  if (figurekilled>-1) {
    listb.splice(figurekilled,1)
  }

  figurekilled=-1;

currentfiguretomove=null;
turn+=1;


refigureboard();

}

function enemyfigureonfield(x,y) {

if (turn%2==0) {
  lista=blacklist;
} else {
  lista=whitelist;
}
  for (let z=0 ; z<lista.length ; z++) {
    if (lista[z][1]==x && lista[z][2]==y) {
      return true;
    }
  }

  return false;
}

function friendlyfigureonfield(x,y) {

  if (turn%2==0) {
    lista=whitelist;
  } else {
    lista=blacklist;
  }

  for (let z=0 ; z<lista.length ; z++) {
    if (lista[z][1]==x && lista[z][2]==y) {
      return true;
    }
  }

  return false;
}


function moveispossible(type, currentpositionx, currentpositiony,x,y) {

if (type[0]=="B") {
  if (turn%2==0) {



     if (((currentpositionx-1==x || (currentpositionx-2==x && currentpositionx==6)) && currentpositiony==y && !enemyfigureonfield(x,y)&&!friendlyfigureonfield(x,y)) 
     || (currentpositionx-1==x && (currentpositiony==y-1 || currentpositiony-1==y) && enemyfigureonfield(x,y))) {

       return true;
     }

     return false;
   
  } else {



    if (((currentpositionx==x-1 || (currentpositionx==x-2 && currentpositionx==1))&& currentpositiony==y && !enemyfigureonfield(x,y)&&!friendlyfigureonfield(x,y))
    || currentpositionx==x-1 && (currentpositiony==y-1 || currentpositiony-1==y) && enemyfigureonfield(x,y)
    ) {

      return true;
    }

    return false;
  }
} else if (type[0]=="T") {
   if (currentpositionx!=x && currentpositiony!=y) {
     return false;
   }
   let bool=true;
  for (let z=currentpositionx+1 ; z<x ; z++) {

  bool=bool&&!enemyfigureonfield(z,y)&&!friendlyfigureonfield(z,y);
  }
  for (let z=x+1 ; z<currentpositionx ; z++) {

    bool=bool&&!enemyfigureonfield(z,y)&&!friendlyfigureonfield(z,y);
    }
  for (let z=currentpositiony+1 ; z<y ; z++) {

    bool=bool&&!enemyfigureonfield(x,z)&&!friendlyfigureonfield(x,z);
  }
  for (let z=y+1 ; z<currentpositiony  ; z++) {

    bool=bool&&!enemyfigureonfield(x,z)&&!friendlyfigureonfield(x,z);
  }

  bool=bool&&!friendlyfigureonfield(x,y);


  return bool;
} else if (type[0]=="S") {
  if (((currentpositionx==x-2 || currentpositionx-2==x) && (currentpositiony==y-1 || currentpositiony-1==y) &&!friendlyfigureonfield(x,y))
  ||((currentpositionx==x-1 || currentpositionx-1==x) && (currentpositiony==y-2 || currentpositiony-2==y) &&!friendlyfigureonfield(x,y))) {

    return true;
  }

  return false;
}else if (type[0]=="L") {
  if (Math.abs(currentpositionx-x)==Math.abs(currentpositiony-y)&&!friendlyfigureonfield(x,y)) {

   let bool = true;
   let moveinx = x-currentpositionx/Math.abs(currentpositionx-x);
   let moveiny = y-currentpositiony/Math.abs(currentpositiony-y);


   for (let z=1 ; z<Math.abs(x-currentpositionx) ; z++) {

  bool=bool&&!enemyfigureonfield(currentpositionx+z*moveinx,currentpositiony+z*moveiny)&&!friendlyfigureonfield(currentpositionx+z*moveinx,currentpositiony+z*moveinx);
  }



    return bool;
  }
return false;

} else if (type[0]=="K") {
  if (Math.abs(currentpositionx-x)+Math.abs(currentpositiony-y)==1&&!friendlyfigureonfield(x,y) 
  || (Math.abs(currentpositionx-x))==1 && Math.abs(currentpositiony-y)==1 ) {

    return true;
  }

  return false;
}else if (type[0]=="D") {
  if (Math.abs(currentpositionx-x)==Math.abs(currentpositiony-y)&&!friendlyfigureonfield(x,y)) {

    let bool = true;
    let moveinx = x-currentpositionx/Math.abs(currentpositionx-x);
    let moveiny = y-currentpositiony/Math.abs(currentpositiony-y);
 
 
    for (let z=1 ; z<Math.abs(x-currentpositionx) ; z++) {
 
   bool=bool&&!enemyfigureonfield(currentpositionx+z*moveinx,currentpositiony+z*moveiny)&&!friendlyfigureonfield(currentpositionx+z*moveinx,currentpositiony+z*moveinx);
   }
 
 
     return bool;
   } else if ((currentpositionx==x && currentpositiony!=y) || (currentpositionx!=x && currentpositiony==y)) {
   
   let bool=true;
   for (let z=currentpositionx+1 ; z<x ; z++) {

   bool=bool&&!enemyfigureonfield(z,y)&&!friendlyfigureonfield(z,y);
   }
   for (let z=x+1 ; z<currentpositionx ; z++) {
 
     bool=bool&&!enemyfigureonfield(z,y)&&!friendlyfigureonfield(z,y);
     }
   for (let z=currentpositiony+1 ; z<y ; z++) {
 
     bool=bool&&!enemyfigureonfield(x,z)&&!friendlyfigureonfield(x,z);
   }
   for (let z=y+1 ; z<currentpositiony  ; z++) {
 
     bool=bool&&!enemyfigureonfield(x,z)&&!friendlyfigureonfield(x,z);
   }
 
   bool=bool&&!friendlyfigureonfield(x,y);
 
   return bool;
 } else {
   return false;
 }
}


return true;
}