import React, { useEffect, useState } from "react";
import "../css/result.css";
import { useQuery, gql } from "@apollo/client";
import moment from "moment";
import SearchBar from "../component/search";
import FilterBar from "../component/filter";
import ContentLoader from "../component/Loader";

const ResultData = () => {
  const [searchData, setSearchData] = useState("");
  const [searchDataOne, setSearchDataOne] = useState("");
  const [searchDataTwo, setSearchDataTwo] = useState("");
  const [resultData, setResultData] = useState(null);

  const GET_TRANSACTIONS = gql`
    query {
      transactions: searchTransaction(
        input: { query: "${searchData}", sexQuery: "", statusQuery: "" }
      ) {
        ID
        Name
        Date
        Status
        Sex
      }
    }
  `;


  const onSearchChange = (e) => {
    setSearchData(e.target.value);
  };
  const onSelectOne = (e) => {
    setSearchDataOne(e.target.value);
  };

  const onSelectTwo = (e) => {
    setSearchDataTwo(e.target.value);
  };
  const { loading, data } = useQuery(GET_TRANSACTIONS);
console.log("===", data)
  useEffect(() => {
    const groups = data?.transactions.reduce((groups, user) => {
      const date = user.Date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(user);
      return groups;
    }, {});
    if (groups) {
      const groupArrays = Object.keys(groups).map((date) => {
        return {
          date,
          user: groups[date],
        };
      });
      setResultData(groupArrays);
    }
  }, [data]);

  return (
    <>
      <SearchBar onChange={onSearchChange} />
      <FilterBar onSelectOne={onSelectOne} onSelectTwo={onSelectTwo} />
      {loading ? (
        <ContentLoader />
      ) : (
        <div className="result">
          <div className="result-details">
            {resultData?.length > 0 ? (
              resultData?.map((data) => (
                <div>
                  <h6 className="date-details">
                    {moment(data?.date).format("MMMM Do YYYY")}
                  </h6>
                  {data?.user?.map((userData) => (
                    <div className="user-data">
                      <div>
                        <div className="user-details">
                          <div className="user-id">
                            <h3 className="id">{userData?.ID}</h3>
                          </div>
                          <div className="data">
                            <div>
                              <h2>{userData?.Name}</h2>
                              <h4>{userData?.Sex}</h4>
                            </div>
                            <div>
                              <h6>{userData?.Status}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <h6 className="no-text">No Data</h6>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default ResultData;
