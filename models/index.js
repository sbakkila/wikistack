var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING, allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING, allowNull: false,
        get: function(){
          var route = this.getDataValue('urltitle');
          return '/wiki/' + route;
        }
    },
    content: {
        type: Sequelize.TEXT, allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
       type: Sequelize.DATE,
       defaultValue: Sequelize.NOW
   }

});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING, allowNull: false
    },
    email: {
        type: Sequelize.STRING, isEmail: true, allowNull: false
    }
});

module.exports = {
  Page: Page,
  User: User
};