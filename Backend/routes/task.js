const express = require("express");
const { validateToken } = require("../JWT");
const cookieParser = require("cookie-parser");
const {User , Task} = require("../model/user")

const jwt =require("../JWT")

const router = express.Router();
router.use(cookieParser());
router.use(validateToken);


const page = {
  1: "get-started",
  2: "research",
  3: "apply",
  4: "transcripts",
  5: "eng-proficiency",
  6: "testing",
  7: "accepted",
  8: "visa",
  9: "relocate",
  10: "tips"
};

router.get("/", validateToken, async(req, res) => {
  if (res.locals.authenticated) {
    console.log(req.jwtPayload)
    await Task.findAll({
      where: { userId: req.jwtPayload.id },
    })
    .then((tasks) => {
      if (!tasks) {
        return res.status(404).send("User not found");
      }
      res.render("task", { tasks });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error retrieving Tasks");
    });
  } else {
    res.redirect("login");
  }
});

router.get("/page/:id", validateToken, async(req, res) => {

  if (res.locals.authenticated) {
    const tasks = await Task.findAll({
      where: { userId: req.jwtPayload.id },
    });

    if (!tasks) {
      return res.status(404).send("User not found");
    }
      
    const task_id = req.params.id;

    const viewName = page[task_id.toString()];
    if (!viewName) {
      return res.status(404).send("Page not found");
    }

    const one_task = await Task.findOne({
      where: { page_number: parseInt(task_id), userId: req.jwtPayload.id },
    });

    if (!one_task) {
      return res.status(404).send("Task not found");
    }

    console.log(one_task)
    
    const complete = one_task.visited;

    res.render(viewName, { tasks, task_id, complete });
 
  } else {
    res.redirect("login");
  }
});


router.get("/complete/:id", validateToken, async(req, res) => {
  if (res.locals.authenticated) {
    try {
      var task = await Task.findOne({
        where: { page_number: req.params.id, userId: req.jwtPayload.id }
      });
      if (!task) {
        res.send('Task not found');
      }
      
      if (task.visited){
        const updatedTask = await task.update({
          visited: false
        });
      }else{
        const updatedTask = await task.update({
          visited: true
        });
      }
  
      res.redirect("/task/page/"+req.params.id);
    } catch (error) {
      console.log(error);
    }
  }else{
    res.redirect("login");
  }
  });

module.exports = router;
