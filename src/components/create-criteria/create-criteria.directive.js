'use strict';

var createCriteriaDirective = function ($http, $rootScope, criteriaService) {

  var link = function (scope, element, attributes) {

    scope.submit = function () {
      console.log(scope.name);
      console.log(scope.location);
      console.log(scope.description);
      console.log(scope.photo);
    };

    scope.image = function(image) {

      var fileReader = new FileReader();
      
      
      // move out to criteria service, clean this up
      fileReader.onload = function (e) {

              console.log(e.target.result); 
              scope.uploading = true;
              // need to come up with solution for file uploads, prefer to write my own.
              $http.post('http://localhost:32722/api/booking/image', e.target.result.toString())
                .then(function success (response) {

                  scope.uploading = false;
                  scope.uploaded = true;
                  console.log(response);
                  console.log('success man!');

                }, function error (response) {
                    scope.uploaded = false;
                    scope.uploading = false;
                    console.log(response);
                    console.log('error bro');

                });


        };

        fileReader.readAsDataURL(image[0]);
     
      };
  };

  var directive = {};

  directive.restrict = 'E';
  directive.link = link; 
  directive.templateUrl = 'components/create-criteria/create-criteria.html';

  return directive;

};

angular.module('booking')
  .directive('createCriteria', createCriteriaDirective);
