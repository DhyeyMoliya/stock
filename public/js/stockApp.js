
/// <reference path="angular.js" />
/// <reference path="jquery-2.2.2.js" />
/// <reference path="angular-route.js" />
//app uses ngRoute, ngCookie and ngResource modules of angularjs

var app = angular.module('stockApp', ['ngRoute', 'ngCookies', 'ngResource']).run(function ($rootScope, $window, $cookieStore) {

    $rootScope.isLoggedIn = $cookieStore.get('isLoggedIn');

    if (!$rootScope.isLoggedIn) {
        $window.location.href = '/';
    }

    $rootScope.logout = function () {
        $cookieStore.put('isLoggedIn', false);
        $rootScope.isLoggedIn = $cookieStore.get('isLoggedIn');
        $window.location.href = '/';
    };

});


//routing
app.config(function ($routeProvider) {
    $routeProvider
		//the timeline display
		.when('/', {
		    templateUrl: 'views/dashboard.html',
		    controller: 'dashboardController'
		})

        .when('/products', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController'
        })

        .when('/addproduct', {
            templateUrl: 'views/manageproducts.html',
            controller: 'productController'
        })

        .when('/customers', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController'
        })

        .when('/managecustomers', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController'
        })

        .when('/orders', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController'
        })

        .when('/neworder', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController'
        })

        //else redirect to initial page        
        .otherwise({ redirectTo: '/' });
});

app.factory('productService', function ($resource) {
    return $resource('./api/products/:id', null, { update: {method: 'PUT'}});
});


//dasboardController for Dashboard page
app.controller('dashboardController', function ($scope) {

    $scope.total_orders = 3200;
    $scope.total_customers = 2500;
    $scope.total_sales = "2.89 M";
    $scope.total_products = 4567;

    $scope.$on('$viewContentLoaded', function () {
        $.getScript("js/chart-data.js");
    });
});

app.controller('productController', function ($scope, $rootScope, productService) {
    $scope.products = productService.query();
    $scope.notSelectedProduct = true;
    $scope.notSelectedProductToRemove = true;
    
    $scope.newProduct = {
        created_by: '',
        product_name: '',
        product_stock: '',
        unit_price: '',
        description: ''
    };

    $scope.products = [{
        product_name: 'abc',
        product_stock: 4,
    },
    {
        product_name: 'def',
        product_stock: 5
    }];

    $scope.selectedProduct = function (product) {
        if ($('#productSelector').val() == "")
            $scope.notSelectedProduct = true;
        else
            $scope.notSelectedProduct = false;
    }

    $scope.selectedProductToRemove = function (product) {
        if ($('#removeProductSelector').val() == "")
            $scope.notSelectedProductToRemove = true;
        else
            $scope.notSelectedProductToRemove = false;
    }
       
    $scope.addProduct = function () {
        console.log('Debug Point: Add Product');
        $scope.products.push($scope.newProduct);
        productService.save($scope.editedProduct, function () {
            $scope.products = productService.query();
            $scope.newProduct = {
                created_by: '',
                product_name: '',
                product_stock: '',
                unit_price: '',
                description: ''
            };
        });
    };

    $scope.editProduct = function () {
        console.log('Debug Point: Edit Product');
        $id = $scope.editedProduct.id;
        productService.update({ id: $id }, $scope.editedProduct, function () {
            $scope.products = productService.query();
        });
    };

    $scope.removeProduct = function () {
        console.log('Debug Point: Remove Product');

        var index = $scope.products.indexOf($scope.productToRemove);
        $scope.products.splice(index, 1);

        $id = $scope.productToRemove.id;
        productService.delete({ id: $id }, function () {
            $scope.products = productService.query();
        });
    };

});

app.filter('findProduct', function () {

    return function (list, obj) {

        return list.filter(function (l) {
            if (obj.indexOf(l.product_name) >= 0) {
                return true;
            }
        });

    };
})



