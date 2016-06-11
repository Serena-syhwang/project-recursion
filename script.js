var n,t=0,nex=0,q=new Array,step=new Array,left=new Array,right=new Array;
var maze=new Array,flag=0,footprint,stop=0;
function createtable1(){
	n=document.getElementById("text-box").value;
	if (n==0||n==undefined)
		return;
	child=document.getElementById("Submit");
	parent=document.getElementById("list");
	parent.removeChild(child);
	var element=document.getElementById("container");
	var table=document.createElement("table");
	table.setAttribute("id","table");
	table.style.float="left";
	table.style.marginTop=element.offsetHeight*0.04;
	table.style.marginBottom=element.offsetHeight*0.04;
	for (i=0;i<=n;i++)
	{
		var row=document.createElement("tr");
		for (j=0;j<=n;j++)
		{
			var div=document.createElement("div");
			div.setAttribute("class","table");
			div.style.position="relative";
			div.style.height=element.offsetHeight*0.8/(parseInt(n)+1);
			div.style.lineHeight=parseInt(div.style.height)*0.07;
			div.style.width=div.style.height;
			div.setAttribute("id",i*10+j);
			if (i==0&&j==0)
			{
				div.style.backgroundColor="#FFB6C1";
				node=document.createTextNode(n);
				div.appendChild(node);
			}
			if (j==0&&i!=0)
			{
				div.style.backgroundColor="#FFB6C1";
				node=document.createTextNode(i);
				div.appendChild(node);
			}
			if (i==0&&j!=0)
			{
				div.style.backgroundColor="#FFB6C1";
				node=document.createTextNode(j);
				div.appendChild(node);
			}
			var col=document.createElement("td");
			col.appendChild(div);
			row.appendChild(col);
		}
		table.appendChild(row);
	}
	element.appendChild(table);
	var exp=document.createElement("div");
	exp.setAttribute("id","explanation");
	element.appendChild(exp);
	var stp=document.createElement("div");
	exp.appendChild(stp);
	stp.innerHTML="步骤";
	stp.setAttribute("id","buzhou");
	var p=document.createElement("p");
	p.setAttribute("id","step");
	exp.appendChild(p);
	var res=document.createElement("div");
	exp.appendChild(res);
	res.innerHTML="结果";
	res.setAttribute("id","jieguo");
	for (i=1;i<=n;i++)
		q[i]=0;
	store1(1);
	document.getElementById("play").disabled=false;
}
function store1(i){
	var j;
	if (i>n) return;
	else
	{
		for (j=1;j<=n;j++)
		{
			if (q[j]==0)
			{
				q[j]=1;
				var tmp={x:i,y:j,opr:"show"};
				step.push(tmp);
				store1(i+1);
				q[j]=0;
				tmp={x:i,y:j,opr:"hide"};
				step.push(tmp);
			}
		}
	}
}
function play1(t){
	if (stop==1)
		return;
	var play=document.getElementById("play");
	play.disabled="true";
	document.getElementById("next").disabled=true;
	document.getElementById("back").disabled=true;
	nex=t;
	if (t>=step.length) {return;}
	if (step[t].opr=="show")
	{
		var check=document.getElementById(step[t].x*10+step[t].y);
		var num=document.createTextNode(step[t].y);
		if (check){
			$(document).ready(function(){
				$("td div#"+(step[t].x*10+step[t].y)).animate({height:'hide'},function(){check.appendChild(num);check.style.backgroundColor="#FFB6C1";});
			});
			$(document).ready(function(){
				$("td div#"+(step[t].x*10+step[t].y)).animate({height:'show'},function(){
					var p=document.getElementById("step");
					p.innerHTML="把"+step[t].y+"放在第"+step[t].x+"个位置";
					if(step[t].x==n)
					{
						p=document.createElement("p");
						var parent=document.getElementById("explanation");
						parent.appendChild(p);
						p.style.float="left";
						for (i=1;i<=n;i++)
						{
							for (j=1;j<=n;j++)
							{
								if (document.getElementById(i*10+j).lastChild!=null)
								{
									p.innerHTML+=j;
								}
							}
						}
						p.innerHTML+="&nbsp&nbsp";
					}
					play1(t+1);});
			});
		}
	}
	else
	{
		var check=document.getElementById(step[t].x*10+step[t].y);
		var num=check.lastChild;
		$(document).ready(function(){
			$("td div#"+(step[t].x*10+step[t].y)).animate({height:'hide'},function(){if(num) check.removeChild(num);check.style.backgroundColor="white";});
		});
		$(document).ready(function(){
			$("td div#"+(step[t].x*10+step[t].y)).animate({height:'show'},function(){var p=document.getElementById("step");
		p.innerHTML="把"+step[t].y+"从第"+step[t].x+"个位置拿起";play1(t+1);});
		});
	}
}
function stop1(){
	stop=1;
	var button=document.getElementById("play");
	button.setAttribute("onclick","continue1()");
	button.disabled=false;
	button=document.getElementById("stop");
	button.disabled=true;
	document.getElementById("next").disabled=false;
	document.getElementById("back").disabled=false;
	nex++;
}
function continue1(){
	stop=0;
	var button=document.getElementById("stop");
	button.disabled=false;
	play1(nex);
}
function next1(){
	if (nex>=step.length) {return;}
	document.getElementById("next").disabled=true;
	var button=document.getElementById("play");
	button.setAttribute("onclick","continue1()");
	if (step[nex].opr=="show")
	{
		var check=document.getElementById(step[nex].x*10+step[nex].y);
		$(document).ready(function(){
			$("td div#"+(step[nex].x*10+step[nex].y)).animate({height:'hide'},function(){var num=document.createTextNode(step[nex].y);check.appendChild(num);check.style.backgroundColor="#FFB6C1";});
		});
		$(document).ready(function(){
			$("td div#"+(step[nex].x*10+step[nex].y)).animate({height:'show'},function(){
				var p=document.getElementById("step");
				p.innerHTML="把"+step[nex].y+"放在第"+step[nex].x+"个位置";
				if(step[nex].x==n)
					{
						p=document.createElement("p");
						var parent=document.getElementById("explanation");
						parent.appendChild(p);
						p.style.float="left";
						for (i=1;i<=n;i++)
						{
							for (j=1;j<=n;j++)
							{
								if (document.getElementById(i*10+j).lastChild!=null)
								{
									p.innerHTML+=j;
								}
							}
						}
						p.innerHTML+="&nbsp&nbsp";
					}
				nex++;document.getElementById("next").disabled=false;});
		});
	}
	else
	{
		var check=document.getElementById(step[nex].x*10+step[nex].y);
		$(document).ready(function(){
			$("td div#"+(step[nex].x*10+step[nex].y)).animate({height:'hide'},function(){var num=check.lastChild;check.removeChild(num);check.style.backgroundColor="white";});
		});
		$(document).ready(function(){
			$("td div#"+(step[nex].x*10+step[nex].y)).animate({height:'show'},function(){var p=document.getElementById("step");
		p.innerHTML="把"+step[nex].y+"从第"+step[nex].x+"个位置拿起";nex++;document.getElementById("next").disabled=false;});
		});
	}
}
function back1(){
	if (nex>0)
		nex--;
	if (nex<0)return;
	document.getElementById("back").disabled=true;
	if (step[nex].opr=="show")
	{
		var check=document.getElementById(step[nex].x*10+step[nex].y);
		$(document).ready(function(){
			$("td div#"+(step[nex].x*10+step[nex].y)).animate({height:'hide'},function(){var num=check.lastChild;if(num) check.removeChild(num);check.style.backgroundColor="white";});
		});
		$(document).ready(function(){
			$("td div#"+(step[nex].x*10+step[nex].y)).animate({height:'show'},function(){
				var p=document.getElementById("step");
				p.innerHTML="把"+step[nex].y+"放在第"+step[nex].x+"个位置";
				if(step[nex].x==n)
					{
						p=document.getElementById("explanation").lastChild;
						if (p!=null)
						{
							document.getElementById("explanation").removeChild(p);
						}
					}
					document.getElementById("back").disabled=false;
			});
		});
	}
	else
	{
		var check=document.getElementById(step[nex].x*10+step[nex].y);
		$(document).ready(function(){
			$("td div#"+(step[nex].x*10+step[nex].y)).animate({height:'hide'});
		});
		var num=document.createTextNode(step[nex].y);
		check.appendChild(num);
		check.style.backgroundColor="#FFB6C1";
		$(document).ready(function(){
			$("td div#"+(step[nex].x*10+step[nex].y)).animate({height:'show'},function(){document.getElementById("back").disabled=false;});
		});
	}
}
function startover1(){
	var i;
	var table=document.getElementById("table");
	var parent=document.getElementById("container");
	parent.removeChild(table);
	table=document.getElementById("explanation");
	parent.removeChild(table);
	var button=document.createElement("input");
	button.setAttribute("type","Submit");
	button.setAttribute("value","Submit");
	button.setAttribute("id","Submit");
	button.setAttribute("onclick","createtable1()");
	parent=document.getElementById("list");
	parent.appendChild(button);
	var box=document.getElementById("text-box");
	$(function(){
		$("#text-box").val("");
	});
	box.setAttribute("placeholder","n=");
	button=document.getElementById("play");
	button.setAttribute("onclick","play1(0)");
	var length=step.length;
	for (i=0;i<length;i++)
		step.pop();
	nex=0;
}
//全排列-八皇后
function createtable2(){
	n=document.getElementById("text-box").value;
	if (n==0||n==undefined)
		return;
	child=document.getElementById("Submit");
	parent=document.getElementById("list");
	parent.removeChild(child);
	var element=document.getElementById("container");
	var child=document.createElement("div");
	child.setAttribute("id","boxes");
	child.style.position="relative";
	child.style.left="100";
	child.style.top="60";
	child.style.height="180";
	child.style.width=90*n;
	element.appendChild(child);
	element=child;
	for (i=1;i<=n;i++)
	{
		var box=document.createElement("div");
		box.setAttribute("class","table");
		box.setAttribute("id",i);
		box.style.height="75";
		box.style.width="75";
		box.style.lineHeight="5.4";
		box.style.left=85*(i-1);
		var num=document.createTextNode(i);
		box.appendChild(num);
		element.appendChild(box);
	}
	element=document.getElementById("container");
	var exp=document.createElement("div");
	exp.setAttribute("id","explanation");
	element.appendChild(exp);
	exp.style.float="none";
	exp.style.position="absolute";
	exp.style.bottom="0";
	exp.style.width="100%";
	exp.style.height="40%";
	var stp=document.createElement("div");
	exp.appendChild(stp);
	var buzhou=document.createElement("div");
	stp.appendChild(buzhou);
	buzhou.innerHTML="步骤";
	buzhou.setAttribute("id","buzhou");
	stp.style.float="left";
	stp.style.width="40%";
	var p=document.createElement("p");
	p.setAttribute("id","step");
	stp.appendChild(p);
	var res=document.createElement("div");
	res.style.width="30%";
	exp.appendChild(res);
	res.setAttribute("id","result");
	var jieguo=document.createElement("div");
	res.appendChild(jieguo);
	jieguo.setAttribute("id","jieguo");
	jieguo.style.width="100%";
	res.style.float="left";
	jieguo.innerHTML="结果";
	store2(1,parseInt(n,10));
	document.getElementById("play").disabled=false;
}
function swap(a,b,flag){
	var tmp={x:a,y:b,flag:flag};
	step.push(tmp);
}
function store2(start,end){
	var i;
	if (start==end) return;
	else
	{
		for (i=start;i<=end;i++)
		{
			swap(start,i,1);
			store2(start+1,end);
			swap(start,i,0);
		}
	}
}
function play2(t){
	if (stop==1)
		return;
	document.getElementById("play").disabled=true;
	document.getElementById("next").disabled=true;
	document.getElementById("back").disabled=true;
	nex=t;
	if (t>=step.length) {return;}
	var x=document.getElementById(step[t].x);
	var y=document.getElementById(step[t].y);
	var left1=x.style.left;
	var left2=y.style.left;
	$(document).ready(function(){
			$("div#"+(step[t].x)).animate({top:'90'});
	});
	$(document).ready(function(){
			$("div#"+(step[t].y)).animate({top:'90'});
	});
	if (left1!=left2){	
		$(document).ready(function(){
				$("div#"+(step[t].x)).animate({left:left2},"slow");
		});
		$(document).ready(function(){
				$("div#"+(step[t].y)).animate({left:left1},"slow");
		});
	}
	$(document).ready(function(){
			$("div#"+(step[t].x)).animate({top:'0'});
	});
	$(document).ready(function(){
			$("div#"+(step[t].y)).animate({top:'0'},function(){
				var p=document.getElementById("step");
				if (step[t].flag==1){
					p.innerHTML="第"+step[t].x+"个元素和第"+step[t].y+"个元素交换，递归从第"+(step[t].x+1)+"至"+n+"个元素的全排列";
				}
				else{
					p.innerHTML="第"+step[t].x+"个元素和第"+step[t].y+"个元素换回原位，递归从第"+(step[t].x+1)+"至"+n+"个元素的全排列";
				}
				if(step[t].x==n-1&&step[t].flag==1)
				{
					p=document.createElement("p");
					var parent=document.getElementById("result");
					parent.appendChild(p);
					p.style.float="left";
					for (i=1;i<=n;i++)
					{
						p.innerHTML+=document.getElementById(i).lastChild.data;
					}
					p.innerHTML+="&nbsp&nbsp";
				}
				play2(t+1);});
	});
	tmp=x.id;
	x.setAttribute("id",y.id);
	y.setAttribute("id",tmp);
	/*var numx=x.lastChild;
	var numy=y.lastChild;
	$(document).ready(function(){
			$("div#"+(step[t].x)).animate({height:'hide'},function(){x.appendChild(numy);});
	});
	$(document).ready(function(){
			$("div#"+(step[t].y)).animate({height:'hide'},function(){y.appendChild(numx);});
	});
	$(document).ready(function(){
		$("div#"+(step[t].x)).animate({height:'show'});
	});
	$(document).ready(function(){
		$("div#"+(step[t].y)).animate({height:'show'},function(){play2(t+1);});
	});*/
}
function stop2(){
	stop=1;
	var button=document.getElementById("play");
	button.setAttribute("onclick","continue2()");
	document.getElementById("play").disabled=false;
	document.getElementById("stop").disabled=true;
	document.getElementById("next").disabled=false;
	document.getElementById("back").disabled=false;
	nex++;
}
function continue2(){
	stop=0;
	document.getElementById("stop").disabled=false;
	play2(nex);
}
function next2(){
	if (nex>=step.length){return;}
	document.getElementById("next").disabled=true;
	var button=document.getElementById("play");
	button.setAttribute("onclick","continue2()");
	var x=document.getElementById(step[nex].x);
	var y=document.getElementById(step[nex].y);
	var left1=x.style.left;
	var left2=y.style.left;
	$(document).ready(function(){
			$("div#"+(step[nex].x)).animate({top:'90'});
	});
	$(document).ready(function(){
			$("div#"+(step[nex].y)).animate({top:'90'});
	});
	if (left1!=left2){	
		$(document).ready(function(){
				$("div#"+(step[nex].x)).animate({left:left2},"slow");
		});
		$(document).ready(function(){
				$("div#"+(step[nex].y)).animate({left:left1},"slow");
		});
	}
	$(document).ready(function(){
			$("div#"+(step[nex].x)).animate({top:'0'});
	});
	$(document).ready(function(){
			$("div#"+(step[nex].y)).animate({top:'0'},function(){
				tmp=x.id;
				x.setAttribute("id",y.id);
				y.setAttribute("id",tmp);
				var p=document.getElementById("step");
				if (step[nex].flag==1){
					p.innerHTML="第"+step[nex].x+"个元素和第"+step[nex].y+"个元素交换，递归从第"+(step[nex].x+1)+"至"+n+"个元素的全排列";
				}
				else{
					p.innerHTML="第"+step[nex].x+"个元素和第"+step[nex].y+"个元素换回原位，递归从第"+(step[nex].x+1)+"至"+n+"个元素的全排列";
				}
				if(step[nex].x==n-1&&step[nex].flag==1)
				{
					p=document.createElement("p");
					var parent=document.getElementById("result");
					parent.appendChild(p);
					p.style.float="left";
					for (i=1;i<=n;i++)
					{
						p.innerHTML+=document.getElementById(i).lastChild.data;
					}
					p.innerHTML+="&nbsp&nbsp";
				}
				nex++;
				document.getElementById("next").disabled=false;
			});
	});
}
function back2(){
	if (nex>0)
		nex--;
	if (nex<0)return;
	document.getElementById("back").disabled=true;
	var x=document.getElementById(step[nex].x);
	var y=document.getElementById(step[nex].y);
	var left1=x.style.left;
	var left2=y.style.left;
	$(document).ready(function(){
			$("div#"+(step[nex].x)).animate({top:'90'});
	});
	$(document).ready(function(){
			$("div#"+(step[nex].y)).animate({top:'90'});
	});
	if (left1!=left2){	
		$(document).ready(function(){
				$("div#"+(step[nex].x)).animate({left:left2},"slow");
		});
		$(document).ready(function(){
				$("div#"+(step[nex].y)).animate({left:left1},"slow");
		});
	}
	$(document).ready(function(){
			$("div#"+(step[nex].x)).animate({top:'0'});
	});
	$(document).ready(function(){
			$("div#"+(step[nex].y)).animate({top:'0'},function(){
				tmp=x.id;
				x.setAttribute("id",y.id);
				y.setAttribute("id",tmp);
				if(step[nex].x==n-1&&step[nex].flag==1)
					{
						p=document.getElementById("result").lastChild;
						if (p!=null)
						{
							document.getElementById("result").removeChild(p);
						}
					}
				document.getElementById("back").disabled=false;
			});
	});
}	
function startover2(){
	var parent=document.getElementById("container");
	var child=document.getElementById("boxes");
	parent.removeChild(child);
	child=document.getElementById("explanation");
	parent.removeChild(child);
	var button=document.createElement("input");
	button.setAttribute("type","Submit");
	button.setAttribute("value","Submit");
	button.setAttribute("id","Submit");
	button.setAttribute("onclick","createtable2()");
	parent=document.getElementById("list");
	parent.appendChild(button);
	var box=document.getElementById("text-box");
	$(function(){
		$("#text-box").val("");
	});
	box.setAttribute("placeholder","n=");
	button=document.getElementById("play");
	button.setAttribute("onclick","play2(0)");
	nex=0;
	var length=step.length;
	for (i=0;i<length;i++)
		step.pop();
}
//全排列-交换递归
function createchess(){
	n=document.getElementById("text-box").value;
	if (n==0||n==undefined)
		return;
	child=document.getElementById("Submit");
	parent=document.getElementById("list");
	parent.removeChild(child);
	var element=document.getElementById("container");
	var table=document.createElement("table");
	table.setAttribute("id","table");
	table.style.float="left";
	table.style.marginTop=element.offsetHeight*0.04;
	table.style.marginBottom=element.offsetHeight*0.04;
	for (i=0;i<=n;i++)
	{
		var row=document.createElement("tr");
		for (j=0;j<=n;j++)
		{
			var div=document.createElement("div");
			div.setAttribute("class","table");
			div.style.position="relative";
			div.setAttribute("id",i*10+j);
			div.style.backgroundColor="#FFB6C1";
			div.style.height=element.offsetHeight*0.8/(parseInt(n)+1);
			div.style.lineHeight=parseInt(div.style.height)*0.07;
			div.style.width=div.style.height;
			if (i==0&&j==0)
			{
				
				node=document.createTextNode(n);
				div.appendChild(node);
			}
			if (j==0&&i!=0)
			{
				
				node=document.createTextNode(i);
				div.appendChild(node);
			}
			if (i==0&&j!=0)
			{
				
				node=document.createTextNode(j);
				div.appendChild(node);
			}
			var col=document.createElement("td");
			col.appendChild(div);
			row.appendChild(col);
		}
		table.appendChild(row);
	}
	element.appendChild(table);
	var exp=document.createElement("div");
	exp.setAttribute("id","explanation");
	element.appendChild(exp);
	var stp=document.createElement("div");
	exp.appendChild(stp);
	stp.innerHTML="步骤";
	stp.setAttribute("id","buzhou");
	var p=document.createElement("p");
	p.setAttribute("id","step");
	exp.appendChild(p);
	var res=document.createElement("div");
	exp.appendChild(res);
	res.innerHTML="结果";
	res.setAttribute("id","jieguo");
	for (i=1;i<=n;i++)
		q[i]=0;
	for (i=1;i<=2*n;i++)
		left[i]=0;
	for (i=0;i<=2*n-2;i++)
		right[i]=0;
	storequeen(1);
	document.getElementById("play").disabled=false;
}
function storequeen(i){
	var j;
	r=new Number;
	if (i>n) return;
	else
	{
		for (j=1;j<=n;j++)
		{
			r=parseInt(i)-parseInt(j)+parseInt(n)-1;
			if (q[j]==0&&left[i+j]==0&&right[r]==0)
			{
				q[j]=1;
				left[i+j]=1;
				right[r]=1;
				var tmp={x:i,y:j,opr:"show"};
				step.push(tmp);
				storequeen(i+1);
				q[j]=0;
				left[i+j]=0;
				r=parseInt(i)-parseInt(j)+parseInt(n)-1;
				right[r]=0;
				tmp={x:i,y:j,opr:"hide"};
				step.push(tmp);
			}
		}
	}
}
function playqueen(t){
	if (stop==1)
		return;
	document.getElementById("play").disabled=true;
	document.getElementById("next").disabled=true;
	document.getElementById("back").disabled=true;
	nex=t;
	if (t>=step.length) {return;}
	if (step[t].opr=="show")
	{
		var check=document.getElementById(step[t].x*10+step[t].y);
		var img=document.createElement("img");
		img.setAttribute("src","crown.jpg");
		img.style.height=0.8*parseFloat(check.style.height);//obj.style.height是字符型的！
		img.style.width=0.8*parseFloat(check.style.width);
		img.style.marginTop=0.05*parseFloat(check.style.height);
		img.style.marginLeft=0.05*parseFloat(check.style.width);
		if (check){
			$(document).ready(function(){
				$("td div#"+(step[t].x*10+step[t].y)).animate({height:'hide'},function(){check.style.backgroundColor="white";check.appendChild(img);});
			});
			$(document).ready(function(){
				$("td div#"+(step[t].x*10+step[t].y)).animate({height:'show'},function(){
					var p=document.getElementById("step");
					p.innerHTML="把"+step[t].y+"放在第"+step[t].x+"个位置";
					if(step[t].x==n)
					{
						p=document.createElement("p");
						var parent=document.getElementById("explanation");
						parent.appendChild(p);
						p.style.float="left";
						for (i=1;i<=n;i++)
						{
							for (j=1;j<=n;j++)
							{
								if (document.getElementById(i*10+j).lastChild!=null)
								{
									p.innerHTML+=j;
								}
							}
						}
						p.innerHTML+="&nbsp&nbsp";
					}
					playqueen(t+1);});
			});
		}
	}
	else
	{
		var check=document.getElementById(step[t].x*10+step[t].y);
		var img=check.lastChild;
		$(document).ready(function(){
			$("td div#"+(step[t].x*10+step[t].y)).animate({height:'hide'},function(){check.style.backgroundColor="#FFB6C1";if(img)check.removeChild(img);});
		});
		$(document).ready(function(){
			$("td div#"+(step[t].x*10+step[t].y)).animate({height:'show'},function(){var p=document.getElementById("step");
		p.innerHTML="把"+step[t].y+"从第"+step[t].x+"个位置拿起";playqueen(t+1);});
		});
	}
}
function stopqueen(){
	stop=1;
	var button=document.getElementById("play");
	button.setAttribute("onclick","continuequeen()");
	button.disabled=false;
	button=document.getElementById("stop");
	button.disabled=true;
	document.getElementById("next").disabled=false;
	document.getElementById("back").disabled=false;
	nex++;
}
function continuequeen(){
	stop=0;
	var button=document.getElementById("stop");
	button.disabled=false;
	playqueen(nex);
}
function nextqueen(){
	if (nex>=step.length) {return;}
	document.getElementById("next").disabled=true;
	var button=document.getElementById("play");
	button.setAttribute("onclick","continuequeen()");
	if (step[nex].opr=="show")
	{
		var check=document.getElementById(step[nex].x*10+step[nex].y);
		var img=document.createElement("img");
		img.setAttribute("src","crown.jpg");
		img.style.height=0.8*parseFloat(check.style.height);//obj.style.height是字符型的！
		img.style.width=0.8*parseFloat(check.style.width);
		img.style.marginTop=0.05*parseFloat(check.style.height);
		img.style.marginLeft=0.05*parseFloat(check.style.width);
		$(document).ready(function(){
			$("td div#"+(step[nex].x*10+step[nex].y)).animate({height:'hide'},function(){check.appendChild(img);check.style.backgroundColor="white";});
		});
		$(document).ready(function(){
			$("td div#"+(step[nex].x*10+step[nex].y)).animate({height:'show'},function(){
				var p=document.getElementById("step");
				p.innerHTML="把"+step[nex].y+"放在第"+step[nex].x+"个位置";
				if(step[nex].x==n)
					{
						p=document.createElement("p");
						var parent=document.getElementById("explanation");
						parent.appendChild(p);
						p.style.float="left";
						for (i=1;i<=n;i++)
						{
							for (j=1;j<=n;j++)
							{
								if (document.getElementById(i*10+j).lastChild!=null)
								{
									p.innerHTML+=j;
								}
							}
						}
						p.innerHTML+="&nbsp&nbsp";
					}
				nex++;document.getElementById("next").disabled=false;});
		});
	}
	else
	{
		var check=document.getElementById(step[nex].x*10+step[nex].y);
		$(document).ready(function(){
			$("td div#"+(step[nex].x*10+step[nex].y)).animate({height:'hide'},function(){var img=check.lastChild;check.removeChild(img);check.style.backgroundColor="#FFB6C1";});
		});
		
		$(document).ready(function(){
			$("td div#"+(step[nex].x*10+step[nex].y)).animate({height:'show'},function(){var p=document.getElementById("step");
		p.innerHTML="把"+step[nex].y+"从第"+step[nex].x+"个位置拿起";nex++;document.getElementById("next").disabled=false;});
		});
	}
}
function backqueen(){
	nex--;
	if (nex<0)return;
	document.getElementById("back").disabled=true;
	if (step[nex].opr=="show")
	{
		var check=document.getElementById(step[nex].x*10+step[nex].y);
		$(document).ready(function(){
			$("td div#"+(step[nex].x*10+step[nex].y)).animate({height:'hide'},function(){var img=check.lastChild;check.removeChild(img);check.style.backgroundColor="#FFB6C1";});
		});
		$(document).ready(function(){
			$("td div#"+(step[nex].x*10+step[nex].y)).animate({height:'show'},function(){
				var p=document.getElementById("step");
				p.innerHTML="把"+step[nex].y+"放在第"+step[nex].x+"个位置";
				if(step[nex].x==n)
					{
						p=document.getElementById("explanation").lastChild;
						if (p!=null)
						{
							document.getElementById("explanation").removeChild(p);
						}
					}
				document.getElementById("back").disabled=false;
			});
		});
	}
	else
	{
		var check=document.getElementById(step[nex].x*10+step[nex].y);
		$(document).ready(function(){
			$("td div#"+(step[nex].x*10+step[nex].y)).animate({height:'hide'},function(){check.appendChild(img);check.style.backgroundColor="white";});
		});
		var img=document.createElement("img");
		img.setAttribute("src","crown.jpg");
		img.style.height=0.8*parseFloat(check.style.height);//obj.style.height是字符型的！
		img.style.width=0.8*parseFloat(check.style.width);
		img.style.marginTop=0.05*parseFloat(check.style.height);
		img.style.marginLeft=0.05*parseFloat(check.style.width);
		$(document).ready(function(){
			$("td div#"+(step[nex].x*10+step[nex].y)).animate({height:'show'},function(){document.getElementById("back").disabled=false;});
		});
	}
}
//八皇后
function createmaze(){
	n=document.getElementById("text-box").value;
	if (n==0||n==undefined)
		return;
	child=document.getElementById("Submit");
	parent=document.getElementById("list");
	parent.removeChild(child);
	var element=document.getElementById("container");
	var table=document.createElement("table");
	table.setAttribute("id","table");
	table.style.float="left";
	table.style.marginTop=element.offsetHeight*0.04;
	table.style.marginBottom=element.offsetHeight*0.04;
	for (i=0;i<=parseInt(n)+parseInt(1);i++)
	{
		var row=document.createElement("tr");
		for (j=0;j<=parseInt(n)+parseInt(1);j++)
		{
			var div=document.createElement("div");
			div.setAttribute("class","table");
			div.style.position="relative";
			div.style.height=element.offsetHeight*0.8/(parseInt(n)+2);
			div.style.width=div.style.height;
			div.setAttribute("id",i.toString()+j.toString());
			if (i!=0&&j!=0&&i!=n+1&&j!=n+1&&(i!=1||j!=1)&&(i!=n||j!=n))
				div.setAttribute("onclick","setmaze("+i+","+j+")");
			if (i==0||i==parseInt(n)+parseInt(1)||(j==0&&i!=1)||(j==parseInt(n)+parseInt(1)&&i!=n))
				div.style.backgroundColor="#FFB6C1";
			if (i==1&&j==0)
			{
				var img=document.createElement("img");
				img.setAttribute("src","arrow.jpg");
				img.style.height=0.8*parseFloat(div.style.height);//obj.style.height是字符型的！
				img.style.width=0.8*parseFloat(div.style.width);
				img.style.marginTop=0.05*parseFloat(div.style.height);
				img.style.marginLeft=0.05*parseFloat(div.style.width);
				div.appendChild(img);
			}
			if (i==n&&j==parseInt(n)+1)
			{
				var img=document.createElement("img");
				img.setAttribute("src","crown.jpg");
				img.style.height=0.8*parseFloat(div.style.height);//obj.style.height是字符型的！
				img.style.width=0.95*parseFloat(div.style.width);
				img.style.marginTop=0.05*parseFloat(div.style.height);
				img.style.marginLeft=0.05*parseFloat(div.style.width);
				div.appendChild(img);
			}
			var col=document.createElement("td");
			col.appendChild(div);
			row.appendChild(col);
		}
		table.appendChild(row);
	}
	element.appendChild(table);
	var ul=document.createElement("ul");
	ul.setAttribute("id","OK");
	var button=document.createElement("input");
	button.setAttribute("type","button");
	button.setAttribute("value","OK");
	button.setAttribute("id","OK");
	button.setAttribute("onclick","ready()");
	button.style.width="80";
	button.style.marginTop=element.offsetHeight*0.84;
	button.style.marginLeft="30";
	ul.appendChild(button);
	element.appendChild(ul);
	for (i=1;i<=n;i++)
	{
		maze[i]=new Array;
		for (j=1;j<=n;j++)
			maze[i][j]=0;
	}
	document.getElementById("play").disabled=true;
}
function setmaze(x,y){
	var target=document.getElementById(x.toString()+y.toString());
	var flag=document.getElementById("00");
	var pink=flag.style.backgroundColor;
	if (target.style.backgroundColor==pink)
	{
		target.style.backgroundColor="white";
		maze[x][y]=0;
	}
	else
	{
		target.style.backgroundColor="#FFB6C1";
		maze[x][y]=1;
	}
}
function ready(){
	length=step.length;
	flag=0;
	for (i=0;i<length;i++)
		step.pop();
	document.getElementById("play").disabled=false;
	dfsmaze(1,1);
}
function dfsmaze(x,y){
	var tmp={x:x,y:y,opr:'show'};
	step.push(tmp);
	maze[x][y]='@';
	if (x==n&&y==n)
	{
		flag=1;
		var target=document.getElementById('00');
		footprint=document.createElement("img");
		footprint.setAttribute("src","footprint.jpg");
		footprint.setAttribute("id","footprint");
		footprint.style.height=0.8*parseFloat(target.style.height);//obj.style.height是字符型的！
		footprint.style.width=0.8*parseFloat(target.style.width);
		footprint.style.marginTop=0.05*parseFloat(target.style.height);
		footprint.style.marginLeft=0.05*parseFloat(target.style.width);
		footprint.style.display="none";
		return;
	}
	if (x<n&&maze[x+1][y]==0&&flag==0)
	{
		dfsmaze(x+1,y);
		if (flag==0)
		{
			var tmp={x:x,y:y,opr:'recur'};
			step.push(tmp);
		}
	}
	if (y<n&&maze[x][y+1]==0&&flag==0)
	{
		dfsmaze(x,y+1);
		if (flag==0)
		{
			var tmp={x:x,y:y,opr:'recur'};
			step.push(tmp);
		}
	}
	if (x>1&&maze[x-1][y]==0&&flag==0)
	{
		dfsmaze(x-1,y);
		if (flag==0)
		{
			var tmp={x:x,y:y,opr:'recur'};
			step.push(tmp);
		}
	}
	if (y>1&&maze[x][y-1]==0&&flag==0)
	{
		dfsmaze(x,y-1);
		if (flag==0)
		{
			var tmp={x:x,y:y,opr:'recur'};
			step.push(tmp);
		}
	}
	if (flag==0)
	{
		var tmp={x:x,y:y,opr:'hide'};
		step.push(tmp);
		maze[x][y]=0;
	}
	if (x==1&&y==1&&flag==0)
	{
		alert("迷宫无解！");
		flag=1;
	}
	return;
}
function playmaze(a){
	nex=a;
	document.getElementById("play").disabled=true;
	document.getElementById("next").disabled=true;
	document.getElementById("back").disabled=true;
	if (stop==1)
	{
		document.getElementById("play").disabled=false;
		document.getElementById("stop").disabled=true;
		document.getElementById("next").disabled=false;
		document.getElementById("back").disabled=false;
		return;
	}
	if (a>=step.length)
		return;
	var target=document.getElementById(step[a].x.toString()+step[a].y.toString());
	if (step[a].opr=='show'||step[a].opr=='recur')
	{
		footprint.style.display='none';
		target.appendChild(footprint);
		target.style.backgroundColor="FFFFCC";
		$(document).ready(function(){
				$("td div#"+(step[a].x.toString()+step[a].y.toString())+" #footprint").fadeIn(500,function(){playmaze(parseInt(a)+1);});
		});
	}
	if (step[a].opr=='hide')
	{
		footprint.style.display='none';
		target.appendChild(footprint);
		target.style.backgroundColor="white";
		playmaze(parseInt(a)+1);
	}
}
function stopmaze(){//停不下来！！——用stop变量记录是否停止，跳出递归
	stop=1;
	var button=document.getElementById("play");
	button.setAttribute("onclick","continuemaze()");
}
function continuemaze(){
	stop=0;
	var button=document.getElementById("stop");
	button.disabled=false;
	playmaze(nex);
}
function nextmaze(){
	if (nex>=step.length||nex<0)
		return;
	document.getElementById("next").disabled=true;
	var button=document.getElementById("play");
	button.setAttribute("onclick","continuemaze()");
	var target=document.getElementById(step[nex].x.toString()+step[nex].y.toString());
	if (step[nex].opr=='show'||step[nex].opr=='recur')
	{
		footprint.style.display='none';
		target.appendChild(footprint);
		target.style.backgroundColor="FFFFCC";
		$(document).ready(function(){
				$("td div#"+(step[nex].x.toString()+step[nex].y.toString())+" #footprint").fadeIn(500,function(){document.getElementById("next").disabled=false;});
		});
	}
	else if (step[nex].opr=='hide')
	{
		if (nex<step.length-1)
		{
			footprint.style.display='none';
			target.style.backgroundColor="white";
			target=document.getElementById(step[nex+1].x.toString()+step[nex+1].y.toString());
			target.appendChild(footprint);
			$(document).ready(function(){
				$("td div#"+(step[nex+1].x.toString()+step[nex+1].y.toString())+" #footprint").fadeIn(500,function(){document.getElementById("next").disabled=false;});
			});
			nex++;
		}
	}
	nex++;
}
function backmaze(){
	//脚印问题可以通过改变opr的值为“recur”实现
	//if (step[nex-1].opr=='hide')nex--;用if判断是否会重复显示，如果不加if直接nex--，会导致两个show跳步
	var done=0;
	if (nex>0)
		nex--;
	if (nex>=step.length||nex<0)
		return;
	document.getElementById("back").disabled=true;
	var target=document.getElementById(step[nex].x.toString()+step[nex].y.toString());
	if (step[nex].opr=='show'||step[nex].opr=='recur')
	{
		done=1;
		footprint.style.display='none';
		if (step[nex].opr=='show')
			target.style.backgroundColor="white";
		if (nex>0)
		{
			target=document.getElementById(step[nex-1].x.toString()+step[nex-1].y.toString());
			target.appendChild(footprint);
			target.style.backgroundColor="FFFFCC";
			$(document).ready(function(){
					$("td div#"+(step[nex-1].x.toString()+step[nex-1].y.toString())+" #footprint").fadeIn(500,function(){document.getElementById("back").disabled=false;});
			});
			if (step[nex-1].opr=='hide')
				nex--;
		}
	}
	if (step[nex].opr=='hide'&&done==0)
	{
		footprint.style.display='none';
		target.appendChild(footprint);
		target.style.backgroundColor="FFFFCC";
		$(document).ready(function(){
				$("td div#"+(step[nex].x.toString()+step[nex].y.toString())+" #footprint").fadeIn(500,function(){document.getElementById("back").disabled=false;});
		});
	}
}
function startovermaze(){
	var i;
	var table=document.getElementById("table");
	var button=document.getElementById("OK");
	var parent=document.getElementById("container");
	parent.removeChild(table);
	parent.removeChild(button);
	var button=document.createElement("input");
	button.setAttribute("type","Submit");
	button.setAttribute("value","Submit");
	button.setAttribute("id","Submit");
	button.setAttribute("onclick","createmaze()");
	parent=document.getElementById("list");
	parent.appendChild(button);
	var box=document.getElementById("text-box");
	$(function(){
		$("#text-box").val("");
	});
	box.setAttribute("placeholder","n=");
	button=document.getElementById("play");
	button.setAttribute("onclick","playmaze(0)");
	var length=step.length;
	for (i=0;i<length;i++)
		step.pop();
	nex=0;
}