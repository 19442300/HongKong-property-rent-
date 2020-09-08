/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  sails.bcrypt = require('bcryptjs');
  const saltRounds = 10;
  /*
   await Estate.createEach([
     {
       PropertyTitle: "沙田第一城 套3房翻新",
       estate: "City One Shatin",
       GrossArea: 300,
       rent: 29000,
       ImageURL: "https://pic4.zhimg.com/80/v2-4882c57e81a1abc2e8b98004e7518cc7_hd.jpg",
       bedrooms: 3,
       ExpectedTenants: 5,
       HighlightedProperty: true,
       Created: "2019-10-8",
       Updated: "2019-11-8"
     },
     {
       PropertyTitle: "旺角上海街",
       estate: "Tin Ma Court",
       GrossArea: 200,
       rent: 19000,
       ImageURL: "http://tc.homates.com/Flat/hk/204/flat_20160430233832_5724d17827eb1.jpg",
       bedrooms: 2,
       ExpectedTenants: 4,
       HighlightedProperty: true,
       Created: "2019-10-8",
       Updated: "2019-11-7"
     },
     {
       PropertyTitle: "貝沙灣",
       estate: "Tin Ma Court",
       GrossArea: 250,
       rent: 31000,
       ImageURL: "http://s9.rr.itc.cn/r/wapChange/20171_3_22/a6hrsl4371136429619.jpeg",
       bedrooms: 3,
       ExpectedTenants: 4,
       HighlightedProperty: true,
       Created: "2019-10-8",
       Updated: "2019-11-8"
     },
     {
       PropertyTitle: "黄埔花园",
       estate: "Tin Ma Court",
       GrossArea: 200,
       rent: 19000,
       ImageURL: "http://tc.homates.com/Flat/hk/204/flat_20160430233832_5724d17827eb1.jpg",
       bedrooms: 2,
       ExpectedTenants: 4,
       HighlightedProperty: true,
       Created: "2019-10-8",
       Updated: "2019-11-7"
     },
 
     // etc.
   ]);
 
   const hash = await sails.bcrypt.hash('123456', saltRounds);
   await User.createEach([
     { username: "admin", password: hash, role: 'admin' },
     { username: "client1", password: hash, role: 'client' },
     { username: "client2", password: hash, role: 'client' },
     { username: "user1", password: hash, role: 'visitor' },
 
     // etc.
   ]);
 
   const estate1 = await Estate.findOne({ id: 1 });
   const estate2 = await Estate.findOne({ id: 2 });
   const client1 = await User.findOne({ username: "client1" });
   const client2 = await User.findOne({ username: "client2" });
 
   await User.addToCollection(client1.id, 'rent').members(estate1.id);
   await User.addToCollection(client2.id, 'rent').members(estate2.id);
   */
  return;

};
