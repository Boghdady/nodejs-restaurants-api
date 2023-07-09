const mongoose = require("mongoose");

const restaurantsSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },

    image: String,
    city: String,
    address: String
  },
  { timestamps: true }
);

const setImageURL = doc => {
  if (doc.image) {
    doc.image = `http://localhost:8000/restaurants/${doc.image}`;
  }
};

restaurantsSchema.post("init", doc => {
  setImageURL(doc);
});

restaurantsSchema.post("save", doc => {
  setImageURL(doc);
});

module.exports = mongoose.model("Restaurants", restaurantsSchema);
