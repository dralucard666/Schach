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
    if (moveispossible(parseInt(id.substring(0,1)),parseInt(id.substring(1,2)))) {
      

     if (turn%2==0) {
      lista=whitelist;
      listb=blacklist;
     } else {
       lista=blacklist;
       listb=whitelist;
     }

     lista.forEach(element => {
        if(element[1]==currentfiguretomove[1] && element[2]==currentfiguretomove[2]) {
          element[1]=parseInt(id.substring(0,1));
           element[2]=parseInt(id.substring(1,2));
        }
      });
      document.getElementById(""+currentfiguretomove[1]+currentfiguretomove[2]).innerText=null;
      
     let figurekilled=-1;
     let figurekilledcounter=0;



     listb.forEach(element => {

        if(element[1]==parseInt(id.substring(0,1)) && element[2]==parseInt(id.substring(1,2))) {
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


function moveispossible(x,y) {

if (currentfiguretomove[0]=="B") {
  if (turn%2==0) {



     if (((currentfiguretomove[1]-1==x || (currentfiguretomove[1]-2==x && currentfiguretomove[1]==6)) && currentfiguretomove[2]==y) 
     || (currentfiguretomove[1]-1==x && (currentfiguretomove[2]==y-1 || currentfiguretomove[2]-1==y) && enemyfigureonfield(x,y))) {

       return true;
     }

     return false;
   
  } else {



    if ((currentfiguretomove[1]==x-1 || (currentfiguretomove[1]==x-2 && currentfiguretomove[1]==1))&& currentfiguretomove[2]==y 
    || currentfiguretomove[1]==x-1 && (currentfiguretomove[2]==y-1 || currentfiguretomove[2]-1==y) && enemyfigureonfield(x,y)
    ) {

      return true;
    }

    return false;
  }
} else if (currentfiguretomove[0]=="T") {
   if (currentfiguretomove[1]!=x && currentfiguretomove[2]!=y) {
     console.log("ich bin in der trap")
     return false;
   }
   let bool=true;
  for (let z=currentfiguretomove[1]+1 ; z<x ; z++) {
    console.log("hier bin ich z:"+z)
    console.log(bool)
  bool=bool&&!enemyfigureonfield(z,y)&&!friendlyfigureonfield(z,y);
  }
  for (let z=x+1 ; z<currentfiguretomove[1] ; z++) {

    bool=bool&&!enemyfigureonfield(z,y)&&!friendlyfigureonfield(z,y);
    }
  for (let z=currentfiguretomove[2]+1 ; z<y ; z++) {

    bool=bool&&!enemyfigureonfield(x,z)&&!friendlyfigureonfield(x,z);
  }
  for (let z=y+1 ; z<currentfiguretomove[2]  ; z++) {

    bool=bool&&!enemyfigureonfield(x,z)&&!friendlyfigureonfield(x,z);
  }

  bool=bool&&!friendlyfigureonfield(x,y);
  console.log(bool)


  return bool;
} else if (currentfiguretomove[0]=="S") {
  if (((currentfiguretomove[1]==x-2 || currentfiguretomove[1]-2==x) && (currentfiguretomove[2]==y-1 || currentfiguretomove[2]-1==y) &&!friendlyfigureonfield(x,y))
  ||((currentfiguretomove[1]==x-1 || currentfiguretomove[1]-1==x) && (currentfiguretomove[2]==y-2 || currentfiguretomove[2]-2==y) &&!friendlyfigureonfield(x,y))) {

    return true;
  }

  return false;
}else if (currentfiguretomove[0]=="L") {
  if (Math.abs(currentfiguretomove[1]-x)==Math.abs(currentfiguretomove[2]-y)&&!friendlyfigureonfield(x,y)) {

   let bool = true;

   for (let z=1 ; z<x-currentfiguretomove[1] ; z++) {

  bool=bool&&!enemyfigureonfield(currentfiguretomove[1]+z,currentfiguretomove[2]+z)&&!friendlyfigureonfield(currentfiguretomove[1]+z,currentfiguretomove[2]+z);
  }

  for (let z=1 ; z<currentfiguretomove[1]-x ; z++) {
 
    bool=bool&&!enemyfigureonfield(x+z,y+z)&&!friendlyfigureonfield(x+z,y+z);
    }
  for (let z=1 ; z<x-currentfiguretomove[2] ; z++) {

    bool=bool&&!enemyfigureonfield(currentfiguretomove[1]+z,currentfiguretomove[2]+z)&&!friendlyfigureonfield(currentfiguretomove[1]+z,currentfiguretomove[2]+z);
  }
  for (let z=1 ; z<currentfiguretomove[2]-x  ; z++)   {  

    bool=bool&&!enemyfigureonfield(x+z,y+z)&&!friendlyfigureonfield(x+z,y+z);
  }

    return bool;
  }
return false;

} else if (currentfiguretomove[0]=="K") {
  if (Math.abs(currentfiguretomove[1]-x)+Math.abs(currentfiguretomove[2]-y)==1&&!friendlyfigureonfield(x,y) 
  || (Math.abs(currentfiguretomove[1]-x))==1 && Math.abs(currentfiguretomove[2]-y)==1 ) {

    return true;
  }

  return false;
}else if (currentfiguretomove[0]=="D") {
  if (Math.abs(currentfiguretomove[1]-x)==Math.abs(currentfiguretomove[2]-y)&&!friendlyfigureonfield(x,y)) {

    let bool = true;
 
    for (let z=1 ; z<x-currentfiguretomove[1] ; z++) {
 
   bool=bool&&!enemyfigureonfield(currentfiguretomove[1]+z,currentfiguretomove[2]+z)&&!friendlyfigureonfield(currentfiguretomove[1]+z,currentfiguretomove[2]+z);
   }
 
   for (let z=1 ; z<currentfiguretomove[1]-x ; z++) {
  
     bool=bool&&!enemyfigureonfield(x+z,y+z)&&!friendlyfigureonfield(x+z,y+z);
     }
   for (let z=1 ; z<x-currentfiguretomove[2] ; z++) {
 
     bool=bool&&!enemyfigureonfield(currentfiguretomove[1]+z,currentfiguretomove[2]+z)&&!friendlyfigureonfield(currentfiguretomove[1]+z,currentfiguretomove[2]+z);
   }
   for (let z=1 ; z<currentfiguretomove[2]-x  ; z++)   {  
 
     bool=bool&&!enemyfigureonfield(x+z,y+z)&&!friendlyfigureonfield(x+z,y+z);
   }
 
     return bool;
   } else if ((currentfiguretomove[1]==x && currentfiguretomove[2]!=y) || (currentfiguretomove[1]!=x && currentfiguretomove[2]==y)) {
   
   let bool=true;
   for (let z=currentfiguretomove[1]+1 ; z<x ; z++) {
     console.log("hier bin ich z:"+z)
     console.log(bool)
   bool=bool&&!enemyfigureonfield(z,y)&&!friendlyfigureonfield(z,y);
   }
   for (let z=x+1 ; z<currentfiguretomove[1] ; z++) {
 
     bool=bool&&!enemyfigureonfield(z,y)&&!friendlyfigureonfield(z,y);
     }
   for (let z=currentfiguretomove[2]+1 ; z<y ; z++) {
 
     bool=bool&&!enemyfigureonfield(x,z)&&!friendlyfigureonfield(x,z);
   }
   for (let z=y+1 ; z<currentfiguretomove[2]  ; z++) {
 
     bool=bool&&!enemyfigureonfield(x,z)&&!friendlyfigureonfield(x,z);
   }
 
   bool=bool&&!friendlyfigureonfield(x,y);
   console.log(bool)
 
   return bool;
 } else {
   return false;
 }
}


return true;
}