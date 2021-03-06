import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import "/imports/api/StaffCollection";
import "/imports/api/DepartmentCollection";
import "/imports/api/PositionsCollection";
import "/imports/api/ClientsCardCollection";

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish("allUsers", function() {
    return Meteor.users.find({});
  });

  Meteor.publish("allClients", function() {
    return Roles.getUsersInRole("client");
  });

  Meteor.publish("allRoles", function() {
    return Meteor.roles.find({});
  });

  if (Meteor.users.find().count() === 0) {
    let cResult = Accounts.createUser({
      username: "admin",
      email: "tejas.er@gmail.com",
      password: "st@yTru3",
      profile: {
        first_name: "Tejas",
        last_name: "Pancholi",
        clinic: "Data Science"
      }
    });
    Roles.addUsersToRoles(cResult, "admin");
  }
  Meteor.methods({
    "users.add": function(newUser) {
      let cResult = Accounts.createUser({
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        profile: {
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          clinic: newUser.clinic
        }
      });
      for (var index in newUser.roles) {
        Roles.addUsersToRoles(cResult, newUser.roles[index].label);
      }
      return true;
    },
    "users.addRole": function(userId, newRole) {
      Roles.addUsersToRoles(userId, newRole);
      return true;
    }
  });
});
