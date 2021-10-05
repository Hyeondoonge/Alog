import Language from "../models/Language.js";

const insertLanguages = async (data) => {
  try {
    await Language.insertMany(data);
    console.log('succefully save language');
  } catch (err) {
    console.log(err);
  }
};

const findLanguages = async () => {
  try {
    const doc = await Language.find({});
    return doc;
  } catch (err) {
    console.log(err);
  }
};

const findLanguagesByKeyword = async (keyword) => {
  try {
    const doc = await Language.find({ name: { $regex: `^${keyword}`, $options: 'i' }});
    return doc;
  } catch (err) {
    console.log(err);
  }
};

export { insertLanguages, findLanguages, findLanguagesByKeyword };