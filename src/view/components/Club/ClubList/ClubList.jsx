import React, { useEffect, useState } from "react";
import "./ClubList.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyClub } from "../../../../model/httpApiCrients/clubApiClient";
import { favoriteClubActionCreater } from "../../../../model/redux/currentUserSlice";
import Tag from "../../../parts/Tag/Tag";

const ClubList = () => {
  const [clubs, setClubs] = useState([]);
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClubList = async () => {
      try {
        const res = await getMyClub();
        setClubs(res);
      } catch (e) {
        window.alert(e);
        console.log(e);
      }
    };
    fetchClubList();
  }, []);

  return (
    <div className="club-list">
      <h2 className="club-list__title">参加クラブ一覧</h2>
      <ul className="club-list__items">
        {clubs.length > 0 &&
          clubs.map((club) => (
          <li key={club._id} className="club-list__item">
            <div className="club-list__content">
              <span><strong>管理者:</strong>{club.members?.length > 0 ? club.members[0].username : ""}</span>
              <h3 className="club-list__name">{club.name}</h3>
              <div className="club-list__tags">
                {club.tags?.map((tag) => (
                  <Tag key={tag} tag={tag} />
                ))}
              </div>
              <button
                className={`club-list__favorite-button ${currentUser.favoriteClub?._id === club._id ? "active" : "activate"}`}
                onClick={() => {
                  dispatch(favoriteClubActionCreater(club));
                }}
              >
                {
                  currentUser.favoriteClub?._id === club._id ? "active" : "activate"
                }
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClubList;
