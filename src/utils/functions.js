    import { produce } from "immer"; 
  export const addArrItem = (arr, item) => {
    const index = arr.indexOf(item);
    if (index === -1) {
      arr.push(item);
    }
    return arr;
  }
  export const removeArrItem = (arr, item) => {
    const index = arr.indexOf(item);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  export const filterSelected = (taxonomy, selected) => taxonomy?.map(tax => tax.slug)?.filter(tax => selected.indexOf(tax) !== -1);
  export const themeSwitch = (selectTheme = "default", attributes) =>
      produce(attributes, (draft) => {
      draft.selectTheme=selectTheme;
      switch (selectTheme) {
        case "themeOne":
      draft["styles"]={
          "bg": {"type": "solid", "color": ""},
          "border": "",

          "radius": {
            "top": "0px",
            "right": "0px",
            "bottom": "0px",
            "left": "0px"
          },
          "padding": {
            "top": "0px",
            "right": "0px",
            "bottom": "0px",
            "left": "0px"
          },
          "margin": {
            "top": "0px",
            "right": "0px",
            "bottom": "0px",
            "left": "0px"
          },
          "shadow": [
            {
              "type": "box",
              "hOffset": "0px",
              "vOffset": "0px",
              "blur": "0px",
              "spreed": "0px",
              "color": "",
              "isInset": false
            }
            ],
            "product":{
            "bg":{"type":"solid","color":"#FFF"},
            "padding":{
              "top": "0px",
              "right": "0px",
              "bottom": "0px",
              "left": "0px"
            },
            "radius":{
              "top": "12px",
              "right": "12px",
              "bottom": "12px",
              "left": "12px"
            }	,	
            "border":{
              "width": "1px",
              "style": "solid",
              "color": "#bbc6dd"
            },
            "hover":{
              "shadow":[
                  {
                  "type": "box",
                  "hOffset": "0px",
                  "vOffset": "10px",
                  "blur": "15px",
                  "spreed": "-3px",
                  "color": "rgba(0, 0, 0, 0.1)",
                  "isInset": false
                }
              ],
              "translateY": -4
            },
            "image":{
              "width": "100%",
              "height": "100%",
              "objectFit": "cover",
              "scale": 1.1
            },
            "content":{
              "padding":{
                "top": "16px",
                "right": "16px",
                "bottom": "16px",
                "left": "16px"
              },
              "category":{
                "typo":{
                  "fontFamily": "",
                  "fontCategory": "",
                  "fontWeight": "",
                  "fontVariant": "400",
                  "isUploadFont": true,
                  "fontSize": {
                    "desktop": 14,
                    "tablet": 14,
                    "mobile": 14
                  },
                  "fontStyle": "normal",
                  "textTransform": "none",
                  "textDecoration": "none",
                  "lineHeight": "",
                  "letterSpace": "0px"
                      },
                "color": "#80736b"
              },
              "name":{
                "typo":{
                "fontFamily": "",
                "fontCategory": "",
                "fontWeight": "600",
                "fontVariant": "600",
                "isUploadFont": true,
                "fontSize": {
                "desktop": 18,
                "tablet": 18,
                "mobile": 18
                },
                "fontStyle": "normal",
                "textTransform": "none",
                "textDecoration": "none",
                "lineHeight": "",
                "letterSpace": "0px"
                    },
                "color": "#111827"
              },
              "review":{
                "icon":{
                  "color":"#fbbf24",
                  "size": "16px"
                },
                "value":{
                  "color":"#374151",
                  "typo":{
                    "fontFamily": "",
                    "fontCategory": "",
                    "fontWeight": "",
                    "fontVariant": "",
                    "isUploadFont": true,
                    "fontSize": {
                      "desktop": 14,
                      "tablet": 14,
                      "mobile": 14
                    },
                    "fontStyle": "normal",
                    "textTransform": "none",
                    "textDecoration": "none",
                    "lineHeight": "",
                    "letterSpace": "0px"
                  }
                }
              },
              "price":{
                "salePrice":{
                  "color": "#111827",
                  "typo":{
                    "fontFamily": "",
                    "fontCategory": "",
                    "fontWeight": "700",
                    "fontVariant": "700",
                    "isUploadFont": true,
                    "fontSize": {
                      "desktop": 20,
                      "tablet": 20,
                      "mobile": 20
                    },
                    "fontStyle": "normal",
                    "textTransform": "none",
                    "textDecoration": "none",
                    "lineHeight": "",
                    "letterSpace": "0px"
                  }

                },
                "regularPrice":{
                  "color": "#9ca3af",
                  "typo":{
                    "fontFamily": "",
                    "fontCategory": "",
                    "fontWeight": "",
                    "fontVariant": "",
                    "isUploadFont": true,
                    "fontSize": {
                      "desktop": 14,
                      "tablet": 14,
                      "mobile": 14
                    },
                    "fontStyle": "normal",
                    "textTransform": "none",
                    "textDecoration": "line-through",
                    "lineHeight": "",
                    "letterSpace": "0px"
                  }

                }
              },
              "addCart":{
                "colors":{ "color": "#fff", "bg": "#111827" },
                "padding":{
                  "top": "10px",
                  "right": "10px",
                  "bottom": "10px",
                  "left": "10px"
                },
                
                "radius":{
                  "top": "8px",
                  "right": "8px",
                  "bottom": "8px",
                  "left": "8px"
                },
                "icon":{
                  "size": 20
                }

              },
              "tag":{
                "colors":{ "color": "#fff", "bg": "#ef4444" },
                "padding":{
                  "top": "4px",
                  "right": "10px",
                  "bottom": "4px",
                  "left": "10px"
                },
                "radius":{
                  "top": "6px",
                  "right": "6px",
                  "bottom": "6px",
                  "left": "6px"
                },
                "typo":{
                  "fontFamily": "",
                  "fontCategory": "",
                  "fontWeight": "600",
                  "fontVariant": "600",
                  "isUploadFont": true,
                  "fontSize": {
                    "desktop": 12,
                    "tablet": 12,
                    "mobile": 12
                  },
                  "fontStyle": "normal",
                  "textTransform": "uppercase",
                  "textDecoration": "none",
                  "lineHeight": "",
                  "letterSpace": "0px"
                }
              }

            }
              }
            
        }
        draft["isImage"]=true;
        draft["isTitle"]=true;
        draft["isRating"]=true;
        draft["isPrice"]=true;
        draft["isAddToCartBtn"]=true;
        draft["options"]["isDiscountTag"]=true;
        draft["options"]["isCategory"]=true;
          break;
        case "themeTwo":
        draft["isImage"]=true;
        draft["isTitle"]=true;
        draft["isRating"]=true;
        draft["isPrice"]=true;
        draft["isAddToCartBtn"]=true;
        draft["options"]["isDiscountTag"]=true;
        draft["options"]["isCategory"]=true;
        draft["styles"]={
          "bg": {"type": "solid", "color": ""},
          "border": "",
          "radius": {
            "top": "0px",
            "right": "0px",
            "bottom": "0px",
            "left": "0px"
          },
          "padding": {
            "top": "0px",
            "right": "0px",
            "bottom": "0px",
            "left": "0px"
          },
          "margin": {
            "top": "0px",
            "right": "0px",
            "bottom": "0px",
            "left": "0px"
          },
          "shadow": [
            {
              "type": "box",
              "hOffset": "0px",
              "vOffset": "0px",
              "blur": "0px",
              "spreed": "0px",
              "color": "",
              "isInset": false
            }
            ],
            "product":{
            "bg":{"bgType":"solid","color":"","bg":"#FFF"},
            "padding":{
              "top": "0px",
              "right": "0px",
              "bottom": "0px",
              "left": "0px"
            },
            "radius":{
              "top": "16px",
              "right": "16px",
              "bottom": "16px",
              "left": "16px"
            }	,	
            "border":{
              "width": "1px",
              "style": "solid",
              "color": "#bbc6dd"
            },
            "hover":{
              "shadow":[
                  {
                  "type": "box",
                  "hOffset": "0px",
                  "vOffset": "10px",
                  "blur": "15px",
                  "spreed": "-3px",
                  "color": "rgba(0, 0, 0, 0.1)",
                  "isInset": false
                }
              ],
              "translateY": 0
            },
            "image":{
              "width": "100%",
              "height": "100%",
              "objectFit": "cover",
              "scale": 1
            },
            "content":{
              "padding":{
                "top": "20px",
                "right": "20px",
                "bottom": "20px",
                "left": "20px"
              },
              "category":{
                "typo":{
                  "fontFamily": "",
                  "fontCategory": "",
                  "fontWeight": "",
                  "fontVariant": "400",
                  "isUploadFont": true,
                  "fontSize": {
                    "desktop": 14,
                    "tablet": 14,
                    "mobile": 14
                  },
                  "fontStyle": "normal",
                  "textTransform": "none",
                  "textDecoration": "underline",
                  "lineHeight": "",
                  "letterSpace": "0px"
                      },
                "color": "#6b7280"
              },
              "name":{
                "typo":{
                "fontFamily": "",
                "fontCategory": "",
                "fontWeight": "600",
                "fontVariant": "600",
                "isUploadFont": true,
                "fontSize": {
                "desktop": 18,
                "tablet": 18,
                "mobile": 18
                },
                "fontStyle": "normal",
                "textTransform": "none",
                "textDecoration": "none",
                "lineHeight": "",
                "letterSpace": "0px"
                    },
                "color": "#111827"
              },
              "review":{
                "icon":{
                  "color":"#fbbf24",
                  "size": "16px"
                },
                "value":{
                  "color":"#6b7280",
                  "typo":{
                    "fontFamily": "",
                    "fontCategory": "",
                    "fontWeight": "",
                    "fontVariant": "",
                    "isUploadFont": true,
                    "fontSize": {
                      "desktop": 14,
                      "tablet": 14,
                      "mobile": 14
                    },
                    "fontStyle": "normal",
                    "textTransform": "none",
                    "textDecoration": "none",
                    "lineHeight": "",
                    "letterSpace": "0px"
                  }
                }
              },
              "price":{
                "salePrice":{
                  "color": "#111827",
                  "typo":{
                    "fontFamily": "",
                    "fontCategory": "",
                    "fontWeight": "700",
                    "fontVariant": "700",
                    "isUploadFont": true,
                    "fontSize": {
                      "desktop": 20,
                      "tablet": 20,
                      "mobile": 20
                    },
                    "fontStyle": "normal",
                    "textTransform": "none",
                    "textDecoration": "none",
                    "lineHeight": "",
                    "letterSpace": "0px"
                  }

                },
                "regularPrice":{
                  "color": "#9ca3af",
                  "typo":{
                    "fontFamily": "",
                    "fontCategory": "",
                    "fontWeight": "",
                    "fontVariant": "",
                    "isUploadFont": true,
                    "fontSize": {
                      "desktop": 14,
                      "tablet": 14,
                      "mobile": 14
                    },
                    "fontStyle": "normal",
                    "textTransform": "none",
                    "textDecoration": "line-through",
                    "lineHeight": "",
                    "letterSpace": "0px"
                  }

                }
              },
              "addCart":{
                "colors":{ "color": "#fff", "bg": "#111827" },
                "padding":{
                  "top": "12px",
                  "right": "12px",
                  "bottom": "12px",
                  "left": "12px"
                },
                
                "radius":{
                  "top": "12px",
                  "right": "12px",
                  "bottom": "12px",
                  "left": "12px"
                },
                "icon":{
                  "size": 20
                }

              },
              "tag":{
                "colors":{ "color": "#fff", "bg": "#ef4444" ,"bgType":"gradient","gradient":"linear-gradient(to right, #ef4444, #ec4899)"	},
                "padding":{
                  "top": "8px",
                  "right": "16px",
                  "bottom": "8px",
                  "left": "16px"
                },
                "radius":{
                  "top": "9999px",
                  "right": "9999px",
                  "bottom": "9999px",
                  "left": "9999px"
                },
                "typo":{
                  "fontFamily": "",
                  "fontCategory": "",
                  "fontWeight": "700",
                  "fontVariant": "700",
                  "isUploadFont": true,
                  "fontSize": {
                    "desktop": 14,
                    "tablet": 14,
                    "mobile": 14
                  },
                  "fontStyle": "normal",
                  "textTransform": "uppercase",
                  "textDecoration": "none",
                  "lineHeight": "",
                  "letterSpace": "0px"
                }
              }

            }
              }
            
        }
          break;
      }
      


      });

    const ARRAY_KEYS = new Set([
    "shadow",         // root shadow
    "shadows",        // if you ever use this
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
      cur[lastKey] = typeof nextValue === "function" ? nextValue(cur[lastKey]) : nextValue;
    });
  }

  
  export const toolTipPresets = [
    {
      label: "Default",
      value: "default",
      img: "",
      height: "auto",
      width: "160px",
      isPro:false
    },
    {
      label: "Theme-1",
      value: "themeOne",
      img: "",
      height: "auto",
      width: "160px",
      isPro:true
    },
    {
      label: "Theme-2",
      value: "themeTwo",
      img: "",
      height: "auto",
      width: "160px",
      isPro:true
    },]