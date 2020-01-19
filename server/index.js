const express = require("express");
const app = express();
const mysql = require("mysql");

const cors = require("cors");

app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cc_one",
  multipleStatements: true
});

// 获取文章列表
app.get("/api/getarticlelist", (req, res, next) => {
  const sql = "SELECT * FROM article_list";
  connection.query(sql, (err, results) => {
    console.log(err);

    if (err) {
      return res.json({
        code: -1,
        message: "获取错误",
        affextedRows: 0
      });
    }
    res.json({
      code: 200,
      list: results,
      affextedRows: results.affextedRows
    });
  });
});

// 添加文章
app.post("/api/addarticle", (req, res, next) => {
  const sql = "INSERT INTO article_list SET ?";
  let addArticle = {
    article_name: req.body.name,
    article_desc: req.body.desc
  };
  connection.query(sql, addArticle, (err, results) => {
    console.log(err);

    if (err) {
      return res.json({
        code: -2,
        message: "添加失败",
        affextedRows: 0
      });
    }
    res.json({
      code: 200,
      data: results,
      affextedRows: results.affextedRows
    });
  });
});

// 删除文章
app.post("/api/deletearticle", (req, res, next) => {
  const sql = "DELETE FROM article_list WHERE article_id = ?";
  let deleteParams = req.body.id
  connection.query(sql,deleteParams, (err, results) => {
    console.log(err);

    if (err) {
      return res.json({
        code: -3,
        message: "删除失败",
        affextedRows: 0
      });
    }

    res.json({
      code: 200,
      data: results,
      affextedRows: results.affextedRows
    });
  });
});


app.post("/api/updatearticle",(req,res,next) => {
  const sql = "UPDATE article_list SET article_name = ?, article_desc = ? WHERE article_id = ? ";
  let updateParams = [
    req.body.name,
    req.body.desc,
    req.body.id
  ]
  connection.query(sql,updateParams,(err,results) =>{
    if(err){
      return res.json({
        code: -4,
        message: "修改失败",
        affextedRows: 0
      })
    }

    res.json({
      code: 200,
      data: results,
      affextedRows: results.affextedRows
    })
  })
})

app.listen(3001, () => {
  console.log("服务已启动", "http://localshost:3001");
});
