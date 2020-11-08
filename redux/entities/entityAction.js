import catchErrors from "../../utils/catchError";
import { AxiosInstance } from "../../utils/Helper";

export const setSerachTermAction = (searchTerm) => ({
  type: "SET_SEARCH_TERM",
  payload: searchTerm,
});

export const getDataAction = ({
  id = 0,
  navigation,
  isInitial = false,
}) => async (dispatch) => {
  dispatch({
    type: "SET_PROGRESS",
    payload: { isProgress: true },
  });
  await AxiosInstance.post(
    `/post/${navigation}`,
    {
      _id: id,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => {
      if (res.data.files && res.status == 200) {
        console.log("data", res.data.files.length);
        const files = res.data.files;
        const isLast = res.data.isLast;
        // const newFiles = files.map(map => {
        //   if (map.types === 'music') {
        //     return {
        //       ...map,
        //       pattern: TrianglifyGenerate()
        //         .canvas()
        //         .toDataURL()
        //     }
        //   } else {
        //     return map
        //   }
        // })
        dispatch({
          type: "SET_ITEMS",
          payload: {
            items: files,
            isLast: isLast,
            isInitial,
            navigation: navigation,
          },
        });
      } else {
        console.log("error");
        dispatch({
          type: "SET_ERROR",
          payload: { error: "No Items found" },
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
      dispatch({
        type: "SET_ERROR",
        payload: { error: "Something went wrong with server try later" },
      });
    });
};

export const findDataAction = ({
  id = 1,
  searchTerm = "",
  isInitial = false,
}) => async (dispatch) => {
  dispatch({
    type: "SET_PROGRESS",
    payload: { isProgress: true },
  });
  await AxiosInstance.post(
    `/post/find`,
    {
      pageNum: id,
      searchTerm: searchTerm,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => {
      if (res.data.files && res.status == 200) {
        console.log("data", res.data.lenght);
        const files = res.data.files;
        const isLast = res.data.isLast;
        // const newFiles = files.map(map => {
        //   if (map.types === 'music') {
        //     return {
        //       ...map,
        //       pattern: TrianglifyGenerate()
        //         .canvas()
        //         .toDataURL()
        //     }
        //   } else {
        //     return map
        //   }
        // })

        dispatch({
          type: "SET_ITEMS",
          payload: {
            items: files,
            isLast: isLast,
            isInitial,
            id: id++,
            navigation: "find",
          },
        });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: { error: "No Items found" },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: "SET_ERROR",
        payload: { error: catchErrors(error) },
      });
    });
};
