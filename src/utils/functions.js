import { produce } from "immer";
export const addArrItem = (arr, item) => {
  const index = arr.indexOf(item);
  if (index === -1) {
    arr.push(item);
  }
  return arr;
};
export const removeArrItem = (arr, item) => {
  const index = arr.indexOf(item);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};
export const filterSelected = (taxonomy, selected) =>
  taxonomy
    ?.map((tax) => tax.slug)
    ?.filter((tax) => selected.indexOf(tax) !== -1);


const ARRAY_KEYS = new Set([
  "shadow", // root shadow
  "shadows", // if you ever use this
]);

export function updateCustomData(state, nextValue, ...path) {
  return produce(state ?? {}, (draft) => {
    let cur = draft;

    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];

      // If current container is not an object/array, force it to object
      if (cur == null || (typeof cur !== "object" && !Array.isArray(cur))) {
        // this is rare, but keeps the tree consistent
        cur = {};
      }

      // Create missing node with correct type
      if (cur[key] == null) {
        cur[key] = ARRAY_KEYS.has(key) ? [] : {};
      } else {
        // If node exists but wrong type, normalize it
        if (ARRAY_KEYS.has(key) && !Array.isArray(cur[key])) cur[key] = [];
        if (!ARRAY_KEYS.has(key) && Array.isArray(cur[key])) cur[key] = {};
      }

      cur = cur[key];
    }

    const lastKey = path[path.length - 1];

    // Final assignment
    cur[lastKey] =
      typeof nextValue === "function" ? nextValue(cur[lastKey]) : nextValue;
  });
}

export const toolTipPresets = [
  {
    label: "Default",
    value: "default",
    img: "",
    height: "auto",
    width: "160px",
    isPro: false,
  },
  {
    label: "Theme-1",
    value: "themeOne",
    img: "",
    height: "auto",
    width: "160px",
    isPro: false,
  },
  {
    label: "Theme-2",
    value: "themeTwo",
    img: "",
    height: "auto",
    width: "160px",
    isPro: false,
  },
];
