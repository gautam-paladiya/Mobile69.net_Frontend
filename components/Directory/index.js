// import TrianglifyGenerate from '../Util/Trianglify'
import { RingLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataAction,
  findDataAction,
} from "../../redux/entities/entityAction";
import Page404 from "../page404";
import styles from "./index.module.css";
import List from "./List";

export default function (props) {
  const dispatch = useDispatch();
  const { entity } = useSelector((state) => state);

  const loadMore = () => {
    console.log("entity.isLast", entity.isLast);
    if (!entity.isLast) {
      if (entity.navigation === "find") {
        dispatch(
          findDataAction({
            searchTerm: entity.searchTerm,
            id: entity.id,
          })
        );
      } else {
        dispatch(
          getDataAction({
            id: entity.items[entity.items.length - 1]._id,
            navigation: entity.navigation,
          })
        );
      }
    }
  };

  return (
    <div>
      {entity.error ? (
        <Page404
          title="No matching itmes found"
          description="Item you are looking for does not found please try again later"
        />
      ) : (
        <div className={styles.parent}>
          {entity.isProgress && <RingLoader size={200} color="#4A90E2" />}
          <List posts={entity.items} />

          {!entity.isLast ? (
            <button
              id="showmore"
              type="button"
              // ref={this.showMoreRef}
              className="btn btn-primary w-auto px-2 m-2 btn-loading"
              variant="contained"
              color="primary"
              onClick={loadMore}
            >
              {!entity.isProgress ? (
                " Show More"
              ) : (
                <div>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  Loading...
                </div>
              )}
            </button>
          ) : (
            <div className="alert alert-success" role="alert">
              Yay! You have seen it all
            </div>
          )}
          {/* </InfiniteScroll> */}
        </div>
      )}
    </div>
  );
}
