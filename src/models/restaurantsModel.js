const mongoose = require("mongoose");

const restaurantsSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    kitchen_type: String,
    logo: String,
    images: [String],
    rate: Number,
    city: String,
    address: String,
    available_times: [{ day: String, time: String }]
  },
  { timestamps: true }
);

const setImageURL = doc => {
  if (doc.logo) {
    doc.logo = `http://localhost:8000/restaurants/${doc.logo}`;
  }
  if (doc.images) {
    const imagesList = [];
    doc.images.forEach(image => {
      const imageUrl = `http://localhost:8000/restaurants/${image}`;
      imagesList.push(imageUrl);
    });
    doc.images = imagesList;
  }
};

restaurantsSchema.post("init", doc => {
  setImageURL(doc);
});

restaurantsSchema.post("save", doc => {
  setImageURL(doc);
});

module.exports = mongoose.model("Restaurant", restaurantsSchema);
