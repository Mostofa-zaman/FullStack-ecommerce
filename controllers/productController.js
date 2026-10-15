const createProduct = async (req, res) => {
  const {
    title, shortDescription,description,price,brand,discountPrice,category, subCategory,
  } = req.body;

   // Required field validation
  if (
    !title ||
    price === undefined ||
    price === null ||
    price === "" ||
    !category ||
    !subCategory
  ) {
    return res.status(400).json({
      success: false,
      message: "Title, price, category and subCategory are required",
    });
  }

  
};
