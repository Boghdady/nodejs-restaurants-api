const mongoose = require("mongoose");

const mealsSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    images: [String],
    restaurant: {
      type: mongoose.Schema.ObjectId,
      ref: "Restaurant",
      required: [true, "Meal must belong to Restaurant"]
    }
  },
  { timestamps: true }
);

mealsSchema.pre(/^find/, function(next) {
  this.populate({ path: "restaurant", select: "name" });
  next();
});

const setImageURL = doc => {
  if (doc.images) {
    const imagesList = [];
    doc.images.forEach(image => {
      const imageUrl = `http://localhost:8000/meals/${image}`;
      imagesList.push(imageUrl);
    });
    doc.images = imagesList;
  }
};

mealsSchema.post("init", doc => {
  setImageURL(doc);
});

mealsSchema.post("save", doc => {
  setImageURL(doc);
});

module.exports = mongoose.model("Meal", mealsSchema);
