
//创建http请求
var express = require("express")
var it = express()
//动态数据获取
var expressStatic = require("express-static")
//模板整合工具
//第三方链接数据库
var mysql = require("mysql")
var fs = require("fs")

//1-配置数据库参数
var db = mysql.createConnection({
	host:"localhost",		//数据库走的地址
	user:"root",  		 //数据库账号
	password:"!fzt18220908313",
	database:"user" //数据库表的名字
})

//2-链接数据库	
db.connect()

//录取数据库
// fs.readFile ("./web/gameList.json",function(error,data){
// 	 var data =  JSON.parse(data)
// 	 var data = data.result
// 	 for(var i=0;i<data.length;i++){
// 	 	var id = data[i].id
// 	 	var img = data[i].companyLogo
// 	 	var titile = data[i].companyFullName
// 	 	var positionName =data[i].positionName
// 	 	var money = data[i].salary
// 	 	var Time = data[i].createTime
// 	 	db.query("INSERT INTO lagou (id,img,titile,Name,money,Time) value ('"+id+"','"+img+"','"+titile+"','"+positionName+"','"+money+"','"+Time+"')",function(error,data){
// 			var data = JSON.stringify(data)
// 			if(error)
// 				console.log(error)
// 			else{
// 				console.log(data)//返回ok插入成功
// 			}
// 		})
// 	 }
// }) 


it.get("/",function(request,response){
	var data = String(fs.readFileSync("./route.html"))
	response.send(data)
})
it.get("/123",function(request,response){
	console.log(request.query)
	//读取数据
	if((request.query.callock) == "fn"){
		db.query("SELECT * FROM lagou",function(error,dd){
			if(error)
				console.log(error)
			else{
				console.log("拿到数据了")
				response.send(dd)
			}
		})	
	}
	else{
		console.log("不给数据")
	}
})


it.use(expressStatic("./web"))
//监听
it.listen(55777)
