const db = require('../db/models');

db.chatsToUsers.belongsTo(db.users, { foreignKey: 'userId' });

class ChatMiddleware {
  async setNewMemberToChat({ userId, chatId }) {
    return db.chatsToUsers.create({
      chatId,
      userId,
    });
  }

  async checkIfUserExitInChat({ userId, chatId }) {
    return db.chatsToUsers.findOne({
      where: {
        chatId: chatId,
        userId: userId,
      }
    })
  }

  async removeMemberFromChat({ userId, chatId }) {
    return db.chatsToUsers.destroy({
      where: {
        chatId: chatId,
        userId: userId,
      }
    });
  }

  async getAllMembersByChat(chatId) {
    return db.chatsToUsers.findAll({
      attributes: [],
      include: [
        {
          model: db.users,
          attributes: ['nick', 'id']
        },
      ],
      where: {
        chatId: chatId,
      }
    });
  }
}

module.exports = new ChatMiddleware();