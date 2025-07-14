const { db } = require("../config/firebase.config");

class BoardService {
  static getAll = async () => {
    const boardRes = await db.collection("boards").get();
    const boards = boardRes.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return boards;
  };

  static create = async (payload) => {
    const boardRef = await db.collection("boards").add(payload);

    const queryData = await boardRef.get();

    const newBoard = {
      id: queryData.id,
      ...queryData.data(),
    };

    return newBoard;
  };
}

module.exports = BoardService;
