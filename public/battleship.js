/**  

CSC 337, Spring 2019
this is a battleship js file.
It's linked to battleship.html file. 
it use to make sure the robot can random the ships and the user can 
click(hit) the ships.
it will also get the ranked data from database and show on the website.

By: Boyu Li, Yifei Chen
*/

(function(){
    'use strict';
    let timeCheck = "";
    let time = 0;
    let otranslator={"patrolboat":"P","submarine":"S","destroyer":
    "D","battleship":"B","carrier":"A"};
    
    window.onload = function() {
        getRank();
        setUp("enemytable");
        let shipLocation = randomShipPlace();
        addNewData(shipLocation,  "AI");
		document.getElementById("startGame").onclick=start;
        
    };
     /** it will add square's data to the table
      * @param {ship's location} shipLocation
      * @param {which player} player
     */
    function addNewData(shipLocation,  player){
        let user = "";
        
        if (player === "user"){
            user = "mytable";
        }
        else{
            user = "enemytable";
  
        }
        for(let i = 0; i < 5; i++){
            let x = shipLocation["A"][i][0];
            let y = shipLocation["A"][i][1];
            let locationID = user + "-" + x + "-" + y;
            let square = document.getElementById(locationID);
            square.classList.remove("noShip");
            if(player === "AI"){
                square.classList.add("carrier");

            }
            else{
                square.classList.add("A");
            }
           
 
        }
        for(let i = 0; i < 4; i++){
            let x = shipLocation["B"][i][0];
            let y = shipLocation["B"][i][1];
            let locationID = user + "-" + x + "-" + y;
            let square = document.getElementById(locationID);
            square.classList.remove("noShip");
            if(player === "AI"){
                square.classList.add("battleship");

            }
            else{
                square.classList.add("B");
            }
 
        }
        for(let i = 0; i < 3; i++){
            let x = shipLocation["D"][i][0];
            let y = shipLocation["D"][i][1];
            let locationID = user + "-" + x + "-" + y;
            let square = document.getElementById(locationID);
            square.classList.remove("noShip");
            if(player === "AI"){
                square.classList.add("destroyer");

            }
            else{
                square.classList.add("D");
            }
      
        }
        for(let i = 0; i < 3; i++){
            let x = shipLocation["S"][i][0];
            let y = shipLocation["S"][i][1];
            let locationID = user + "-" + x + "-" + y;
            let square = document.getElementById(locationID);
            square.classList.remove("noShip");
            if(player === "AI"){
                square.classList.add("submarine");

            }
            else{
                square.classList.add("S");
            }
  
        }
        for(let i = 0; i < 2; i++){
            let x = shipLocation["P"][i][0];
            let y = shipLocation["P"][i][1];
            let locationID = user + "-" + x + "-" + y;
            let square = document.getElementById(locationID);
            square.classList.remove("noShip");
            if(player === "AI"){
                square.classList.add("patrolboat");

            }
            else{
                square.classList.add("P");
            }
   
        }
        for(let x = 0; x < 10; x++){

            for(let y = 0; y < 10; y++){
                
                let locationID = user + "-" + x + "-" + y;
                let square = document.getElementById(locationID);
                square.classList.add("notFind");
               
            
            }
        }
    }
    /**get the ship's location
     * @param {a list} lst
     * @param {ship's location} location
     * @return {boolean} a boolean
    */
    function checkLocation(lst, location){
      
        for(let i = 0; i < lst.length; i++){
            if (lst[i][0] == location[0] && lst[i][1] == location[1]){
                return false;
            }

        }
        return true;

    
    }
    /** the robot will random the ship's location
     * @returns {list} randam's location
    */
    function randomShipPlace(){
        let totalShip = [5, 4, 3, 3, 2];
        let usedLocation = [];
        let shipLocation = {"A":[], "B":[], "D":[], "S":[], "P":[]};
        for(let i = 0; i < 5; i++){
            let randomR = Math.floor((Math.random()*2)+1);
            let rotate = true;
            if (randomR === 1){
                rotate = true;
            }
            else {
                rotate = false;
            }
            
            if(rotate === true){
                let count = 0;
                let x = 0;
                let y = 0;
                while(count !== totalShip[i]){
                    count = 0;
                    x = Math.floor(Math.random()* 10);
                    y = Math.floor(Math.random()* 10);
                    while (x > 9 - totalShip[i]){
                        x = Math.floor(Math.random()* 10);
                    }
                    
                    for(let a = 0; a < totalShip[i]; a++){
                        let location = [x+a, y];
                        let locationCheck = checkLocation(usedLocation, location);
                        if( locationCheck === true){
                            count++;
                        }
                    }
                    


                }
                for(let k = 0; k < totalShip[i]; k++){

                    usedLocation.push([x+k, y]);
                    
                    if (usedLocation.length <= 5 ){
                        shipLocation["A"].push([x+k, y]);
                    }
                    else if(usedLocation.length <= 9 ){
                        shipLocation["B"].push([x+k, y]);
                    }
                    else if(usedLocation.length <= 12 ){
                        shipLocation["D"].push([x+k, y]);
                    }
                    else if(usedLocation.length <= 15 ){
                        shipLocation["S"].push([x+k, y]);
                    }
                    else if(usedLocation.length ){
                        shipLocation["P"].push([x+k, y]);
                    }

                }
                
            }
            else{
                let x = 0;
                let y = 0;
                let count = 0;
                while(count !== totalShip[i]){
                    
                    count = 0;
                    x = Math.floor(Math.random()* 9);
                    y = Math.floor(Math.random()* 9);
                    while (y > 9 - totalShip[i]){
                        y = Math.floor(Math.random()* 9);
                    }
                    
                    for(let a = 0; a < totalShip[i]; a++){
                        let location = [x, y+a];
                        let locationCheck = checkLocation(usedLocation, location);
                        if( locationCheck === true){
                            count++;
                        }

                        
                    }


                }
                for(let k = 0; k < totalShip[i]; k++){
                    usedLocation.push([x, y+k]);
                    if (usedLocation.length <= 5 ){
                        shipLocation["A"].push([x, y+k]);
                    }
                    else if(usedLocation.length <= 9 ){
                        shipLocation["B"].push([x, y+k]);
                    }
                    else if(usedLocation.length <= 12 ){
                        shipLocation["D"].push([x, y+k]);
                    }
                    else if(usedLocation.length <= 15 ){
                        shipLocation["S"].push([x, y+k]);
                    }
                    else if(usedLocation.length ){
                        shipLocation["P"].push([x, y+k]);
                    }

                }
            }
 
        }
        return shipLocation;
              
    }
    /** update the new ranked information to the service and upload to database*/
    function rankUpdate(){
        let userName = document.getElementById("username").value;
        const message = {
                        userName: userName,
                        time: time};
        const fetchOptions = {
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(message)
        };
        let url = "https://blooming-garden-19866.herokuapp.com";
        fetch(url, fetchOptions)
            .then(checkStatus)
            .then(function(responseText) {
                console.log(responseText);
            })
            .catch(function(error) {
                console.log(error);
            });
        
    }   
        
    /** start the game*/
    function start(){
		document.getElementById("enemytable").onmouseover = turnRed;
        document.getElementById("enemytable").onclick = clicking;
        document.getElementById("enemytable").onmouseout = turnBlack;
        timeCheck = setInterval(function(){
            time ++;
        }, 1000);
    }
    /** create the tabel
     * @param {ememy's table} table
    */
	function setUp(table){
		let puzzlearea=document.getElementById(table);
		puzzlearea.innerHTML = '';
		
		for (let j = 0; j < 10; j++) {
			for(let i = 0; i<10; i++){
				let rect = document.createElement('span');
				rect.id=table+"-"+String(i)+"-"+String(j);
				rect.style.top=(j*43)+"px";
				rect.style.left=(i*43)+"px";
				rect.className="rect";
				rect.classList.add("noShip");
				puzzlearea.appendChild(rect);
			}
		}
    }
    /**  check the user's click
     it also use to check the game is end or not 
     @param {mouse's event} event
    */
	function clicking(event){
		let rect = event.target;
		if (rect.className.split(" ")[1]!="noShip") {
			rect.style.backgroundImage="url(img/blue3.png)";
            rect.innerHTML="X";
            rect.style.borderColor="";
			rect.classList.remove("notFind");
			rect.classList.add("find");
            shipDown(rect.className.split(" ")[1]);
			checkWin();
		}else{
            rect.style.backgroundImage="url(img/Miss.png)";
            rect.style.borderColor="";
            rect.style.backgroundColor="";
			rect.classList.remove("notFind");
			rect.classList.add("clicked");
		}
    }
    /** check the game is end or not*/
	function checkWin(){
		if(checkAllship(otranslator)){
            window.clearInterval(timeCheck);
            rankUpdate();
            let enemy = document.getElementById("enemy");
                    let p = document.createElement("p");
                    p.innerHTML = "Your Time: " + time;
                    p.style.fontSize = "30pt";
            enemy.appendChild(p);
            alert("YOU WIN");
            getRank();
		}
	}
    /**  get the rank list from database*/
    function getRank(){
        let url="https://blooming-garden-19866.herokuapp.com";
        fetch(url)
				.then(checkStatus)
				.then(function(responseText) {
                    let json = JSON.parse(responseText)["rank"];
                    let ol = document.getElementById("rankList");
                    ol.innerHTML = "";
                    let usedName = [];
                    let max = 10;
                    for(let i = 0; i < json.length; i++){
                        if (max === 0){
                            break;
                        }
                        let li = document.createElement("li");
                        li.className = "rankList";
                        
                        if (usedName.indexOf(json[i][0]) === -1 && json[i][0] != ""){
                            usedName.push(json[i][0]);
                            let name = json[i][0] + " ;" + json[i][1] + "s";
                            li.innerHTML = name;
                            ol.appendChild(li);
                            max--;
                        }

                    }
                    let rank = document.getElementById("rank");
                    
                    
                    rank.appendChild(ol);
                    
                });
    }
    
    /** check the ship is down or not
     * @param {ship kind} kind
     * @returns {boolean} a boolean
    */
	function shipDown(kind){
        let shipList=document.querySelectorAll("."+kind);
        
		for (let i = 0; i<shipList.length; i++) {
			if (shipList[i].innerHTML=="") {
				return false;
			}
		}
		for (let i = 0; i<shipList.length; i++) {
			shipList[i].style.backgroundImage="url(img/hit.png)";
		}
		return true;
    }
    /** check all ships are down or not
     * @param {ship's name translator} translator
     * @return {boolean} a boolean
    */
	function checkAllship(translator){
		for (let i in translator){
			if (shipDown(i)===false) {
				return false;
			}
		}
		return true;
    }
    /**  turn the square to red color and have x mark
     @event {event} mouse'sevent
    */
	function turnRed(event){
		let rect = event.target;
		if (rect.id.split("-").length==3 && rect.className.split(" ")[2]=="notFind") {
			rect.style.borderColor="red";
			rect.style.cursor="url(img/mouse.png)";
		}
    }
     /**  turn the square to black color
      * @event {event} mouse'sevent
     */
	function turnBlack(event){
		let rect = event.target;
		if (rect.id.split("-").length==3 && rect.className.split(" ")[2]=="notFind") {
			rect.style.borderColor="";
			rect.style.cursor="url(img/mouse.png)";
			rect.style.backgroundColor="";
		}
	}
     /** check Error
      * @param {net's response} response
     */
    function checkStatus(response) {  
        if (response.status >= 200 && response.status < 300) {  
            return response.text();
        } else if (response.status == 404) {
            // sends back a different error when we have a 404 than when we have
            // a different error
            return Promise.reject(new Error("Sorry, we couldn't find that page")); 
        } else {  
            return Promise.reject(new Error(response.status+": "+response.statusText)); 
        } 
    }
}());