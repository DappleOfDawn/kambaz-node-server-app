import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  // quiz CRUD
  const createQuiz = async (req, res) => {
    const quiz = await dao.createQuiz(req.body);
    res.json(quiz);
  };
  const updateQuiz = async (req, res) => {
    const { qid } = req.params;
    const quizUpdates = req.body;
    const updatedQuiz = await dao.updateQuiz(qid, quizUpdates);
    res.json(updatedQuiz);
  };
  const deleteQuiz = async (req, res) => {
    const status = await dao.deleteQuiz(req.params.qid);
    res.json(status);
  };
  const findQuizById = async (req, res) => {
    const quiz = await dao.findQuizById(req.params.qid);
    res.json(quiz);
  };

  // quizzes
  app.post("/api/quizzes", createQuiz);
  app.put("/api/quizzes/:qid", updateQuiz);
  app.delete("/api/quizzes/:qid", deleteQuiz);
  app.get("/api/quizzes/:qid", findQuizById);
}