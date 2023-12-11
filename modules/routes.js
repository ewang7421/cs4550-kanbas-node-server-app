import db from "../Database/index.js";
function ModuleRoutes(app) {
  app.put("/api/modules/:mid", (req, res) => {
    const mid = req.params.mid;
    const moduleIndex = db.modules.findIndex((m) => m._id.$oid === mid);
    db.modules[moduleIndex] = {
      ...db.modules[moduleIndex],
      ...req.body,
    };
    res.sendStatus(204);
  });

  app.delete("/api/modules/:mid", (req, res) => {
    const mid = req.params.mid;
    db.modules = db.modules.filter((m) => m._id.$oid !== mid);
    res.sendStatus(200);
  });

  app.post("/api/courses/:cid/modules", (req, res) => {
    const cid = req.params.cid;
    const newModule = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.modules.push(newModule);
    res.send(newModule);
  });

  app.get("/api/courses/:cid/modules", (req, res) => {
    const cid = req.params.cid;
    const modules = db.modules.filter((m) => m.course === cid);
    res.send(modules);
  });
}
export default ModuleRoutes;
