const React = require("react");
const RestaurantActions = require("../actions/restaurant_actions");
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const RestaurantStore = require('../stores/restaurant_store');
const ReviewItem = require('./restaurant_review_item');

const RestaurantReviews = React.createClass({
  getInitialState: function () {
    return {restaurant: "none"};
  },

  componentDidMount: function () {
    this.listener = RestaurantStore.addListener(this.updateRestaurant);
    RestaurantActions.getRestaurant(parseInt(this.props.params.restaurantId));
  },

  updateRestaurant: function () {
    let restaurant = RestaurantStore.find( parseInt(this.props.params.restaurantId))
    this.setState({restaurant: restaurant});
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  render: function() {
    let reviews;
    if (this.state.restaurant === "none") {
      reviews = <div>No Reviews</div>;
    } else {
      reviews = this.state.restaurant.reviews.map((review, idx) => {
        return <ReviewItem key={idx} review={review} />
      })
    }

    return (
        <div className="restaurant-box">
          <h2>{this.state.restaurant.name}</h2>
          <h3>Reviews</h3>
          <ul>
            {reviews}
          </ul>
        </div>
    );
  }
});


module.exports = RestaurantReviews;