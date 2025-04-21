import * as quizDao from "./dao.js";
import * as questionDao from "./Questions/dao.js";
import * as submissionDao from "./Submissions/dao.js";


export default function QuizRoutes(app) {
  // quiz CRUD
  const createQuiz = async (req, res) => {
    const quiz = await quizDao.createQuiz(req.body);
    res.json(quiz);
  };
  const updateQuiz = async (req, res) => {
    const { qid } = req.params;
    const quizUpdates = req.body;
    const status = await quizDao.updateQuiz(qid, quizUpdates);
    res.json(status);
  };
  const deleteQuiz = async (req, res) => {
    const status = await quizDao.deleteQuiz(req.params.qid);
    res.json(status);
  };
  const findQuizById = async (req, res) => {
    const quiz = await quizDao.findQuizById(req.params.qid);
    res.json(quiz);
  };

  // question CRUD
  const createQuestion = async (req, res) => {
    const question = await questionDao.createQuestion(req.body);
    res.json(question);
  };
  const updateQuestion = async (req, res) => {
    const { qid, questionId } = req.params;
    const questionUpdates = req.body;
    const status = await questionDao.updateQuestion(questionId, questionUpdates);
    res.json(status);
  };
  const deleteQuestion = async (req, res) => {
    const status = await questionDao.deleteQuestion(req.params.questionId);
    res.json(status);
  };
  const findQuestionsForQuiz = async (req, res) => {
    const questions = await questionDao.findQuestionsForQuiz(req.params.qid);
    res.json(questions);
  }

  //submission CRUD
  const createSubmission = async (req, res) => {
    const submission = await submissionDao.createSubmission(req.body);
    res.json(submission);
  };
  const updateSubmission = async (req, res) => {
    const { sid } = req.params;
    const submissionUpdates = req.body;
    const status = await submissionDao.updateSubmission(sid, submissionUpdates);
    res.json(status);
  };
  const deleteSubmission = async (req, res) => {
    const status = await submissionDao.deleteSubmission(req.params.sid);
    res.json(status);
  };
  const findRecentScoreForQuiz = async (req, res) => {
    const { qid, uid } = req.params;
    const score = await submissionDao.findRecentScoreForQuiz(uid, qid);
    res.json(score);
  }

  // quizzes
  app.post("/api/quizzes", createQuiz);
  app.put("/api/quizzes/:qid", updateQuiz);
  app.delete("/api/quizzes/:qid", deleteQuiz);
  app.get("/api/quizzes/:qid", findQuizById);
  // questions
  app.post("/api/quizzes/:qid/questions", createQuestion);
  app.put("/api/quizzes/:qid/questions/:questionId", updateQuestion);
  app.delete("/api/quizzes/:qid/questions/:questionId", deleteQuestion);
  app.get("/api/quizzes/:qid/questions", findQuestionsForQuiz);
  // submissions
  app.post("/api/quizzes/:qid/submissions", createSubmission);
  app.put("/api/quizzes/:qid/submissions/:sid", updateSubmission);
  app.delete("/api/quizzes/:qid/submissions/:sid", deleteSubmission);
  app.get("/api/quizzes/:qid/users/:uid", findRecentScoreForQuiz);
}