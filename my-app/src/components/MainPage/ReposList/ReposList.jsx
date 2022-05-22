import React, { useCallback } from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import ReactPaginate from "react-paginate";

import styles from "./ReposList.module.css";
import Loader from "../Loader";
import { REPOS_ON_PAGE } from "../../../constants.js";

function ReposList({
  isReposLoading,
  setUserReposPage,
  parametersRequestUser,
}) {

  const { userRepos, userInfo, userReposPage } = parametersRequestUser;

  const userReposList = userRepos.data;

  const firstItemLabel = (userReposPage - 1) * REPOS_ON_PAGE + 1;

  const lastItemLabel =
    (userReposPage - 1) * REPOS_ON_PAGE + userRepos.data.length;

  const itemCount = userInfo.public_repos;

  const shownPages = `${firstItemLabel}-
  ${lastItemLabel} of ${itemCount} items`;

  const pageCount = Math.ceil(userInfo.public_repos / REPOS_ON_PAGE);

  const onPageChange = useCallback(
    (target) => {
      const pageNumber = target.selected + 1;
      setUserReposPage(pageNumber);
    },
    [setUserReposPage]
  );

  const listUserReposItem = userReposList.map((userReposList) => (
    <div key={userReposList.id} className={styles.userReposItem}>
      <a
        className={styles.userReposItemName}
        href={userReposList.html_url}
        target="_blank"
      >
        {userReposList.name}
      </a>
      <p className={styles.userReposItemDescription}>
        {userReposList.description}
      </p>
    </div>
  ));

  return (
    <div className={styles.userRepos}>
      {isReposLoading ? (
        <Loader />
      ) : (
        <>
          <p className={styles.userInfoHeader}>
            Repositories ({abbreviateNumber(userInfo.public_repos)})
          </p>
          <ul className={styles.userReposList}>{listUserReposItem}</ul>
        </>
      )}
      <div className={styles.paginateBlock}>
        <div className={styles.paginateInfo}>{shownPages}</div>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          page={userReposPage - 1}
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={onPageChange}
          containerClassName={styles.paginateContainer}
          breakClassName={styles.paginateBreak}
          breakLinkClassName={styles.paginateBreakLink}
          pageLinkClassName={styles.paginatePageLink}
          pageClassName={styles.paginatePage}
          activeClassName={styles.paginatePageActive}
          nextClassName={styles.paginateNext}
          previousClassName={styles.paginatePrevious}
          activeLinkClassName={styles.paginatePageLinksActive}
        />
      </div>
    </div>
  );
}

export default React.memo(ReposList);
