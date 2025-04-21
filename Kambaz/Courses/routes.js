import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as quizDao from "../Quizzes/dao.js";

export default function CourseRoutes(app) {
  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  };

  // CRUD course
  const createCourse = async (req, res) => {
    const course = await dao.createCourse(req.body);
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id, "CREATED");
    }
    res.json(course);
  };
  const deleteCourse = async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  };
  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  };

  // modules
  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  };
  const createModule = async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await modulesDao.createModule(module);
    res.send(newModule);
  };

  // users
  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };

  // assignments
  const findAssignmentsForCourse = async (req, res) => {
    const { cid } = req.params;
    const assignments = await assignmentsDao.findAssignmentsForCourse(cid);
    res.json(assignments);
  };
  const findAssignmentById = async (req, res) => {
    const { aid } = req.params;
    const assignment = await assignmentsDao.findAssignmentById(aid);
    res.json(assignment);
  };
  const createAssignment = async (req, res) => {
    const { cid } = req.params;
    const assignment = {
      course: cid,
    };
    const newAssignment = await assignmentsDao.createAssignment(assignment);
    res.json(newAssignment);
  };
  const deleteAssignment = async (req, res) => {
    const { aid } = req.params;
    const status = await assignmentsDao.deleteAssignment(aid);
    res.send(status);
  };
  const updateAssignment = async (req, res) => {
    const { aid } = req.params;
    const updates = req.body;
    const status = await assignmentsDao.updateAssignment(aid, updates);
    res.send(status);
  };

  // quizzes
  const findQuizzesForCourse = async (req, res) => {
    const quizzes = await quizDao.findQuizzesForCourse(req.params.cid);
    res.json(quizzes);
  };
  
  // crud
  app.get("/api/courses", findAllCourses);
  app.post("/api/courses", createCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
  // modules
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModule);
  // users
  app.get("/api/courses/:cid/users", findUsersForCourse);
  // assignments
  app.get("/api/courses/:cid/assignments", findAssignmentsForCourse);
  app.get("/api/courses/:cid/assignments/:aid", findAssignmentById);
  app.post("/api/courses/:cid/assignments", createAssignment);
  app.delete("/api/courses/:cid/assignments/:aid", deleteAssignment);
  app.put("/api/courses/:cid/assignments/:aid", updateAssignment);
  // quizzes
  app.get("/api/courses/:cid/quizzes", findQuizzesForCourse);
}
