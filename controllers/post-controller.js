export const create = async (req, res) => {
  try {
   
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Ошибка при создании статьи',
    });
  }
};
