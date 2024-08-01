import React from "react";
import "./Gig.scss";
import Slide from "../../components/Slide/Slide";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataU,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });
  console.log(data);
  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Fiverr {">"} Graphics & Design {">"}
            </span>
            <h1>{data.data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img className="pp" src={"/img/noavatar.jpg"} alt="" />
                {/* <span>{dataU.data.username}</span> */}
                {!isNaN(data.data.totalStars / data.data.starNumber) && (
                  <div className="stars">
                    {Array(
                      Math.round(data.data.totalStars / data.data.starNumber)
                    )
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>
                      {Math.round(data.data.totalStars / data.data.starNumber)}
                    </span>
                  </div>
                )}
              </div>
            )}
            <div className="slider">
              <Slide slidesToShow={1} arrowsScroll={1}>
                {data.data.images.map((img) => (
                  <img key={img} src={img} alt="" />
                ))}
              </Slide>
            </div>
            <h2>About This Gig</h2>
            <p>{data.data.desc}</p>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={"/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    {/* <span>{dataU.username}</span> */}
                    {!isNaN(data.data.totalStars / data.data.starNumber) && (
                      <div className="stars">
                        {Array(
                          Math.round(
                            data.data.totalStars / data.data.starNumber
                          )
                        )
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(
                            data.data.totalStars / data.data.starNumber
                          )}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      {/* <span className="desc">{dataU.country}</span> */}
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  {/* <p>{dataU.desc}</p> */}
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.data.shortTitle}</h3>
              <h2>$ {data.data.price}</h2>
            </div>
            <p>{data.data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.data.deliveryDate} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
