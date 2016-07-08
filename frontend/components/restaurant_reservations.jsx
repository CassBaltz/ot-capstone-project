const React = require("react");
const RestaurantActions = require("../actions/restaurant_actions");
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const RestaurantStore = require('../stores/restaurant_store');
const ReservationItem = require('./reservation_item');
const ReservationSearch = require('./reservation_search');

const RestaurantReservations = React.createClass({
  getInitialState: function () {
    return {restaurant: "none"};
  },

  componentDidMount: function () {
    this.listener = RestaurantStore.addListener(this.updateRestaurant);
    RestaurantActions.getRestaurant(parseInt(this.props.params.restaurantId));
  },

  updateRestaurant: function () {
    let restaurant = RestaurantStore.find(parseInt(this.props.params.restaurantId))
    this.setState({restaurant: restaurant});
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  render: function() {
    let resItems;
    if (this.state.restaurant === "none") {
      resItems = <div>No Reservations</div>;
    } else {
      resItems = this.state.restaurant.reservations.map((resItem, idx) => {
        return <ReservationItem key={idx} resItem={resItem} />
      })
    }
    
    return (
        <div className="restaurant-box">
          <h2>{this.state.restaurant.name}</h2>
          <ReservationSearch restaurantId={parseInt(this.props.params.restaurantId)} />
          <h3>Reservation Options</h3>
          <ul>
            {resItems}
          </ul>
        </div>
    );
  }
});


module.exports = RestaurantReservations;
