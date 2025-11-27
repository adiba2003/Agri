import {
  vegetablesDB,
  fruitsDB,
  dairyDB,
  poultryDB,
  grainsDB
} from "../config/db.js";

export const categoryDBMapper = {
  vegetables: vegetablesDB,
  fruits: fruitsDB,
  dairy: dairyDB,
  poultry: poultryDB,
  grains: grainsDB,
};
