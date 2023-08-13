app.post("/books", (req, res) => {
    const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM books WHERE id = ? ";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });


  app.post('/comment', function(req, res) {
    const post_id = req.body.post_id;
  
    const comment = 'SELECT * FROM comment WHERE post_id = ?';
  
    db.query(comment,post_id,(err,comment)=>{
      if(err) throw err;
      if(comment.length >0){
        res.json({
          comment
        });
        console.log(comm)
      }else{
          res.json({
            "user": {},
            "error": "400",
            "message": "Wrong credentials"
          });
          console.log(results);
      }
  });
  });
  
  app.post("/likeupdate", (req, res) => {
    //Uer Inputs
    const post_id = req.body.post_id;
    const user_id = req.body.user_id;
  
    //SQl Query's
    const isliked = "select is_liked from likes where post_id = ? and user_id = ?"   
    const getlike = 'select likes from post where post_id= ?';
    const postlikeUpdate = 'UPDATE post SET likes = ? WHERE post_id = ?';
    const updateLiker = 'UPDATE likes SET is_liked = ? WHERE post_id = ? and user_id=?';
    const insertliker = "insert into likes values('',?,?,1)";
    
    db.query(isliked,[post_id,user_id],(err,isliked)=>{
        if(!err){
          if(isliked.length>0){
           if(isliked[0].is_liked == 0){
            getlikes((like)=>{
              const likes = like+1;
              updatelike(likes,(result)=>{
                if(result>0){
                  updateliker(1,(results)=>{
                    if(results>0){
                      res.json({message: "Liked"});
                    }
                });
                }
              })
            });
           }else{
            getlikes((like)=>{
              const likes = like - 1;
              updatelike(likes,(result)=>{
                if(result>0){
                  updateliker(0,(results)=>{
                      if(results>0){
                        res.json({message: "Un Liked"});
                      }
                  });
                }
              });
            });
           }
        }else{
          getlikes((like)=>{
            const likes = like+1;
            updatelike(likes,(result)=>{
              if(result>0){
                insertlikers((insert)=>{
                    if(insert>0){
                      res.json({message: "Liked"});
                    }
                  });
              }
            });
          });
        }
        }
    });
  
  const insertlikers = (insert)=>{
    db.query(insertliker,[post_id,user_id],(err,likes)=>{
      if(!err){
        if(likes.affectedRows>0){
          insert(likes.affectedRows);
        }else{
          insert(likes.affectedRows);
        }
      }else{
         console.log(err)
      }
    });
  }
  
  const updatelike = (likeval,updatelike)=>{
      db.query(postlikeUpdate,[likeval,post_id],(err,Updatevalue)=>{
        if(!err){
          if(Updatevalue.affectedRows > 0){
            updatelike(Updatevalue.affectedRows);
        }
        }else{
          res.json({message: err});
        }
    });
  }
  
  const updateliker = (val,liker)=>{
    db.query(updateLiker,[val,post_id,user_id],(err,result)=>{
      if(!err){
        if(result.affectedRows>0){
          liker(result.affectedRows);
        }
      }
    });
  }
  
  const getlikes = (likes)=>{
     db.query(getlike,post_id,(err,likeValue)=>{
          likeval = likeValue[0].likes;
          likes(likeval);
      });
  }
  });
  