
var rafi = {
    id: 1,
    first_name: "Rafi",
    last_name: "Khan",
    picture_url: ""
  },
  gabe = {
    id: 2,
    first_name: "Gabe",
    last_name: "Boning",
    picture_url: ""
  },
  ben = {
    id: 3,
    first_name: "Ben",
    last_name: "Penchas",
    picture_url: ""
  },
  allie = {
    id: 4,
    first_name: "Allie",
    last_name: "Ivener",
    picture_url: ""
  }

var ME = rafi;

var ALL_BRUS = [rafi, gabe, ben, allie];

var ALL_PROPS = [
  {
    id: 1,
    text: "You're so thoughtful with your help to our students",
    receiver: allie,
    sender: rafi,
    positivity_score: 0.3
  },
  {
    id: 2,
    text: "I admire your sense of adventure",
    receiver: ben,
    sender: allie,
    positivity_score: 0.4
  },
  {
    id: 3,
    text: "Your climbing skills are unreal",
    receiver: gabe,
    sender: ben,
    positivity_score: 0.35
  }
]