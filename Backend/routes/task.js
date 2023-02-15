const express = require("express");
const { validateToken } = require("../JWT");
const cookieParser = require("cookie-parser");
const {User , Task} = require("../model/user")

const jwt =require("../JWT")

const router = express.Router();
router.use(cookieParser());
router.use(validateToken);


const page_list = {
  task1: "get-started",
  task2: "research",
  task3: "apply",
  task4: "transcripts",
  task5: "eng-proficiency",
  task6: "testing",
  task7: "accepted",
  task8: "visa",
  task9: "relocate",
  task10: "tips"
};

router.get("/get-started", validateToken, async(req, res) => {
  if (res.locals.authenticated) {
    await Task.findOne({
      where: { userId: req.jwtPayload.id },
    })
    .then((tasks) => {
      if (!tasks) {
        return res.status(404).send("User not found");
      }
      res.render("get-started", { tasks });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error retrieving Tasks");
    });
  } else {
    res.redirect("login");
  }
});

router.get("/research", validateToken, async(req, res) => {
  if (res.locals.authenticated) {
    await Task.findOne({
      where: { userId: req.jwtPayload.id },
    })
    .then((tasks) => {
      if (!tasks) {
        return res.status(404).send("User not found");
      }
      res.render("research", { tasks });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error retrieving Tasks");
    });
  } else {
    res.redirect("login");
  }
});
router.get("/apply", validateToken, async(req, res) => {
  if (res.locals.authenticated) {
    await Task.findOne({
      where: { userId: req.jwtPayload.id },
    })
    .then((tasks) => {
      if (!tasks) {
        return res.status(404).send("User not found");
      }
      res.render("apply", { tasks });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error retrieving Tasks");
    });
  } else {
    res.redirect("login");
  }
});

router.get("/transcripts", validateToken, async(req, res) => {
  if (res.locals.authenticated) {
    await Task.findOne({
      where: { userId: req.jwtPayload.id },
    })
    .then((tasks) => {
      if (!tasks) {
        return res.status(404).send("User not found");
      }
      res.render("transcripts", { tasks });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error retrieving Tasks");
    });
  } else {
    res.redirect("login");
  }
});

router.get("/eng-proficiency", validateToken, async(req, res) => {
  if (res.locals.authenticated) {
    await Task.findOne({
      where: { userId: req.jwtPayload.id },
    })
    .then((tasks) => {
      if (!tasks) {
        return res.status(404).send("User not found");
      }
      res.render("eng-proficiency", { tasks });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error retrieving Tasks");
    });
  } else {
    res.redirect("login");
  }
});

router.get("/testing", validateToken, async(req, res) => {
  if (res.locals.authenticated) {
    await Task.findOne({
      where: { userId: req.jwtPayload.id },
    })
    .then((tasks) => {
      if (!tasks) {
        return res.status(404).send("User not found");
      }
      res.render("testing", { tasks });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error retrieving Tasks");
    });
  } else {
    res.redirect("login");
  }
});

router.get("/accepted", validateToken, async(req, res) => {
  if (res.locals.authenticated) {
    await Task.findOne({
      where: { userId: req.jwtPayload.id },
    })
    .then((tasks) => {
      if (!tasks) {
        return res.status(404).send("User not found");
      }
      res.render("accepted", { tasks });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error retrieving Tasks");
    });
  } else {
    res.redirect("login");
  }
});

router.get("/visa", validateToken, async(req, res) => {
  if (res.locals.authenticated) {
    await Task.findOne({
      where: { userId: req.jwtPayload.id },
    })
    .then((tasks) => {
      if (!tasks) {
        return res.status(404).send("User not found");
      }
      res.render("visa", { tasks });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error retrieving Tasks");
    });
  } else {
    res.redirect("login");
  }
});

router.get("/relocate", validateToken, async(req, res) => {
  if (res.locals.authenticated) {
    await Task.findOne({
      where: { userId: req.jwtPayload.id },
    })
    .then((tasks) => {
      if (!tasks) {
        return res.status(404).send("User not found");
      }
      res.render("relocate", { tasks });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error retrieving Tasks");
    });
  } else {
    res.redirect("login");
  }
});

router.get("/tips", validateToken, async(req, res) => {
  if (res.locals.authenticated) {
    await Task.findOne({
      where: { userId: req.jwtPayload.id },
    })
    .then((tasks) => {
      if (!tasks) {
        return res.status(404).send("User not found");
      }
      res.render("tips", { tasks });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error retrieving Tasks");
    });
  } else {
    res.redirect("login");
  }
});

router.get("/", validateToken, async(req, res) => {
  if (res.locals.authenticated) {
    await Task.findOne({
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

// router.get("/page/:id", validateToken, async(req, res) => {

//   if (res.locals.authenticated) {
//     const tasks = await Task.findAll({
//       where: { userId: req.jwtPayload.id },
//     });

//     if (!tasks) {
//       return res.status(404).send("User not found");
//     }
      
//     const task_id = req.params.id;

//     const viewName = page[task_id.toString()];
//     if (!viewName) {
//       return res.status(404).send("Page not found");
//     }

//     const one_task = await Task.findOne({
//       where: { page_number: parseInt(task_id), userId: req.jwtPayload.id },
//     });

//     if (!one_task) {
//       return res.status(404).send("Task not found");
//     }

//     console.log(one_task)
    
//     const complete = one_task.visited;

//     res.render(viewName, { tasks, task_id, complete });
 
//   } else {
//     res.redirect("login");
//   }
// });

router.get("/complete/:page", validateToken, async(req, res) => {
  if (res.locals.authenticated) {
    try {
      var task = await Task.findOne({
        where: { userId: req.jwtPayload.id }
      });
      if (!task) {
        res.send('Task not found');
      }
      const page = req.params.page
      const viewName = page_list[page.toString()];
      console.log(page)
      if (task[page]){
        await Task.update({[page]:false },{
          where: { userId: req.jwtPayload.id }
        }).then()
      }else{
        await Task.update({[page]:true },{
          where: { userId: req.jwtPayload.id }
        }).then()
      }
      console.log(viewName)
      res.redirect("/task/"+viewName);
    } catch (error) {
      console.log(error);
    }
  }else{
    res.redirect("login");
  }
  });

module.exports = router;
