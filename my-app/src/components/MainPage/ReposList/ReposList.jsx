import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./ReposList.module.css";
import { abbreviateNumber } from "js-abbreviation-number";
import ReactPaginate from "react-paginate";
import Loader from "../Loader";

import { REPOS_ON_PAGE } from "../../../constants.js";

function ReposList({ isReposLoading, setUserReposPage, parametrsRequestUser }) {
  const userReposList = parametrsRequestUser.userRepos.data;
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
  if (isReposLoading === true) {
    return (
      <div className={styles.userRepos}>
        <Loader />
        <div className={styles.paginateBlock}>
        <div className={styles.paginateInfo}>
          {(parametrsRequestUser.userReposPage - 1) * REPOS_ON_PAGE + 1}-
          {(parametrsRequestUser.userReposPage - 1) * REPOS_ON_PAGE +
            parametrsRequestUser.userRepos.data.length}{" "}
          of {parametrsRequestUser.userInfo.public_repos} items
        </div>
        <ReactPaginate
          pageCount={Math.ceil(
            parametrsRequestUser.userInfo.public_repos / REPOS_ON_PAGE
          )}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          page={parametrsRequestUser.userReposPage - 1}
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={(target) => {
            const pageNumber = target.selected + 1;
            setUserReposPage(pageNumber);
          }}
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
  return (
    <div className={styles.userRepos}>
      <p className={styles.userInfoHeader}>
        Repositories (
        {abbreviateNumber(parametrsRequestUser.userInfo.public_repos)})
      </p>
      <ul className={styles.userReposList}>{listUserReposItem}</ul>
      <div className={styles.paginateBlock}>
        <div className={styles.paginateInfo}>
          {(parametrsRequestUser.userReposPage - 1) * REPOS_ON_PAGE + 1}-
          {(parametrsRequestUser.userReposPage - 1) * REPOS_ON_PAGE +
            parametrsRequestUser.userRepos.data.length}{" "}
          of {parametrsRequestUser.userInfo.public_repos} items
        </div>
        <ReactPaginate
          pageCount={Math.ceil(
            parametrsRequestUser.userInfo.public_repos / REPOS_ON_PAGE
          )}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          page={parametrsRequestUser.userReposPage - 1}
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={(target) => {
            const pageNumber = target.selected + 1;
            setUserReposPage(pageNumber);
          }}
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
