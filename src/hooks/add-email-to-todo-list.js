// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { method, data, params } = context;

    const user = params.user;

    // for seeding purposes
    if (!user) {
      return context;
    }

    // if the method is create, then add the owner to the list of invited emails
    if (method === 'create') {
      data.invitedEmails = [user.email];
    }

    return context;
  };
};
