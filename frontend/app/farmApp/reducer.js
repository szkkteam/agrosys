import schema from './schema'

function entitiesReducer(state = schema.getEmptyState(), action) {
    let session;
  
    // pass the state, action and session to the actual reducers
    switch (true) {
      // COURSES
      case Object.values(COURSE_ACTIONS).includes(action.type):
        session = schema.session(state);
        handleCourseActions(state, action, session);
        break;
      // OUTCOMES
      case Object.values(OUTCOME_ACTIONS).includes(action.type):
        session = schema.session(state);
        handleOutcomeActions(state, action, session);
        break;
      // WORK_ACTIVITIES
      case Object.values(WORK_ACTIVITY_ACTIONS).includes(action.type):
        session = schema.session(state);
        handleWorkActivityActions(state, action, session);
        break;
      // DWAS
      case Object.values(DWA_ACTIONS).includes(action.type):
        session = schema.session(state);
        handleDwaActions(state, action, session);
        break;
    }
  
    // Finally, return state either the default or the updated session.state
    return session ? session.state : state;
  }

  export default entitiesReducer