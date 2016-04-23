// JavaScript Document
// 很抱歉拖了这么久才给您，前两周一直处于出差的状态，程序写的比较仓促。实现了一些我之前的想法，可是还有很多想法不知道怎么实现（比如怎么不使用那么多的闭包。。。）。这样让我产生了学习的动力和方向,代码还要多写才行。
window.onload = function(){
    try{
		Click();
	}
	catch(error){
		alert(error.message);
	}
}

var tools = {
	 array:new Array(),
	 three:new Array(),
	 gameTime:new Array(),
	 btn:function(){
		 var btn = document.getElementById("btn");
		 return btn;
	 },
	 claerStartTime:function(){
		setInterval(countDown,1000);
	 },
	 browserName:"Microsoft Internet Explorer"
}


function Click(){
	tools.btn().onclick = function(){
		remove();
	}
}
function remove(){
	var btn = tools.btn();
	var title = document.getElementById("title");
	if(navigator.appName == tools.browserName){
		btn.removeNode(true);
	}
	else{
	btn.remove();
	}
	title.innerHTML = "Game will start in <span id='timeBox'>5</span> second."
	var timeBox = document.getElementById("timeBox");
	var startTime = timeBox.innerHTML;
	function countDown(){
		startTime = startTime-1;
		title.innerHTML = "Game will start in "+startTime +" second."
		if(startTime == 0){
		clearInterval(tools.claerStartTime);
		if(navigator.appName == tools.browserName){
		$("#contianer-1").removeNode(true);
		}
		else{
		$("#contianer-1").remove();
		}
		createTable();
		progressBar();
		tools.clearCraete = setInterval(create,400);
	  }
		
	}
	tools.claerStartTime = setInterval(countDown,1000);
	
}

function create(){
	var num = rand();
	var condition = (num in tools.three);
	if(condition == false){
		tools.three.push(num);
	}//  去重
	var pos = tools.three.pop();
	var key = true;
	var td = document.getElementsByTagName("td");
	var cat = document.createElement("img");
	var hole = document.createElement("div");
	hole.style.cssText = " width:10px; height:1px; border-radius:100px; background-color:black; position:absolute; left:0px;bottom:0px;";
	td[pos].appendChild(hole);
	td[pos].appendChild(cat);
	cat.onclick = function(){
	       if(key==true){
		   var num = Math.round(Math.random()*100);
		      if(num<10){
			  win();   //中奖程序 
		      }
		   key = false;
	       }
	};
		function growUp(){
		var holeWidth = parseInt(hole.style.width);
	    var holeHeight = parseInt(hole.style.height);
		holeWidth = holeWidth+2;
		holeHeight = holeHeight+1;
		hole.style.width = holeWidth+"px";
		hole.style.height = holeHeight+"px";
		if(holeWidth == 120){
			clearInterval(clearGrowUp);
			cat.setAttribute("src","cat.png");
	        cat.style.cssText = "width:80px; height:100px; position:absolute; left:20px;top:160px; cursor:pointer;"	
			var clearCatOut = setInterval(catOut,15);
			function catOut(){
			var top = parseInt(cat.style.top);
			/*var catWidth = parseInt( cat.style.width);
			var catHeight =  parseInt(cat.style.height);
			catWidth = catWidth+1;
			catHeight = catHeight+3;
			cat.style.height = catHeight+"px";
			cat.style.width = catWidth+"px";*/
			var pos = cat.style.top;
		    top = top - 2;
		    cat.style.top = top+"px";
			    if(top==50){
				   clearInterval(clearCatOut);
				   var Top = top;
				   function catIn(){
					   Top = Top+1;
					   cat.style.top = Top+"px";
					   if(Top == 160){
						   clearInterval(clearCatIn);
						   if(navigator.appName == tools.browserName){
		                   cat.removeNode(true);
						   hole.removeNode(true);
	                       }
	                       else{
	                       cat.remove();
						   hole.remove();
	                       }
					   }
				   }
				var clearCatIn = setInterval(catIn,8);
				   
			    }
			}
			
	    }
	}
	var clearGrowUp = setInterval(growUp,5);
}

function createTable(){
	var X = document.body.scrollWidth-200;
	var Y = document.body.scrollHeight-200; 
	var rows = Math.floor(Y/150);
	var cols = Math.floor(X/150);
	var table = document.createElement("table");
	table.style.cssText = "margin:50px auto 0 auto;border-spacing:15px;";
	var tbody = document.createElement("tbody");
	var activeBox = document.getElementById("Box");
	table.appendChild(tbody);
	document.body.appendChild(table);
	for(var i=0;i<=rows;i++){
		var tr = document.createElement("tr");
		tbody.appendChild(tr);
		for(var j=0;j<=cols;j++){
			var td = document.createElement("td");
			td.style.cssText = "width:150px;height:150px; position:relative; overflow:hidden;";
			tr.appendChild(td);
		}
	}
	tableId();
}

function tableId(){
	var td = document.getElementsByTagName("td");
	for(var i=0;i<td.length;i++){
		td[i].setAttribute("id",i);
		tools.array.push(i);
	    }
    }

function rand(){
	    var num = Math.round(Math.random()*(tools.array.length));
		return num;
}



	
function progressBar(){
	var timeBar = document.createElement("div");
	document.body.appendChild(timeBar);
	timeBar.style.cssText = "position:absolute;left:0;top:20px; width:400px;background-color:#FFCC66; line-height:20px; padding:10px; border-bottom-right-radius:50px;border-top-right-radius:50px; font-size:20px;" ;
	var text = document.createTextNode("游戏时间 : ");
	timeBar.appendChild(text);
	for(var i=0;i<500;i++){
		var span = document.createElement("span");
		span.style.cssText = "display:inline-block; height:18px; width:0.5px;background-color:#FF0;";
		timeBar.appendChild(span); 
		tools.gameTime.push(i);
	}
	tools.clearTimer = setInterval(timer,25);
}



function timer(){
	var num = tools.gameTime.pop();
	var span = document.getElementsByTagName("span");
	span[num].style.cssText = "border-bottom-right-radius:50px;border-top-right-radius:50px;";
	if(navigator.appName == tools.browserName){
		span[num].removeNode(true);
	}
	else{
		span[num].style.backgroundColor = "#CCC";
	}
	if(num<190){
		for(var i=0;i<span.length;i++){
		span[i].style.backgroundColor = "#FF0066";
		}
	}
	if(num==0){
		clearInterval(tools.clearTimer);
		clearInterval(tools.clearCraete);
		console.log("timeOut");
	}
}


function win(){
	alert("恭喜您抽到红包~");
}

		
