// A constructor gives every pet its own stats and rotation counters.
function Pet(name, species) {
  this.name = name;
  this.defaultName = name;
  this.species = species;
  this.weight = 8;
  this.happiness = 12;
  this.treatIndex = 0;
  this.outfitIndex = 0;
}

var pets = [new Pet("Muffin", "cat")];
var pet_info = pets[0]; // The starter code’s object always points to the active pet.
var activePetIndex = 0;
var maxFriends = 4;
var butterflyReady = false;

var treats = [
  { pose: ".treat-pose", message: "Crunch, crunch! Got any more?" },
  { pose: ".squeeze-pose", message: "A squeeze treat! My favorite." }
];

var outfits = [
  { pose: ".formal-pose", message: "Looking fancy in my sunglasses!" },
  { pose: ".office-pose", message: "Pink tie on. Is it time for the cat meeting?" },
  { pose: ".weekend-pose", message: "Sunglasses up. I’m off duty." },
  { pose: ".music-pose", message: "I take requests. Payment in treats, please." },
  { pose: ".bee-pose", message: "Bzz! I’m a bumblebee." }
];

// Wait until the HTML is ready before connecting the buttons.
$(function () {
  checkAndUpdatePetInfoInHtml();
  $(".treat-button").click(clickedTreatButton);
  $(".play-button").click(clickedPlayButton);
  $(".exercise-button").click(clickedExerciseButton);
  $(".nap-button").click(clickedNapButton);
  $(".walk-button").click(clickedWalkButton);
  $(".dress-button").click(clickedDressButton);
  $(".catch-button").click(clickedCatchButton);
  $(".add-friend-button").click(toggleFriendForm);
  document.querySelector(".name-form").addEventListener("submit", setPetName);
  document.querySelector(".friend-form").addEventListener("submit", addFriend);
  document.getElementById("active-pet").addEventListener("change", selectPet);

  document.querySelectorAll(".pet-image").forEach(function (image) {
    image.dataset.catSource = image.getAttribute("src");
  });
  $(".reset-button").click(clickedResetButton);
  $(".sound-toggle").click(function () {
    if (!this.checked) {
      document.getElementById("muffin-sound").pause();
    }
  });
});

function clickedTreatButton() {
  pet_info.happiness += 3;
  pet_info.weight += 1;
  checkAndUpdatePetInfoInHtml();
  var treat = treats[pet_info.treatIndex];
  if (pet_info.treatIndex === 1 && pet_info.species !== "cat") {
    showReaction(treat.pose, "Another biscuit! Thanks!", "treat");
  } else {
    showReaction(treat.pose, treat.message, "treat");
  }
  // The remainder brings the index back to zero after the last choice.
  pet_info.treatIndex = (pet_info.treatIndex + 1) % treats.length;
}

function clickedPlayButton() {
  pet_info.happiness += 4;
  pet_info.weight -= 1;
  checkAndUpdatePetInfoInHtml();
  if (pet_info.species === "dog") {
    showReaction(".play-pose", pets[0].name + " and " + pet_info.name + " are having a playful tussle!", "play");
    return;
  }

  var message = "Help me catch the butterfly! Click it!";
  if (activePetIndex > 0) {
    message = pets[0].name + " and " + pet_info.name + " are chasing the butterfly! Click it!";
  }
  showReaction(".play-pose", message, "play");
  butterflyReady = true;
  document.querySelector(".catch-button").focus();
}

function clickedExerciseButton() {
  pet_info.happiness -= 2;
  pet_info.weight -= 2;
  checkAndUpdatePetInfoInHtml();
  showReaction(".exercise-pose", "Big stretch! Can I lie down now?", "exercise");
}

function clickedNapButton() {
  pet_info.happiness += 2;
  checkAndUpdatePetInfoInHtml();
  var message = "Zzz… this couch is mine.";
  if (activePetIndex > 0) {
    message = pets[0].name + " and " + pet_info.name + " fell asleep side by side.";
  }
  showReaction(".nap-pose", message, "nap");
}

function clickedWalkButton() {
  pet_info.happiness -= 2;
  pet_info.weight -= 2;
  checkAndUpdatePetInfoInHtml();
  showReaction(".walk-pose", "Let’s take the garden path!", "exercise");
}

function clickedDressButton() {
  pet_info.happiness += 2;
  checkAndUpdatePetInfoInHtml();
  var outfit = outfits[pet_info.outfitIndex];
  showReaction(outfit.pose, outfit.message, "dress");
  pet_info.outfitIndex = (pet_info.outfitIndex + 1) % outfits.length;
}

function clickedCatchButton() {
  if (butterflyReady) {
    pet_info.happiness += 1;
    checkAndUpdatePetInfoInHtml();
    showReaction(".caught-pose", "We caught it! One extra happiness point.", "play");
    document.querySelector(".play-button").focus();
  }
}

function setPetName(event) {
  event.preventDefault();
  var input = document.getElementById("pet-name");
  pet_info.name = input.value.trim() || pet_info.defaultName;
  input.value = pet_info.name;
  document.getElementById("active-pet").options[activePetIndex].textContent = petLabel(pet_info);
  checkAndUpdatePetInfoInHtml();
}

function petLabel(pet) {
  var animals = { cat: "Cat", tabby: "Brown tabby", dog: "Dog" };
  return pet.name + " · " + animals[pet.species];
}

function toggleFriendForm() {
  var form = document.querySelector(".friend-form");
  form.hidden = !form.hidden;
  this.setAttribute("aria-expanded", String(!form.hidden));
  if (!form.hidden && pets.length - 1 < maxFriends) {
    document.getElementById("friend-name").focus();
  }
}

function addFriend(event) {
  event.preventDefault();
  var friendCount = pets.length - 1;
  if (friendCount >= maxFriends) {
    return;
  }

  var input = document.getElementById("friend-name");
  var name = input.value.trim();
  if (name === "") {
    input.value = "";
    input.reportValidity();
    return;
  }

  var species = document.getElementById("friend-type").value;
  var friend = new Pet(name, species);
  pets.push(friend);

  var picker = document.getElementById("active-pet");
  var option = document.createElement("option");
  option.value = pets.length - 1;
  option.textContent = petLabel(friend);
  picker.appendChild(option);
  picker.value = option.value;
  input.value = "";
  selectPet();

  closeFriendForm();
  updateFriendCount();
  picker.focus();
}

function closeFriendForm() {
  document.querySelector(".friend-form").hidden = true;
  document.querySelector(".add-friend-button").setAttribute("aria-expanded", "false");
}

function updateFriendCount() {
  var friendCount = pets.length - 1;
  var full = friendCount >= maxFriends;
  $(".friend-count").text(full ? "All 4 friend spots are filled." : friendCount + " of " + maxFriends + " friends added");
  document.querySelector(".friend-form button").disabled = full;
}

function selectPet() {
  activePetIndex = Number(document.getElementById("active-pet").value);
  pet_info = pets[activePetIndex];
  document.getElementById("pet-name").value = pet_info.name;
  updatePetArtwork();
  checkAndUpdatePetInfoInHtml();
  showIdlePose();
}

function updatePetArtwork() {
  var habitat = document.querySelector(".pet-image-container");
  habitat.dataset.species = pet_info.species;
  habitat.dataset.hasFriend = String(activePetIndex > 0);
  var animal = pet_info.species;
  document.querySelectorAll(".pet-image").forEach(function (image) {
    if (animal === "dog" || animal === "tabby") {
      image.src = "images/" + animal + "-" + image.dataset.friendPose + ".webp";
    } else {
      image.src = image.dataset.catSource;
    }
  });
}

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

function checkWeightAndHappinessBeforeUpdating() {
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }
  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }
}

function updatePetInfoInHtml() {
  $(".name").text(pet_info["name"]);
  $(".weight").text(pet_info["weight"]);
  $(".happiness").text(pet_info["happiness"]);
}

function showReaction(pose, message, sound) {
  butterflyReady = false;
  // My .hide() method removes the previous pose and the welcome message from view.
  $(".pet-pose").hide();
  $(".intro-message").hide();

  // My .show() method displays the chosen pose and reveals message.
  $(pose).show();
  $(".pet-message").text(message);
  $(".pet-message").show();

  if (document.querySelector(".sound-toggle").checked) {
    var player = document.getElementById("muffin-sound");
    player.src = "sounds/" + sound + ".wav";
    player.play().catch(function () {}); // The activity still works if audio is unavailable.
  }
}

function clickedResetButton() {
  // A full reset removes friends and recreates Muffin with his starting stats.
  pets = [new Pet("Muffin", "cat")];
  var picker = document.getElementById("active-pet");
  picker.options.length = 1;
  picker.options[0].textContent = petLabel(pets[0]);
  picker.value = "0";

  document.querySelector(".friend-form").reset();
  closeFriendForm();
  updateFriendCount();
  selectPet();
}

function showIdlePose() {
  butterflyReady = false;
  document.getElementById("muffin-sound").pause();
  $(".pet-pose").hide();
  $(".idle-pose").show();
  $(".pet-message").hide();
  var message = "Pick an activity for your pet.";
  if (activePetIndex > 0) {
    message = pets[0].name + " is with " + pet_info.name + ". Try Play or Nap together!";
  }
  $(".intro-message").text(message);
  $(".intro-message").show();
}
