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
        route: function(){
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

// var User_Pages = db.define('user_pages', {
//     page_id:{
//         type: Sequelize.INTEGER, allowNull: false
//     },
//     user_id: {
//         type: Sequelize.INTEGER, allowNull: false
//     }

// });

module.exports = {
  Page: Page,
  User: User,
  // User_Pages: User_Pages
};
