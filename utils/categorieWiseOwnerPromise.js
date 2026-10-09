
const Categories = require("../models/categorySchema");
const SubCategories = require("../models/subCategorySchema");

const getOwnerWiseCategories = async (id) => {
  const data = await Categories.find({ owner: id }).lean();

  const mypromise = new Promise((resolve, reject) => {
    let categories = [];

    data.map(async (item) => {
      try {
        const subcategories = await SubCategories.find({
          parentCategory: item._id,
        });

        categories.push({
          ...item,
          subcategories: subcategories,
        });

        if (data.length === categories.length) {
          resolve(categories);
        }
      } catch (error) {
        reject(error);
      }
    });

    if (data.length === 0) {
      resolve(categories);
    }
  });

  return mypromise
    .then((data) => data)
    .catch((error) => {
      throw error;
    });
};

module.exports = getOwnerWiseCategories;
