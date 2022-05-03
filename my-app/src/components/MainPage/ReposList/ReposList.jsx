import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./ReposList.module.css";
import { abbreviateNumber } from "js-abbreviation-number";
import ReactPaginate from "react-paginate";

import { REPOS_ON_PAGE } from "../../../constants.js"

function ReposList(props) {
  const userReposList = props.params.userRepos.data;
  const listUserReposItem = userReposList.map((userReposList) => (
    <div className={styles.userReposItem}>
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
  console.log(props.params.userRepos)
  console.log(props.params.userReposPage)
  return (
    <div className={styles.userRepos}>
      <p className={styles.userInfoHeader}>
        Repositories ({abbreviateNumber(props.params.userInfo.public_repos)})
      </p>
      <ul className={styles.userReposList}>{listUserReposItem}</ul>
      <div className={styles.paginateBlock}>
        <div className={styles.paginateInfo}>
          {(props.params.userReposPage - 1) * REPOS_ON_PAGE + 1}-
          {(props.params.userReposPage - 1) * REPOS_ON_PAGE +
            props.params.userRepos.data.length}{" "}
          of {props.params.userInfo.public_repos} items
        </div>
        <ReactPaginate
          pageCount={Math.ceil(props.params.userInfo.public_repos / REPOS_ON_PAGE)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={(target) => {
            const pageNumber = target.selected + 1;
            props.setUserReposPage(pageNumber);
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

export default ReposList;
