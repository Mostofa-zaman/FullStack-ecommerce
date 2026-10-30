const schema = {
  title: {
    column: "title",
    type: String,
  },
  description: {
    column: "description",
    type: String,
  },
  shortDescription: {
    column: "shortDescription",
    type: String,
  },
  price: {
    column: "price",
    type: Number,
  },
  discountPrice: {
    column: "discountPrice",
    type: Number,
  },
  images: {
    column: "images",
    type: String,
  },
  stock: {
    column: "stock",
    type: Number,
  },
  status: {
    column: "status",
    type: String,
  },
};

module.exports = schema;