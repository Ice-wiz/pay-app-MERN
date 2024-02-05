const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db.js");


const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = Account.findOne({
    userId: req.userId,
  });
  res
    .json({
      balance: account.balance,
    })
    .status(200);
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  //fetching accounts in within transactions
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();
  res.json({
    message: "transfer successful",
  });
});

module.exports = router;
