app.controller('HomeController', function($scope) {
    // Add code for home controller here
  });
  
  app.controller('ReviewsController', function($scope, ReviewsService) {
    ReviewsService.getReviews().then(function(reviews) {
      $scope.reviews = reviews;
    });
  });
  
  app.controller('AddReviewController', function($scope, ReviewsService) {
    $scope.submitReview = function() {
      var review = {
        restaurant: $scope.restaurant,
        rating: $scope.rating,
        comment: $scope.comment
      };
      ReviewsService.addReview(review);
    };
  });
  
  