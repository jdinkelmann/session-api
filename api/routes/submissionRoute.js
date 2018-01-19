'use strict';
module.exports = function(app) {
  var submissions = require('../controllers/submissionController');

  // todoList Routes
  app.route('/sessions')
    .get(submissions.list_all_tasks);


  app.route('/sessions/:sessionId')
    .get(submissions.read_a_task);
};
